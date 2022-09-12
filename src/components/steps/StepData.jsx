import React, { useEffect, useState } from 'react';
import { trackGtm } from './../../Tracking';

export default function StepData(props) {

  const [originalSubText, setOriginalSubText] = useState("");
  const [uName, setUName] = useState("");
  const [uMail, setUMail] = useState("");
  const [uPhone, setUPhone] = useState("");
  const [uAccetta, setUAccetta] = useState(false);
  const [subText, setSubText] = useState("");

  useEffect(() => {
    if(props.currentStep === props.step){

      if(window && window.dataLayer){
        // tracciamento
        if(props.getFormField("proprietario") === "yes"){
          if(props.getFormField("mapArea")){
            trackGtm(props.gaEventSiPSiT);
          } else {
            trackGtm(props.gaEventSiPNoT);
          }
        } else {
          if(props.getFormField("mapArea")){
            trackGtm(props.gaEventNoPSiT);
          } else {
            trackGtm(props.gaEventNoPNoT);
          }
        }
        // fine tracciamento
      }

    }
  }, [props.currentStep, props.step]);

  useEffect(() => {
    setOriginalSubText(props.getFormField("proprietario") === "yes" ? "Ricevi la tua valutazione gratis" : "Invia i dati");
    setSubText(originalSubText);
  }, [originalSubText]);
  useEffect(() => {
    props.setFormField("name", uName);
  }, [uName])
  useEffect(() => {
    props.setFormField("mail", uMail);
  }, [uMail])
  useEffect(() => {
    props.setFormField("phone", uPhone);
  }, [uPhone])

  function handleSubmitClick(){
    if(isNameValid() && isPhoneValid() && isMailValid() && uAccetta){
      props.nextStep();
    } else {
      setSubText("Mancano dei campi!");
    }
  }
  function handleNameChange(e){
    setUName(e.target.value);
    setSubText(originalSubText);
  }
  function handleMailChange(e){
    setUMail(e.target.value);
    setSubText(originalSubText);
  }
  function handlePhoneChange(e){
    let val = e.target.value;
    val = val.replace(/[^0-9+-\s]/gi, "");
    val = val.replace(/[\s]+/g, " ");
    setUPhone(val);
    setSubText(originalSubText);
  }
  function handleAccettaClick(){
    setUAccetta(!uAccetta);
    setSubText(originalSubText);
  }
  function handleGoBack(e){
    e.preventDefault();
    props.prevStep();
  }
  function isNameValid(){
    return uName.length >= 2
  }
  function isMailValid(){
    return uMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
  }
  function isPhoneValid(){
    let val = uPhone.replace(/[\s]/gi, "");
    return val.match(/^[+]?[0-9]{7,12}$/im);
  }

  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    return {top: "0%", opacity: 0, pointerEvents: "none"};
  }


  return (
    <div className="personal-data-container" style={getStyle()}>
      <div className="sub-container">
        <div className="title">{ props.getFormField("proprietario") === "yes" ? props.title : props.titleNoPropietario}</div>
        <div className="subtitle">{props.subtitle}</div>
        <div className="field">
          <label>Nome e Cognome</label>
          <div className={"text-input-container " + (isNameValid() ? "valid" : "invalid")}>
            <input type="text" value={uName} onChange={handleNameChange} placeholder="Es. Marco Verdi" />
          </div>
        </div>
        <div className="field">
          <label>Lasciaci la tua email</label>
          <div className={"text-input-container " + (isMailValid() ? "valid" : "invalid")}>
            <input value={uMail} onChange={handleMailChange} placeholder="Es. marco@mail.it" />
          </div>
        </div>
        <div className="field">
          <label>Numero di telefono</label>
          <div className={"text-input-container " + (isPhoneValid() ? "valid" : "invalid")}>
            <input value={uPhone} onChange={handlePhoneChange} placeholder="Es. 3331234567" />
          </div>
        </div>
        <div className="field accettazione">
          <div>
            <div onClick={handleAccettaClick} className={"casella-accettazione " + (uAccetta ? "valid" : "invalid")}></div>
          </div>
          <div className="text-accettazione">Accetto la Privacy Policy</div>
        </div>
        <div className="submit" onClick={handleSubmitClick}>{subText}</div>
        <div className="go-back">
          <a href="#" onClick={handleGoBack}>Torna indietro</a>
        </div>
      </div>
    </div>
  )

}
