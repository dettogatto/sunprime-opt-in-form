import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Geocode from "react-geocode";
import { trackFb, trackGtm } from './../../Tracking';

export default function StepLoading(props) {

  const [text, setText] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  var tracked = false;

  useEffect(() => {
    if(!error && !loaded){ setText(props.getFormField("name") + ", i tuoi dati stanno caricando!") }
    else if(loaded){ setText("I tuoi risultati sono pronti!") }
    else if(error){ setText("Purtroppo c'è stato un errore.") }
  }, [props, error, loaded]);


  useEffect(() => {

    if(props.currentStep === props.step && !tracked){ // This is the current step

      // Tracciamento
      if(window.fbq){
        if(window.tipoSuperficie === "tetto" && props.getFormField("kwPotenza") >= 350){
          trackFb('Lead Kwp >= 350', props.getFormField("email"), props.getFormField("phone"));
        } else if (window.tipoSuperficie.startsWith('terreno') && props.getFormField("kwPotenza") >= 1000) {
          trackFb('Lead terreni >= 1.000kwp', props.getFormField("email"), props.getFormField("phone"));
        }
      }

      if(window.dataLayer){
        if(window.tipoSuperficie === "tetto" && props.getFormField("kwPotenza") >= 350){
          trackGtm("Lead Kwp >= 350");
        } else if (props.getFormField("kwPotenza") >= 1000 && window.tipoSuperficie.startsWith('terreno')){
          let conf = "conf. " + window.tipoSuperficie.replace('-', ' ');
          conf = conf.toUpperCase();
          trackGtm(conf + " | Utente completa configuratore e Kwp ≧ 1.000");
        }
      }


      // Invio dati
      if(props.getFormField("mail") === "test@mirai.bay"){
        setText("Buon test!");
        prepareData(logData);
        setTimeout(goNextStep, 4000);
      } else {
        prepareData(sendAllData);
      }

    }

    tracked = true;

  }, [props.currentStep, props.step]);


  function prepareData(callback){
    var coordinate = props.getFormField("coordinate");
    var puntoMedio = getCoordinateMedie();
    var data = {
      proprietario: props.getFormField("proprietario") === "yes" ? "Sì" : "No", // mind the accent
      email: props.getFormField("mail"),
      name: props.getFormField("name"),
      phone: props.getFormField("phone"),
      amianto: props.getFormField("amianto") === "yes" ? "Si" : "No",
      consumo_mensile: parseInt(props.getFormField("Consumo_mensile_kWh__c")),
      punti_tetto: JSON.stringify(coordinate),
      punto_medio: puntoMedio.join(','),
      superficie: String(props.getFormField("mapArea")),
      kwp: props.getFormField("kwPotenza"),
      indirizzo: "Tbd",
      provincia: "Tbd",
      regione: "Tbd",
      priorita: "Tbd",
      richiesta: "Tetto",
      utms: {
        utm_source: props.getFormField("utmSource"), // utm source
        utm_adset: props.getFormField("utmAdset"), // utm adset
        utm_campaign: props.getFormField("utmCampaign"), // utm campaign
        utm_content: props.getFormField("utmContent"), // utm content
        utm_medium: props.getFormField("utmMedium"),
      }
    };

    if(window.tipoSuperficie === "tetto"){
      data.priorita = (props.getFormField("proprietario") === "yes" ? ">2500m2" : "Tbd");
    }

    if(window.tipoSuperficie.startsWith('terreno')){
      data.richiesta = window.tipoSuperficie.replace('-', ' ');
      data.richiesta = data.richiesta.charAt(0).toUpperCase() + data.richiesta.slice(1);
    }

    if(!data.consumo_mensile){
      data.consumo_mensile = 0;
    }

    if(puntoMedio && Array.isArray(puntoMedio)){
      //console.log("array indeed");
      let lat = data.punto_medio.latitude;
      let lng = data.punto_medio.longitude;

      Geocode.setApiKey("AIzaSyAwXWdsDmWAYYoKwgtYzXtQ1RAkDgo_cIE");
      Geocode.setLanguage("it");
      Geocode.setRegion("it");
      Geocode.setLocationType("ROOFTOP");

      Geocode.fromLatLng(puntoMedio[0], puntoMedio[1]).then(
        (response) => {
          data.indirizzo = "(CIRCA) " + response.results[0].formatted_address;

          for (let i = 0; i < response.results[0].address_components.length; i++) {
            for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
              switch (response.results[0].address_components[i].types[j]) {
                case "administrative_area_level_2":
                data.provincia = response.results[0].address_components[i].long_name.replace("Provincia di ", "");
                break;
                case "administrative_area_level_1":
                data.regione = response.results[0].address_components[i].long_name;
                break;
              }
            }
          }

          callback(data);

        },
        (error) => {
          console.log('GEOCODE FAILED :(');
          //setError(true);
          data.indirizzo = "Impossibile risolvere un indirizzo";
          data.provincia = "Impossibile risolvere una provincia";
          data.regione = "Tbd";
          callback(data);
        }
      );



    } else {
      // console.log("No traccia tetto");
      callback(data);
    }

  }


  function sendAllData(data){

    var tags = [];

    // if(window.tipoSuperficie === "terreno-grande"){
    //   tags.push(4);
    // } else if(window.tipoSuperficie === "terreno-piccolo"){
    //   tags.push(3);
    // } else {
    //   tags.push(8); // tetto
    // }

    // Ac
    let url1 = "./php/ac/";
    let data1 = {
      contact: {
        email: data.email,
        firstName: data.name,
        lastName: "",
        phone: data.phone
      },
      lists: [1],
      tags: tags,
      fields: {
        1: props.getFormField("savedEuro"), // Risparmio euro
        2: props.getFormField("savedKwh"), // risparmio kwh
        3: data.kwp, // kwp
        4: data.indirizzo, // indirizzo
        5: window.tipoSuperficie, // Tipologia richiesta
        8: data.utms.utm_source, // utm source
        10: data.utms.utm_campaign, // utm campaign
        9: data.utms.utm_medium, // utm medium
        6: data.punti_tetto, // Tracciato tetto
        12: data.superficie,
        11: data.regione,
      }
    }

    // Salesforce
    let url2 = "./php/sf/";
    let data2 = {
      contact: {
        Email: data.email,
        LastName: data.name,
        Phone: data.phone,
        Amianto__c: data.amianto,
        Consumo_mensile_kWh__c: data.consumo_mensile,
        Punti_Tetto__c: data.punti_tetto,
        LeadSource: "Landing page",
        kWp__c: data.kwp,
        Indirizzo__c: data.indirizzo,
        Company: "Tbd",
        Tipo__c: "Tbd",
        Richiesta__c: data.richiesta,
        Provincia__c: data.provincia,
        Priorita__c: data.priorita,
        Regione__c: data.regione,
        Ipoteca__c: "Tbd",
        Comune__c: "Tbd",
        Punto_Medio__c: data.punto_medio,
        pi__utm_campaign__c: data.utms.utm_campaign,
        pi__utm_content__c: data.utms.utm_content,
        pi__utm_medium__c: data.utms.utm_medium,
        pi__utm_source__c: data.utms.utm_source
      }
    }

    axios.post(url2, data2)
      .then((res) => {

        // console.log("res.data");
        // console.log(res.data);
        // console.log("res.data.id");
        // console.log(res.data.id);
        // console.log("res.data['id']");
        // console.log(res.data["id"]);

        // data1["fields"][17] = res.data.id;
        // data1["fields"][18] = res.data.error;
        // if(!res.data.double_check){
        //   data1["fields"][19] = 'No';
        //   data1["tags"].push(15);
        // }

        axios.post(url1, data1)
          .then(() => {
            goNextStep();
          })
          .catch(() => {
            setError(true);
          });

      })
      .catch((err) => {
        setError(true);
      });

  }

  function logData(data){
    console.log(data);
  }

  function goNextStep(){
    setLoaded(true);
    setTimeout(props.nextStep, 1000);
  }


  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    return {top: "0%", opacity: 0, pointerEvents: "none"};
  }

  function getSpinnerClass(){
    if(window.tipoSuperficie === "tetto"){
      return "spinner " + (!error ? "spinning " : "still ");
    } else {
      return "spinner pannello " + (!error ? "spinning " : "still ");
    }
  }

  function getCoordinateMedie(){
    let coordinate = props.getFormField("coordinate");
    let lat = 0;
    let lng = 0;
    let count = 0;
    for(var i=0; i < coordinate.length; i++){
      for(var j=0; j < coordinate[i].length; j++){
        lat += coordinate[i][j].lat;
        lng += coordinate[i][j].lng;
        count ++;
      }
    }
    if(count === 0){ return [0,0]; }
    return [lat/count, lng/count];
  }

  return (
    <div className="loading-container" style={getStyle()}>
      <div className="text">{text}</div>
      <div className={getSpinnerClass()}></div>
    </div>
  )

}
