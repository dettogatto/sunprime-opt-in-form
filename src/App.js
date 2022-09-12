import React, { useState, useEffect } from 'react';
import './App.scss';
import MapContainer from './components/MapContainer';
import ContainerA from './components/ContainerA';
import NotValid from './components/steps/NotValid';
import applicaFormule from './Formule';
import { trackFb, trackGtm } from './Tracking';
import TagManager from 'react-gtm-module';
import {getInit0 as getInit} from './InitArrays'; // Edit to change version
TagManager.initialize({ gtmId: 'GTM-YOURID' });

const lsData = localStorage.getItem("gattoForm") ? JSON.parse(localStorage.getItem("gattoForm")) : null;

function App() {

  const useLocalStorage = false;

  const [stepsElements, setStepsElements] = useState([]);
  const [currentStep, setCurrentStep] = useState(lsData && useLocalStorage ? lsData["currentStep"] : 0);
  const [totSteps, setTotSteps] = useState(0);
  const [showingMap, setShowingMap] = useState(lsData && useLocalStorage ? lsData["showingMap"] : false);

  // form values
  const [formData, setFormData] = useState(lsData && useLocalStorage ? lsData["formData"] : {});

  // Save to localStorage
  useEffect(() => {
    window.localStorage.setItem("gattoForm", JSON.stringify({
      formData: formData,
      currentStep: currentStep,
      showingMap: showingMap
    }));
  }, [formData, currentStep, showingMap]);

  useEffect(() => {
    let initArray = getInit(setFormFields);
    setTotSteps(initArray.length);
    setStepsElements(initArray);
    // Dep array needs all form values
  }, []);

  // Tracciamenti
  useEffect(() => {
    // Hotjar
    if(typeof window !== "undefined" && window.hj != null && stepsElements[currentStep].type === "gmaps"){
      window.hj('tagRecording', ['mappa']);
    }
    // Facebook
    if(stepsElements[currentStep] && stepsElements[currentStep].fbEvent){
      sendToFbq();
    }
    // Google Analytics
    if(stepsElements[currentStep] && stepsElements[currentStep].gaEvent && window.dataLayer){
      if((window.tipoSuperficie !== "terreno-piccolo" && window.tipoSuperficie !== "terreno-grande") || formData["proprietario"] !== "no"){
        trackGtm(stepsElements[currentStep].gaEvent);
      }
    }
  }, [currentStep, stepsElements]);

  function sendToFbq(){
    if(window.fbq){
      // Caso speciale, ultimo step, no proprietario
      if(window.tipoSuperficie !== "tetto" && formData["proprietario"] === "no"){
        trackFb('Output negativo');
      } else if(window.tipoSuperficie === "tetto" && stepsElements[currentStep].fbEvent === "Step fine" && getFormField("proprietario") === "no"){
        trackFb('Fine minore di 1500');
      } else {
        trackFb(stepsElements[currentStep].fbEvent);
      }
    } else {
      setTimeout(sendToFbq, 100);
    }
  }


  function setFormField(name, value){
    if(name === "proprietario" && typeof window !== "undefined" && window.fbq){
      if(value === "yes"){
        trackFb('Si maggiore 1500');
      } else {
        trackFb('No maggiore 1500');
      }
    }
    let tmp = {...formData};
    tmp[name] = value;

    setFormData(tmp);
  }

  function setFormFields(map){
    setFormData({...formData, ...map});
  }

  function getFormField(name){
    let data = formData[name];
    return data && data !== "NaN" ? data : "";
  }

  function nextStep(){
    if(currentStep < totSteps - 1){
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep(){
    if(currentStep > 0){
      setCurrentStep(currentStep - 1);
    }
  }

  function getMapOpacity(){
    return (stepsElements[currentStep] && stepsElements[currentStep].type === "gmaps") ? 1 : 0;
  }

  function getAppBgOpacity(){
    if(stepsElements[currentStep] && stepsElements[currentStep].type === "gmaps"){
      return 0.9;
    }
    if(currentStep >= totSteps - 1){
      return 0;
    }
    return 1;
  }

  function getAppDisabling(){
    if(showingMap){
      return {opacity: 0, pointerEvents: "none"};
    }
    return {opacity: 1};
  }
  function getNuvolonaStyle(){
    let fromtop = currentStep * -350;
    let style = {opacity: ((showingMap || currentStep >= totSteps - 1) ? 0 : 0.6), backgroundPosition: "center " + fromtop + "px"}
    return style;
  }

  function setMapData(area, address){
    setFormFields({mapArea: area, indirizzo: address, ...applicaFormule(area)});
    setShowingMap(false);
    if(area && area > 0 && area <= window.maxSuperficie){
      setTimeout(nextStep, 1000);
    }
  }

  function getAppContent(){
    let notProprietario = formData["proprietario"] === "no" || (
      formData["proprietario_1"] === "no" && formData["proprietario_2"] === "no"
    );
    if(window.tipoSuperficie.startsWith('terreno') && notProprietario){
      return <NotValid />
    }
    return <ContainerA setShowingMap={setShowingMap} getFormField={getFormField} setFormField={setFormField} stepsElements={stepsElements} nextStep={nextStep} prevStep={prevStep} currentStep={currentStep} />
  }



  return (
    <div>
      <div className="nuvolona" style={getNuvolonaStyle()}></div>
      <div className="app-container" style={getAppDisabling()} >
        <div className="app-background" style={{opacity: getAppBgOpacity()}}></div>
        {getAppContent()}
        {
          currentStep > 0 && currentStep < (stepsElements.length - 3) &&
          (<div className="up-arrow-button" onClick={prevStep}></div>)
        }
        {
          currentStep < (stepsElements.length - 1) &&
          (
            <div className="footer">
              *Al termine della configurazione, i terreni che non rispettano i requisiti necessari per un nostro intervento non saranno presi in considerazione.
            </div>
          )
        }
      </div>
      <MapContainer style={{opacity: getMapOpacity()}} setFormField={setFormField} getFormField={getFormField} active={showingMap} setter={setMapData} closer={() => setShowingMap(false)} />
    </div>
  )


}
export default App;
