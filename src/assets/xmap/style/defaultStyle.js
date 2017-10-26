/**
 * Created by fp on 2017/9/21.
 * 默认样式库
 */
let ol = require('openlayers');
let _xmap_defaultStyle = {};

_xmap_defaultStyle.isArray = function (o) {
  return Object.prototype.toString.call(o) === '[object Array]';
};

//根据不同的样式类型与参数得到样式
_xmap_defaultStyle.getStyleByType = function (styleParam) {
  if (_xmap_defaultStyle.isArray(styleParam)) {
    let styleArr = [];
    styleParam.forEach(function (item) {
      styleArr.push(_xmap_defaultStyle['get' + item.styleType](item));
    });
    return styleArr;
  } else {
    return _xmap_defaultStyle['get' + styleParam.styleType](styleParam);
  }
};

_xmap_defaultStyle.getIcon = function (styleParam) {


};


_xmap_defaultStyle.defaultPolygon = {
  strokeColor: 'blue',
  fillColor: 'blue',
  strokeWeight: '6'
};

_xmap_defaultStyle.getPolygon = function (styleParam) {
  let style = Object.assign({}, _xmap_defaultStyle.defaultPolygon, styleParam);
  return [
    new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: style.strokeColor,
        width: style.strokeWeight
      }),
      fill: new ol.style.Fill({
        color: style.fillColor
      })
    })
  ];
};


_xmap_defaultStyle.getPolyline = function (styleParam) {


};

_xmap_defaultStyle.defaultCircle = {
  strokeColor: 'blue',
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeWeight: 0,
  radius: 7
};

_xmap_defaultStyle.getcircle = function (styleParam) {
  let style = Object.assign({}, _xmap_defaultStyle.defaultCircle, styleParam);
  return [new ol.style.Style({
    image: new ol.style.Circle({
      radius: style.radius,
      fill: new ol.style.Fill({
        color: style.fillColor
      }),
      stroke: new ol.style.Stroke({
        color: style.strokeColor,
        width: style.strokeWeight
      })
    })
  })];
};


_xmap_defaultStyle.defaultIcon = {
  anchor: [0.5, 1],
  scale: 1
};

_xmap_defaultStyle.getIcon = function (styleParam) {
  let style = Object.assign({}, _xmap_defaultStyle.defaultIcon, styleParam);
  return new ol.style.Style({
    image: new ol.style.Icon(({
      scale: style.scale,
      anchor: style.anchor,
      src: style.src
    }))
  })
};

export default _xmap_defaultStyle;

