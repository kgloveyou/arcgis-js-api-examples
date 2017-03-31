// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
require({cache:{"esri/layers/WMSLayerInfo":function(){define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","../kernel"],function(n,l,p,m,f){n=n(null,{declaredClass:"esri.layers.WMSLayerInfo",name:null,title:null,description:null,extent:null,legendURL:null,subLayers:[],allExtents:[],spatialReferences:[],queryable:!1,showPopup:!1,constructor:function(e){e&&(this.name=e.name,this.title=e.title,this.description=e.description,this.extent=e.extent,this.legendURL=e.legendURL,this.subLayers=
e.subLayers?e.subLayers:[],this.allExtents=e.allExtents?e.allExtents:[],this.spatialReferences=e.spatialReferences?e.spatialReferences:[],this.queryable=!!e.queryable,this.showPopup=!!e.showPopup)},clone:function(){var e={name:this.name,title:this.title,description:this.description,legendURL:this.legendURL},f;this.extent&&(e.extent=this.extent.getExtent());e.subLayers=[];p.forEach(this.subLayers,function(f){e.subLayers.push(f.clone())});e.allExtents=[];for(f in this.allExtents)f=parseInt(f,10),isNaN(f)||
(e.allExtents[f]=this.allExtents[f].getExtent());e.spatialReferences=[];p.forEach(this.spatialReferences,function(f){e.spatialReferences.push(f)});e.queryable=this.queryable;e.showPopup=this.showPopup;return e}});m("extend-esri")&&l.setObject("layers.WMSLayerInfo",n,f);return n})},"*noref":1}});
define("esri/layers/WMSLayer","require dojo/_base/kernel dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/sniff ../config ../graphic ../kernel ../request ../urlUtils ../dijit/PopupTemplate ../SpatialReference ../geometry/Extent ../geometry/Point ./DynamicMapServiceLayer ./WMSLayerInfo dojo/query".split(" "),function(n,l,p,m,f,e,w,x,y,t,r,z,s,q,B,u,A){p=p([u],{declaredClass:"esri.layers.WMSLayer",_CRS_TO_EPSG:{84:4326,83:4269,27:4267},_REVERSED_LAT_LONG_RANGES:[[4001,4999],[2044,2045],[2081,
2083],[2085,2086],[2093,2093],[2096,2098],[2105,2132],[2169,2170],[2176,2180],[2193,2193],[2200,2200],[2206,2212],[2319,2319],[2320,2462],[2523,2549],[2551,2735],[2738,2758],[2935,2941],[2953,2953],[3006,3030],[3034,3035],[3058,3059],[3068,3068],[3114,3118],[3126,3138],[3300,3301],[3328,3335],[3346,3346],[3350,3352],[3366,3366],[3416,3416],[20004,20032],[20064,20092],[21413,21423],[21473,21483],[21896,21899],[22171,22177],[22181,22187],[22191,22197],[25884,25884],[27205,27232],[27391,27398],[27492,
27492],[28402,28432],[28462,28492],[30161,30179],[30800,30800],[31251,31259],[31275,31279],[31281,31290],[31466,31700]],_WEB_MERCATOR:[102100,3857,102113,900913],_WORLD_MERCATOR:[3395,54004],allExtents:[],version:null,constructor:function(a,c){var b=r.urlToObject(a);if(b.query&&(b.query.version||b.query.Version||b.query.VERSION))this.version=b.query.version||b.query.Version||b.query.VERSION;this.url=a=this._stripParameters(a,"version service request bbox format height width layers srs crs styles transparent bgcolor exceptions time elevation sld wfs".split(" "));
this._url=r.urlToObject(a);this._getCapabilitiesURL=a;this._initLayer=m.hitch(this,this._initLayer);this._parseCapabilities=m.hitch(this,this._parseCapabilities);this._getCapabilitiesError=m.hitch(this,this._getCapabilitiesError);c?(this.customParameters=c.customParameters,this.customLayerParameters=c.customLayerParameters,this.imageFormat=this._getImageFormat(c.format),this.imageTransparency=!1!==c.transparent,this.visibleLayers=c.visibleLayers?c.visibleLayers:[],this.version=c.version||this.version,
c.resourceInfo?this._readResourceInfo(c.resourceInfo):this._getCapabilities()):(this.imageFormat="image/png",this.imageTransparency=!0,this.visibleLayers=[],this._getCapabilities());this._blankImageURL=n.toUrl("../images/pixel.png");this.extentProcessor=this._createExtentProcessor(0);this._createChildLayer()},setVisibleLayers:function(a){this.visibleLayers=(a=this._checkVisibleLayersList(a))?a:[];this.refresh(!0)},setImageFormat:function(a){this.imageFormat=this._getImageFormat(a);this.refresh(!0)},
setImageTransparency:function(a){this.imageTransparency=a;this.refresh(!0)},setCustomParameters:function(a,c){this.customParameters=a;this.customLayerParameters=c;this.refresh(!0)},refresh:function(){this.inherited(arguments);this._childLayer&&this._childLayer.refresh.apply(this._childLayer,arguments)},getImageUrl:function(a,c,b,d){if(!this.visibleLayers||0===this.visibleLayers.length)d(this._blankImageURL);else{a=this._getImageParams(a,c,b);a=this._mixinCustomLayerParameters(a);c=this.getMapURL;
var g;c+=-1===c.indexOf("?")?"?":"";for(g in a)a.hasOwnProperty(g)&&(c+="?"===c.substring(c.length-1,c.length)?"":"\x26",c+=g+"\x3d"+a[g]);d(r.addProxy(c))}},_setMap:function(a,c,b){var d=this.inherited(arguments);a.wrapAround180?this._childLayer&&(this.suspended&&this._childLayer.suspend(),this._childLayer._setMap(a,d)):this._childLayer=this.extentProcessor=null;return d},_unsetMap:function(a,c){this._childLayer&&this._childLayer._unsetMap(a,this._div);this.inherited(arguments)},onSuspend:function(){this.inherited(arguments);
this._childLayer&&this._childLayer.suspend()},onResume:function(){this.inherited(arguments);this._childLayer&&this._childLayer.resume()},_createChildLayer:function(){this._childLayer=new u(null,{extentProcessor:this._createExtentProcessor(1)});this._childLayer._isChildLayer=!0;this._childLayer.getImageUrl=m.hitch(this,this.getImageUrl);this._childLayer.loaded=!0},_createExtentProcessor:function(a){return m.hitch(this,this._extentProcessor,a)},_extentProcessor:function(a,c){var b=c.extent,d=c.width,
g=0;if(b){var f=b.getWidth()/d,k=b.bisect(),b=k.extents,h=b[a];h&&(d=k.marginLeft/f,g=0===a?d:d+b[0].getWidth()/f,d=Math.ceil(h.getWidth()/f),g=Math.ceil(g));b=h}return{extent:b,width:d,marginLeft:g}},_getImageParams:function(a,c,b){var d=a.spatialReference.wkid;-1===f.indexOf(this.spatialReferences,d)&&a.spatialReference.latestWkid&&(d=a.spatialReference.latestWkid);if(f.some(this._WEB_MERCATOR,function(a){return a==d})){var g=f.filter(this.spatialReferences,function(a){return f.some(this._WEB_MERCATOR,
function(c){return c==a})},this);0===g.length&&(g=f.filter(this.spatialReferences,function(a){return f.some(this._WORLD_MERCATOR,function(c){return c==a})},this));d=0<g.length?g[0]:this._WEB_MERCATOR[0]}this.spatialReferences=f.filter(this.spatialReferences,function(a){return a!==d});this.spatialReferences.unshift(d);var g=a.xmin,e=a.xmax,k=a.ymin;a=a.ymax;var h={SERVICE:"WMS",REQUEST:"GetMap"};h.FORMAT=this.imageFormat;h.TRANSPARENT=this.imageTransparency?"TRUE":"FALSE";h.STYLES="";h.VERSION=this.version;
h.LAYERS=this.visibleLayers?this.visibleLayers.toString():null;h.WIDTH=c;h.HEIGHT=b;this.maxWidth<c&&(h.WIDTH=this.maxWidth);this.maxHeight<b&&(h.HEIGHT=this.maxHeight);c=d?d:NaN;isNaN(c)||("1.3.0"==this.version?h.CRS="EPSG:"+c:h.SRS="EPSG:"+c);"1.3.0"==this.version&&this._useLatLong(c)?h.BBOX=k+","+g+","+a+","+e:h.BBOX=g+","+k+","+e+","+a;return h},_initLayer:function(a,c){this.spatialReference=new s(this.extent.spatialReference);this.initialExtent=new q(this.extent);this.fullExtent=new q(this.extent);
this.visibleLayers=this._checkVisibleLayersList(this.visibleLayers);var b=m.hitch(this,function(){this.loaded=!0;this.onLoad(this);var a=this._loadCallback;a&&(delete this._loadCallback,a(this))});if(e("chrome")){var d=w.defaults.io,g="with-credentials"===d.useCors?r.canUseXhr(this.getMapURL,!0):-1;(d=-1<g?d.corsEnabledServers[g]:null)&&d.withCredentials?t({url:this.getMapURL,handleAs:"text",content:{SERVICE:"WMS",REQUEST:"GetMap"}}).addBoth(function(){b()}):b()}else b()},_readResourceInfo:function(a){a.extent?
a.layerInfos?(this.extent=a.extent,this.allExtents[0]=a.extent,this.layerInfos=a.layerInfos,this.description=a.description?a.description:"",this.copyright=a.copyright?a.copyright:"",this.title=a.title?a.title:"",this.getMapURL=a.getMapURL?a.getMapURL:this._getCapabilitiesURL,this.getFeatureInfoURL=a.getFeatureInfoURL,this.featureInfoFormat=a.featureInfoFormat,this.version=a.version?a.version:"1.3.0",this.maxWidth=a.maxWidth?a.maxWidth:5E3,this.maxHeight=a.maxHeight?a.maxHeight:5E3,this.spatialReferences=
a.spatialReferences?a.spatialReferences:[],this.imageFormat=this._getImageFormat(a.format),this.setScaleRange(a.minScale,a.maxScale),this.customLayerParameters=a.customLayerParameters||this.customLayerParameters,this.customParameters=a.customParameters||this.customParameters,this._initLayer()):this._errorHandler(Error("esri.layers.WMSLayer: unable to find the 'layerInfos' property in resourceInfo")):this._errorHandler(Error("esri.layers.WMSLayer: Unable to find the 'extent' property in resourceInfo."))},
_getCapabilities:function(){var a=this._url.query?this._url.query:{};a.SERVICE="WMS";a.REQUEST="GetCapabilities";this.version&&(a.VERSION=this.version);var a=this._mixinCustomParameters(a),c=this._url.path+"?",b;for(b in a)a.hasOwnProperty(b)&&(c+="?"==c.substring(c.length-1,c.length)?"":"\x26",c+=b+"\x3d"+a[b]);t({url:c,handleAs:"xml",headers:{"Content-Type":null},load:this._parseCapabilities,error:this._getCapabilitiesError},{usePost:!1})},_parseCapabilities:function(a){if(a){var c=this;this.version=
this._getAttributeValue("WMS_Capabilities","version",a,null);this.version||(this.version=this._getAttributeValue("WMT_MS_Capabilities","version",a,"1.3.0"));var b=this._getTag("Service",a);this.title=this._getTagValue("Title",b,"");this.title||(this.title=this._getTagValue("Name",b,""));this.copyright=this._getTagValue("AccessConstraints",b,"");this.description=this._getTagValue("Abstract",b,"");this.maxWidth=parseInt(this._getTagValue("MaxWidth",b,5E3),10);this.maxHeight=parseInt(this._getTagValue("MaxHeight",
b,5E3),10);if(b=this._getTag("Layer",a)){var d=this._getLayerInfo(b),g=0,e=null,b=this._getTag("Capability",a);f.forEach(b.childNodes,function(a){"Layer"==a.nodeName&&(0===g?e=a:(1===g&&d.name&&(d.name="",d.subLayers=[],d.subLayers.push(this._getLayerInfo(e))),d.subLayers.push(this._getLayerInfo(a))),g++)},this);if(d){this.layerInfos=d.subLayers;if(!this.layerInfos||0===this.layerInfos.length)this.layerInfos=[d];this.extent=d.extent;this.extent||(d.extent=new q(this.layerInfos[0].extent.toJson()),
this.extent=d.extent);this.allExtents=d.allExtents;if(!this.allExtents||!this.allExtents.length)d.allExtents=[],f.forEach(this.layerInfos[0].allExtents,function(a,c){a&&(d.allExtents[c]=new q(a.toJson()))}),this.allExtents=d.allExtents;this.spatialReferences=d.spatialReferences;if(!this.spatialReferences.length&&0<this.layerInfos.length)for(var k=function(a){var c;for(c=0;c<a.subLayers.length;c++){var b=a.subLayers[c],d=b.spatialReferences;!d.length&&(b.subLayers&&0<b.subLayers.length)&&(d=k(b));
if(d.length)return d}return[]},b=0;b<this.layerInfos.length;b++){var h=this.layerInfos[b];this.spatialReferences=this.layerInfos[0].spatialReferences;!this.spatialReferences.length&&(h.subLayers&&0<h.subLayers.length)&&(this.spatialReferences=k(h));if(this.spatialReferences.length)break}}b=function(b){if((b=l.query("DCPType",c._getTag(b,a)))&&0<b.length)if((b=l.query("HTTP",b[0]))&&0<b.length)if((b=l.query("Get",b[0]))&&0<b.length)if(b=c._getAttributeValue("OnlineResource","xlink:href",b[0],null))return b.indexOf("\x26")===
b.length-1&&(b=b.substring(0,b.length-1)),c._stripParameters(b,["service","request"]);return null};h=function(b){var d=[];0===l.query("Operation",a).length?f.forEach(l.query("Format",c._getTag(b,a)),function(a){d.push(a.text?a.text:a.textContent)}):f.forEach(l.query("Operation",a),function(a){a.getAttribute("name")===b&&f.forEach(l.query("Format",a),function(a){d.push(a.text?a.text:a.textContent)})});return d};this.getMapURL=b("GetMap")||this._getCapabilitiesURL;this.getMapFormats=h("GetMap");f.some(this.getMapFormats,
function(a){return-1<a.indexOf(this.imageFormat)},this)||(this.imageFormat=this.getMapFormats[0]);if(this.getFeatureInfoURL=b("GetFeatureInfo"))this.getFeatureInfoFormats=h("GetFeatureInfo"),-1<f.indexOf(this.getFeatureInfoFormats,"text/html")?this.featureInfoFormat="text/html":-1<f.indexOf(this.getFeatureInfoFormats,"text/plain")&&(this.featureInfoFormat="text/plain");if(!this.featureInfoFormat){var v=function(a){if(a&&(a.queryable=!1,a.subLayers))for(var c=0;c<a.subLayers.length;c++)v(a.subLayers[c])};
v(d)}this._initLayer()}else this._errorHandler(Error("esri.layers.WMSLayer: Response does not contain any layers."))}else this._errorHandler(Error("GetCapabilities request for "+this._getCapabilitiesURL+" failed. (Response is null.)"))},_getCapabilitiesError:function(a){a&&a.message&&(a.message="GetCapabilities request for "+this._getCapabilitiesURL+" failed. ("+a.message+")");this._errorHandler(a)},_getLayerInfo:function(a){if(!a)return null;var c=new A;c.name="";c.title="";c.description="";c.allExtents=
[];c.spatialReferences=[];c.queryable="1"===a.getAttribute("queryable");c.subLayers=[];var b=this._getTag("LatLonBoundingBox",a);b&&(c.allExtents[0]=this._getExtent(b,4326));var d=this._getTag("EX_GeographicBoundingBox",a),g;d&&(g=new q(0,0,0,0,new s({wkid:4326})),g.xmin=parseFloat(this._getTagValue("westBoundLongitude",d,0)),g.ymin=parseFloat(this._getTagValue("southBoundLatitude",d,0)),g.xmax=parseFloat(this._getTagValue("eastBoundLongitude",d,0)),g.ymax=parseFloat(this._getTagValue("northBoundLatitude",
d,0)),c.allExtents[0]=g);!b&&!d&&(g=new q(-180,-90,180,90,new s({wkid:4326})),c.allExtents[0]=g);c.extent=c.allExtents[0];var e=-1<f.indexOf(["1.0.0","1.1.0","1.1.1"],this.version)?"SRS":"CRS";f.forEach(a.childNodes,function(a){if("Name"==a.nodeName)c.name=(a.text?a.text:a.textContent)||"";else if("Title"==a.nodeName)c.title=(a.text?a.text:a.textContent)||"";else if("Abstract"==a.nodeName)c.description=(a.text?a.text:a.textContent)||"";else if("BoundingBox"==a.nodeName){var b=a.getAttribute(e);b&&
0===b.indexOf("EPSG:")?(b=parseInt(b.substring(5),10),0!==b&&!isNaN(b)&&(a="1.3.0"==this.version?this._getExtent(a,b,this._useLatLong(b)):this._getExtent(a,b),c.allExtents[b]=a,c.extent||(c.extent=a))):b&&0===b.indexOf("CRS:")?(b=parseInt(b.substring(4),10),0!==b&&!isNaN(b)&&(this._CRS_TO_EPSG[b]&&(b=this._CRS_TO_EPSG[b]),c.allExtents[b]=this._getExtent(a,b))):(b=parseInt(b,10),0!==b&&!isNaN(b)&&(c.allExtents[b]=this._getExtent(a,b)))}else if(a.nodeName==e)a=(a.text?a.text:a.textContent).split(" "),
f.forEach(a,function(a){a=-1<a.indexOf(":")?parseInt(a.split(":")[1],10):parseInt(a,10);0!==a&&!isNaN(a)&&(this._CRS_TO_EPSG[a]&&(a=this._CRS_TO_EPSG[a]),-1==f.indexOf(c.spatialReferences,a)&&c.spatialReferences.push(a))},this);else if("Style"==a.nodeName&&!c.legendURL){if(a=this._getTag("LegendURL",a))if(a=this._getTag("OnlineResource",a))c.legendURL=a.getAttribute("xlink:href")}else"Layer"===a.nodeName&&c.subLayers.push(this._getLayerInfo(a))},this);c.title=c.title||c.name;return c},_getImageFormat:function(a){switch(a?
a.toLowerCase():""){case "jpg":return"image/jpeg";case "bmp":return"image/bmp";case "gif":return"image/gif";case "svg":return"image/svg+xml";default:return"image/png"}},getImageFormat:function(){switch(this.imageFormat?this.imageFormat.toLowerCase():""){case "image/jpeg":return"jpg";case "image/bmp":return"bmp";case "image/gif":return"gif";case "image/svg+xml":return"svg";default:return"png"}},_getExtent:function(a,c,b){var d;if(a){d=new q;var g=parseFloat(a.getAttribute("minx")),f=parseFloat(a.getAttribute("miny")),
e=parseFloat(a.getAttribute("maxx"));a=parseFloat(a.getAttribute("maxy"));b?(d.xmin=isNaN(f)?-1*Number.MAX_VALUE:f,d.ymin=isNaN(g)?-1*Number.MAX_VALUE:g,d.xmax=isNaN(a)?Number.MAX_VALUE:a,d.ymax=isNaN(e)?Number.MAX_VALUE:e):(d.xmin=isNaN(g)?-1*Number.MAX_VALUE:g,d.ymin=isNaN(f)?-1*Number.MAX_VALUE:f,d.xmax=isNaN(e)?Number.MAX_VALUE:e,d.ymax=isNaN(a)?Number.MAX_VALUE:a);d.spatialReference=new s({wkid:c})}return d},_useLatLong:function(a){var c,b;for(b=0;b<this._REVERSED_LAT_LONG_RANGES.length;b++){var d=
this._REVERSED_LAT_LONG_RANGES[b];if(a>=d[0]&&a<=d[1]){c=!0;break}}return c},_getTag:function(a,c){var b=l.query(a,c);return b&&0<b.length?b[0]:null},_getTagValue:function(a,c,b){return(a=l.query(a,c))&&0<a.length?a[0].text?a[0].text:a[0].textContent:b},_getAttributeValue:function(a,c,b,d){return(a=l.query(a,b))&&0<a.length?a[0].getAttribute(c):d},_checkVisibleLayersList:function(a){if(a&&(0<a.length&&this.layerInfos&&0<this.layerInfos.length)&&"number"==typeof a[0]){var c=[];f.forEach(a,function(a){a<
this.layerInfos.length&&c.push(this.layerInfos[a].name)},this);a=c}return a},_stripParameters:function(a,c){var b=r.urlToObject(a),d,g=[];for(d in b.query)b.query.hasOwnProperty(d)&&-1===f.indexOf(c,d.toLowerCase())&&g.push(d+"\x3d"+b.query[d]);return b.path+(g.length?"?"+g.join("\x26"):"")},_getPopupGraphic:function(a,c){var b=this.visibleLayers;if(!b||0===b.length)return null;var d=this._popupGraphic;d||(d=new z({title:this.title||"",description:'\x3cdiv style\x3d"position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;"\x3e\x3ciframe src\x3d"{QUERY_URL}" width\x3d"250" height\x3d"147" frameborder\x3d"0" marginwidth\x3d"0" marginheight\x3d"0" style\x3d"position:absolute;top:0;left:0;width:100%;height:100%;border:0;background:url(\''+
n.toUrl("../dijit/images/loading-throb.gif")+"') transparent center no-repeat;\" onload\x3d\"(event.target || event.srcElement).style.background \x3d 'none';\"\x3e\x3c/iframe\x3e\x3c/div\x3e"}),d=this._popupGraphic=new x(null,null,{},d),d._layer=this);var g=function(a){var b=[];if(a&&(a.queryable&&(a.showPopup&&a.name)&&b.push(a.name),a.subLayers))for(var c=0;c<a.subLayers.length;c++){var d=g(a.subLayers[c]);d.length&&(b=b.concat(d))}return b},e=g({subLayers:this.layerInfos}),e=f.filter(e,function(a){return-1<
f.indexOf(b,a)});if(e.length){var k=this.getFeatureInfoURL,h=this._getImageParams(a.extent,a.width,a.height),h=this._mixinCustomLayerParameters(h);h.REQUEST="GetFeatureInfo";h.INFO_FORMAT=this.featureInfoFormat;h.QUERY_LAYERS=e.join();h.FEATURE_COUNT=25;"1.3.0"===this.version?(h.I=Math.round(c.x),h.J=Math.round(c.y)):(h.X=Math.round(c.x),h.Y=Math.round(c.y));var k=k+(-1===k.indexOf("?")?"?":""),l;for(l in h)h.hasOwnProperty(l)&&(k+="?"===k.substring(k.length-1,k.length)?"":"\x26",k+=l+"\x3d"+h[l]);
d.attributes.QUERY_URL=k;return d}return null},_mixinCustomParameters:function(a){if(this.customParameters)for(var c in this.customParameters)a[c]=encodeURIComponent(this.customParameters[c]);return a},_mixinCustomLayerParameters:function(a){if(this.customLayerParameters||this.customParameters){var c=m.clone(this.customParameters||{});m.mixin(c,this.customLayerParameters||{});for(var b in c)"styles"===b.toLowerCase()&&delete a.STYLES,a[b]=encodeURIComponent(c[b])}return a}});e("extend-esri")&&m.setObject("layers.WMSLayer",
p,y);return p});