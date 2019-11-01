var g_Linha = grafico_linear()
var graficos = gerar_graficos_anuais()

function removeG_Charts(item) {
    item.valor = Number(item.valor) * -1
    atualizaG_linear(g_Linha, item)
}

function carregarTabelas() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $("#imagem-perfil").attr("src", user.photoURL)
            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
                var item = snapshot.val();
                atualizaG_linear(g_Linha, item)
                atualizaG_meses(item)
            })

            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_removed", function (snapshot) {
                removeG_Charts(snapshot.val())
            })
            var tabelas = $(".atualizacao-tabela")
            tabelas.each(function () {
                $(this).text("Ultima Atualização: " + moment().format("D/M/Y, h:mm:ss a"));
            });
        }
    });
}

function grafico_linear() {
    var ctx = $("#grafico-linear");
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
            datasets: [{
                label: "1º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#C0C0C0",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "2º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#6b6b6b",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "3º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#464646",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "4º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#2d2d2d",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "5º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#000000",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
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
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 300,
                        maxTicksLimit: 300
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
    var dataItem = new Date(data.time);
    var hoje = new Date()
    if (dataItem.getMonth() == hoje.getMonth()) {
        var semanas = grafico.data.datasets
        var inicio_mes = new Date(dataItem.getFullYear(), dataItem.getMonth(), 1)

        var qtdsemana = 0

        for (let index = 0; index < dataItem.getDate(); index++) {
            if (inicio_mes.getDay() == 0) { qtdsemana += 1 }
            inicio_mes.setDate(inicio_mes.getDate() + 1)
        }
        semanas[qtdsemana].data[dataItem.getDay()] += Number(data.valor)
        grafico.update()
    }

}


function atualizaG_meses(data) {
    var dataItem = new Date(data.time);
    var hoje = new Date(data.time)
    var grafico = graficos[hoje.getMonth()]
    if (dataItem.getMonth() == hoje.getMonth()) {
        var semanas = grafico.data.datasets
        var inicio_mes = new Date(dataItem.getFullYear(), dataItem.getMonth(), 1)

        var qtdsemana = 0

        for (let index = 0; index < dataItem.getDate(); index++) {
            if (inicio_mes.getDay() == 0) { qtdsemana += 1 }
            inicio_mes.setDate(inicio_mes.getDate() + 1)
        }
        semanas[qtdsemana].data[dataItem.getDay()] += Number(data.valor)
        grafico.update()
    }

}

function grafico_meses(id) {
    var ctx = $(`#${id}`);
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            datasets: [{
                label: "1º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#C0C0C0",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "2º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#6b6b6b",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "3º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#464646",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "4º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#2d2d2d",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
            }, {
                label: "5º Sem - Gasto",
                lineTension: 0.3,
                backgroundColor: "#00000026",
                borderColor: "#000000",
                pointRadius: 5,
                pointBackgroundColor: "#A9A9A9",
                pointBorderColor: "#000000",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#696969",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: [0, 0, 0, 0, 0, 0, 0],
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
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 300,
                        maxTicksLimit: 300
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

function gerar_graficos_anuais() {
    var meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
    
    var graficos = [ ]

    for (let index = 0; index < meses.length; index++) {
        const mes = meses[index];
        graficos.push(grafico_meses(mes))
    }
    return graficos
}