require(["esri/map","esri/layers/FeatureLayer","esri/layers/ArcGISTiledMapServiceLayer","esri/layers/WMSLayer","dojo/query","esri/dijit/Search","esri/dijit/Popup","esri/dijit/PopupTemplate","esri/config","bootstrap/Collapse","calcite-maps/calcitemaps-v0.2","dojo/domReady!"],function(a,b,c,d,e,f,g,h,i){function j(a){var b=new f({map:k,enableHighlight:!1},a);return b.startup(),b}i.defaults.io.corsEnabledServers.push("http://serviciosgis.catastrobogota.gov.co/");var k=new a("mapViewDiv",{basemap:"streets",padding:{top:50},center:[-74.08175,4.60971],zoom:15}),l=new c("https://tiles.arcgis.com/tiles/4yjifSiIG17X0gW4/arcgis/rest/services/PopulationDensity_Bogota/MapServer",{opacity:.6});k.addLayer(l);var m=new h({title:"School information {OBJECTID}",description:"{PopupInfo}"}),n=new b("https://services2.arcgis.com/NFAaR7TquHkVlqVD/arcgis/rest/services/Colegios_Bogota/FeatureServer/0",{outFields:["*"],infoTemplate:m});k.addLayer(n);var o=new d("http://serviciosgis.catastrobogota.gov.co/arcgis/services/Mapa_Referencia/Mapa_Referencia/MapServer/WMSServer?request=GetCapabilities&service=WMS",{format:"png"});o.on("error",function(a){}),e("#selectBasemapPanel").on("change",function(a){k.setBasemap(a.target.options[a.target.selectedIndex].value)});j("searchNavDiv"),j("searchPanelDiv")});