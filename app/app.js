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
    "esri/config","esri/layers/CSVLayer",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/InfoTemplate",
    // Bootstrap
    "bootstrap/Collapse",

    // Calcite-maps
    "calcite-maps/calcitemaps-v0.2",
    "dojo/domReady!"
], function( Map, FeatureLayer, TileLayer, WMSLayer, query, Search,Popup,PopupTemplate, config,
             CSVLayer, Color, SimpleMarkerSymbol, SimpleRenderer, InfoTemplate) {

    config.defaults.io.corsEnabledServers.push("drive.google.com");


    // Map
    var map = new Map("mapViewDiv",{
        basemap: "osm",
        padding: {
            top: 50
        },
        center: [ -74.0817500,4.6097100], // Sets the center point of the view at a specified lon/lat
        zoom: 15 // Sets the zoom LOD to 13

    });


    //add layers

    //Schools Bogota
    var fl = new FeatureLayer("https://services2.arcgis.com/NFAaR7TquHkVlqVD/arcgis/rest/services/Colegios_Bogota/FeatureServer/0",{
        outFields : ["*"],
        infoTemplate: template
    });


    //Density of population
    var fl2 = new TileLayer("https://tiles.arcgis.com/tiles/4yjifSiIG17X0gW4/arcgis/rest/services/PopulationDensity_Bogota/MapServer"
    ,{opacity: 0.6});

    var template = new PopupTemplate({
        title: "Información de la institución {OBJECTID}",
        description: "{PopupInfo}"
    });


    map.addLayer(fl2);  // adds the layer to the map
    map.addLayer(fl);  // adds the layer to the map

    //create a layer from csv file from drive
   var csv = new CSVLayer("data/DinamicaEmpresarialFormato.csv",{
      columnDelimiter: ","
    });
    var orangeRed = new Color([238, 69, 0, 0.5]);
    var marker = new SimpleMarkerSymbol("solid", 30, null, orangeRed);

    // Establecemos el símbolo que se utilizará para
    // representar los datos
    var renderer = new SimpleRenderer(marker);
    csv.setRenderer(renderer);

    // Y asociamos un pequeño modal con información extra.
    var template = new InfoTemplate();
    template.setTitle("${geografia_nombre}");
    template.setContent( "<b>Indicador:</b> ${Indicador} <br/>"+
                            "<b>Valor:</b> ${Valor}<br/>"+
                            "<b>Fecha:</b> ${Mes}<br/>"+
                            "<b>Actividad:</b> ${Actividad_Economica}");
    csv.setInfoTemplate(template);
    map.addLayer(csv);

    //wire event handlers to ensure that the layer which attempts to draw 1000 polygon graphics isn't visible while zooming
    fl.on("zoom-start", function() {
        fl.setVisibility(false);
    });

    fl.on("zoom-end", function() {
        fl.setVisibility(true);
    });

    fl2.on("zoom-start", function() {
        fl2.setVisibility(false);
    });

    fl2.on("zoom-end", function() {
        fl2.setVisibility(true);
    });

    // Basemaps
    query("#selectBasemapPanel").on("change", function(e){
        map.setBasemap(e.target.options[e.target.selectedIndex].value);
    });

    //Search bar in a panel and in the nav
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

    //options to set the visibility of a layer
    query("#layer1").on("change", function setLayerVisibility()
    {
        map.getLayer("layer1").setVisibility(!map.getLayer("layer1").visible);
    });

    query("#graphicsLayer2").on("change", function setLayerVisibility()
    {
        map.getLayer("graphicsLayer2").setVisibility(!map.getLayer("graphicsLayer2").visible);
    });
    query("#graphicsLayer3").on("change", function setLayerVisibility()
    {
        map.getLayer("graphicsLayer3").setVisibility(!map.getLayer("graphicsLayer3").visible);
    });
    //Sets initialVisibility of the layers in the checkboxes
    function initialVisibility()
    {
        var layersIds = [];

        layersIds = map.layerIds;
        layersIds = layersIds.concat(map.graphicsLayerIds);
        console.log(layersIds);
        layersIds.forEach(function (l) {
                if(l != "layer0")
                {
                    document.getElementById(l).checked = map.getLayer(l).visible;
                }
        });


    }
    initialVisibility();

});