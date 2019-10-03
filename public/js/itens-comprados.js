var gIndex = graficoIndex();

function adicionarGastos(tabela) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $("#imagem-perfil").attr('src', user.photoURL)
            var dias_gastos = [0, 0, 0, 0, 0, 0, 0, 0]
            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
                var data = snapshot.val();
                if (itemInSemana(data.time)) {
                    var dia_Semana = new Date(data.time).getDay()
                    var graficoMax = gIndex.options.scales.yAxes[0].ticks

                    if (Number(data.valor) > graficoMax.max) {
                        var dataSetMax = Number(data.valor) + 50
                        graficoMax.max = dataSetMax
                        gIndex.update()

                    }

                    dias_gastos[dia_Semana] += Number(data.valor)
                    gIndex.data.datasets[0].data = dias_gastos

                    gIndex.update()
                }

                data.valor = Number(data.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                tabela.rows.add([data]).draw();


                $(".atualizacao-tabela").each(function () {
                    $(this).text("Última atualização: " + moment().format("D/M/Y, h:mm:ss a"))
                })
            })
        }
    })
};

function itemInSemana(item) {

    var dataAtual = new Date();
    dataAtual = new Date(dataAtual.setHours(0, 0, 0, 0))
    while (dataAtual.getDay() != 0) { dataAtual.setDate(dataAtual.getDate() - 1) }
    var domingo = dataAtual.getTime()
    var sabado = dataAtual.setDate(dataAtual.getDate() + 6)

    return item >= domingo && item <= sabado

}