require(["esri/views/MapView","esri/Map","esri/widgets/Legend","esri/portal/PortalItem","esri/layers/FeatureLayer","esri/layers/TileLayer","bootstrap/Collapse","calcite-maps/calcitemaps-v0.2","dojo/domReady!"],function(a,b,c,d,e,f){var g=new b({basemap:"streets"}),h=(new a({map:g,container:"mapViewDiv",padding:{top:50},center:[-74.08175,4.60971],zoom:15}),new f({url:"https://tiles.arcgis.com/tiles/4yjifSiIG17X0gW4/arcgis/rest/services/PopulationDensity_Bogota/MapServer",outFields:["*"]})),i=new e({url:"https://services2.arcgis.com/NFAaR7TquHkVlqVD/arcgis/rest/services/Colegios_Bogota/FeatureServer/0",outFields:["*"]}),j={title:"School information {OBJECTID}",content:"{PopupInfo}"};i.popupTemplate=j,g.add(h),g.add(i)});