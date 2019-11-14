/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer, HeatmapLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import mapStyles from './map-styles';

// call the initMap function when Google Maps is loaded

window.initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
        // orient the map
        center: { lat: 40.0, lng: -100.0 },
        zoom: 5,
    });
};
