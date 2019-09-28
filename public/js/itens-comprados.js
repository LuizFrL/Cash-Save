var gIndex = graficoIndex();

function adicionarGastos(tabela) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            $("#imagem-perfil").attr('src', user.photoURL)
            var dias_gastos = [0, 0, 0, 0, 0, 0, 0, 0]
            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
                var data = snapshot.val();
                var dia_Semana = diasSemana(data.data)
                
                dias_gastos[dia_Semana] += Number(data.valor)
                gIndex.data.datasets[0].data = dias_gastos
                gIndex.update()

                data.valor = Number(data.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                tabela.rows.add([data]).draw();
                var dNow = new Date();
                var localidade = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
                $("#atualizacao-tabela").text("Última atualização: " + localidade)
            })
        }
        
    })
};

