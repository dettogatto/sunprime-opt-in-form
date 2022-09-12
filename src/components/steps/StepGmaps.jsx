import React, {useState} from 'react';
import Button from '../form-elements/Button';
import WarningPopup from '../WarningPopup';

export default function StepGmaps(props) {

  const [ignoreWarning, setIgnoreWarning] = useState(false);

  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    if(props.currentStep > props.step){
      return {top: "-100%", opacity: 0};
    }
    return {top: "100%", opacity: 0};
  }

  function isFilled(){
    return(props.getFormField("mapArea") && props.getFormField("mapArea") > 0);
  }

  function isHuge(){
    return(props.getFormField("mapArea") && props.getFormField("mapArea") > window.maxSuperficie);
  }

  function getText(){
    var sup = window.tipoSuperficie;
    if(sup.includes('terreno')){ sup = 'terreno'; }
    if(isHuge()){
      return <p>
        La superficie individuata è superiore alla media!
        <br />
        Controlla le dimensioni del tuo {sup}.
        <br />
        <span className="code">{props.getFormField("mapArea")} m²</span>
      </p>;
    }
    if(isFilled()){
      return <p>La superficie individuata è di<br /><span className="code">{props.getFormField("mapArea")} m²</span></p>
    }
    return props.text;
  }

  function getForm(){
    if(isHuge()){
      return (
        <div className="form">
          <Button setter={props.mapShower} active={true} value={true} {...props.elementRepeat} />
          <Button setter={props.nextStep} active={false} value={true} text="Continua" />
        </div>
      )
    }
    if(isFilled()){
      return (
        <div className="form">
          <Button setter={props.mapShower} active={false} value={true} {...props.elementRepeat} />
          <Button setter={props.nextStep} active={true} value={true} text="Continua" />
        </div>
      )
    }
    return (
      <div className="form">
        <Button setter={props.mapShower} active={!isFilled()} value={true} {...props.element} />
        { props.elementSkip && <Button action={props.nextStep} active={false} {...props.elementSkip} /> }
      </div>
    )
  }

  function closeWarning(){
    setIgnoreWarning(true);
    props.nextStep();
  }

  function repeatArea(){
    props.setFormField('coordinate', null);
    props.mapShower(true);
  }

  function getWarningPopup(){
    if( !ignoreWarning && isHuge() ){
      return <WarningPopup repeat={repeatArea} close={closeWarning} area={props.getFormField("mapArea")} />;
    }
    return null;
  }

  return (
    <div className="step-container" style={getStyle()}>
      { getWarningPopup() }
      <div className="progress-number">{("0" + (props.step + 1)).substr(-2)}</div>
      <div className="text">{getText()}</div>
      {getForm()}
    </div>
  )
}

// <div className="form">
//   { isFilled() && <Button action={props.nextStep} active={false} text={'La tua superficie: '+props.getFormField("mapArea") + " m²"} /> }
//   <Button setter={props.mapShower} active={!isFilled()} value={true} {...props.element} />
//   { !isFilled() && props.elementSkip && <Button action={props.nextStep} active={false} {...props.elementSkip} /> }
// </div>
