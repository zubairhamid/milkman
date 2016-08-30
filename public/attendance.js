$(document).ready(function() {
    $('#checkInData').DataTable();

    $.ajax({
        type:"GET",
        dataType: "json",
        crossOrigin: true,
        url:"https://my.linqs.in/conf/1/rooms",
        success : function (result) {
            console.log(result);
        },
        error : function (result) {
            console.log(result);
        }
    });

    $("#roomIdSelect").on('change', function () {
        console.log($(this).val());
        var roomId = $(this).attr('id');
        $.ajax({
            type: "POST",
            data: {"confId": "1", "roomId": roomId},
            dataType: "json",
            crossOrigin: true,
            url: "https://my.linqs.in/conf/room/stats",
            success: function (result) {
                console.log(result);
            },
            error: function (result) {
                console.log(result);
            }
        });
    });
} );