// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/base/etc/viewOnlyUtil",["dojo/_base/lang","dojo/_base/array","dojo/dom-class","dojo/has","../../../../kernel"],function(f,b,g,h,k){var e={applyViewOnly:function(a){this._walkNonTabs(a.rootDescriptor);this._walkTabs(a.rootDescriptor)},hasViewableContent:function(a){return a.hide||a._isOptionallyOff?!1:a._isGxeNode&&null!==a.checkXmlValue()?!0:b.some(a.getChildren(),function(a){return this.hasViewableContent(a)},this)},_walkNonTabs:function(a){var c;if(a._isGxeNode||a._isGxeMultiplicityHeader)c=
this.hasViewableContent(a),c||(a.domNode.style.display="none");b.forEach(a.getChildren(),function(a){this._walkNonTabs(a)},this)},_walkTabs:function(a){var c,d=[];a._isGxeTabs&&(b.forEach(a._tabButtons,function(a){(c=this.hasViewableContent(a.tabWgt))?d.push(a):a.domNode.style.display="none"},this),0<d.length&&(g.contains(d[0].domNode,"current")||a._activateTab(d[0])));b.forEach(a.getChildren(),function(a){this._walkTabs(a)},this)}};h("extend-esri")&&f.setObject("dijit.metadata.base.etc.viewOnlyUtil",
e,k);return e});