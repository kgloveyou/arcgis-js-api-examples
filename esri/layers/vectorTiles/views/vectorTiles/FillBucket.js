// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.19/esri/copyright.txt for details.
//>>built
define("esri/layers/vectorTiles/views/vectorTiles/FillBucket","require exports ../../core/tsSupport/extendsHelper ../../core/tsSupport/decorateHelper ./Bucket ./Geometry ../../core/libs/earcut/earcut".split(" "),function(z,A,w,B,x,u,y){return function(v){function f(c,l,e,d,a,b){v.call(this,c,l);this.polygonVertexBuffer=e;this.polygonIndexBuffer=d;this.polygonOutlineVertexBuffer=a;this.polygonOutlineIndexBuffer=b}w(f,v);Object.defineProperty(f.prototype,"polygonIndexStart",{get:function(){return this._triangleElementsStart},
enumerable:!0,configurable:!0});Object.defineProperty(f.prototype,"polygonIndexCount",{get:function(){return this._triangleElementsNum},enumerable:!0,configurable:!0});Object.defineProperty(f.prototype,"polygonOutlineIndexStart",{get:function(){return this._outlineElementsStart},enumerable:!0,configurable:!0});Object.defineProperty(f.prototype,"polygonOutlineIndexCount",{get:function(){return this._outlineElementsNum},enumerable:!0,configurable:!0});f.prototype.assignBufferInfo=function(c){c._triangleElementsStart=
this._triangleElementsStart;c._triangleElementsNum=this._triangleElementsNum;c.layer.hasPaintProperty("fill-outline-color")?(c._outlineElementsStart=this._outlineElementsStart,c._outlineElementsNum=this._outlineElementsNum):(c._outlineElementsStart=0,c._outlineElementsNum=0)};f.prototype.processFeatures=function(c,l){this._triangleElementsStart=this.polygonIndexBuffer.index;this._triangleElementsNum=0;this._outlineElementsStart=this.polygonOutlineIndexBuffer.index;this._outlineElementsNum=0;c&&c.setExtent(this.layerExtent);
for(var e=this.layer.getPaintValue("fill-pattern",this.zoom),e=this.layer.getPaintValue("fill-antialias",this.zoom)&&void 0===e,d=0,a=this._features;d<a.length;d++){var b=a[d].getGeometry(c);this._processFeature(b,e)}};f.prototype._processFeature=function(c,l){if(c){var e=c.length;if(l)for(var d=0;d<e;d++)this._processOutline(c[d]);for(var a,d=0;d<e;d++){var b=f._area(c[d]);0<b?(void 0!==a&&this._processFill(c,a),a=[d]):0>b&&void 0!==a&&a.push(d)}void 0!==a&&this._processFill(c,a)}};f.prototype._processOutline=
function(c){var l=this.polygonOutlineVertexBuffer,e=this.polygonOutlineIndexBuffer,d=e.index,a,b,f,h=new u.Point(0,0),n=new u.Point(0,0),m=new u.Point(0,0),k=-1,g=-1,r=a=-1,t=-1,p=c.length;if(!(2>p)){b=c[0];for(var s=c[p-1];p&&s.isEqual(b);)--p,s=c[p-1];if(!(2>p-0)){for(s=0;s<p;++s){0===s?(a=c[p-1],b=c[0],f=c[1],h.assignSub(b,a),h.normalize(),h.rightPerpendicular()):(b=f,f=s!==p-1?c[s+1]:c[0],h.assign(n));n.assignSub(f,b);n.normalize();n.rightPerpendicular();a=h.x*n.y-h.y*n.x;m.assignAdd(h,n);m.normalize();
var q=-m.x*-h.x+-m.y*-h.y,q=Math.abs(0!==q?1/q:1);8<q&&(q=8);0<=a?(a=l.add(b.x,b.y,h.x,h.y,0,1),-1===r&&(r=a),0<=k&&(0<=g&&0<=a)&&e.add(k,g,a),g=l.add(b.x,b.y,q*-m.x,q*-m.y,0,-1),-1===t&&(t=g),0<=k&&(0<=g&&0<=a)&&e.add(k,g,a),k=g,g=a,a=l.add(b.x,b.y,m.x,m.y,0,1),0<=k&&(0<=g&&0<=a)&&e.add(k,g,a),g=l.add(b.x,b.y,n.x,n.y,0,1)):(a=l.add(b.x,b.y,q*m.x,q*m.y,0,1),-1===r&&(r=a),0<=k&&(0<=g&&0<=a)&&e.add(k,g,a),g=l.add(b.x,b.y,-h.x,-h.y,0,-1),-1===t&&(t=g),0<=k&&(0<=g&&0<=a)&&e.add(k,g,a),k=g,g=a,a=l.add(b.x,
b.y,-m.x,-m.y,0,-1),0<=k&&(0<=g&&0<=a)&&e.add(k,g,a),k=l.add(b.x,b.y,-n.x,-n.y,0,-1));0<=k&&(0<=g&&0<=a)&&e.add(k,g,a)}0<=k&&(0<=g&&0<=r)&&e.add(k,g,r);0<=k&&(0<=r&&0<=t)&&e.add(k,t,r);this._outlineElementsNum+=3*(e.index-d)}}};f.prototype._processFill=function(c,l){var e;1<l.length&&(e=[]);for(var d=0,a=0;a<l.length;a++){var b=l[a];0!==d&&e.push(d);d+=c[b].length}for(var d=2*d,a=new Float64Array(d),f=0,h=0;h<l.length;h++)for(var b=l[h],b=c[b],n=b.length,m=0;m<n;++m)a[f++]=b[m].x,a[f++]=b[m].y;e=
y(a,e,2);f=e.length;if(0<f){h=this.polygonVertexBuffer.index;for(b=0;b<d;)this.polygonVertexBuffer.add(a[b++],a[b++]);for(d=0;d<f;)this.polygonIndexBuffer.add(h+e[d++],h+e[d++],h+e[d++]);this._triangleElementsNum+=f}};f._area=function(c){for(var f=0,e=c.length-1,d=0;d<e;d++)f+=c[d].x*c[d+1].y-c[d+1].x*c[d].y;return f};return f}(x)});