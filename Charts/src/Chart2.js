document.addEventListener("DOMContentLoaded", function() {
    // Sample data for Date, ActiveStorageCapacity, and ConsentedContingentStorageCapacity
    const labels = ["1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020", "2030"];
    const activeStorageData = [154.262, 269.466, 298.136, 1161.760, 1702.483, 1767.735, 1767.735, 1767.735, 587.113];
    const consentedStorageData = [0.0, 0.0, 80.760, 0.0, 0.0, 0.0, 0.0, 545.702, 0.0];

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
});