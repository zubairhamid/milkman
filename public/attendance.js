$(document).ready(function() {
    $('#checkInData').DataTable();

    $.ajax({
        type:"GET",
        dataType: "json",
        crossOrigin: true,
        url:"https://my.linqs.in/conf/1/rooms",
        success : function (result) {
            console.log(result);
            RoomListUpdate(result);
        },
        error : function (result) {
            console.log(result);
        }
    });

    var RoomListUpdate = function(result){
        var value = "";
        for(var i=0;i<result.length;i++){
            value = value + "<option id='"+result[i].roomId+"'>"+result[i].roomName+"</option>"
        }
    };

    $("#roomIdSelect").on('change', function () {
        console.log($(this).val());
        var roomId = $(this).attr('id');
        console.log(roomId);
        /*$.ajax({
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
        });*/
    });
} );