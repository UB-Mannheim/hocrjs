!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.HocrViewer=t.defaultConfig=void 0;var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=n(1),a=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),i=t.defaultConfig={root:"body",debugLevel:1,fonts:{"sans-serif":{},serif:{},monospace:{},UnifrakturCook:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturCook:700"},UnifrakturMaguntia:{cssUrl:"https://fonts.googleapis.com/css?family=UnifrakturMaguntia"},"Old Standard TT":{cssUrl:"https://fonts.googleapis.com/css?family=Old+Standard+TT"},Cardo:{cssUrl:"https://fonts.googleapis.com/css?family=Cardo"},"Noto Serif":{cssUrl:"https://fonts.googleapis.com/css?family=Noto+Serif:400,400i,700&subset=latin-ext"},"Libre Baskerville":{cssUrl:"https://fonts.googleapis.com/css?family=Libre+Baskerville:400,400i,700&subset=latin-ext"}},features:{backgroundImage:{enabled:!1},scaleFont:{enabled:!1,maxFontSize:128,minFontSize:2,wrapClass:"hocr-viewer-wrap"},disableEmStrong:{enabled:!1},contentEditable:{enabled:!1},tooltips:{enabled:!0,styleId:"hocr-viewer-tooltip-style"},transparentText:{enabled:!1},highlight:{enabled:!0},highlightNotPage:{enabled:!1},highlightInline:{enabled:!1},highlightLine:{enabled:!1},highlightPar:{enabled:!1},highlightCarea:{enabled:!1}},expandToolbar:!0,enableToolbar:!0,rootClass:"hocr-viewer"};t.HocrViewer=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.config=i,Object.keys(t||{}).forEach(function(e){n.config[e]=t[e]}),this.root=this.config.root,"string"==typeof this.root&&(this.root=document.querySelector(this.root)),this.parser=new r.HocrParser(this.config),Object.keys(this.config.fonts).forEach(function(e){var t=n.config.fonts[e].cssUrl;t&&a.default.addCssFragment("hocr-view-font-styles",'@import "'+t+'";\n')}),this.cache={scaleFont:{}}}return o(e,[{key:"log",value:function(e){var t;if(!(e>this.config.debugLevel)){for(var n=arguments.length,o=Array(n>1?n-1:0),r=1;r<n;r++)o[r-1]=arguments[r];(t=console)[["info","debug","log"][e]].apply(t,o)}}},{key:"findByOcrClass",value:function(e){(e=e||{}).tag=e.tag||"*",e.clauses=e.clauses||"",e.title&&(e.clauses+='[title*="'+e.title+'"]'),e.class=e.class||"","string"==typeof e.class&&(e.class=[e.class]);var t=e.class.map(function(e){return 0===e.indexOf("ocr")?e:""===e?"ocr":0!==e.indexOf("x_")?"ocr_"+e:"ocr"+e}).map(function(t){return":scope "+e.tag+'[class^="'+t+'"]'+e.clauses}).join(",");this.log(1,"findByOcrClass:",t);var n=e.context||document.querySelector("."+this.config.rootClass),o=Array.prototype.slice.call(n.querySelectorAll(t));return e.terminal&&(o=o.filter(function(e){if(!e.querySelector('*[class^="ocr"]'))return e})),e.container&&(o=o.filter(function(e){if(e.querySelector('*[class^="ocr"]'))return e})),e.filter&&(o=o.filter(e.filter)),o}},{key:"placeOcrElements",value:function(){var e=this;this.findByOcrClass({title:"bbox"}).forEach(function(t){var n=e.parser.bbox(t);t.style.left=n[0]+"px",t.style.top=n[1]+"px",t.style.width=n[2]-n[0]+"px",t.style.height=n[3]-n[1]+"px"});var t=this.parser.bbox(document.querySelector(".ocr_page"));document.querySelector("body").style.minHeight=t[2]+"px"}},{key:"toggleScaleFont",value:function(e){var t=this;console.time("toggleScaleFont");var n=document.querySelector("."+this.config.features.scaleFont.wrapClass);n||((n=document.createElement("span")).classList.add(this.config.features.scaleFont.wrapClass),this.root.appendChild(n)),e?this.findByOcrClass({terminal:!0}).forEach(function(e){return t.scaleFont(e,n)}):this.findByOcrClass({terminal:!0}).forEach(function(e){return e.style.fontSize="initial"}),console.timeEnd("toggleScaleFont")}},{key:"scaleFont",value:function(e,t){if(0!==e.textContent.trim().length){if(!(e.textContent in this.cache.scaleFont)){t.style.fontFamily=e.style.fontFamily,t.innerHTML=e.textContent;var n="offsetWidth",o="offsetHeight",r=Math.min(e[n],e[o]),a=this.config.features.scaleFont.minFontSize;for(t.style.fontSize=r+"px",r>a&&t[o]>e[o]&&(r-=t[o]-e[o],t.style.fontSize=r+"px");r>a&&t[n]>e[n];)r-=1,t.style.fontSize=r+"px";this.cache.scaleFont[e.textContent]=r}e.style.fontSize=this.cache.scaleFont[e.textContent]+"px"}}},{key:"toggleTooltips",value:function(e){var t=this,n=document.querySelector("#"+this.config.features.tooltips.styleId);if(e){var o={},r=!0,a=!1,i=void 0;try{for(var l,s=this.findByOcrClass()[Symbol.iterator]();!(r=(l=s.next()).done);r=!0){o[l.value.getAttribute("class")]=!0}}catch(e){a=!0,i=e}finally{try{!r&&s.return&&s.return()}finally{if(a)throw i}}this.log(0,"Detected OCR classes",Object.keys(o)),n||(n=document.createElement("style")).setAttribute("id",this.config.features.tooltips.styleId),n.appendChild(document.createTextNode(Object.keys(o).map(function(e){return"."+t.config.rootClass+" ."+e+':hover::before { content: "'+e+'"; }\n'}).join("\n"))),document.head.appendChild(n)}else n&&n.remove()}},{key:"toggleBackgroundImage",value:function(e){var t=this,n=this.root.querySelector(".ocr_page");e?this.findByOcrClass({title:"image"}).forEach(function(e){var o=t.parser.image(e);n.style.backgroundImage="url("+o+")"}):n.style.backgroundImage=""}},{key:"toggleContentEditable",value:function(e){var t=this,n=function(e){console.warn("Scaling of contentEditable is broken right now"),t.config.features.scaleFont.enabled&&(t.scaleFont(e.target),t.findByOcrClass({context:e.target}).forEach(function(e){t.scaleFont(e)}))};this.findByOcrClass({class:["line","x_word"],clauses:""}).forEach(function(t){e?(t.setAttribute("contentEditable","true"),t.addEventListener("input",n)):(t.removeAttribute("contentEditable"),t.removeEventListener("input",n))})}},{key:"toggleExpandToolbar",value:function(e){this.toolbar.classList.toggle("expanded",e)}},{key:"toggleFeature",value:function(e,t){this.root.classList.toggle("feature-"+e,t);var n="toggle"+e.substr(0,1).toUpperCase()+e.substring(1);n in this&&(this.log(0,"Calling this."+n),this[n](t))}},{key:"addToolbar",value:function(){var e=this;if(this.toolbar=this.root.querySelector("hocr-toolbar"),!this.toolbar){this.toolbar=document.createElement("div"),this.toolbar.classList.add("hocr-toolbar"),this.toolbar.classList.toggle("expanded",this.config.expandToolbar),document.body.appendChild(this.toolbar),this.toolbar.innerHTML='\n    <div class="toggler">\n        <div class="toggler-inner toggler-show">\n            &gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>&gt;<br/>\n        </div>\n        <div class="toggler-inner toggler-hide">\n            &lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>&lt;<br/>\n        </div>\n    </div>\n    <div class="wrapper">\n        <h2>Font</h2>\n        <select class="fontlist"></select>\n        <h2>Features</h2>\n        <ul class="features">\n        </ul>\n        <h2>Zoom</h2>\n        <input type="range" class="zoom" min="0" max="500" step="2" value="100"/>\n        <span class="zoom">100</span>%\n        <p>\n            <button class="zoom" data-scale-factor="height">Fit height</button>\n            <button class="zoom" data-scale-factor="width">Fit width</button>\n            <button class="zoom" data-scale-factor="original">100 %</button>\n        </p>\n    </div>',this.toolbar.querySelector(".toggler").addEventListener("click",function(t){e.config.expandToolbar=!e.config.expandToolbar,e.toggleExpandToolbar(e.config.expandToolbar)});var t=this.toolbar.querySelector("select.fontlist");console.log(t),Object.keys(this.config.fonts).forEach(function(e){var n=document.createElement("option");n.innerHTML=e,n.style.fontSize="large",n.style.fontFamily=e,t.appendChild(n)}),t.addEventListener("change",function(t){var n=t.target.options[t.target.selectedIndex].innerHTML;e.findByOcrClass().forEach(function(e){e.style.fontFamily=n}),e.onConfigChange()}),Object.keys(this.config.features).forEach(function(t){var n=document.createElement("li"),o=document.createElement("input"),r=document.createElement("label");n.appendChild(o),n.appendChild(r),e.toolbar.querySelector(".features").appendChild(n),r.innerHTML=t,o.setAttribute("type","checkbox"),o.checked=e.config.features[t].enabled,n.classList.toggle("checked",o.checked);n.addEventListener("click",function(r){o.checked=!o.checked,n.classList.toggle("checked"),e.config.features[t].enabled=o.checked,e.toggleFeature(t,o.checked)}),o.addEventListener("change",function(r){n.classList.toggle("checked",o.checked),e.config.features[t].enabled=o.checked,e.toggleFeature(t,o.checked)})});this.toolbar.querySelector('input[type="range"].zoom').addEventListener("input",function(t){return e.scaleTo(t.target.value/100)});var n=!0,o=!1,r=void 0;try{for(var a,i=this.toolbar.querySelectorAll("button.zoom")[Symbol.iterator]();!(n=(a=i.next()).done);n=!0){a.value.addEventListener("click",function(t){return e.scaleTo(t.target.dataset.scaleFactor)})}}catch(e){o=!0,r=e}finally{try{!n&&i.return&&i.return()}finally{if(o)throw r}}}}},{key:"scaleTo",value:function(e){var t=this.root.querySelector(".ocr_page"),n=this.parser.bbox(document.querySelector(".ocr_page"));"height"===e?e=window.innerHeight/n[3]:"width"===e?e=window.innerWidth/n[2]:"original"===e&&(e=1),t.style.transform="scale("+e+")",t.style.transformOrigin="top left",this.toolbar.querySelector("span.zoom").innerHTML=Math.floor(1e4*e)/100}},{key:"onConfigChange",value:function(){var e=this;Object.keys(this.config.features).forEach(function(t){e.toggleFeature(t,e.config.features[t].enabled)})}},{key:"init",value:function(){var e=this;this.root.classList.add(this.config.rootClass),this.config.enableToolbar&&this.addToolbar(),this.placeOcrElements(),this.onConfigChange(),window.addEventListener("resize",function(){return e.onConfigChange()})}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.HocrParser=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,[{key:"parseTitle",value:function(e){e=this._titleString(e);for(var t=0;t<e.length;t++);}},{key:"bbox",value:function(e){return this._titleString(e).match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/).slice(1).map(function(e){return parseInt(e)})}},{key:"image",value:function(e){return this._titleString(e).match(/image\s+"([^"]+)"/)[1]}},{key:"_titleString",value:function(e){return"string"==typeof e?e:e.getAttribute("title")}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}return o(e,null,[{key:"addCssFragment",value:function(e,t){var n=document.querySelector("#"+e);n||((n=document.createElement("style")).id=e,document.head.appendChild(n)),n.appendChild(document.createTextNode(t))}}]),e}();t.default=r}]);