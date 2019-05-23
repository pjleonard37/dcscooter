mapboxgl.accessToken = 'pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoic2YyV2luUSJ9.lPoix24JhyR8sljAwjHg9A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 13,
    center: [-77.0369, 38.9072]
});

// This is from Daniel Schep: https://gbfs2geojson.glitch.me/
// Converts GBFS to GeoJSON
var url = 'https://gbfs2geojson.glitch.me/bikes?status=https%3A%2F%2Fgbfs.bird.co%2Fdc';

map.on('load', function () {
    window.setInterval(function() {
        console.log(url);
        map.getSource('bird').setData(url);
    }, 2000);

    map.addSource('bird', {
        type: 'geojson', data: url
    });
        map.addLayer({
        "id": "bird",
        "type": "symbol",
        "source": "bird",
        "layout": {
            "icon-image": "skateboard-15"
        }
    });
})
