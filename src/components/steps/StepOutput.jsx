import React, { useEffect } from 'react';
import { trackGtm } from './../../Tracking';

export default function StepOutput(props) {

  useEffect(() => {
    if(props.currentStep === props.step){

      // tracciamento
      if(props.getFormField("proprietario") === "yes" && (props.getFormField("mapArea") > 2350 || window.tipoSuperficie !== "tetto")){
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

      if(!props.getFormField("mapArea") && props.alternativeURL){
        window.location.replace(props.alternativeURL);
      }

    }
  }, [props, props.currentStep, props.step]);


  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    return {top: "0%", opacity: 0, pointerEvents: "none"};
  }

  function printNumber(n, unit = "", color = 0){
    if(n){
      n = parseInt(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    if(color === 1){
      return <b className="orange"> {n}{unit}</b>
    } else if (color === 2){
      return <b className="green"> {n}{unit}</b>
    }
    return <b> {n}{unit}</b>
  }

  function handleReset(){
    window.localStorage.clear();
    window.location.reload();
  }

  function printSmallArea(){
    return(
      <div className="output-container small-area" style={getStyle()}>
        <div className="casona-container">
          <img alt="" src={require("../../imgs/output/casona.png")} />
          <div className="boxer">
            <h1>Ecco il tuo risultato</h1>
            <p className="only-desktop">
              La <b>superficie</b> che hai selezionato è pari a circa
              { printNumber(props.getFormField("mapArea"), <span>m<sup>2</sup></span>) }
            </p>
            <p className="only-desktop">
              Purtroppo la superfice indicata non raggiunge i requisiti minimi previsti per un nostro intervento.
              <br /><br />Terremo ugualmente il tuo contatto in caso si aprano opportunità future per la realizzazione di impianti di inferiore potenza.
                <br />In alternativa, ti invitiamo a riprovare, controllando di avere tracciato correttamente la superficie all’interno del configuratore.
                  <br /><br />Per il momento ti ringraziamo augurandoti buona giornata
                  </p>
                </div>
                <div className="house-spacer"></div>
              </div>
              <div className="mobile-incipit only-mobile">
                <div>
                  La <b>superficie</b> che hai selezionato è pari a circa
                  { printNumber(props.getFormField("mapArea"), <span>m<sup>2</sup></span>) }
                </div>
                <div>
                  Purtroppo la superfice indicata non raggiunge i requisiti minimi previsti per un nostro intervento.
                  <br /><br />Terremo ugualmente il tuo contatto in caso si aprano opportunità future per la realizzazione di impianti di inferiore potenza.
                    <br />In alternativa, ti invitiamo a riprovare, controllando di avere tracciato correttamente la superficie all’interno del configuratore.
                      <br /><br />Per il momento ti ringraziamo augurandoti buona giornata
                      </div>
                    </div>
                    <div className="retake-survey">
                      <div onClick={handleReset}>
                        Ripeti la configurazione
                      </div>
                    </div>
                  </div>
                )
              }

              function printRightArea(){

                return(
                  <div className="output-container" style={getStyle()}>
                    <div className="casona-container">
                      <img alt="" src={require("../../imgs/output/casona.png")} />
                      <div className="boxer">
                        <h1>Ecco il tuo risultato</h1>
                        <p className="only-desktop">
                          La <b>superficie</b> che hai selezionato è pari a circa
                          { printNumber(props.getFormField("mapArea"), <span>m<sup>2</sup></span>) }
                        </p>
                        <p className="only-desktop">
                          Possiamo installare gratuitamente sul tetto della tua azienda fino a
                          { printNumber(props.getFormField("kwPotenza"), "kWp") }
                        </p>
                      </div>
                      <div className="house-spacer"></div>
                    </div>
                    <div className="mobile-incipit only-mobile">
                      <div>
                        La <b>superficie</b> che hai selezionato è pari a circa
                        { printNumber(props.getFormField("mapArea"), <span>m<sup>2</sup></span>) }
                      </div>
                      <div>
                        Possiamo installare gratuitamente sul tetto della tua azienda fino a
                        { printNumber(props.getFormField("kwPotenza"), "kWp") }
                      </div>
                    </div>


                    <div className="specialista-container">
                      <div className="title">
                        <div className="boxer">
                          <span>
                            <h1>Un nostro specialista ti contatterà a breve per ulteriori dettagli.</h1>
                          </span>
                        </div>
                      </div>
                      <div className="image">
                      </div>
                      <div className="text">
                        <div className="boxer">
                          <span>
                            Tieni pronta la tua bolletta.
                            Potremo così predisporre
                            un&#39;
                            <b>offerta </b>
                            dettagliata e
                            <b> personalizzata sulle tue esigenze</b>
                            .
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="benefici-container">
                      <div className="boxer">
                        <center><h1>Senza sottrarre risorse alla tua attività, <br className="only-desktop" />con Sunprime avrai i seguenti benefici:</h1></center>

                        <div className="table">
                          <div className="risparmio">
                            <p className="number">01</p>
                            <p className="title">Risparmio</p>
                            <p className="text">
                              Con Sunprime pagherai <b>l'elettricità* 0,100€/kWh anziché</b> il
                              tipico prezzo in bolletta di <b>0,167€/kWh</b>,
                              con uno <b>sconto pari al 40%</b> ed
                              un risparmio annuo fino a { printNumber(props.getFormField("savedEuro"), "€", 2) }
                            </p>
                          </div>

                          {
                            props.getFormField("amianto") === "yes" ?
                            (
                              <div className="guadagno">
                                <p className="number">02</p>
                                <p className="title">Amianto</p>
                                <p className="text">
                                  Rimuoviamo e smaltiamo l’amianto e rifacciamo la
                                  copertura del tuo tetto a nostra integrale cura e spese
                                </p>
                              </div>
                            )
                            :
                            (
                              <div className="guadagno">
                                <p className="number">02</p>
                                <p className="title">Guadagni</p>
                                <p className="text">
                                  Un corrispettivo anticipato pari a {printNumber(props.getFormField("kwPotenza")*120, "€", 1)},
                                  oppure un canone annuo pari a {printNumber(props.getFormField("kwPotenza")*9, "€", 1)} per 30 anni
                                </p>
                              </div>
                            )
                          }


                        </div>

                        <p>
                          La presente simulazione è indicativa basata su dati preliminari, da
                          confermare in seguito ad una verifica di fattibilità tecnica ed analisi
                          della bolletta elettrica.
                        </p>
                        <p className="disclaimer">
                          *Prezzo relativo alla componente variabile dell’energia elettrica,
                          comprensivo della spesa per la materia energia, trasporto e gestione
                          del contatore, oneri di sistema.
                        </p>


                      </div>
                    </div>

                    <div className="pannelli-container">
                      <div className="pannelli-overlay">
                      </div>
                      <div className="boxer">
                        <h1>
                          Grazie per il tuo contributo ad un <span className="green">futuro sostenibile</span>!
                          <br/>
                          Installando questo impianto fotovoltaico eviterai nei
                          prossimi 30 anni:
                        </h1>

                        <div className="table">
                          <div>
                            <img alt="" src={require("../../imgs/output/ico-co2.png")} />
                            <p>
                              { printNumber(props.getFormField("savedKwh") * 30 * 0.675 / 1000) } Tonnellate di co2 emesse in atmosfera
                            </p>
                          </div>
                          <div>
                            <img alt="" src={require("../../imgs/output/ico-pet.png")} />
                            <p>
                              { printNumber(props.getFormField("savedKwh") / 4545.45 * 30) } Tonnellate equivalenti di petrolio bruciate
                            </p>
                          </div>
                          <div>
                            <img alt="" src={require("../../imgs/output/ico-nox.png")} />
                            <p>
                              { printNumber(props.getFormField("savedKwh") * 0.0015 * 30 / 1000) } Tonnellate di NOx emesse in atmosfera
                            </p>
                          </div>
                        </div>


                      </div>

                      <div className="retake-survey">
                        <div onClick={handleReset}>
                          Ripeti la configurazione
                        </div>
                      </div>

                    </div>



                  </div>
                )

              }


              function finalReturn(){
                if(props.getFormField("mapArea") || !props.alternativeURL){
                  if(props.getFormField("mapArea") >= 2350){
                    return printRightArea();
                  } else {
                    return printSmallArea();
                  }
                }
                return null;
              }

              return finalReturn();

            }
