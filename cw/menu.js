/**
 * 地图操作工具辅助类
 */
define(["cw/config",
  "cw/util",
  "esri/graphic",
  "esri/geometry/Point",
  "esri/layers/FeatureLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/toolbars/draw",
  "dojo/_base/array"
], function (
  config,
  util,
  Graphic,
  Point,
  FeatureLayer,
  PictureMarkerSymbol,
  Draw,
  array) {

    var self = {
      /**
       * 初始化摄像头要素层
       */
      bind: function (options) {
        // 目标
        var target = options.target;
        // 菜单项
        var items = options.items;

        // Creates right-click context menu for map
        var menu = new Menu({
          onOpen: function (box) {
            // Lets calculate the map coordinates where user right clicked.
            // We'll use this to create the graphic when the user clicks
            // on the menu item to "Add Point"
            // currentLocation = getMapPointFromMenuPosition(box);
            // editToolbar.deactivate();
          }
        });

        for (var i = 0; i < items.length; i++) {
          menu.addChild(new MenuItem(items[i]));
        }

        menu.startup();
        menu.bindDomNode(layer);
      }
    }

    return self;
  });
