import React, { useState, useEffect } from 'react';
import Progress from './Progress';
import StepChoice from './steps/StepChoice';
import StepChoiceAndPics from './steps/StepChoiceAndPics';
import StepGmaps from './steps/StepGmaps';
import StepNumeric from './steps/StepNumeric';
import StepData from './steps/StepData';
import StepLoading from './steps/StepLoading';
import StepOutput from './steps/StepOutput';
import StepOutputSimple from './steps/StepOutputSimple';

function ContainerA(props) {

  const [totStepsForProgress, setTotStepsForProgress] = useState(0);

  useEffect(() => {
    setTotStepsForProgress(props.stepsElements.reduce((n,x) => n + (!x.noProgress), 0))
  }, [props.stepsElements]);

  function buildSteps(){
    var counter = -1;
    let result = props.stepsElements.map((el) => {
      el = { ...el, setFormField: props.setFormField, nextStep: props.nextStep }
      counter += 1;
      if(el.type === "choice"){
        return( <StepChoice {...el} step={counter} currentStep={props.currentStep} key={counter} /> )
      }
      if(el.type === "choiceAndPics"){
        return( <StepChoiceAndPics {...el} showPics={props.showPics} step={counter} nextStep={props.nextStep} currentStep={props.currentStep} key={counter} /> )
      }
      if(el.type === "gmaps"){
        return( <StepGmaps {...el} mapShower={props.setShowingMap} getFormField={props.getFormField} step={counter} currentStep={props.currentStep} key={counter} /> )
      }
      if(el.type === "numeric"){
        return( <StepNumeric {...el} step={counter} currentStep={props.currentStep} key={counter} /> )
      }
      return null;
    })
    return result;
  }

  function buildBigSteps(){
    var counter = -1;
    return(
      props.stepsElements.map((el) => {
        el = { ...el, setFormField: props.setFormField, getFormField: props.getFormField, nextStep: props.nextStep }
        counter += 1;
        if(el.type === "data"){
          return( <StepData {...el} step={counter} prevStep={props.prevStep} currentStep={props.currentStep} key={counter} /> )
        }
        if(el.type === "loading"){
          return( <StepLoading {...el} step={counter} currentStep={props.currentStep} key={counter} /> )
        }
        if(el.type === "outputSimple"){
          return( <StepOutputSimple {...el} step={counter} currentStep={props.currentStep} key={counter} /> )
        }
        if(el.type === "output"){
          return( <StepOutput {...el} step={counter} currentStep={props.currentStep} key={counter} /> )
        }
        return null;
      })
    );
  }

  return (
    <div className="main-container">
      { buildBigSteps() }
      {
        props.stepsElements[props.currentStep] && !props.stepsElements[props.currentStep].noProgress &&
        <Progress currentStep={props.currentStep} totSteps={totStepsForProgress} />
      }
      {
        props.stepsElements[props.currentStep] && !props.stepsElements[props.currentStep].noProgress &&
        <div className="all-steps-container">{ buildSteps() }</div>
      }

      { /* Debug Code */
        false && (
          <div style={{position: "absolute", bottom: 0, backgroundColor: "#eee", padding: "20px", zIndex: 999}}>
            <button onClick={props.prevStep}>-</button>{props.currentStep}<button onClick={props.nextStep}>+</button>
          </div>
        )
      // {props.currentStep}<button onClick={props.nextStep}>+</button>
      /* End of Debug Code */ }
    </div>
  )
}
export default props => <ContainerA {...props} />;
