$(document).ready(function () {
    getUserMagazines();

    /* List of user magazines */
    function getUserMagazines() {
        var id = $("#user-hidden-id").val();

        /* Clear all rows of table */
        $("#userMagazineTable").find("tr:gt(0)").remove();

        // DO GET
        $.ajax({
            type: "GET",
            url: "/api/user/magazine/" + id,
            success: function (json) {
                var tr = [];
                var url = "/api/user/magazine/status/";
                for (var i = 0; i < json.length; i++) {
                    if(json[i].status === "initial") {
                        tr.push('<tr bgcolor="#fce803">');
                    }else {
                        tr.push('<tr>');
                    }
                    tr.push('<td>' + json[i].id + '</td>');
                    tr.push('<td>' + json[i].name + '</td>');
                    tr.push('<td>' + json[i].author + '</td>');
                    tr.push('<td>' + json[i].edition + '</td>');
                    tr.push('<td>' + json[i].publisher + '</td>');
                    tr.push('<td>' + json[i].language + '</td>');
                    tr.push('<td>' + json[i].type + '</td>');
                    tr.push('<td>' + json[i].page + '</td>');
                    tr.push('<td>' + json[i].reader + '</td>');
                    tr.push('<td><a class=\'btn btn-primary userMagazineStatusReading\' id=' + json[i].id + ' href = ' + url + json[i].id + '>Reading</a></td>');
                    tr.push('<td><a class=\'btn btn-success userMagazineStatusRead\' id=' + json[i].id + ' href = ' + url + json[i].id + '>Read</a></td>');
                    tr.push('<td><a class=\'btn btn-danger userMagazineStatusSkip\' id=' + json[i].id + ' href = ' + url + json[i].id + '>Skip</a></td>');
                    tr.push('</tr>');
                }
                $("#userMagazineTable").append($(tr.join('')));
            }
        });
    }

    $(document).delegate('.userMagazineStatusReading', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');

        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: href,
            data: "reading",
            dataType: 'json'
        }).always(function () {
            getUserMagazines();
        });
    });

    $(document).delegate('.userMagazineStatusRead', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');
        console.log("sadas" + href);

        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: href,
            data: "read",
            dataType: 'json'
        }).always(function () {
            getUserMagazines();
        });
    });

    $(document).delegate('.userMagazineStatusSkip', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');

        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: href,
            data: "skip",
            dataType: 'json'
        }).always(function () {
            getUserMagazines();
        });
    });
});