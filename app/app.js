/**
 * Created by Daniel on 08/10/2016.
 */

require([
    // ArcGIS JS
    "esri/views/MapView",
    "esri/Map",
    "esri/widgets/Legend",
    "esri/portal/PortalItem",
    "esri/layers/FeatureLayer",
    "esri/layers/TileLayer",
    // Bootstrap
    "bootstrap/Collapse",

    // Calcite-maps
    "calcite-maps/calcitemaps-v0.2",
    "dojo/domReady!"
], function(MapView, Map, Legend, PortalItem, FeatureLayer, TileLayer) {

    // Webmap
    var map = new Map({
            basemap: "streets"
        }
    );

    // View
    var view = new MapView({
        map: map,
        container: "mapViewDiv",
        padding: {
            top: 50
        },
        center: [ -74.0817500,4.6097100], // Sets the center point of the view at a specified lon/lat
        zoom: 15 // Sets the zoom LOD to 13
    });


    //add layers
    var fl2 = new TileLayer({
        url: "https://tiles.arcgis.com/tiles/4yjifSiIG17X0gW4/arcgis/rest/services/PopulationDensity_Bogota/MapServer"
        ,outFields : ["*"]
    });

    var fl = new FeatureLayer({
        url: "https://services2.arcgis.com/NFAaR7TquHkVlqVD/arcgis/rest/services/Colegios_Bogota/FeatureServer/0"
        ,outFields : ["*"]
    });

    var template = {
        title: "School information {OBJECTID}",
        content: "{PopupInfo}"
    };
    console.log(fl);
    console.log(fl2);
    fl.popupTemplate = template;

   // view.then(function(){
     //   var legend = new Legend({
       //     view: view,
         //   layerInfos:{
          //      title:'Schools',
            //    layer:fl
            //}
        //});
        //view.ui.add(legend, "bottom-right");
        //});

    console.log(fl2);
    map.add(fl2);  // adds the layer to the map

    map.add(fl);  // adds the layer to the map



});