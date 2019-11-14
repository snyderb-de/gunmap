// call the initMap function when Google Maps is loaded

window.initMap = () => {
    const map = new google.maps.Map(document.getElementById('map'), {
        // orient the map
        center: { lat: 40.0, lng: -100.0 },
        zoom: 5,
    });
};
