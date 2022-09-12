import React /*, {useEffect}*/ from 'react';

export default function StepOutput(props) {


  // useEffect(() => {
  //   if(props.currentStep === props.step && window && window.dataLayer){
  //     if(window.tipoSuperficie == "terreno-grande"){
  //       trackGtm("terreni_grandi_completato");
  //     } else {
  //       trackGtm("terreni_piccoli_completato");
  //     }
  //   }
  // }, [props.currentStep, props.step]);


  function getStyle(){
    if(props.currentStep === props.step){
      return {top: "0%", opacity: 1};
    }
    return {top: "0%", opacity: 0, pointerEvents: "none"};
  }

  // function printNumber(n, unit = "", orange = false){
  //   if(n){
  //     n = parseInt(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  //   }
  //   if(orange){
  //     return <b className="orange"> {n}{unit}</b>
  //   }
  //   return <b> {n}{unit}</b>
  // }

  function getPuntiProcesso(){
    if(props.puntiProcesso){
      var k = 0;
      return props.puntiProcesso.map((x) => {
        k++;
        return <li key={k}>{x}</li>
      })
    }
    return null;
  }

  return (
    <div className="output-container simple" style={getStyle()}>


      <div className="specialista-container">
        <div className="title">
          <div className="boxer">
            <span>
              <h1>Grazie per aver lasciato i tuoi dati!</h1>
            </span>
          </div>
        </div>
        <div className="image">
        </div>
        <div className="text">
          <div className="boxer">
            <span>
              Ti chiameremo al più presto per proporti
              l&#39;<b>acquisto dei tuoi terreni</b> secondo il processo riportato sotto:
            </span>
          </div>
        </div>
      </div>

      <div className="processo-container">
        <div className="boxer">
          <ol>
            { getPuntiProcesso() }
          </ol>
        </div>
      </div>



    </div>
  )

}
