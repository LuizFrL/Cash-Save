firebase.auth().onAuthStateChanged(user => {
    if (user) {
        firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
            var data = snapshot.val();

            var tr = montaTr(data);

            $("#gastos").prepend(tr)

            var dNow = new Date();
            var localidade = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();

            $("#atualizacao-tabela").text("Última atualização: " + localidade)
        })
    }
})

function montaTr(objeto) {
    var item = $("<td>").text(objeto.item)
    var valor = $("<td>").text(objeto.valor)
    var local = $("<td>").text(objeto.local)
    var data = $("<td>").text(objeto.data)
    var obs = $("<td>").text(objeto.obs)

    var tds = [item, valor, local, data, obs]
    var tr = $("<tr>")

    tds.forEach(td => {
        tr.append(td)
    })

    return tr

}
