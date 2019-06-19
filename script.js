mapboxgl.accessToken = 'pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoic2YyV2luUSJ9.lPoix24JhyR8sljAwjHg9A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 13,
    center: [-77.0369, 38.9072]
});

// This is from Daniel Schep: https://gbfs2geojson.glitch.me/
// Converts GBFS to GeoJSON
var birdurl = 'https://gbfs2geojson.glitch.me/bikes?status=https%3A%2F%2Fgbfs.bird.co%2Fdc';
var limeurl = 'https://gbfs2geojson.glitch.me/bikes?status=https%3A%2F%2Flime.bike%2Fapi%2Fpartners%2Fv1%2Fgbfs%2Ffree_bike_status.json';

map.on('load', function () {
    // Enable for updates at set interval
    // window.setInterval(function() {
    //     map.getSource('bird').setData(birdurl);
    //     map.getSource('lime').setData(limeurl);
    // }, 10000);

    map.addSource('bird', {
        type: 'geojson', data: birdurl
    });
        map.addLayer({
        "id": "bird",
        "type": "symbol",
        "source": "bird",
        "layout": {
            "icon-image": "skateboard-15"
        }
    });

    map.addSource('lime', {
        type: 'geojson', data: limeurl
    });
        map.addLayer({
        "id": "lime",
        "type": "symbol",
        "source": "lime",
        "layout": {
            "icon-image": "rocket-15"
        }
    });

    var toggleableLayerIds = [ 'bird', 'lime' ];

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        var id = toggleableLayerIds[i];

        var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.textContent = id;

        link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
                map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                this.className = '';
            } else {
                this.className = 'active';
                map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
            }
        };

        var layers = document.getElementById('menu');
        layers.appendChild(link);
    }
})
