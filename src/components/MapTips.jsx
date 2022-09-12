import React, { useState, useEffect } from 'react';
import { trackFb, trackGtm } from './../Tracking';
function MapTips(props) {

  const tipsTouch = [
    <span>Tocca un angolo del tetto (comparirà il primo punto)</span>,
      <span>Tocca gli angoli del tetto, in senso orario, per completare.<br /><i>Trascina i punti per adattare la forma, se necessario.</i></span>,
        <span>
          Tocca <b>Fatto</b> per terminare<br />
        Tocca <b>Cancella</b> per cancellare un tetto<br />
      Tocca <b>Aggiungi</b> per aggiungere un altro tetto e ripetere il procedimento
    </span>
  ]

  const tipsMouse = [
    <span>Clicca un angolo del tetto (comparirà il primo punto)</span>,
      <span>Clicca gli angoli del tetto, in senso orario, per completare.<br /><i>Trascina i punti per adattare la forma, se necessario.</i></span>,
        <span>
          Clicca <b>Fatto!</b> per terminare<br />
        Clicca <b>Cancella</b> per cancellare un tetto<br />
      Clicca <b>Aggiungi</b> per aggiungere un altro tetto e ripetere il procedimento
    </span>
  ]

  const [step, setStep] = useState(props.step);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    changeStep(props.step);
  }, [props.step])

  function changeStep(x){
    // Tracking
    if(x === 1){
      trackGtm("Step Mappa 1 | Utente cerca localita");
    } else if (x === 2) {
      trackGtm("Step Mappa 2 | Utente clicca primo vertice");
    } else if (x === 3) {
      trackGtm("Step Mappa 3 | Utente clicca secondo vertice");
    } else if (x === 4) {
      trackGtm("Step Mappa 4 | Utente clicca terzo vertice");
    }
    // End Tracking

    if(x >= 3){
      setShowArrows(true);
    }
    setStep(Math.min(Math.max(x, 0), 3));
  }

  return (
    <div className="map-tips" style={{opacity: (step > 0 ? 1 : 0)}}>
      <div className="progress-number">0{step}</div>
      <div className="tip-text">
        { matchMedia('(pointer:coarse)').matches ? tipsTouch[step-1] : tipsMouse[step-1] }
      </div>
      { showArrows &&
        <div className="tip-navigator">
          {step}/3
          <div className="arrows">
            <div className="left-arrow" onClick={() => (changeStep(step-1))}></div>
            <div className="right-arrow" onClick={() => (changeStep(step+1))}></div>
          </div>
        </div>
      }
    </div>
  )
}
export default props => <MapTips {...props} />;
