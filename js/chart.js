
function handleChart() {

    const chartX = ['14:00', '16:00', '18:00', '20:00', '22:00', '0:00', ' 2:00', '4:00', '6:00', '8:00', '10:00', '12:00'];
    let dataT1 = [12, 15, 3, 5, 10, 3, 12, 8, 3, 5, 2, 3]
    let dataT2 = [14, 11, 3, 12, 10, 3, 11, 6, 3, 5, 7, 4];
    let dataT3 = [3, 16, 9, 14, 5, 6, 10, 8, 3, 6, 11, 8];

    const ctx = document.getElementById('canvas').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartX,
            datasets: [{
                label: 'Top 1',
                data: dataT1,
                backgroundColor: 'transparent',
                borderColor: 'red',
                borderWidth: 2
            },
            {
                label: 'Top 1',
                data: dataT2,
                backgroundColor: 'transparent',
                borderColor: 'blue',
                borderWidth: 2
            },
            {
                label: 'Top 3',
                data: dataT3,
                backgroundColor: 'transparent',
                borderColor: 'green',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}