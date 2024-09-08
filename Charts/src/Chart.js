// Wait for DOM to be loaded before executing the code
document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch and parse the CSV
    function loadCSV() {
        return fetch('src/EnergyStorageCapacity.csv')
            .then(response => response.text())
            .then(csvText => Papa.parse(csvText, { header: true, skipEmptyLines: true }).data);
    }

    // Create the chart with data after CSV is loaded
    function createChart(labels, activeStorageData, consentedStorageData) {
        const ctx = document.getElementById('capacityChart').getContext('2d');
        const capacityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Active Storage Capacity (GWh)',
                        data: activeStorageData,
                        borderColor: 'blue',
                        fill: false,
                    },
                    {
                        label: 'Consented Contingent Storage Capacity (GWh)',
                        data: consentedStorageData,
                        borderColor: 'red',
                        fill: false,
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Storage Capacity (GWh)'
                        }
                    }
                }
            }
        });
    }

    // Process the CSV data and extract the required columns
    loadCSV().then(data => {
        const labels = [];
        const activeStorageData = [];
        const consentedStorageData = [];

        data.forEach(row => {
            labels.push(row['Date']);  // Add Date column
            activeStorageData.push(parseFloat(row['ActiveStorageCapacityScheme_GWh']) || 0); // Add ActiveStorageCapacity column
            consentedStorageData.push(parseFloat(row['ConsentedContingentStorageCapacityScheme_GWh']) || 0); // Add ConsentedContingentStorageCapacity column
        });

        createChart(labels, activeStorageData, consentedStorageData);  // Create chart with fetched data
    });
});
