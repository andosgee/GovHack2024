// scripts.js
window.onload = function() {
    const path = window.location.pathname;
    let page = path.split("/").pop();
    if (page === '') {
        page = 'index.html';
    }
    // console.log('Page loaded:', page);
    if (page === 'index.html') {
        displayQueryString();
        removeQueryString(); // Remove query string on page load
    }
    // console.log('Page loaded:', page);

};


function validateForm() {
    const searchTerm = document.forms["SearchForm"]["address"].value;
    if (searchTerm === "") {
        alert("Search term must be filled out");
        return false;
    }
    return true;
}

// Function to remove the query string from the URL
function removeQueryString() {
    const url = window.location.href;
    const cleanUrl = url.split('?')[0];
    window.history.replaceState({}, document.title, cleanUrl);
}

function displayQueryString() {
    const params = new URLSearchParams(window.location.search);
    const filterOptionMapping = {
        '_all': 'Everything',
        '_all_minus_extracts': 'Everything Except Extracts',
        '_reference': 'References',
        '_extracts': 'Extracts',
        '_normalised_technology': 'Normalised Technology',
        '_potential_applications': 'Potential Applications',
        '_normalised_application': 'Normalised Applications',
        '_technology': 'Technology',
        '_cases_or_examples': 'Cases or Examples'
    };

    if (params.has('answer')) {
        const answer = decodeURIComponent(params.get('answer'));
        for (const [key, value] of Object.entries(filterOptionMapping)) {
            if (answer.includes(key)) {
                document.getElementById('queryString').innerText = answer.replace(key, value);
                break;
            }
        }
    }
}
