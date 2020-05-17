/* JS by ATaylor, 2020 */

//function to instantiate the map
function createMap(){
    //create map
    var map = L.map('mapid', {
        center: [61.520411, -143.843618],
        zoom: 7,
        zoomControl: false
    });
    var zoomHome = L.Control.zoomHome();
    zoomHome.addTo(map);

    //add tile layer..

   var crwp_basemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/ck931k72v2pud1jqkxdv2rgml/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'ataylor34',
        //tileSize: 512,
        //zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXRheWxvcjM0IiwiYSI6ImNqdzFhYjF4ZzBqdDUzeXF2bHV5a215d2YifQ.8-xYAavjK01eVX1CuWTKSw'
    }).addTo(map);
    
    var crwp_basemap2 = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/ck931k72v2pud1jqkxdv2rgml/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'ataylor34',
        //tileSize: 512,
        //zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXRheWxvcjM0IiwiYSI6ImNqdzFhYjF4ZzBqdDUzeXF2bHV5a215d2YifQ.8-xYAavjK01eVX1CuWTKSw'
    });
    var miniMap = new L.Control.MiniMap(crwp_basemap2, {toggleDisplay: true}).addTo(map);
    
    var sat_basemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/cka9uyidl1s351inrxiapji13/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'ataylor34',
        //tileSize: 512,
        //zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYXRheWxvcjM0IiwiYSI6ImNqdzFhYjF4ZzBqdDUzeXF2bHV5a215d2YifQ.8-xYAavjK01eVX1CuWTKSw'
    }).addTo(map);
    

    
    //call getData function
    getData(map);
    


//function to convert markers to circle markers
function pointToLayer (feature, latlng){
    //determine which attribute to visualize with prop symbol
    var attribute = "ProjectName";
    var att2 = "GroupName";
    
    var colors = {
        'Invasive Plants': '#44B3B2',
        'Fish Habitat Monitoring & Restoration': '#A3E3E3',
        'Tourism & Recreation Resources': '#493A33',
        'Watershed Education': '#F16C20'        
    };
    
    //create marker options
    var options = {
        radius: 7,
        fillColor: colors[feature.properties[att2]],
        color: '#faffff',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    
    //create circle marker layer
    var layer = L.circleMarker(latlng, options);
    
    //build panel content
    var panelContent = "<p><b>Project Name:</b> " + feature.properties[attribute] + "</p>";
    
    //add formatted attribute to panel content string
    var description = "Description";
    panelContent += "<p><b>Description:</b> " + feature.properties.Description + "</p>";
    


    //add formatted attribute to panel content string
    var byTheNumbers = "By the Numbers";
    panelContent += "<p><b>By the Numbers:</b> " + feature.properties.Details + "</p>";
    
    //add formatted attribute to panel content string
    //var species = "Species";
    //panelContent += "<p><b>Species:</b> " + feature.properties.Species + "</p>";
    
    //add formatted image to panel content string
    var image = "media URL";
    panelContent += "<p> " + '<a href="' + feature.properties.mediaURL +'" target="blank">' +
'<img src="' + feature.properties.mediaURL +'" style="width:100px;height:100px;">'
+ '</a>' + "</p>";
    
    //add formatted attribute to panel content string
    var contact = "Contact";
    panelContent += "<p><b>For more information:</b> " + '<a href="' + feature.properties.URLs +'" target="blank">Visit this page</a>' + "</p>";
    
   // "<a href=\"" + feature.properties.URLs + " +nr+"\""+" target=\"_blank\">Visit this page</a>";
    
    //build popup content string
    var popupContent = "<p><b>Project:</b> " + feature.properties["LayerName"] + "</p>";
    
    //bind the popup to circle marker
    layer.bindPopup(popupContent, {
        offset: new L.Point(0, -options.radius),
        closeButton: false
    });
    
    //event listener to open popoup on hover
    layer.on({
        mouseover: function(){
            this.openPopup();
        },
        mouseout: function(){
            this.closePopup();
        },
        click: function(){
            $("#panel").html(panelContent);
        }
    });
    
    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
    
};
    

//add circle markers for point features to map
function createPropSymbols(data, map){
    
    var invasiveLayer = L.geoJSON(data, {
        pointToLayer: pointToLayer,
        filter: invasiveFilter
    }).addTo(map);
    
    function invasiveFilter(feature) {
        if (feature.properties.GroupName === "Invasive Plants") return true
        };
    
    var eduLayer = L.geoJSON(data, {
        pointToLayer: pointToLayer,
        filter: eduFilter
    }).addTo(map);
    
    function eduFilter(feature) {
        if (feature.properties.GroupName === "Watershed Education") return true
        };
    
    var tourismLayer = L.geoJSON(data, {
        pointToLayer: pointToLayer,
        filter: tourismFilter
    }).addTo(map);
    
    function tourismFilter(feature) {
        if (feature.properties.GroupName === "Tourism & Recreation Resources") return true
        };
    
        var fishLayer = L.geoJSON(data, {
        pointToLayer: pointToLayer,
        filter: fishFilter
    }).addTo(map);
    
    function fishFilter(feature) {
        if (feature.properties.GroupName === "Fish Habitat Monitoring & Restoration") return true
        };
    
    
    //create a Leaflet GeoJSON layer and add to map
//    L.geoJSON(data, {
//        pointToLayer: pointToLayer
//    }).addTo(map);
    
    //var plantTest = L.layerGroup([pointToLayer]);
    
    var baseMaps = {
        "CRWP Theme": crwp_basemap,
        "Satellite": sat_basemap,
    };

    
    var overlayTest = {
        "Watershed Education": eduLayer,
        "Fish Passage & Habitat Restoration": fishLayer,
        "Invasive Plants": invasiveLayer,
        "Tourism & Recreation Resources": tourismLayer,
        
    };
    
    L.control.layers(baseMaps, overlayTest, {
        collapsed: true,
    }).addTo(map);
};




//function to retreive data and place on map
function getData(map){
    //load invasive plant data
     $.ajax({
         url: "data/comboData1.geojson",
         dataType: "json",
         success: function(response){
            //call function to create prop symbols
            createPropSymbols(response, map);
        }
    });
    //load tourism data
//    var tourismRecreation = $.ajax({
//         url: "data/tourism1.geojson",
//         dataType: "json",
//         success: function(response){
//            //call function to create prop symbols
//            createPropSymbols(response, map);
//        }
//    });
};
};


$(document).ready(createMap);


