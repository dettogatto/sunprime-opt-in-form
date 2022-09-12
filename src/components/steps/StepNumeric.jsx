/*
Requires 2 elements.
1: {placeholder}
2: {text}
*/

import React, { useEffect, useState, useRef } from 'react';
import Button from '../form-elements/Button';

export default function StepNumeric(props) {

  const [buttonActive, setButtonActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    props.setFormField(props.fieldName, inputValue);
  }, [inputValue, props]);

  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    if(props.currentStep > props.step){
      return {top: "-100%", opacity: 0};
    }
    return {top: "100%", opacity: 0};
  }

  function handleNumericChange(e){
    let val = e.target.value;
    val = val.replace(",", ".").replace(/[^0-9.]/gi, "");
    val = val.replace(/\./,"#").replace(/\./g,"").replace(/#/,"."); // leave just first dot
    setInputValue(val);
    setButtonActive(false);
  }

  function handleButtonClick(){
    setButtonActive(true);
    setTimeout(props.nextStep, 500);
  }

  function getButton(){
    let text = props.button.text_empty;
    if(inputValue !== ""){ text = props.button.text_valid; }
    return(<Button action={handleButtonClick} currentValue={props.value} text={text} active={buttonActive} />);
  }

  function prova(){
    inputRef.current.focus();
  }

  return (
    <div className="step-container" style={getStyle()}>
      <div className="progress-number">{("0" + (props.step + 1)).substr(-2)}</div>
      <div className="text">{props.text}</div>
      <div className="form">
        <div className="text-input-container" onClick={prova}>
          <input style={{width: "80px"}} ref={inputRef} value={inputValue} onChange={handleNumericChange} placeholder={props.input.placeholder} />
          <span style={{paddingLeft: "10px"}}>
            {props.input.label}
          </span>
        </div>
        {getButton()}
      </div>
    </div>
  )
}
