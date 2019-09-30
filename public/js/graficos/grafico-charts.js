var g_Linha = grafico_linear()

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var meses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
            var item = snapshot.val();

            var dataItem = new Date(item.time);

            var dataAtual = new Date();

            if (dataItem.getFullYear() == dataAtual.getFullYear()) {
                meses[dataItem.getMonth()] += Number(item.valor)
                g_Linha.data.datasets[0].data = meses
                g_Linha.update()
            }
        })


    }
});



function grafico_linear() {
    var grafico_linha = $("#grafico-linear")
    var chart = new Chart(grafico_linha, {
        type: 'line',
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Agos", "Set", "Out", "Nov", "Dez"],
            datasets: [{
                label: "Gasto",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 5000,
                        maxTicksLimit: 20
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });
    return chart

}