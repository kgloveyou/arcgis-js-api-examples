// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/dijit/metadata/types/gemini/base/GeminiDocumentType","dojo/_base/declare dojo/_base/lang dojo/has ../../inspire/base/InspireDocumentType ./PortalItemTransformer dojo/i18n!../../../nls/i18nGemini ../../../../../kernel".split(" "),function(c,d,e,f,g,k,h){c=c(f,{caption:null,key:null,isService:!1,metadataStandardName:null,metadataStandardVersion:null,beforeInitializeAttribute:function(c,a){"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:operatesOn/@xlink:href"===
a.gxePath?a.minOccurs=1:this.inherited(arguments)},beforeInitializeElement:function(c,a){this.inherited(arguments);var b=a.gxePath;"/gmd:MD_Metadata/gmd:hierarchyLevel"===b?a.maxOccurs=1:"/gmd:MD_Metadata/gmd:hierarchyLevelName"===b?(a.maxOccurs=1,this.isService||(a.minOccurs=1)):"/gmd:MD_Metadata/gmd:metadataStandardName/gco:CharacterString"===b?(a.value=this.metadataStandardName,a.fixed=!0):"/gmd:MD_Metadata/gmd:metadataStandardVersion/gco:CharacterString"===b?(a.value=this.metadataStandardVersion,
a.fixed=!0):"/gmd:MD_Metadata/gmd:contact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress"===b?(a.minOccurs=1,a.maxOccurs=1):"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact"===b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact"===b?a.minOccurs=1:"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:organisationName"===
b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:organisationName"===b?a.minOccurs=1:"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo"===b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo"===b?a.minOccurs=1:"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice"===
b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice"===b?a.maxOccurs=1:"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:facsimile"===b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:facsimile"===
b?a.maxOccurs=1:"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address"===b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address"===b?a.minOccurs=1:"/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress"===
b||"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress"===b?(a.minOccurs=1,a.maxOccurs=1):"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:extent/gmd:EX_Extent/gmd:temporalElement"===b?a.minOccurs=0:"/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:operatesOn"===b?a.minOccurs=1:this.isService&&"/gmd:MD_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:scope/gmd:DQ_Scope/gmd:levelDescription"===
b?a.minOccurs=1:"/gmd:MD_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:report/gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:pass/gco:Boolean"===b?a.minOccurs=1:this.inherited(arguments)},initializeNamespaces:function(){this.addNamespace("gmd","http://www.isotc211.org/2005/gmd");this.addNamespace("gco","http://www.isotc211.org/2005/gco");this.addNamespace("srv","http://www.isotc211.org/2005/srv");this.addNamespace("gml","http://www.opengis.net/gml/3.2");this.addNamespace("xlink",
"http://www.w3.org/1999/xlink")},newPortalItemTransformer:function(c){return new g}});e("extend-esri")&&d.setObject("dijit.metadata.types.gemini.base.GeminiDocumentType",c,h);return c});