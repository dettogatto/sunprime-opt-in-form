import axios from 'axios';

const enableTracking = (window.location.hostname !== "localhost");
var fbEvents = [];
var gtmEvents = [];

export const trackFb = (event, em = null, ph = null) => {

  if(!enableTracking){
    return;
  }

  if(!event || fbEvents.includes(event)){
    // console.log("Duplicate or empty event, not sending");
    return;
  }

  if(!window.fbq){
    // console.log("No FB Pixel found");
    return;
  }

  window.fbq('trackCustom', event);
  fbEvents.unshift(event);
  // console.log("Tracked FB", event);
  trackFbApi(event, em, ph);

}

const trackFbApi = (event, em = null, ph = null) => {

  if(!enableTracking){
    return;
  }

  let url = "./php/fb/";
    let data = {
      event: event,
      email: em,
      phone: ph,
      url: window.location.href
    }

    axios.post(url, data)
      .then((res) => {
      })
      .catch((err) => {
        // console.log("Could not contact conversion api");
      });
}


export const trackGtm = (event, em = null, ph = null) => {

  if(!enableTracking){
    return;
  }

  if(!event || gtmEvents[0] === event){
    // console.log("Duplicate or empty event, not sending");
    return;
  }

  if(!window.dataLayer){
    // console.log("No GTM dataLayer found");
    return;
  }

  window.dataLayer.push({"event" : event});

  gtmEvents.push(event);
  fbEvents.push(event);
  // Events in the data layer get seen by fbq
  // console.log("Tracked GTM", event);
  trackFbApi(event, em, ph);

}
