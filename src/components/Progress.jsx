import React, { useState, useEffect, useRef, useCallback } from 'react';
function Progress(props) {

  const [casonaStyle, setCasonaStyle] = useState(null);
  const casonaTimer = useRef(null);

  const getProgressPercentage = useCallback(() => {
    let cs = props.currentStep < props.totSteps ? props.currentStep : props.totSteps;
    if(cs < 1 || props.totSteps === 0){ return 0; }
    return Math.ceil(cs * 100 / (props.totSteps - 1));
  })


  useEffect(()=>{
    let perc = getProgressPercentage();
    if(perc >= 100){
      casonaTimer.current = setTimeout(function(){setCasonaStyle({transform: "scale(2)"})}, 800);
    } else {
      clearTimeout(casonaTimer.current);
      casonaTimer.current = null;
      setCasonaStyle(null);
    }
    return () => {
      clearTimeout(casonaTimer.current);
    }
  }, [props.currentStep, props.totSteps, getProgressPercentage]);

  function getHeight(){
    return (100 - getProgressPercentage()) + "%";
  }

  function getSoleStyle(){
    if(window.tipoSuperficie === "tetto"){
      return getProgressPercentage() === 100 ? {transform: "scale(0.6)"} : null;
    } else {
      return getProgressPercentage() === 100 ? {transform: "scale(1.2)"} : null;
    }
  }

  function getCasaStyle(){
    if(window.tipoSuperficie === "tetto"){
      return null;
    } else {
      return getProgressPercentage() === 100 ? {transform: "scale(0.7)"} : null;
    }
  }

  function getCasaClass(){
    if(window.tipoSuperficie === "tetto"){
      return "casa"
    }
    return "casa pannello";
  }

  return (
    <div className="sole-casa-container">
      <div className="sole" style={getSoleStyle()}></div>
      <div className="dist" style={{height: getHeight()}}></div>
      <div className={getCasaClass()} style={getCasaStyle()}>
        <div className="bigger-casa" style={casonaStyle}>
        </div>
      </div>
    </div>
  )
}
export default props => <Progress {...props} />;
