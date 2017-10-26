let ol = require('openlayers');

let checkPosLegal = function(lon, lat){
  if (isNaN(parseFloat(lon)) || isNaN(parseFloat(lat))) {
    return false;
  }
  let longFloat = parseFloat(lon);
  let latiFloat = parseFloat(lat);
  if (longFloat > 180 || longFloat < -180) {
    return false;
  }
  if (latiFloat > 90 || latiFloat < -90) {
    return false;
  }
  return true;
};

let console = function (msg) {
  console.log(msg);
};

let consoleError = function(msg){
  console.error(msg);
}

let getFeatureFromPoint = function(lon, lat){
  if (checkPosLegal(lon, lat)) {
    let longFloat = parseFloat(lon);
    let latiFloat = parseFloat(lat);
    if (longFloat === 0 || latiFloat === 0) {
      return undefined;
    }
    return new ol.Feature(new ol.geom.Point([longFloat, latiFloat]));
  }
  return undefined;
};

let util = {
  console: console,
  getFeatureFromPoint: getFeatureFromPoint,
  checkPosLegal:　checkPosLegal,
  error: consoleError,
  IdSeparate: '_',
};

export  default  util;
