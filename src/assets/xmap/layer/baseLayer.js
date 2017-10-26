let ol = require('openlayers');
import _xmap_util from '../util/util';
import _xmap_defaultStyle from '../style/defaultStyle'

let x_map_BaseLayer = function (opt_options) {
  this.baseMap = opt_options.baseMap;
  this.map = this.baseMap.map;
  this.map.on("clearData", this.clearData_, this);
  this.styleFunc_ = undefined;
  this.selectStyleFunc_ = undefined;
  this.initLayers();
};
ol.inherits(x_map_BaseLayer, ol.Object);

//初始化同层
x_map_BaseLayer.prototype.initLayers = function () {
  this.pointLayer = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: this.pointStyle_.bind(this)
  });
  this.map.addLayer(this.pointLayer);
};

//清空数据
x_map_BaseLayer.prototype.clearData_ = function (opt_options) {
  this.pointLayer.getSource().clear();
};

//对外接口触发数据更新
x_map_BaseLayer.prototype.showData = function (opt_options) {
  this.showDataInter_(opt_options);
};


//显示数据
x_map_BaseLayer.prototype.showDataInter_ = function (opt_options) {
  if (opt_options.styleFunc) {
    this.styleFunc_ = opt_options.styleFunc;
  }
  if (opt_options.selectStyleFunc) {
    this.selectStyleFunc_ = opt_options.selectStyleFunc;
  }
  if (opt_options.operateType === 'replace') {
    this.clearData_();
  }
  let len = opt_options.data.length;
  let dataList = opt_options.data;
  let dataType = opt_options.type;
  let features = [];
  for (let i = 0; i < len; i++) {
    let element = dataList[i];
    let feature = this.constructFeature(dataType, element);
    if (feature) {
      features.push(feature);
    }
  }
  if (features.length > 0) {
    this.pointLayer.getSource().addFeatures(features);
  }
};

x_map_BaseLayer.prototype.constructFeature = function (dataType, element) {
  let feature = _xmap_util.getFeatureFromPoint(element.longitude, element.latitude);
  if (!feature) {
    return null;
  }
  feature.setProperties({
    data: element,
    name: element.name,
    dataType: dataType,
    rootLayer: this
  });
  feature.setId(this.formatId(dataType, element));
  return feature;
};

//构造feature的ID
x_map_BaseLayer.prototype.formatId = function (dataType, item) {
  return dataType + _xmap_util.IdSeparate + item.id
};

//显示详情
x_map_BaseLayer.prototype.showMapDetail = function (feature, evt) {
  this.showMarkerOverlay_(feature, evt);

};


//显示具体的页面
x_map_BaseLayer.prototype.showMarkerOverlay_ = function (feature) {
  let self = this;
  let offset = [x_map_BaseLayer.pop.sourceLeft + 17, x_map_BaseLayer.pop.sourceTop];
  let htmlContent = '<div class="mapPopBox w_350" id="popBox" style="display: block;">' +
    '<div class="widget-header">' +
    '<div class="widget-toolbar">井盖</div>' +
    '<a class="closeWin fr" href="#"></a>' +
    '</div>' +
    '<div class="widget-body">' +
    '<div class="inner">' +
    '<ul>' +
    '<li><label class="w_80">位置</label>井盖(世博大道人行道) </li>' +
    '<li><label class="w_80">编号</label>300078201702086B</li>' +
    '<li><label class="w_80">倾斜度</label>0</li>' +
    '<li><label class="w_80">电量</label>0</li>' +
    '<li><label class="w_80">更新时间</label>2017-10-11</li>' +
    '</ul>' +
    '</div>' +
    '<div class="popArrow"></div>' +
    '</div>' +
    '</div>';
  let detailElement = self.constructorPopElement(feature, htmlContent, offset);
  //控制更多的缩放
  detailElement.querySelector('.closeWin').onclick = function () {
    self.baseMap.closeMarkerOverlay();
    return false;
  };
  return detailElement;
};

/**
 * 构造弹出框的事件
 * @param feature
 * @param htmlContent
 * @param offset
 */
x_map_BaseLayer.prototype.constructorPopElement = function (feature, htmlContent, offset) {
  let self = this;
  self.baseMap.closeMarkerOverlay();
  let detailElement = document.createElement('div');
  detailElement.innerHTML = htmlContent;
  //创建图层
  self.baseMap.markerOverlay = new ol.Overlay(({
    id: feature.getId(),
    element: detailElement,
    offset: offset,
    positioning: 'center-center'
  }));
  self.baseMap.markerOverlay.setPosition(feature.getGeometry().getLastCoordinate());
  self.map.addOverlay(self.baseMap.markerOverlay);
  return detailElement;
};

//地图样式
x_map_BaseLayer.prototype.pointStyle_ = function (feature, resolution) {
  if (!this.styleFunc_) {
    _xmap_util.error('请初始化styleFunc样式函数');
    return;
  }
  let styleParams = this.styleFunc_(feature.get('data'), this.map.getView().getZoom());
  return _xmap_defaultStyle.getStyleByType(styleParams);
};

//选中样式
x_map_BaseLayer.prototype.hoverSelectStyle_ = function (feature, resolution) {
  if (this.selectStyleFunc_) {
    let selectStyleParams = this.selectStyleFunc_(feature.get('data'), this.map.getView().getZoom());
    return _xmap_defaultStyle.getStyleByType(selectStyleParams);
  } else {
    return this.pointStyle_(feature, resolution);
  }
};

x_map_BaseLayer.pop = {
  sourceLeft: 10,
  sourceTop: -35
};

export default  x_map_BaseLayer;
