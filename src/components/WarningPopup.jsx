import React from 'react';
function WarningPopup(props) {


  return (
    <div className="warning-popup-overlay">
      <div className="warning-popup">
        <div className="warning-container">
          <span className="emoji" role="img" aria-label="Warning">⚠️</span>
          <h2>La superficie individuata è superiore alla media.</h2>
          <p>Controlla le dimensioni della superficie.</p>
          <div className="area">{props.area} m²</div>
          <a onClick={props.repeat}>Riconfigura superficie</a>
          <a className="alt" onClick={props.close}>Conferma superficie</a>
        </div>
      </div>
    </div>
  )
}
export default props => <WarningPopup {...props} />;
