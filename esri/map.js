// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/map","require dojo/_base/kernel dojo/_base/declare dojo/_base/connect dojo/_base/lang dojo/_base/array dojo/_base/event dojo/on dojo/aspect dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/dom-style dijit/a11yclick dijit/registry ./kernel ./config ./sniff ./lang ./_coremap ./MapNavigationManager dojo/i18n!./nls/jsapi".split(" "),function(z,u,N,C,n,r,D,E,O,F,G,g,s,P,Q,t,R,v,H,k,p,S,T,I){var A={up:"panUp",right:"panRight",down:"panDown",left:"panLeft"},J=
{upperRight:"panUpperRight",lowerRight:"panLowerRight",lowerLeft:"panLowerLeft",upperLeft:"panUpperLeft"},f=C.connect,l=C.disconnect,m=s.create,q=Q.set,K=n.hitch,x=P.getMarginBox,L=u.deprecated,B=n.mixin,M=0;u=N(S,{declaredClass:"esri.Map",constructor:function(a,c){B(this,{_slider:null,_navDiv:null,_mapParams:B({attributionWidth:0.45,slider:!0,nav:!1,logo:!0,sliderStyle:"small",sliderPosition:"top-left",sliderOrientation:"vertical",autoResize:!0},c||{})});B(this,{isDoubleClickZoom:!1,isShiftDoubleClickZoom:!1,
isClickRecenter:!1,isScrollWheelZoom:!1,isPan:!1,isRubberBandZoom:!1,isKeyboardNavigation:!1,isPanArrows:!1,isZoomSlider:!1});n.isFunction(v._css)&&(v._css=v._css(this._mapParams.force3DTransforms),this.force3DTransforms=this._mapParams.force3DTransforms);var b=k("esri-transforms")&&k("esri-transitions");this.navigationMode=this._mapParams.navigationMode||b&&"css-transforms"||"classic";"css-transforms"===this.navigationMode&&!b&&(this.navigationMode="classic");this.fadeOnZoom=p.isDefined(this._mapParams.fadeOnZoom)?
this._mapParams.fadeOnZoom:"css-transforms"===this.navigationMode;"css-transforms"!==this.navigationMode&&(this.fadeOnZoom=!1);this.setMapCursor("default");this.smartNavigation=c&&c.smartNavigation;if(!p.isDefined(this.smartNavigation)&&k("mac")&&!k("esri-touch")&&!k("esri-pointer")&&!(3.5>=k("ff"))){var e=navigator.userAgent.match(/Mac\s+OS\s+X\s+([\d]+)(\.|\_)([\d]+)\D/i);e&&(p.isDefined(e[1])&&p.isDefined(e[3]))&&(b=parseInt(e[1],10),e=parseInt(e[3],10),this.smartNavigation=10<b||10===b&&6<=e)}this.showAttribution=
p.isDefined(this._mapParams.showAttribution)?this._mapParams.showAttribution:!0;this._onLoadHandler_connect=f(this,"onLoad",this,"_onLoadInitNavsHandler");var d=m("div",{"class":"esriControlsBR"+(this._mapParams.nav?" withPanArrows":"")},this.root);if(this.showAttribution)if(b=n.getObject("esri.dijit.Attribution",!1))this._initAttribution(b,d);else{var y=M++,h=this;this._rids&&this._rids.push(y);z(["./dijit/Attribution"],function(a){var b=h._rids?r.indexOf(h._rids,y):-1;-1!==b&&(h._rids.splice(b,
1),h._initAttribution(a,d))})}this._mapParams.logo&&(b={},6===k("ie")&&(b.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled\x3d'true', sizingMethod\x3d'crop', src\x3d'"+z.toUrl("./images/map/logo-med.png")+"')"),this._ogol=m("div",{style:b,tabIndex:"0",title:"Esri"},d),this._setLogoSize(),this._onMapResizeLogo_connect=f(this,"onResize",this,"_setLogoSize"),this._ogol_connect=f(this._ogol,t,this,"_openLogoLink"));this.navigationManager=new T(this);c&&c.basemap&&(this._onLoadFix=!0,
this.setBasemap(c.basemap),this._onLoadFix=!1);if(this.autoResize=this._mapParams.autoResize)b=this._getEnclosingResizableWidget(this.container)||window,e=this.resize,this._rszSignal=E.pausable(b,"resize",e),this._oriSignal=E.pausable(window,"orientationchange",e),O.after(b,"resize",e,!0),this._startResizeTimer()},_startResizeTimer:function(){clearTimeout(this._persistentTimer);this._persistentTimer=setTimeout(this._timedResize,2*this.resizeDelay)},_getEnclosingResizableWidget:function(a){var c=R.getEnclosingWidget(a);
return!c?c:c.resize?c:this._getEnclosingResizableWidget(a.parentNode)},_setLogoSize:function(){this._ogol&&(25E4>this.root.clientWidth*this.root.clientHeight?(g.remove(this._ogol,"logo-med"),g.add(this._ogol,"logo-sm")):(g.remove(this._ogol,"logo-sm"),g.add(this._ogol,"logo-med")))},_initAttribution:function(a,c){var b=m("span",{"class":"esriAttribution"},c,"first");q(b,"maxWidth",Math.floor(this.width*this._mapParams.attributionWidth)+"px");this._connects.push(f(b,t,function(){g.contains(this,"esriAttributionOpen")?
g.remove(this,"esriAttributionOpen"):this.scrollWidth>this.clientWidth&&g.add(this,"esriAttributionOpen")}));this.attribution=new a({map:this},b)},_cleanUp:function(){this.disableMapNavigation();this.navigationManager.destroy();var a=this._slider;a&&(a.destroy&&!a._destroyed)&&a.destroy();var a=this._navDiv,c=this.attribution;a&&s.destroy(a);c&&c.destroy();this._connects.push(this._slider_connect,this._ogol_connect,this._rszSignal,this._oriSignal);r.forEach(this._connects,l);clearInterval(this._persistentTimer);
this.attribution=this.navigationManager=this._rids=this._connects=this._slider_connect=this._ogol_connect=this._rszSignal=this._oriSignal=this._persistentTimer=null;this.inherited("_cleanUp",arguments)},_isPanningOrZooming:function(){return this.__panning||this.__zooming},_canZoom:function(a){var c=this.getLevel();return!this.__tileInfo||!(c===this.getMinZoom()&&0>a||c===this.getMaxZoom()&&0<a)},_onLoadInitNavsHandler:function(){this.enableMapNavigation();this._createNav();if("small"===this._mapParams.sliderStyle||
!this._createSlider)this._createSimpleSlider();else if(this._mapParams.slider){var a=-1!==this._getSliderClass(!0).indexOf("Horizontal"),a=[a?"dijit.form.HorizontalSlider":"dijit.form.VerticalSlider",a?"dijit.form.HorizontalRule":"dijit.form.VerticalRule",a?"dijit.form.HorizontalRuleLabels":"dijit.form.VerticalRuleLabels"];if(r.some(a,function(a){return!n.getObject(a,!1)})){var a=r.map(a,function(a){return a.replace(/\./g,"/")}),c=M++,b=this;this._rids&&this._rids.push(c);z(a,function(){var a=b._rids?
r.indexOf(b._rids,c):-1;-1!==a&&(b._rids.splice(a,1),b._createSlider.apply(b,arguments))})}else a=r.map(a,function(a){return n.getObject(a,!1)}),this._createSlider.apply(this,a)}l(this._onLoadHandler_connect)},_createNav:function(){if(this._mapParams.nav){var a,c,b,e=g.add,d=this.id;this._navDiv=m("div",{id:d+"_navdiv"},this.root);e(this._navDiv,"navDiv");var y=this.width/2,h=this.height/2,k;for(b in A)c=A[b],a=m("div",{id:d+"_pan_"+b},this._navDiv),e(a,"fixedPan "+c),"up"===b||"down"===b?(k=parseInt(x(a).w,
10)/2,q(a,{left:y-k+"px",zIndex:30})):(k=parseInt(x(a).h,10)/2,q(a,{top:h-k+"px",zIndex:30})),this._connects.push(f(a,"onclick",K(this,this[c])));this._onMapResizeNavHandler_connect=f(this,"onResize",this,"_onMapResizeNavHandler");for(b in J)c=J[b],a=m("div",{id:d+"_pan_"+b,style:{zIndex:30}},this._navDiv),e(a,"fixedPan "+c),this._connects.push(f(a,"onclick",K(this,this[c])));this.isPanArrows=!0}},_onMapResizeNavHandler:function(a,c,b){a=this.id;c/=2;b/=2;var e=F.byId,d,f,h;for(d in A)f=e(a+"_pan_"+
d),"up"===d||"down"===d?(h=parseInt(x(f).w,10)/2,q(f,"left",c-h+"px")):(h=parseInt(x(f).h,10)/2,q(f,"top",b-h+"px"))},_createSimpleSlider:function(){if(this._mapParams.slider){var a=this._slider=m("div",{id:this.id+"_zoom_slider","class":this._getSliderClass(),style:{zIndex:30}}),c=m("div",{"class":"esriSimpleSliderIncrementButton",tabIndex:"0",role:"button"},a),b=m("div",{"class":"esriSimpleSliderDecrementButton",tabIndex:"0",role:"button"},a);this._addZoomButtonTooltips(c,b);this._incButton=c;this._decButton=
b;this._simpleSliderZoomHandler(null,null,null,this.getLevel());var e=I.widgets.zoomSlider;this._addZoomButtonIcon(c,"+",e.zoomIn);this._addZoomButtonIcon(b,"\x26minus;",e.zoomOut);8>k("ie")&&g.add(b,"dj_ie67Fix");this._connects.push(f(c,t,this,this._simpleSliderChangeHandler));this._connects.push(f(b,t,this,this._simpleSliderChangeHandler));(-1<this.getMaxZoom()||-1<this.getMinZoom())&&this._connects.push(f(this,"onZoomEnd",this,this._simpleSliderZoomHandler));10>k("ie")&&F.setSelectable(a,!1);this.root.appendChild(a);
this.isZoomSlider=!0}},_simpleSliderChangeHandler:function(a){D.stop(a);a=-1!==a.currentTarget.className.indexOf("IncrementButton")?!0:!1;this._extentUtil({numLevels:a?1:-1})},_simpleSliderZoomHandler:function(a,c,b,e){var d;a=this._incButton;c=this._decButton;-1<e&&e===this.getMaxZoom()?d=a:-1<e&&e===this.getMinZoom()&&(d=c);d?(g.add(d,"esriSimpleSliderDisabledButton"),g.remove(d===a?c:a,"esriSimpleSliderDisabledButton")):(g.remove(a,"esriSimpleSliderDisabledButton"),g.remove(c,"esriSimpleSliderDisabledButton"))},
_getSliderClass:function(a){a=a?"Large":"Simple";var c=this._mapParams.sliderOrientation,b=this._mapParams.sliderPosition||"",c=c&&"horizontal"===c.toLowerCase()?"esri"+a+"SliderHorizontal":"esri"+a+"SliderVertical";if(b)switch(b.toLowerCase()){case "top-left":b="esri"+a+"SliderTL";break;case "top-right":b="esri"+a+"SliderTR";break;case "bottom-left":b="esri"+a+"SliderBL";break;case "bottom-right":b="esri"+a+"SliderBR"}return"esri"+a+"Slider "+c+" "+b},_addZoomButtonIcon:function(a,c,b){s.create("span",
{"aria-hidden":"true",role:"presentation",innerHTML:c},a);s.create("span",{"class":"esriIconFallbackText",innerHTML:b},a)},_addZoomButtonTooltips:function(a,c){var b=I.widgets.zoomSlider;G.set(a,"title",b.zoomIn);G.set(c,"title",b.zoomOut)},_createSlider:function(a,c,b){if(this._mapParams.slider){var e=m("div",{id:this.id+"_zoom_slider"},this.root),d=H.defaults.map,g=this._getSliderClass(!0),h=-1!==g.indexOf("Horizontal"),l=this.getNumLevels();if(0<l){var n,p,w=this._mapParams.sliderLabels,u=!!w,
s=!1!==w;if(s){var t=h?"bottomDecoration":"rightDecoration";if(!w){w=[];for(d=0;d<l;d++)w[d]=""}r.forEach([{"class":"esriLargeSliderTicks",container:t,count:l,dijitClass:c},{"class":u&&"esriLargeSliderLabels",container:t,count:l,labels:w,dijitClass:b}],function(a){var b=m("div"),d=a.dijitClass;delete a.dijitClass;e.appendChild(b);d===c?n=new d(a,b):p=new d(a,b)})}a=this._slider=new a({id:e.id,"class":g,minimum:this.getMinZoom(),maximum:this.getMaxZoom(),discreteValues:l,value:this.getLevel(),clickSelect:!0,
intermediateChanges:!0,style:"z-index:30;"},e);a.startup();s&&(n.startup(),p.startup());this._slider_connect=f(a,"onChange",this,"_onSliderChangeHandler");this._connects.push(f(this,"onExtentChange",this,"_onExtentChangeSliderHandler"));this._connects.push(f(a._movable,"onFirstMove",this,"_onSliderMoveStartHandler"))}else{a=this._slider=new a({id:e.id,"class":g,minimum:0,maximum:2,discreteValues:3,value:1,clickSelect:!0,intermediateChanges:d.sliderChangeImmediate,style:"height:50px; z-index:30;"},
e);b=a.domNode.firstChild.childNodes;for(d=1;3>=d;d++)q(b[d],"visibility","hidden");a.startup();this._slider_connect=f(a,"onChange",this,"_onDynSliderChangeHandler");this._connects.push(f(this,"onExtentChange",this,"_onExtentChangeDynSliderHandler"))}d=a.incrementButton;b=a.decrementButton;h?this._addZoomButtonTooltips(d,b):this._addZoomButtonTooltips(b,d);d.style.outline="none";b.style.outline="none";a.sliderHandle.style.outline="none";a._onKeyPress=function(){};if(h=a._movable){var v=h.onMouseDown;
h.onMouseDown=function(a){9>k("ie")&&1!==a.button||v.apply(this,arguments)}}this.isZoomSlider=!0}},_onSliderMoveStartHandler:function(){l(this._slider_connect);l(this._slidermovestop_connect);this._slider_connect=f(this._slider,"onChange",this,"_onSliderChangeDragHandler");this._slidermovestop_connect=f(this._slider._movable,"onMoveStop",this,"_onSliderMoveEndHandler")},_onSliderChangeDragHandler:function(a){this._extentUtil({targetLevel:a})},_onSliderMoveEndHandler:function(){l(this._slider_connect);
l(this._slidermovestop_connect)},_onSliderChangeHandler:function(a){this.setLevel(a)},_updateSliderValue:function(a,c){l(this._slider_connect);var b=this._slider,e=b._onChangeActive;b._onChangeActive=!1;b.set("value",a);b._onChangeActive=e;this._slider_connect=f(b,"onChange",this,c)},_onExtentChangeSliderHandler:function(a,c,b,e){l(this._slidermovestop_connect);this._updateSliderValue(e.level,"_onSliderChangeHandler")},_onDynSliderChangeHandler:function(a){this._extentUtil({numLevels:0<a?1:-1})},
_onExtentChangeDynSliderHandler:function(){this._updateSliderValue(1,"_onDynSliderChangeHandler")},_openLogoLink:function(a){window.open(H.defaults.map.logoLink,"_blank");D.stop(a)},enableMapNavigation:function(){this.navigationManager.enableNavigation()},disableMapNavigation:function(){this.navigationManager.disableNavigation()},enableDoubleClickZoom:function(){this.isDoubleClickZoom||(this.navigationManager.enableDoubleClickZoom(),this.isDoubleClickZoom=!0)},disableDoubleClickZoom:function(){this.isDoubleClickZoom&&
(this.navigationManager.disableDoubleClickZoom(),this.isDoubleClickZoom=!1)},enableShiftDoubleClickZoom:function(){this.isShiftDoubleClickZoom||(L(this.declaredClass+": Map.(enable/disable)ShiftDoubleClickZoom deprecated. Shift-Double-Click zoom behavior will not be supported.",null,"v2.0"),this.navigationManager.enableShiftDoubleClickZoom(),this.isShiftDoubleClickZoom=!0)},disableShiftDoubleClickZoom:function(){this.isShiftDoubleClickZoom&&(L(this.declaredClass+": Map.(enable/disable)ShiftDoubleClickZoom deprecated. Shift-Double-Click zoom behavior will not be supported.",
null,"v2.0"),this.navigationManager.disableShiftDoubleClickZoom(),this.isShiftDoubleClickZoom=!1)},enableClickRecenter:function(){this.isClickRecenter||(this.navigationManager.enableClickRecenter(),this.isClickRecenter=!0)},disableClickRecenter:function(){this.isClickRecenter&&(this.navigationManager.disableClickRecenter(),this.isClickRecenter=!1)},enablePan:function(){this.isPan||(this.navigationManager.enablePan(),this.isPan=!0)},disablePan:function(){this.isPan&&(this.navigationManager.disablePan(),
this.isPan=!1)},enableRubberBandZoom:function(){this.isRubberBandZoom||(this.navigationManager.enableRubberBandZoom(),this.isRubberBandZoom=!0)},disableRubberBandZoom:function(){this.isRubberBandZoom&&(this.navigationManager.disableRubberBandZoom(),this.isRubberBandZoom=!1)},enableKeyboardNavigation:function(){this.isKeyboardNavigation||(this.navigationManager.enableKeyboardNavigation(),this.isKeyboardNavigation=!0)},disableKeyboardNavigation:function(){this.isKeyboardNavigation&&(this.navigationManager.disableKeyboardNavigation(),
this.isKeyboardNavigation=!1)},enableScrollWheelZoom:function(){this.isScrollWheelZoom||(this.navigationManager.enableScrollWheelZoom(),this.isScrollWheelZoom=!0)},disableScrollWheelZoom:function(){this.isScrollWheelZoom&&(this.navigationManager.disableScrollWheelZoom(),this.isScrollWheelZoom=!1)},showPanArrows:function(){this._navDiv&&(this._navDiv.style.display="block",this.isPanArrows=!0)},hidePanArrows:function(){this._navDiv&&(this._navDiv.style.display="none",this.isPanArrows=!1)},showZoomSlider:function(){this._slider&&
(q(this._slider.domNode||this._slider,"visibility","inherit"),this.isZoomSlider=!0)},hideZoomSlider:function(){this._slider&&(q(this._slider.domNode||this._slider,"visibility","hidden"),this.isZoomSlider=!1)}});k("extend-esri")&&(v.Map=u);return u});