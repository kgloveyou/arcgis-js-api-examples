// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/SymbolStyler/IconSelect","../../kernel dijit/form/Select dojo/_base/array dojo/_base/declare dojo/_base/lang dojo/dom-class dojo/has".split(" "),function(e,a,c,f,g,d,h){a=f("esri.dijit.SymbolStyler.IconSelect",[a],{baseClass:"esriIconSelect dijitSelect dijitValidationTextBox",_extraIconClass:null,addIconOptions:function(k,b){b=b||"";var a=c.map(k,function(a){return{value:a,iconClass:b+" "+a}});this.addOption(a)},_getMenuItemForOption:function(a){var b=this.inherited(arguments);
b.set("iconClass",a.iconClass);return b},_setValueAttr:function(a){this.inherited(arguments);var b=this.containerNode;d.remove(b,this._getAllIconClasses());d.add(b,this.get("selectedOptions").iconClass)},_getAllIconClasses:function(){return c.map(this.options,function(a){return a.iconClass})}});h("extend-esri")&&g.setObject("dijit.SymbolStyler.IconSelect",a,e);return a});