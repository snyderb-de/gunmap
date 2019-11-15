import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import mapStyles from './map-styles';

// set the sourceData

const sourceData = './gundata.json';

// build the scatterplot using scatterployLayer

const scatterplot = () =>
    new ScatterplotLayer({
        id: 'scatter',
        data: sourceData,
        opacity: 0.8,
        filled: true,
        radiusMinPixels: 2,
        radiusMaxPixels: 5,
        getPosition: d => [d.longitude, d.latitude],
        getFillColor: d => (d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100]),

        pickable: true,
        onHover: ({ object, x, y }) => {
            // use el to identify DOM elements
            const el = document.getElementById('tooltip');
            if (object) {
                const { n_killed, incident_id } = object;
                el.innerHTML = `<h1>ID ${incident_id}</h1>`; // incident_id is from the data source and thus why it is not camelcase and also why eslint camel case rules are off for this file
                el.style.display = 'block';
                el.style.opacity = 0.9;
                el.style.left = `${x}px`;
                el.style.top = `${y}px`;
            } else {
                el.style.opacity = 0.0;
            }
        },

        // send user to the Gun Violence Archive incident page when they click on a plot point

        onClick: ({ object, x, y }) => {
            window.open(`https://www.gunviolencearchive.org/incident/${object.incident_id}`);
        },
    });

// add the heatmap layer from deck, identify it, link data to sourceData, get positions and set size

const heatmap = () =>
    new HeatmapLayer({
        id: 'heat',
        data: sourceData,
        getPosition: d => [d.longitude, d.latitude],
        // eslint-disable-next-line prettier/prettier
        getWeight: d => d.n_killed + (d.n_injured * 0.5),
        radiusPixels: 60,
    });

// add the 3D hexagon layer from deck, id, data, position and style it
const hexagon = () =>
    new HexagonLayer({
        id: 'hex',
        data: sourceData,
        getPosition: d => [d.longitude, d.latitude],
        // eslint-disable-next-line prettier/prettier
        getElevationWeight: d => (d.n_killed * 2) + d.n_injured,
        elevationScale: 100,
        extruded: true,
        radius: 1609,
        opacity: 0.6,
        coverage: 0.88,
        lowerPercentile: 50,
    });

// call the initMap function when Google Maps is loaded

window.initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.0, lng: -100.0 },
        zoom: 5,
        styles: mapStyles,
    });

    const overlay = new GoogleMapsOverlay({
        layers: [scatterplot(), heatmap(), hexagon()],
    });

    overlay.setMap(map);
};
