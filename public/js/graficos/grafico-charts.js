var g_Linha = grafico_linear()

var g_Barras = grafico_barras()
function carregarTabelas() {



    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
                var item = snapshot.val();
                atualizaG_linear(g_Linha, item)

                atualizaG_barras(g_Barras, item)

            })
            
            var tabelas = $(".atualizacao-tabela")
            tabelas.each(function () {
                $(this).text("Ultima Atualização: " + moment().format("D/M/Y, h:mm:ss a"));
            });
            
        }
    });

}

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
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
function atualizaG_linear(grafico, data) {

    var meses = grafico.data.datasets[0].data
    var dataItem = new Date(data.time);

    var dataAtual = new Date();

    if (dataItem.getFullYear() == dataAtual.getFullYear()) {
        meses[dataItem.getMonth()] += Number(data.valor)
        grafico.data.datasets[0].data = meses
    }
    grafico.update()
}


function grafico_barras() {
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: "Gastos Anuais",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,0,216,1)",
                data: [],
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'year'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 0,
                        maxTicksLimit: 30
                    },
                    gridLines: {
                        display: true
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });
    return myLineChart
}
function atualizaG_barras (grafico, item) {
    var anos = grafico.data.labels
    var registro = grafico.data.datasets[0].data

    var max = grafico.options.scales.yAxes[0].ticks.max
    var maximo_array = Math.max.apply(null, registro);

    var anoItem = moment(item.time).year()
    var gasto = Number(item.valor)

    if(anos.indexOf(anoItem) == -1){
        anos.push(anoItem)
        registro.push(0)
    }

    if (max < (maximo_array)) {
        grafico.options.scales.yAxes[0].ticks.max += maximo_array  
    }

    registro[anos.indexOf(anoItem)] += gasto

    grafico.data.labels = anos
    grafico.data.datasets[0].data = registro
    grafico.update()
}