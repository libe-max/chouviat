import React, { Component } from 'react'
import moment from 'moment'
import Quote from 'libe-components/lib/text-levels/Quote'
import Paragraph from 'libe-components/lib/text-levels/Paragraph'
import AnnotationTitle from 'libe-components/lib/text-levels/AnnotationTitle'

class Timeline extends Component {
  constructor () {
    super()
  }

  render () {
    return <div className='timeline'>
      <div className='timeline__bars'>{
        new Array(1561).fill(null).map((e, i) => {
          const isMinute = i % 60 === 0
          const isFiveSec = !isMinute && i % 5 === 0
          const className = isMinute
            ? 'timeline__bar timeline__minute-bar'
            : isFiveSec
            ? 'timeline__bar timeline__five-second-bar'
            : 'timeline__bar timeline__second-bar'
          const displayTime = isMinute
            ? moment('2020/01/03 09:54', 'YYYY/MM/DD HH:mm').add((i / 60), 'minutes').format('HH[h]mm')
            : isFiveSec
            ? i % 60
            : ''
          return <div className={className} key={i}>
            <div className='timeline__bar-text-top'>{displayTime}</div>
            <div className='timeline__bar-line'> </div>
            <div className='timeline__bar-line-opacity'> </div>
            <div className='timeline__bar-text-bottom'>{displayTime}</div>
          </div>
        })
      }</div>
      <div className='timeline__events'>

        {/* TOP */}
        <div className='timeline__top-events'>
          <div className='timeline__event' style={{ left: '2.56%', top: '10%' }}>
            <Paragraph small>9h54:50 - Stationnements du véhicule de police et du scooter</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '54.81%', top: '0%' }}>
            <Paragraph small>10h08:15 - Début de l'interpellation</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          {/*
          <div className='timeline__event' style={{ left: '57.37%', top: '30%' }}>
            <Paragraph small>10h08:55 - Demande de renforts sur les ondes radio</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>
          */}

          <div className='timeline__event' style={{ left: '62.18%', top: '25%' }}>
            <Paragraph small>10h10:10 - Prise de conscience du malaise</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '72.24%', top: '10%' }}>
            <Paragraph small>10h12:47 - Arrivée de renforts policiers</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '81.35%', top: '10%' }}>
            <Paragraph small>10h15:09 - Arrivée du policier de la BAC Nicolas P., également collègue et compagnon de Laura J.</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className='timeline__bottom-events'>
          <div className='timeline__event' style={{ left: '11.28%', bottom: '10%' }}>
            <Paragraph small>9h56:56 - Cédric Chouviat lance son enregistrement vidéo</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '55.45%', bottom: '10%' }}>
            <Paragraph small>10h08:25 - Cédric Chouviat est plaqué au sol</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '59.87%', bottom: '30%' }}>
            <Paragraph small>10h09:34 - Dernier mouvement de jambe perçu</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '69.74%', bottom: '10%' }}>
            <Paragraph small>10h12:08 - Retrait de la première menotte</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '73.46%', bottom: '40%' }}>
            <Paragraph small>10h13:06 - Début du massage cardiaque</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '83.91%', bottom: '10%' }}>
            <Paragraph small>10h15:49 - Michaël P. mime un maintien de tête à Nicolas P. selon l'IGPN</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>

          <div className='timeline__event' style={{ left: '97.31%', bottom: '00%' }}>
            <Paragraph small>10h19:18 - Début du massage cardiaque par les pompiers</Paragraph>
            <div className='timeline__event-bubble'> </div>
          </div>
        </div>
      </div>

      <div className='timeline__quotes'>
        <div className='timeline__quote' style={{ left: '11.28%', maxWidth: '20rem', top: '8%' }}>
          <Quote small literary>Cédric Chouviat : «Je suis très correct. Voilà. Comme ça, vous kiffez mettre des amendes aux gens ? C’est votre travail ?»</Quote>
        </div>

        <div className='timeline__quote' style={{ left: '24.74%', maxWidth: '20rem' }}>
          <Quote small literary>Cédric Chouviat : «Vous êtes des vrais clowns»</Quote>
        </div>

        <div className='timeline__quote' style={{ left: '33.33%', maxWidth: '30rem', top: '7%' }}>
          <Quote small literary>
            Michaël P. : « Allez essuyer votre plaque»<br/>
            Cédric Chouviat : «Ouais ouais ouais. Par contre s'il vous plaît peut-être non ?»<br/>
            Michaël P. : «Et alors, vous voulez que je me mette à quatre pattes ? Je vais vous sucer la bite aussi ?.. »<br/>
          </Quote>
        </div>

        <div className='timeline__quote' style={{ left: '43.59%', maxWidth: '20rem' }}>
          <Quote small literary>
            Cédric Chouviat : «Vous croyez vraiment que j’ai peur de vous mais un mec comme... […], qui me casse la tête je lui arrache la tête dans la rue. Mais vous avez l'uniforme, c'est pas possible.»<br/>
            Michaël P. : «C’est des menaces ?»<br/>
            Cédric Chouviat : «Non»</Quote>
        </div>

        {/*
        <div className='timeline__quote' style={{ left: '54.36%', maxWidth: '20rem' }}>
          <Quote literary>
            Cédric Chouviat : «Espèce de guignol !»<br/>
            Michaël P. : «Ah bon ? Vous êtes des guignols ? Allez venez ! Allez venez»</Quote>
        </div>

        <div className='timeline__quote' style={{ left: '54.81%', maxWidth: '20rem' }}>
          <Quote literary>Michaël P. : «On ramène, on ramène ! Allez !»</Quote>
        </div>
        */}

        <div className='timeline__quote' style={{ left: '55.77%', maxWidth: '20rem', top: '20%' }}>
          <Quote small literary>Cédric Chouviat : «Je m’arrête… je m’arrête. Lâche mon casque… J’étouffe… J’étouffe… J’étouffe, j’étouffe !.. J’étouffe !… J’étouffe… Tu verras… Tu v…»</Quote>
        </div>

        <div className='timeline__quote' style={{ left: '92.31%', maxWidth: '20rem' }}>
          <Quote small literary>Nicolas P. passe un faux compte-rendu sur les ondes radio de la préfecture de police de Paris : «Il s’agissait juste de maintenir l’individu avec une clé de bras pour lui passer les menottes, il y a pas eu d’étranglement ni de coups portés»</Quote>
        </div>

      </div>
      <div className='timeline__videos'>
        <AnnotationTitle big>Les vidéos</AnnotationTitle>

        <div className='timeline__video-line'>
          <div className='timeline__video-line-label'>Caméra de vidéosurveillance</div>
          <div className='timeline__video-item' style={{ left: '2.692307692%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '8.846153846%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '15%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '21.08974359%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '28.58974359%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '33.46153846%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '39.61538462%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '45.76923077%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '58.07692308%', width: '1.9871795%' }}> </div>
          <div className='timeline__video-item' style={{ left: '60.83333333%', width: '39.166666%' }}> </div>
        </div>

        <div className='timeline__video-line'>
          <div className='timeline__video-line-label'>Laura J. (policière)</div>
          <div className='timeline__video-item' style={{ left: '11.85897436%', width: '5.641025641%' }}> </div>
          <div className='timeline__video-item' style={{ left: '19.55128205%', width: '23.52564103%' }}> </div>
          <div className='timeline__video-item' style={{ left: '43.58974359%', width: '9.935897436%' }}> </div>
        </div>

        <div className='timeline__video-line'>
          <div className='timeline__video-line-label'>Haly D. (témoin)</div>
          <div className='timeline__video-item' style={{ left: '50.32051282%', width: '3.333333333%' }}> </div>
          <div className='timeline__video-item' style={{ left: '57.94871795%', width: '0.1923076923%' }}> </div>
        </div>

        <div className='timeline__video-line'>
          <div className='timeline__video-line-label'>Bakary D. (témoin)</div>
          <div className='timeline__video-item' style={{ left: '56.85897436%', width: '2.564102564%' }}> </div>
        </div>

        <div className='timeline__video-line'>
          <div className='timeline__video-line-label'>Cédric Chouviat</div>
          <div className='timeline__video-item' style={{ left: '11.28205128%', width: '14.55128205%' }}> </div>
          <div className='timeline__video-item' style={{ left: '26.92307692%', width: '6.41025641%' }}> </div>
          <div className='timeline__video-item' style={{ left: '33.58974359%', width: '0.5769230769%' }}> </div>
          <div className='timeline__video-item' style={{ left: '34.35897436%', width: '3.461538462%' }}> </div>
          <div className='timeline__video-item' style={{ left: '38.26923077%', width: '6.217948718%' }}> </div>
          <div className='timeline__video-item' style={{ left: '45.57692308%', width: '4.358974359%' }}> </div>
          <div className='timeline__video-item' style={{ left: '50.44871795%', width: '3.525641026%' }}> </div>
          <div className='timeline__video-item' style={{ left: '54.35897436%', width: '2.435897436%' }}> </div>
        </div>
      </div>
    </div>
  }
}

export default Timeline
  