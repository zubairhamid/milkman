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
        var value = "<option id='default'>Select Room</option>";
        for(var i=0;i<result.length;i++){
            value = value + "<option id='"+result[i].roomId+"'>"+result[i].roomName+"</option>"
        }
        $("#roomIdSelect").html(value);
        $("#checkInData").DataTable({});
    };

    $("#roomIdSelect").on('change', function () {
        console.log($(this).val());
        var roomId = $("#roomIdSelect option:selected").attr('id');
        console.log(roomId);
        if(roomId == "default"){
            var selectedData = [];
            $("#sessionInfo").html('<li class="list-group-item">Empty</li> ');
            $('#checkInData').DataTable({
                destroy: true,
                aaData : selectedData
            });
        }else {
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
        }

    });

    var updateTable = function(data){
        var selectedData = [];var values = "";
        for(var i=0;i<data.confAttendees.length;i++){
            selectedData.push({
                "0" : data.confAttendees[i].name,
                "1" : data.confAttendees[i].inTime,
                "2" : data.confAttendees[i].outTime
            })
        }
        values = '<li class="list-group-item">Session Name : "'+data.sessionName+'"</li> <li class="list-group-item">Start Time : "'+data.startTime+'"</li>' +
            '<li class="list-group-item">End Time : "'+data.endTime+'"</li><li class="list-group-item">Total Attendees : "'+data.totalAttendees+'"</li>';
        $("#sessionInfo").html(values);

        $('#checkInData').DataTable({
            destroy: true,
            aaData : selectedData
        });
    }
} );