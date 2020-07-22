import React, { Component } from 'react'
import Loader from 'libe-components/lib/blocks/Loader'
import LoadingError from 'libe-components/lib/blocks/LoadingError'
import ShareArticle from 'libe-components/lib/blocks/ShareArticle'
import LibeLaboLogo from 'libe-components/lib/blocks/LibeLaboLogo'
import ArticleMeta from 'libe-components/lib/blocks/ArticleMeta'
import PageTitle from 'libe-components/lib/text-levels/PageTitle'
import SectionTitle from 'libe-components/lib/text-levels/SectionTitle'
import InterTitle from 'libe-components/lib/text-levels/InterTitle'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import Timeline from './components/Timeline'

export default class App extends Component {
  /* * * * * * * * * * * * * * * * *
   *
   * CONSTRUCTOR
   *
   * * * * * * * * * * * * * * * * */
  constructor () {
    super()
    this.c = 'chouviat'
    this.state = {
      loading_sheet: true,
      error_sheet: null,
      data_sheet: [],
      keystrokes_history: [],
      konami_mode: false
    }
    this.fetchSheet = this.fetchSheet.bind(this)
    this.fetchCredentials = this.fetchCredentials.bind(this)
    this.listenToKeyStrokes = this.listenToKeyStrokes.bind(this)
    this.watchKonamiCode = this.watchKonamiCode.bind(this)
    this.handleBodyWheel = this.handleBodyWheel.bind(this)
    this.handleBodyScroll = this.handleBodyScroll.bind(this)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * DID MOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentDidMount () {
    document.addEventListener('keydown', this.listenToKeyStrokes)
    document.addEventListener('scroll', this.handleBodyScroll)
    this.fetchCredentials()
    if (this.props.spreadsheet) return this.fetchSheet()
    return this.setState({ loading_sheet: false })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WILL UNMOUNT
   *
   * * * * * * * * * * * * * * * * */
  componentWillUnmount () {
    document.removeEventListener('keydown', this.listenToKeyStrokes)
  }

  /* * * * * * * * * * * * * * * * *
   *
   * SHOULD UPDATE
   *
   * * * * * * * * * * * * * * * * */
  shouldComponentUpdate (props, nextState) {
    const changedKeys = []
    Object.keys(nextState).forEach(key => {
      if (this.state[key] !== nextState[key]) changedKeys.push(key)
    })
    if (changedKeys.length === 1 &&
      changedKeys.includes('keystrokes_history')) return false
    return true
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH CREDENTIALS
   *
   * * * * * * * * * * * * * * * * */
  async fetchCredentials () {
    const { api_url } = this.props
    const { format, article } = this.props.tracking
    const api = `${api_url}/${format}/${article}/load`
    try {
      const reach = await window.fetch(api, { method: 'POST' })
      const response = await reach.json()
      const { lblb_tracking, lblb_posting } = response._credentials
      if (!window.LBLB_GLOBAL) window.LBLB_GLOBAL = {}
      window.LBLB_GLOBAL.lblb_tracking = lblb_tracking
      window.LBLB_GLOBAL.lblb_posting = lblb_posting
      return { lblb_tracking, lblb_posting }
    } catch (error) {
      console.error('Unable to fetch credentials:')
      console.error(error)
      return Error(error)
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * FETCH SHEET
   *
   * * * * * * * * * * * * * * * * */
  async fetchSheet () {
    this.setState({ loading_sheet: true, error_sheet: null })
    const sheet = this.props.spreadsheet
    try {
      const reach = await window.fetch(this.props.spreadsheet)
      if (!reach.ok) throw reach
      const data = await reach.text()
      const parsedData = data // Parse sheet here
      this.setState({ loading_sheet: false, error_sheet: null, data_sheet: parsedData })
      return data
    } catch (error) {
      if (error.status) {
        const text = `${error.status} error while fetching : ${sheet}`
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(text, error)
        return Error(text)
      } else {
        this.setState({ loading_sheet: false, error_sheet: error })
        console.error(error)
        return Error(error)
      }
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * START LISTENING KEYSTROKES
   *
   * * * * * * * * * * * * * * * * */
  listenToKeyStrokes (e) {
    if (!e || !e.keyCode) return
    const currHistory = this.state.keystrokes_history
    const newHistory = [...currHistory, e.keyCode]
    this.setState({ keystrokes_history: newHistory })
    this.watchKonamiCode()
  }

  /* * * * * * * * * * * * * * * * *
   *
   * WATCH KONAMI CODE
   *
   * * * * * * * * * * * * * * * * */
  watchKonamiCode () {
    const konamiCodeStr = '38,38,40,40,37,39,37,39,66,65'
    const lastTenKeys = this.state.keystrokes_history.slice(-10)
    if (lastTenKeys.join(',') === konamiCodeStr) this.setState({ konami_mode: true })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE BODY WHEEL
   *
   * * * * * * * * * * * * * * * * */
  handleBodyWheel (e) {
    if (!e) return
    const isFirefox = navigator.userAgent.toLowerCase().match('firefox')
    const { deltaX, deltaY, wheelDeltaX, wheelDeltaY } = e.nativeEvent
    const increment = isFirefox ? (deltaX + deltaY) * 2 : deltaX + deltaY
    document.documentElement.scrollTo({
      top: 0,
      left: document.documentElement.scrollLeft + increment,
      behaviour: 'smooth'
    })
  }

  /* * * * * * * * * * * * * * * * *
   *
   * HANDLE BODY SCROLL
   *
   * * * * * * * * * * * * * * * * */
  handleBodyScroll (e) {
    // Move labels
    const $timelinePanel = document.querySelector('.timeline-panel')
    const $videosTitle = document.querySelector('.timeline__videos .lblb-annotation-title')
    const $videosLinesLabels = document.querySelectorAll('.timeline__video-line-label')
    if (!$timelinePanel || !$videosTitle || !$videosLinesLabels) return

    const timelineXOffset = $timelinePanel.getBoundingClientRect().x
    const timelineWidth = $timelinePanel.getBoundingClientRect().width
    const darkCalculation = timelineXOffset + (timelineWidth - (window.innerWidth / 2))

    if (timelineXOffset < 8 && darkCalculation > 0) {
      $videosTitle.style.marginLeft = `${8 + -1 * timelineXOffset}px`
      Array.prototype.forEach.call($videosLinesLabels, ($label) => {
        $label.style.left = `${8 + -1 * timelineXOffset}px`
      })
    } else {
      $videosTitle.style.marginLeft = null
      Array.prototype.forEach.call($videosLinesLabels, ($label) => {
        $label.style.left = null
      })
    }
  }

  /* * * * * * * * * * * * * * * * *
   *
   * RENDER
   *
   * * * * * * * * * * * * * * * * */
  render () {
    const { c, state, props } = this

    /* Assign classes */
    const classes = [c]
    if (state.loading_sheet) classes.push(`${c}_loading`)
    if (state.error_sheet) classes.push(`${c}_error`)

    /* Load & errors */
    if (state.loading_sheet) {
      return <div className={classes.join(' ')}>
        <div className='lblb-default-apps-loader'>
          <Loader />
        </div>
      </div>
    } else if (state.error_sheet) {
      return <div className={classes.join(' ')}>
        <div className='lblb-default-apps-error'>
          <Paragraph>{state.error_sheet}</Paragraph>
          <LoadingError />
        </div>
      </div>
    }

    /* Display component */
    return <div
      className={classes.join(' ')}
      onWheel={this.handleBodyWheel}>
      <div className='intro-panel'>
        <InterTitle small>Les 26 minutes fatales à Cédric Chouviat</InterTitle>
        <Paragraph literary>Libération reconstitue, seconde par seconde, l'interpellation qui a conduit à la mort du chauffeur-livreur, le 3&nbsp;janvier à Paris.</Paragraph>
        <Paragraph literary>
          <a href='#'>Faites défiler par ici</a> →
        </Paragraph>
        <div className='lblb-default-apps-footer'>
          <ShareArticle short iconsOnly tweet={props.meta.tweet} url={props.meta.url} />
          <ArticleMeta
            authors={[
              { name: 'Libé Labo', role: 'Production', link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538' }
            ]}
          />
          <LibeLaboLogo target='blank' />
        </div>
      </div>
      <div className='timeline-panel'>
        <Timeline />
      </div>
      <div className='outro-panel'>
        <Paragraph literary>Cédric Chouviat décède le 5 janvier, à l'hôpital Georges-Pompidou.</Paragraph>
        <Paragraph literary><a href='https://www.liberation.fr/france/2020/07/21/mort-de-cedric-chouviat-l-enquete-qui-taille-en-pieces-la-version-des-policiers_1794858'>Lire notre enquête</a></Paragraph>
        <div className='lblb-default-apps-footer'>
          <ShareArticle short iconsOnly tweet={props.meta.tweet} url={props.meta.url} />
          <ArticleMeta
            authors={[
              { name: 'Libé Labo', role: 'Production', link: 'https://www.liberation.fr/libe-labo-data-nouveaux-formats,100538' }
            ]}
          />
          <LibeLaboLogo target='blank' />
        </div>
      </div>
    </div>
  }
}
