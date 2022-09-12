function applicaFormule(metri_quadri = null, kwh_cons = null, euro_kwh_cons = null){

  var c7 = parseFloat(metri_quadri) || 0;
  var c9 = parseFloat(euro_kwh_cons) || 0.240;

  var c10 = 0.120;
  var kwPotenza = c7 / 6;
  if(window.tipoSuperficie.startsWith('terreno')){
    kwPotenza = c7 / 15;
  }
  var c16 = kwPotenza * 100; // ex 1200

  var currentKwh = parseFloat(kwh_cons) ? parseFloat(kwh_cons) * 12 : (1.5 * c16);

  var kwhConsSuKwhImp = currentKwh / c16;
  var f35 = 0.07;
  var f32 = f35;
  var f37 = 500;
  var o19 = f32;
  var m17 = c16;
  var g24 = 0.4;
  var g25 = 0.65;
  var g26 = 0.65;
  var g27 = 0.8;
  var g28 = 0.8;
  var c18;
  if( kwhConsSuKwhImp === 1 ){
    c18 = g24 * currentKwh;
  } else if( kwhConsSuKwhImp < 0.5 ) {
    c18 = g27 * currentKwh;
  } else if( kwhConsSuKwhImp > 1.5 ) {
    c18 = g28 * c16;
  } else if( kwhConsSuKwhImp > 1 ) {
    c18 = g26 * c16;
  } else {
    c18 = g25 * currentKwh;
  }
  var costoImpianto = kwPotenza * f37;
  var bollettaStimata = c10 * currentKwh;
  var m18 = c18;
  var m19 = m17 - m18;
  var i19 = 0.4;
  var f19 = 0.1;
  var c19 = Math.max(f19, (1-i19) * c9);
  var c20 = c10 - c19;
  var o18 = c10 - c20;
  var o17 = ( m18 * o18 + m19 * o19 ) / ( m18 + m19 );
  var p17 = o17 * m17;
  var ricaviImpianto = p17;
  var euroKwhImpianto = ricaviImpianto / c16;
  var c13 = c20 * c18;
  var cSuR = costoImpianto / ricaviImpianto;
  var savedPercent = c13 / bollettaStimata;
  var c41 = c13;
  var clientIncome = o18 * m18;
  var dmfer1Income = o19 * m19;
  var sspApplicabile = ( kwPotenza < 500 ) ? "Yes" : "No";

  return ({
    kwPotenza: kwPotenza.toFixed(),
    kwhConsSuKwhImp: kwhConsSuKwhImp.toFixed(2),
    sspApplicabile: sspApplicabile,
    euroKwhImpianto: euroKwhImpianto.toFixed(3),
    ricaviImpianto: ricaviImpianto.toFixed(),
    dmfer1Income: dmfer1Income.toFixed(),
    clientIncome: clientIncome.toFixed(),
    costoImpianto: costoImpianto.toFixed(),
    cSuR: cSuR.toFixed(2),
    bollettaStimata: bollettaStimata.toFixed(),
    savedPercent: savedPercent.toFixed(2),
    savedEuro: (c41 * 12).toFixed(),
    currentKwh: currentKwh.toFixed(),
    savedKwh: (currentKwh * savedPercent * 12).toFixed()
  });

}

export default applicaFormule;
