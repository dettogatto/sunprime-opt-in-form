import React from 'react';

export function getInit0(setFormFields){

  window.tipoSuperficie = "tetto";
  window.maxSuperficie = 20000;
  window.homeURL = "https://sunprime.it";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Variante 0 config. tetto",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Hai un tetto di almeno 2.500m<sup>2</sup> ad uso non residenziale?</p>,
        type: "choice",
        fieldName: "proprietario",
        gaEvent: "visto_step_dimensione_minima_tetto_0",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_dimensione_maggiore_richiesta_tetto_0",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_dimensione_inferiore_richiesta_tetto_0",
          }
        ]
      },

      {
        text: <p>Individua il tuo tetto su Gmaps e tracciane l'area</p>,
        //text: <span><p>Individua il tuo tetto su Gmaps e tracciane l'area</p><p className="small">Attenzione, il mancato tracciamento del tetto non ci permette di calcolare il possibile risparmio in bolletta</p></span>,
        type: "gmaps",
        fbEvent: "Step mappa",
        gaEvent: "visto_step_tracciamento_tetto_0",
        element: {
          text: "Vai alla mappa!",
          // gaEvent: "tetto_tracciato_0",
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
        // elementSkip: {
        //   text: "Salta step",
        //   gaEvent: "tetto_non_tracciato_0",
        // }
      },

      {
        text: <p>Il tetto è in amianto o ne contiene in parte?</p>,
        type: "choice",
        fieldName: "amianto",
        fbEvent: "Step 4",
        gaEvent: "visto_step_presenza_amianto_tetto_0",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_presenza_amianto_0",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_presenza_amianto_0",
          }
        ]
      },

      {
        title: <span>Scopri quanto risparmierai inserendo i tuoi contatti</span>,
        titleNoPropietario: <span>Scopri quanto risparmierai inserendo i tuoi contatti</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati",
        gaEventSiPSiT: "visto_step_richiesta_dati_0_risparmio", // si proprietario & si tracciato
        gaEventSiPNoT: "visto_step_richiesta_dati_0_risparmio", // si proprietario & no tracciato
        gaEventNoPSiT: "visto_step_richiesta_dati_0_risparmio", // no proprietario & si tracciato
        gaEventNoPNoT: "visto_step_richiesta_dati_0_risparmio", // no proprietario & no tracciato
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "output",
        noProgress: true,
        fbEvent: "Step fine",
        gaEventSiPSiT: "configuratore_tetto_0_completato_superiore", // si proprietario & si tracciato
        gaEventSiPNoT: "configuratore_tetto_0_completato_superiore", // si proprietario & no tracciato
        gaEventNoPSiT: "configuratore_tetto_0_completato_inferiore", // no proprietario & si tracciato
        gaEventNoPNoT: "configuratore_tetto_0_completato_inferiore", // no proprietario & no tracciato
        alternativeURL: 'https://sunprime.it/grazie-notrack/'
      },

    ] // array end
  );
}


export function getInit1(setFormFields){

  window.tipoSuperficie = "tetto";
  window.maxSuperficie = 20000;
  window.homeURL = "https://sunprime.it";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Variante 1 config. tetto (quella con bottone per saltare tracciamento tetto)",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Hai un tetto di almeno 2.500m<sup>2</sup> ad uso non residenziale?</p>,
        type: "choice",
        fieldName: "proprietario",
        gaEvent: "visto_step_dimensione_minima_tetto_1",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_dimensione_maggiore_richiesta_tetto_1",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_dimensione_inferiore_richiesta_tetto_1",
          }
        ]
      },

      {
        text: <span><p>Individua il tuo tetto su Gmaps e tracciane l'area</p><p className="small">Attenzione, il mancato tracciamento del tetto non ci permette di calcolare il possibile risparmio in bolletta</p></span>,
        type: "gmaps",
        fbEvent: "Step mappa",
        gaEvent: "visto_step_tracciamento_tetto_1",
        element: {
          text: "Vai alla mappa!",
          gaEvent: "tetto_tracciato_1",
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
        elementSkip: {
          text: "Salta step",
          gaEvent: "tetto_non_tracciato_1",
        }
      },

      {
        text: <p>Il tetto è in amianto o ne contiene in parte?</p>,
        type: "choice",
        fieldName: "amianto",
        fbEvent: "Step 4",
        gaEvent: "visto_step_presenza_amianto_tetto_1",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_presenza_amianto_1",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_presenza_amianto_1",
          }
        ]
      },

      {
        title: <span>Lasciaci la tua mail e scopri quanto risparmierai</span>,
        titleNoPropietario: <span>Lasciaci i tuoi dati e verrai ricontattato</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati",
        gaEventSiPSiT: "visto_step_richiesta_dati_1_risparmio", // si proprietario & si tracciato
        gaEventSiPNoT: "visto_step_richiesta_dati_1_no_track", // si proprietario & no tracciato
        gaEventNoPSiT: "visto_step_richiesta_dati_1_risparmio", // no proprietario & si tracciato
        gaEventNoPNoT: "visto_step_richiesta_dati_1_no_track", // no proprietario & no tracciato
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "output",
        noProgress: true,
        fbEvent: "Step fine",
        gaEventSiPSiT: "configuratore_tetto_1_completato_superiore_e_tracciato", // si proprietario & si tracciato
        gaEventSiPNoT: "configuratore_tetto_1_completato_superiore_e_non_tracciato", // si proprietario & no tracciato
        gaEventNoPSiT: "configuratore_tetto_1_completato_inferiore_e_tracciato", // no proprietario & si tracciato
        gaEventNoPNoT: "configuratore_tetto_1_completato_inferiore_e_non_tracciato", // no proprietario & no tracciato
        alternativeURL: 'https://sunprime.it/grazie-notrack/'
      },

    ] // array end
  );
}


export function getInit2(setFormFields){

  window.tipoSuperficie = "tetto";
  window.maxSuperficie = 20000;
  window.homeURL = "https://sunprime.it";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Variante 2 config. tetto (quella con cambio posizione degli step)",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Hai un tetto di almeno 2.500m<sup>2</sup> ad uso non residenziale?</p>,
        type: "choice",
        fieldName: "proprietario",
        gaEvent: "visto_step_dimensione_minima_tetto_2",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_dimensione_maggiore_richiesta_tetto_2",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_dimensione_inferiore_richiesta_tetto_2",
          }
        ]
      },


      {
        text: <p>Il tetto è in amianto o ne contiene in parte?</p>,
        type: "choice",
        fieldName: "amianto",
        fbEvent: "Step 4",
        gaEvent: "visto_step_presenza_amianto_tetto_2",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_presenza_amianto_2",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_presenza_amianto_2",
          }
        ]
      },

      {
        title: <span>Lasciaci la tua mail e scopri quanto risparmierai</span>,
        titleNoPropietario: <span>Lasciaci i tuoi dati e verrai ricontattato</span>,
        subtitle: "Completando questo form potrai accedere al nostro configuratore per tracciare il tuo tetto e scoprire il risparmio annuo che potrai avere in bolletta",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati",
        gaEventSiPSiT: "visto_step_richiesta_dati_2_superiore", // si proprietario & si tracciato
        gaEventSiPNoT: "visto_step_richiesta_dati_2_superiore", // si proprietario & no tracciato
        gaEventNoPSiT: "visto_step_richiesta_dati_2_inferiore", // no proprietario & si tracciato
        gaEventNoPNoT: "visto_step_richiesta_dati_2_inferiore", // no proprietario & no tracciato
      },

      {
        text: <span><p>Individua il tuo tetto su Gmaps e tracciane l'area</p><p className="small">Attenzione, il mancato tracciamento del tetto non ci permette di calcolare il possibile risparmio in bolletta</p></span>,
        type: "gmaps",
        fbEvent: "Step mappa",
        gaEvent: "visto_step_tracciamento_tetto_2",
        element: {
          text: "Vai alla mappa!",
          gaEvent: "tetto_tracciato_2",
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
        elementSkip: {
          text: "Salta step",
          gaEvent: "tetto_non_tracciato_2",
        }
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "output",
        noProgress: true,
        fbEvent: "Step fine",
        gaEventSiPSiT: "configuratore_tetto_2_completato_superiore_e_tracciato", // si proprietario & si tracciato
        gaEventSiPNoT: "configuratore_tetto_2_completato_superiore_e_non_tracciato", // si proprietario & no tracciato
        gaEventNoPSiT: "configuratore_tetto_2_completato_inferiore_e_tracciato", // no proprietario & si tracciato
        gaEventNoPNoT: "configuratore_tetto_2_completato_inferiore_e_non_tracciato", // no proprietario & no tracciato
        alternativeURL: 'https://sunprime.it/grazie-notrack/'
      },

    ] // array end
  );
}


export function getInit3(setFormFields){

  window.tipoSuperficie = "tetto";
  window.maxSuperficie = 20000;
  window.homeURL = "https://sunprime.it";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Variante 3 config. tetto (no tracciamento del tetto)",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Hai un tetto di almeno 2.500m<sup>2</sup> ad uso non residenziale?</p>,
        type: "choice",
        fieldName: "proprietario",
        gaEvent: "visto_step_dimensione_minima_tetto_3",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_dimensione_maggiore_richiesta_tetto_3",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_dimensione_inferiore_richiesta_tetto_3",
          }
        ]
      },


      {
        text: <p>Il tetto è in amianto o ne contiene in parte?</p>,
        type: "choice",
        fieldName: "amianto",
        fbEvent: "Step 4",
        gaEvent: "visto_step_presenza_amianto_tetto_3",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_presenza_amianto_3",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_presenza_amianto_3",
          }
        ]
      },

      {
        title: <span>Lasciaci la tua mail e scopri quanto risparmierai</span>,
        titleNoPropietario: <span>Lasciaci i tuoi dati e verrai ricontattato</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati",
        gaEventSiPSiT: "visto_step_richiesta_dati_3_no_track", // si proprietario & si tracciato
        gaEventSiPNoT: "visto_step_richiesta_dati_3_no_track", // si proprietario & no tracciato
        gaEventNoPSiT: "visto_step_richiesta_dati_3_no_track", // no proprietario & si tracciato
        gaEventNoPNoT: "visto_step_richiesta_dati_3_no_track", // no proprietario & no tracciato
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "output",
        noProgress: true,
        fbEvent: "Step fine",
        gaEventSiPSiT: "configuratore_tetto_3_completato_superiore_no_track", // si proprietario & si tracciato
        gaEventSiPNoT: "configuratore_tetto_3_completato_superiore_no_track", // si proprietario & no tracciato
        gaEventNoPSiT: "configuratore_tetto_3_completato_inferiore_no_track", // no proprietario & si tracciato
        gaEventNoPNoT: "configuratore_tetto_3_completato_inferiore_no_track", // no proprietario & no tracciato
        alternativeURL: 'https://sunprime.it/grazie-notrack/'
      },

    ] // array end
  );
}


export function getInitPiccoli(setFormFields){

  document.title = "Sunprime - Terreni piccoli";
  window.tipoSuperficie = "terreno-piccolo";
  window.maxSuperficie = 200000;
  window.homeURL = "https://sunprime.it/index.php/terreni-sunprime/";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Variante 0 config. terreni piccoli",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Il tuo terreno si trova in una delle seguenti regioni: Sicilia, Calabria, Lazio, Abruzzo, Veneto, Friuli Venezia Giulia?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 1 terreni piccoli",
        gaEvent: "visto_step_regioni_TP",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_regioni_richieste_TP",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_regioni_richieste_TP",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è industriale ricadente in zona D1, di almeno 15-20.000 mq, pianeggiante e senza ingombri?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 2 terreni piccoli",
        gaEvent: "visto_step_requisiti_T_piccoli",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_requisiti_T_piccoli",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_requisiti_T_piccoli",
          }
        ]
      },

      {
        text: <p>Il tuo terreno ha un accesso lato strada?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 3 terreni piccoli",
        gaEvent: "visto_step_accesso_strada_T_piccoli",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_accesso_strada_T_piccoli",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_accesso_strada_T_piccoli",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è attraversato da linee di media tensione o è a meno di un km di distanza su strada da una cabina di media o alta tensione?</p>,
        btnText: "Vedi foto",
        type: "choiceAndPics",
        fieldName: "proprietario",
        fbEvent: "Step 4 terreni piccoli",
        gaEvent: "visto_step_tensione_T_piccoli",
        pics: [
          "tralicci/image1.jpg",
          "tralicci/image2.jpg",
          "tralicci/image3.jpg",
          "tralicci/image4.jpg",
          "tralicci/image5.jpg"
        ],
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_tensione_T_piccoli",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_tensione_T_piccoli",
          }
        ]
      },

      {
        text: <p>Traccia l’area indicativa del tuo terreno</p>,
        type: "gmaps",
        fbEvent: "Step mappa terreni piccoli",
        gaEvent: "visto_step_tracciamento_T_piccoli",
        element: {
          text: "Vai alla mappa!"
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
      },


      {
        title: <span>Lascia i tuoi contatti</span>,
        titleNoPropietario: <span>Lascia i tuoi contatti</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati terreni piccoli",
        gaEvent: "visto_step_richiesta_dati_T_piccoli",
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "outputSimple",
        noProgress: true,
        fbEvent: "Step fine terreni piccoli",
        gaEvent: "configuratore_T_piccoli_completato",
        puntiProcesso: [
          "Firma l'Opzione di Acquisto",
          "Effettuiamo la Domanda di Connessione alla rete elettrica (richiede 60gg lavorativi)",
          "Richiediamo l'Autorizzazione alla costruzione dell'impianto (richiede 30gg lavorativi)"
        ]
      }

    ] // array end
  );
}


export function getInitIndustriali(setFormFields){

  document.title = "Sunprime - Terreni industriali";
  window.tipoSuperficie = "terreno-industriale";
  window.maxSuperficie = 200000;
  window.homeURL = "https://sunprime.it/index.php/terreni-industriali-sunprime/";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Configuratore terreni industriali",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Il tuo terreno è industriale ricadente in zona D1, di almeno 15.000 mq, pianeggiante e senza ingombri?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 1 terreni industriali",
        gaEvent: "visto_step_requisiti_T_industriali",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_requisiti_T_industriali",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_requisiti_T_industriali",
          }
        ]
      },

      {
        text: <p>Il tuo terreno ha un accesso lato strada?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 2 terreni industriali",
        gaEvent: "visto_step_accesso_strada_T_industriali",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_accesso_strada_T_industriali",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_accesso_strada_T_industriali",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è entro un kilometro da punti di connessione alla rete elettrica (cabina Media Tensione, palo Media Tensione, sottostazione primaria)?</p>,
        btnText: "Vedi esempi",
        type: "choiceAndPics",
        fieldName: "proprietario",
        fbEvent: "Step 3 terreni industriali",
        gaEvent: "visto_step_tensione_T_industriali",
        pics: [
          "tralicci/image1.jpg",
          "tralicci/image2.jpg",
          "tralicci/image3.jpg",
          "tralicci/image4.jpg",
          "tralicci/image5.jpg"
        ],
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_tensione_T_industriali",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_tensione_T_industriali",
          }
        ]
      },

      {
        text: <p>Traccia l’area indicativa del tuo terreno</p>,
        type: "gmaps",
        fbEvent: "Step mappa terreni industriali",
        gaEvent: "visto_step_tracciamento_T_industriali",
        element: {
          text: "Vai alla mappa!"
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
      },


      {
        title: <span>Scopri quanto puoi guadagnare inserendo i tuoi contatti</span>,
        titleNoPropietario: <span>Scopri quanto puoi guadagnare inserendo i tuoi contatti</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati terreni industriali",
        gaEvent: "visto_step_richiesta_dati_T_industriali",
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "outputSimple",
        noProgress: true,
        fbEvent: "Step fine terreni industriali",
        gaEvent: "configuratore_T_industriali_completato",
        puntiProcesso: [
          "Firma l'Opzione di Acquisto",
          "Effettuiamo la Domanda di Connessione alla rete elettrica (richiede 60gg lavorativi)",
          "Richiediamo l'Autorizzazione alla costruzione dell'impianto (richiede 30gg lavorativi)"
        ]
      }

    ] // array end
  );
}


export function getInitAgricoli(setFormFields){

  document.title = "Sunprime - Altri terreni";
  window.tipoSuperficie = "terreno-agricolo";
  window.maxSuperficie = 200000;
  window.homeURL = "https://sunprime.it/index.php/terreni-agricoli-sunprime/";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Configuratore terreni agricoli",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Il tuo terreno ha <b>superficie superiore a 15.000 mq</b>?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 1 terreni agricoli",
        gaEvent: "visto_step_superficie_TA",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_superficie_minima_TA",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_superficie_minima_TA",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è <b>entro i 500 m</b> di distanza da <b>un'area industriale o artigianale o commerciale, cave o miniere</b>?</p>,
        type: "choice",
        fieldName: "proprietario_1",
        fbEvent: "Step 2.1 terreni agricoli",
        gaEvent: "visto_step_requisiti_1_TA",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_requisiti_1_TA",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_requisiti_1_TA",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è <b>entro i 300 m</b> di distanza <b>da autostrade</b>?</p>,
        type: "choice",
        fieldName: "proprietario_2",
        fbEvent: "Step 2.2 terreni agricoli",
        gaEvent: "visto_step_requisiti_2_TA",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_requisiti_2_TA",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_requisiti_2_TA",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è <b>oltre i 150 m dai corsi d’acqua e libero da vincoli ambientali e paesaggistici</b>?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 3 terreni agricoli",
        gaEvent: "visto_step_vincoli_ambientali_TA",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_vincoli_ambientali_TA",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_vincoli_ambientali_TA",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è <b>entro un kilometro</b> da punti di <b>connessione alla rete elettrica</b> (cabina Media Tensione, palo Media Tensione, sottostazione primaria)?</p>,
        btnText: "Vedi esempi",
        type: "choiceAndPics",
        fieldName: "proprietario",
        fbEvent: "Step 4 terreni agricoli",
        gaEvent: "visto_step_tensione_TA",
        pics: [
          "tralicci/image1.jpg",
          "tralicci/image2.jpg",
          "tralicci/image3.jpg",
          "tralicci/image4.jpg",
          "tralicci/image5.jpg"
        ],
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_tensione_TA",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_tensione_TA",
          }
        ]
      },

      {
        text: <p>Traccia l’area indicativa del tuo terreno</p>,
        type: "gmaps",
        fbEvent: "Step mappa terreni agricoli",
        gaEvent: "visto_step_tracciamento_TA",
        element: {
          text: "Vai alla mappa!"
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
      },


      {
        title: <span>Scopri quanto puoi guadagnare inserendo i tuoi contatti</span>,
        titleNoPropietario: <span>Scopri quanto puoi guadagnare inserendo i tuoi contatti</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati terreni agricoli",
        gaEvent: "visto_step_richiesta_dati_TA",
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "outputSimple",
        noProgress: true,
        fbEvent: "Step fine terreni agricoli",
        gaEvent: "configuratore_TA_completato",
        puntiProcesso: [
          "Firma l'Opzione di Acquisto",
          "Effettuiamo la Domanda di Connessione alla rete elettrica (richiede 60gg lavorativi)",
          "Richiediamo l'Autorizzazione alla costruzione dell'impianto (richiede 30gg lavorativi)"
        ]
      }

    ] // array end
  );
}


export function getInitGrandi(setFormFields){

  document.title = "Sunprime - Terreni grandi";
  window.tipoSuperficie = "terreno-grande";
  window.maxSuperficie = 200000;
  window.homeURL = "https://sunprime.it/index.php/terreni-sunprime/";
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);

  setFormFields({
    leadSource: "Variante 0 config. terreni grandi",
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    utmAdset: urlParams.get('utm_adset'),
    utmContent: urlParams.get('utm_content'),
  });

  return(
    [ // array start

      {
        text: <p>Il tuo terreno si trova in una delle seguenti regioni: Piemonte, Liguria, Lombardia, Emilia Romagna, Veneto, Friuli, Marche, Umbria, Toscana, Lazio?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 1 terreni grandi",
        gaEvent: "visto_step_regioni_T_grandi",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_regioni_richieste_T_grandi",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_regioni_richieste_T_grandi",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è industriale ricadente in zona D1, di almeno 40.000 mq, pianeggiante e senza ingombri?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 2 terreni grandi",
        gaEvent: "visto_step_requisiti_T_grandi",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_requisiti_T_grandi",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_requisiti_T_grandi",
          }
        ]
      },

      {
        text: <p>Il tuo terreno ha un accesso lato strada?</p>,
        type: "choice",
        fieldName: "proprietario",
        fbEvent: "Step 3 terreni grandi",
        gaEvent: "visto_step_accesso_strada_T_grandi",
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_accesso_strada_T_grandi",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_accesso_strada_T_grandi",
          }
        ]
      },

      {
        text: <p>Il tuo terreno è attraversato da linee di media tensione o è a meno di un km di distanza su strada da una cabina di media o alta tensione?</p>,
        btnText: "Vedi foto",
        type: "choiceAndPics",
        fieldName: "proprietario",
        fbEvent: "Step 4 terreni grandi",
        gaEvent: "visto_step_tensione_T_grandi",
        pics: [
          "tralicci/image1.jpg",
          "tralicci/image2.jpg",
          "tralicci/image3.jpg",
          "tralicci/image4.jpg",
          "tralicci/image5.jpg"
        ],
        elements: [
          {
            text: "Sì",
            value: "yes",
            gaEvent: "SI_tensione_T_grandi",
          },
          {
            text: "No",
            value: "no",
            gaEvent: "NO_tensione_T_grandi",
          }
        ]
      },

      {
        text: <p>Traccia l’area indicativa del tuo terreno</p>,
        type: "gmaps",
        fbEvent: "Step mappa terreni grandi",
        gaEvent: "visto_step_tracciamento_T_grandi",
        element: {
          text: "Vai alla mappa!"
        },
        elementRepeat: {
          text: "Torna alla mappa",
          gaEvent: "click_torna_alla_mappa",
        },
      },


      {
        title: <span>Lascia i tuoi contatti</span>,
        titleNoPropietario: <span>Lascia i tuoi contatti</span>,
        subtitle: "",
        type: "data",
        noProgress: true,
        fbEvent: "Step dati terreni grandi",
        gaEvent: "visto_step_richiesta_dati_T_grandi",
      },

      {
        type: "loading",
        noProgress: true
      },

      {
        type: "outputSimple",
        noProgress: true,
        fbEvent: "Step fine terreni grandi",
        gaEvent: "configuratore_T_grandi_completato",
        puntiProcesso: [
          "Firma l'Opzione di Acquisto",
          "Effettuiamo la Domanda di Connessione alla rete elettrica (richiede 60gg lavorativi)",
          "Richiediamo l'Autorizzazione alla costruzione dell'impianto (richiede 30gg lavorativi)"
        ]
      }

    ] // array end
  );
}
