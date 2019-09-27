function adicionarGastos(tabela) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
                var data = snapshot.val(); 
                tabela.rows.add([data]).draw();
                var dNow = new Date();
                var localidade = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
                $("#atualizacao-tabela").text("Última atualização: " + localidade)
            })
        }
    })
};

