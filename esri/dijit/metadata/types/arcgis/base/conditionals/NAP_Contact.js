// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/arcgis/base/conditionals/NAP_Contact","dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/topic dojo/has ../../../../../../kernel dojo/i18n!../../../../nls/i18nArcGIS ../../../../base/Conditional".split(" "),function(d,h,p,e,k,l,m,n){d=d(n,{key:"NAP_Contact",postCreate:function(){this.inherited(arguments);var c=this;this.own(e.subscribe("gxe/interaction-occurred",function(a){try{if(c.parentXNode&&a&&a.inputWidget&&a.inputWidget.parentXNode){var b=a.inputWidget.parentXNode.gxePath;
null!==b&&-1!==b.indexOf("/rpCntInfo/")&&(-1!==b.indexOf("/cntAddress/delPoint")||-1!==b.indexOf("/cntPhone/voiceNum")||-1!==b.indexOf("/cntOnlineRes/linkage"))&&c.emitInteractionOccurred()}}catch(f){console.error(f)}}));this.own(e.subscribe("gxe/optional-content-toggled",function(a){try{c.parentXNode&&a&&a.src&&a.src.target&&"cntOnlineRes"===a.src.target&&c.emitInteractionOccurred()}catch(b){console.error(b)}}));this.own(e.subscribe("gxe/after-xnode-destroyed",function(a){try{if(c.parentXNode&&a&&
a.xnode){var b=a.xnode.gxePath;null!==b&&-1!==b.indexOf("/rpCntInfo/")&&(-1!==b.indexOf("/cntAddress/delPoint")||-1!==b.indexOf("/cntPhone/voiceNum")||-1!==b.indexOf("/cntOnlineRes/linkage"))&&c.emitInteractionOccurred()}}catch(f){console.error(f)}}))},validateConditionals:function(c){var a=this.newStatus({message:m.conditionals[this.key]}),b=!0,f=this.parentXNode.domNode,g=this.parentXNode.gxePath,d=g+"/cntAddress/delPoint",e=g+"/cntPhone/voiceNum",g=g+"/cntOnlineRes/linkage";this.isXNodeOff(this.parentXNode)||
(b=!1);b||this.forActiveXNodes(d+","+e+","+g,f,function(a){if(!this.isXNodeInputEmpty(a))return b=!0},this);a.isValid=b;this.track(a,c);return a}});k("extend-esri")&&h.setObject("dijit.metadata.types.arcgis.base.conditionals.NAP_Contact",d,l);return d});