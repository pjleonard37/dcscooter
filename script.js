mapboxgl.accessToken = 'pk.eyJ1IjoicGpsZW9uYXJkMzciLCJhIjoic2YyV2luUSJ9.lPoix24JhyR8sljAwjHg9A';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 13,
    center: [-77.0369, 38.9072]
});

// Converts GBFS to GeoJSON
// This is from Daniel Schep: https://gbfs2geojson.glitch.me/

// bike and scooter API infromation: https://ddot.dc.gov/page/dockless-api
var url2geojson = 'https://gbfs2geojson.glitch.me/bikes?status='
var birdurl = url2geojson + 'https%3A%2F%2Fgbfs.bird.co%2Fdc';
var limeurl = url2geojson + 'https%3A%2F%2Flime.bike%2Fapi%2Fpartners%2Fv1%2Fgbfs%2Ffree_bike_status.json';
var jumpurl = url2geojson + 'https%3A%2F%2Fdc.jumpbikes.com%2Fopendata%2Ffree_bike_status.json%0A';
var lyfturl = url2geojson + 'https%3A%2F%2Fs3.amazonaws.com%2Flyft-lastmile-production-iad%2Flbs%2Fdca%2Ffree_bike_status.json';
//var skipurl = url2geojson + 'https%3A%2F%2Fus-central1-waybots-production.cloudfunctions.net%2FdcFreeBikeStatus';
var spinurl = url2geojson + 'https%3A%2F%2Fweb.spin.pm%2Fapi%2Fgbfs%2Fv1%2Fwashington_dc%2Ffree_bike_status';

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

    map.addSource('jump', {
        type: 'geojson', data: jumpurl
    });
        map.addLayer({
        "id": "jump",
        "type": "symbol",
        "source": "jump",
        "layout": {
            "icon-image": "art-gallery-15"
        }
    });

    map.addSource('lyft', {
        type: 'geojson', data: lyfturl
    });
        map.addLayer({
        "id": "lyft",
        "type": "symbol",
        "source": "lyft",
        "layout": {
            "icon-image": "aquarium-15"
        }
    });

    // Skip is currenly offline
    // map.addSource('skip', {
    //     type: 'geojson', data: skipurl
    // });
    //     map.addLayer({
    //     "id": "skip",
    //     "type": "symbol",
    //     "source": "skip",
    //     "layout": {
    //         "icon-image": "airfield-15"
    //     }
    // });

    map.addSource('spin', {
        type: 'geojson', data: spinurl
    });
        map.addLayer({
        "id": "spin",
        "type": "symbol",
        "source": "spin",
        "layout": {
            "icon-image": "bank-15"
        }
    });

    var toggleableLayerIds = [ 'bird', 'lime', 'jump', 'lyft', 'spin' ];

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
