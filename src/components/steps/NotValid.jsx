import React, { useEffect } from 'react';
import { trackGtm } from './../../Tracking';
function NotValid(props) {

  useEffect(() => {
    if(props.currentStep === props.step){
      if(window.tipoSuperficie === "terreno-grande"){
        trackGtm("terreni_grandi_no_idonei");
      } else if(window.tipoSuperficie === "terreno-piccolo"){
        trackGtm("terreni_piccoli_no_idonei");
      }
    }
  }, [props.currentStep, props.step]);

  return (
    <div className="not-valid-container">
      <div>
        <p>Ci dispiace, il tuo terreno non è idoneo all'installazione di un impianto fotovoltaico.</p>
        <p><a href={window.homeURL} className="pop">Torna alla home</a></p>
      </div>
    </div>
  )
}
export default props => <NotValid {...props} />;
