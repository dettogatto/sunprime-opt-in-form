import React from 'react';
function PicsPopup(props) {


  function getPics(){
    return props.pics.map((pic) => {
      return <img src={require("../imgs/" + pic)} alt="" key={pic} />
    })
  }


  return (
    <div className="pics-popup-overlay">
      <div className="pics-popup">
        <div className="pics-container">
          { getPics() }
        </div>
        <div className="closer" onClick={props.close}>CHIUDI</div>
      </div>
    </div>
  )
}
export default props => <PicsPopup {...props} />;
