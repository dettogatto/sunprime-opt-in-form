import React, { useState } from 'react';
import Button from '../form-elements/Button';

export default function StepChoice(props) {

  const [myValue, setMyValue] = useState(null);

  // useEffect(() => {
  //   if(myValue && myValue !== null){
  //     props.setFormField(props.fieldName, myValue);
  //   }
  // }, [myValue]);

  function setterWrapper(value){
    if(value === myValue){
      props.nextStep();
    } else {
      setMyValue(value);
      props.setFormField(props.fieldName, value);
      setTimeout(props.nextStep, 500);
    }
  }

  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    if(props.currentStep > props.step){
      return {top: "-100%", opacity: 0};
    }
    return {top: "100%", opacity: 0};
  }

  function getButtons(){
    var counter = -1;
    return props.elements.map((el) => {
      counter ++;
      return <Button setter={setterWrapper} active={myValue === el.value} {...el} key={counter} />;
    });
  }

  return (
    <div className="step-container" style={getStyle()}>
      <div className="progress-number">{("0" + (props.step + 1)).substr(-2)}</div>
      <div className="text">{props.text}</div>
      <div className="form">
        {getButtons()}
      </div>
    </div>
  )
}
