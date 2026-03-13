// Initialize Chart
const ctx = document.getElementById('historyChart').getContext('2d');
const historyChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time stamps
        datasets: [{ label: 'Water Level (%)', data: [], borderColor: 'blue' }]
    }
});

// Function to fetch data from your backend
async function updateDashboard() {
    const response = await fetch('/api/get-latest-data');
    const data = await response.json();

    document.getElementById('level').innerText = data.level;
    document.getElementById('tds').innerText = data.tds;
    document.getElementById('temp').innerText = data.temp;

    // Logic to push to chart...
    historyChart.data.labels.push(new Date().toLocaleTimeString());
    historyChart.data.datasets[0].data.push(data.level);
    historyChart.update();
}

setInterval(updateDashboard, 5000); // Update every 5 seconds
