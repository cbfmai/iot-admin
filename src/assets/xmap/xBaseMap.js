/**
 * Created by fp on 2017/7/18.
 * 底图地图
 */
let ol = require('openlayers');

let xBaseMap = function (opt_options) {
  //初始化配置参数
  let options = Object.assign({}, {
    center: opt_options.center,
    zoom: opt_options.zoom,
  }, opt_options ? opt_options : {});
  this.options = options;

  let baseLayers = this.getTdtLayers();
  let viewOption = {
    projection: options.code,
    center: options.center,
    zoom: options.zoom
  };
  let view = this.createView(viewOption);
  let controls = this.createControl();
  this.map = this.createMap({
    layers: baseLayers,
    target: options.target,
    view: view,
    controls: controls
  });
  this.initEvent();
};

/**
 * 获取天地图地图
 * @param lyr 类型
 * @returns {ol.layer.Tile}
 * @private
 */
xBaseMap.prototype.getTdtLayer_ = function (lyr) {
  let projection = ol.proj.get("EPSG:4326");
  let projectionExtent = [-180, -90, 180, 90];
  let maxResolutionStr = (ol.extent.getWidth(projectionExtent) / (256 * 2));
  let resolutions = new Array(16);
  let z;
  for (z = 0; z < 16; ++z) {
    resolutions[z] = maxResolutionStr / Math.pow(2, z);
  }
  let url = "http://t0.tianditu.com/DataServer?T=" + lyr + "&X={x}&Y={y}&L={z}";
  let tileOrigin = ol.extent.getTopLeft(projectionExtent);
  return new ol.layer.Tile({
    extent: [-180, -90, 180, 90],
    source: new ol.source.TileImage({
      tileUrlFunction: function (tileCoord) {
        let z = tileCoord[0] + 1;
        let x = tileCoord[1];
        let y = -tileCoord[2] - 1;
        let n = Math.pow(2, z + 1);
        x = x % n;
        if (x * n < 0) {
          x = x + n;
        }
        return url.replace('{z}', z.toString()).replace('{y}', y.toString()).replace('{x}', x.toString());
      },
      projection: projection,
      tileGrid: new ol.tilegrid.TileGrid({origin: tileOrigin, resolutions: resolutions, tileSize: 256})
    })
  });
};

/**
 * 得到天地图图层
 * @returns {[*,*]}
 */
xBaseMap.prototype.getTdtLayers = function () {
  let vec_c = this.getTdtLayer_("vec_c");
  let cva_c = this.getTdtLayer_("cva_c");
  return [vec_c, cva_c];
};


//创建ol view对象
xBaseMap.prototype.createView = function (options) {
  return new ol.View({
    projection: options.projection,
    center: options.center,
    zoom: options.zoom,
  });
};

xBaseMap.prototype.createControl = function (options) {
  let controlArr = [new ol.control.Zoom()];
  controlArr.push(new ol.control.MousePosition({
    undefinedHTML: '&nbsp;',
    projection: 'EPSG:4326',
    coordinateFormat: function (coordinate) {
      return ol.coordinate.format(coordinate, '{x}, {y}', 4);
    }
  }));
  return controlArr;
};

/**
 * 创建地图对象
 * @param options
 */
xBaseMap.prototype.createMap = function (options) {
  return new ol.Map({
    layers: options.layers,
    renderer: 'canvas',
    target: options.target,
    view: options.view,
    controls: options.controls
  });
};

/**
 * 初始化事件
 */
xBaseMap.prototype.initEvent = function () {
  this.pointmoveSelect = new ol.interaction.Select({
    style: this.hoverSelectStyle.bind(this),
    condition: ol.events.condition.pointerMove
  });
  this.map.addInteraction(this.pointmoveSelect);
  this.pointmoveSelect.on('select', this.showFeatureTip, this);
  //监听鼠标点击地图事件
  this.map.on("click", this.listenClickFn_, this);
};

//监听单击事件
xBaseMap.prototype.listenClickFn_ = function (evt) {
  if (evt.dragging) {
    return;
  }
  let arr = [];
  this.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
    arr.push(feature);
  });
  //如果没有找到4类中的元素
  if (arr.length > 0) {
    //去除获得的第一个元素
    let feature = arr[0];
    //触发选中元素
    if (feature.get("rootLayer") !== undefined) {
      feature.get("rootLayer").showMapDetail(feature, evt);
    }
  }
};

xBaseMap.prototype.closeMarkerOverlay = function(){
  if (this.markerOverlay) {
    this.map.removeOverlay(this.markerOverlay);
    this.markerOverlay = null;
  }
};

//
xBaseMap.prototype.showFeatureTip = function (event) {
  let tooltipEle = document.querySelector('.promptBox');
  if (tooltipEle) {
    let deselectedFeatures = event.deselected;
    let selectedFeatures = event.selected;
    //修改鼠标样式
    if (selectedFeatures.length > 0) {
      window.document.body.style.cursor = 'pointer';
    } else {
      window.document.body.style.cursor = 'default';
    }
    //取消选中
    if (deselectedFeatures.length > 0) {
      tooltipEle.innerText = '';
      tooltipEle.style.display = 'none';
    }
    //显示选中
    if (selectedFeatures.length > 0) {
      let selectedFeature = selectedFeatures[0];
      let name = selectedFeature.get('name');
      if (!name) {
        return;
      }
      window.document.body.style.cursor = 'pointer';
      tooltipEle.innerText = name;
      let position = this.map.getPixelFromCoordinate(event.mapBrowserEvent.coordinate);
      tooltipEle.style.left = position[0] + 10 + 'px';
      tooltipEle.style.top = position[1] + 30 + 'px';
      tooltipEle.style.display = 'block';
    }
  }
};

xBaseMap.prototype.hoverSelectStyle = function (feature, resolution) {
  if (feature.get("rootLayer") !== undefined) {
    return feature.get("rootLayer").hoverSelectStyle_(feature, resolution);
  }
};

export default xBaseMap;
