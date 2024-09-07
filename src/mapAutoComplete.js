google.maps.event.addDomListener(window, 'load', initialize);

function initialize(callback) {

    const center = { lat: 50.064192, lng: -130.605469 };
// Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
        north: center.lat + 0.1,
        south: center.lat - 0.1,
        east: center.lng + 0.1,
        west: center.lng - 0.1,
    };

    const options = {
        // bounds: defaultBounds,
        componentRestrictions: { country: "nz" },
        fields: ["formatted_address", "geometry", "name"],
        types: ["address"],
        strictBounds: true,
    };
    
    var input = document.getElementById('autocomplete_search');
    var autocomplete = new google.maps.places.Autocomplete(input, options);

    autocomplete.addListener('place_changed', function () {

        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });
}