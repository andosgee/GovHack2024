document.addEventListener("DOMContentLoaded", function() {
    // Summed data for each energy source (replace these with your actual summed values)
    const energySourceLabels = ["Coal", "Diesel", "Gas", "Geo", "Hydro", "Wind", "Wood"];
    const energySourceTotals = [
        1017200000,  // Total for Coal
        5000000,     // Total for Diesel
        600000000,   // Total for Gas
        100000000,   // Total for Geo
        800000000,   // Total for Hydro
        700000000,   // Total for Wind
        40000000     // Total for Wood
    ];

    const ctx = document.getElementById('energyPieChart').getContext('2d');
    const energyPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: energySourceLabels,
            datasets: [{
                data: energySourceTotals,
                backgroundColor: [
                    '#7030A0', // Coal
                    '#F79646', // Diesel
                    '#5D5553', // Gas
                    '#4F6228', // Geo
                    '#1F497D', // Hydro
                    '#00B0F0', // Wind
                    '#52190D'  // Wood
                ],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} GWh`;
                        }
                    }
                }
            }
        }
    });
});