import React from 'react';
import { trackFb, trackGtm } from './../../Tracking';

function Button(props) {

  function clickHandler(){
    if(props.setter && props.value){
      props.setter(props.value);
    } else if(props.action){
      props.action();
    }
    trackGtm(props.gaEvent);
    trackFb(props.fbEvent);
  }

  return (
    <div className={"form-element-button" + (props.active ? " active" : "") } onClick={clickHandler} style={{cursor: "pointer"}}>
      <span>{props.text}</span>
    </div>
  )
}
export default props => <Button {...props} />;
