$(document).ready(function() {


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
        $("#roomIdSelect").html(value);
    };

    $("#roomIdSelect").on('change', function () {
        console.log($(this).val());
        var roomId = $("#roomIdSelect option:selected").attr('id');
        console.log(roomId);
        $.ajax({
            type: "POST",

            data: JSON.stringify({ "confId": "1", "roomId": roomId }),
            dataType: "json",
            crossOrigin: true,
            url: "https://my.linqs.in/conf/room/stats",
            success: function (result) {
                console.log(result);
                updateTable(result);
            },
            error: function (result) {
                console.log(result);
            }
        });
    });

    var updateTable = function(data){
        var selectedData = [];
        for(var i=0;i<data.confAttendees.length;i++){
            selectedData.push({
                "0" : data.confAttendees[i].name,
                "1" : data.confAttendees[i].inTime,
                "2" : data.confAttendees[i].outTime
            })
        }

        $('#checkInData').DataTable({
            destroy: true,
            aaData : selectedData
        });
    }
} );