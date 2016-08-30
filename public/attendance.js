$(document).ready(function() {
    $('#checkInData').DataTable();

    $.ajax({
        url:"https://my.linqs.in/conf/1/rooms",
        type:"GET",
        success: function (result) {
            console.log(result);
        },
        error : function () {

        }
    })
} );