/**
 * Created by Daniel on 08/10/2016.
 */

require([
    // ArcGIS JS

    "esri/map",

    "esri/layers/FeatureLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/WMSLayer",
    "dojo/query",
    "esri/dijit/Search",
    "esri/dijit/Popup",
    "esri/dijit/PopupTemplate",
    "esri/config",
    // Bootstrap
    "bootstrap/Collapse",

    // Calcite-maps
    "calcite-maps/calcitemaps-v0.2",
    "dojo/domReady!"
], function( Map, FeatureLayer, TileLayer, WMSLayer, query, Search,Popup,PopupTemplate, config) {

    config.defaults.io.corsEnabledServers.push("http://serviciosgis.catastrobogota.gov.co/");


    // Map
    var map = new Map("mapViewDiv",{
        basemap: "streets",
        padding: {
            top: 50
        },
        center: [ -74.0817500,4.6097100], // Sets the center point of the view at a specified lon/lat
        zoom: 15 // Sets the zoom LOD to 13

    });


    //add layers
    var fl2 = new TileLayer("https://tiles.arcgis.com/tiles/4yjifSiIG17X0gW4/arcgis/rest/services/PopulationDensity_Bogota/MapServer"
    ,{opacity: 0.6});

      map.addLayer(fl2);  // adds the layer to the map

    var template = new PopupTemplate({
        title: "School information {OBJECTID}",
        description: "{PopupInfo}"
    });

    var fl = new FeatureLayer("https://services2.arcgis.com/NFAaR7TquHkVlqVD/arcgis/rest/services/Colegios_Bogota/FeatureServer/0",{
       outFields : ["*"],
      infoTemplate: template
    });

   map.addLayer(fl);  // adds the layer to the map

    //var wms = new WMSLayer("http://serviciosgis.catastrobogota.gov.co/arcgis/services/Mapa_Referencia/Mapa_Referencia/MapServer/WMSServer?request=GetCapabilities&service=WMS"
   // , {format: "png"});

  //  wms.on("error", function (response){
   //     console.log("Error: %s", response.error.message);
   // });

    //map.addLayer(wms);

    //wire event handlers to ensure that the layer which attempts to draw 1000 polygon graphics isn't visible while zooming
    fl.on("zoom-start", function() {
        featureLayer.setVisibility(false);
    });

    fl.on("zoom-end", function() {
        featureLayer.setVisibility(true);
    });

    fl2.on("zoom-start", function() {
        featureLayer.setVisibility(false);
    });

    fl2.on("zoom-end", function() {
        featureLayer.setVisibility(true);
    });
    // Basemaps
    query("#selectBasemapPanel").on("change", function(e){
        map.setBasemap(e.target.options[e.target.selectedIndex].value);
    });

    var app = {};
    // Search
    app.searchDivNav = createSearchWidget("searchNavDiv");
    app.searchWidgetPanel = createSearchWidget("searchPanelDiv");

    function createSearchWidget(parentId) {
        var search = new Search({
            map: map,
            enableHighlight: false
        }, parentId);
        search.startup();
        return search;
    }

});