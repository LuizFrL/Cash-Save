var evniar = $("#encaminhar")



evniar.click(function () {
    var form = $(".compra")
    var user = firebase.auth().currentUser.uid;

    var data = {}


    form.each(function () {
        var input = $(this)
        if (input.val() == '') {
            input.addClass('border border-danger')
        } else {
            input.removeClass('border border-danger')
            data[input.data("firebase")] = input.val()
        }
    })

    if (Object.keys(data).length == 5) {
        firebase.database().ref("/usuarios/" + user + "/gastos").push(data)
            .catch(error => {
                console.log(error);

            })
        form.each(function () {
            $(this).val('')
        })
        var dNow = new Date();
        var localidade = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
        $("#confirmacao").text('Última Atualização: ' + localidade)
        $("#confirmacao").addClass('border-success')
        $("#confirmacao").removeClass('border-danger')

    } else {
        $("#confirmacao").addClass('border-danger')
        $("#confirmacao").removeClass('border-success')
        $("#confirmacao").text('Preencha todos os dados necessários.')
    }


})
