var ip_cws = L.marker([62.287433, -145.368734]).bindPopup('Community Weed Smackdown');

//cooperative weed mngt areas
var ip_cb_cwma = L.marker([62.121657, -145.351533]).bindPopup('Copper Basin CWMA'),
    ip_cdv_cwma = L.marker([60.545474, -145.748506]).bindPopup('Cordova CWMA');

//plants layergroup class
var plants = L.layerGroup([ip_cdv_cwma, ip_cb_cwma]);

//basemap class
    var baseMaps = {
        "CRWP map": crwp_basemap,
    };
    
    var overlayMaps = {
        "Community Weed Smackdown": ip_cws,
        "Cooperative Weed Management Areas": plants,
    };
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);