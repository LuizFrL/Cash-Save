$(document).ready(function () {
  $('.slick').slick({
    slidesToShow: 2,
    slidesToScroll: 1
  })
  var table = $("#tabela-gastos").DataTable({
    createdRow: function (row) {
      $(row).addClass('linha-item')
   },
    columns: [
      { data: 'item' },
      { data: 'valor' },
      { data: 'local' },
      { data: 'data' },
      { data: 'obs' }
    ]
  })
  adicionarGastos(table);
})



