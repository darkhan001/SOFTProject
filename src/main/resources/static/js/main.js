$(document).ready(function () {
    getListUsers();
    getAdminInfo();
    getListMagazines();
    getAllUsers();

    /* List of users */
    function getListUsers() {
        /* Clear all rows of table */
        $("#myTable").find("tr:gt(0)").remove();

        // DO GET
        $.ajax({
            type: "GET",
            url: "/api/read",
            success: function (json) {
                var tr = [];
                var url = "/api/read/";
                for (var i = 0; i < json.length; i++) {
                    tr.push('<tr>');
                    tr.push('<td>' + json[i].id + '</td>');
                    tr.push('<td>' + json[i].firstName + '</td>');
                    tr.push('<td>' + json[i].lastName + '</td>');
                    tr.push('<td>' + json[i].age + '</td>');
                    tr.push('<td>' + json[i].email + '</td>');
                    tr.push('<td>' + getRoleOfUserById(json[i].id) + '</td>');
                    tr.push('<td><a class=\'btn btn-info editBtn\' id=' + json[i].id + ' href = ' + url + json[i].id + '>Edit</a></td>');
                    tr.push('<td><a class=\'btn btn-danger deleteBtn\' id=' + json[i].id + ' href = ' + url + json[i].id + ' >Delete</a></td>');
                    tr.push('</tr>');
                }
                $("#myTable").append($(tr.join('')));
            }
        });
    }

    /* Admin Information table */
    function getAdminInfo() {
        var email = "";
        var roles = "";

        // DO GET
        $.ajax({
            type: "GET",
            url: "/api/authorizedUser",
            async: false,
            success: function (json) {
                $('#nameUser').val(json.firstName + ' ' + json.lastName);
                $('#emailUser').val(json.email);
                $('#ageUser').val(json.age);

                var tr = [];
                tr.push('<tr>');
                tr.push('<td>' + json.id + '</td>');
                tr.push('<td>' + json.firstName + '</td>');
                tr.push('<td>' + json.lastName + '</td>');
                tr.push('<td>' + json.age + '</td>');
                tr.push('<td>' + json.email + '</td>');
                email = json.email;
                tr.push('<td>' + getRoleOfUserById(json.id) + '</td>');
                roles = getRoleOfUserById(json.id);
                tr.push('</tr>');
                $("#adminInfoTable").append($(tr.join('')));
                $('#user-hidden-id').val(json.id);
            }
        });

        var p = document.getElementById("header-info");
        p.innerText = email;
    }

    /* List of magazines */
    function getListMagazines() {
        /* Clear all rows of table */
        $("#magazineTable").find("tr:gt(0)").remove();

        // DO GET
        $.ajax({
            type: "GET",
            url: "/api/magazine/",
            success: function (json) {
                var tr = [];
                var url = "/api/magazine/";
                for (var i = 0; i < json.length; i++) {
                    tr.push('<tr>');
                    tr.push('<td>' + json[i].id + '</td>');
                    tr.push('<td>' + json[i].name + '</td>');
                    tr.push('<td>' + json[i].author + '</td>');
                    tr.push('<td>' + json[i].edition + '</td>');
                    tr.push('<td>' + json[i].publisher + '</td>');
                    tr.push('<td>' + json[i].language + '</td>');
                    tr.push('<td>' + json[i].type + '</td>');
                    tr.push('<td>' + json[i].page + '</td>');
                    tr.push('<td>' + json[i].reader + '</td>');
                    tr.push('<td>' + json[i].status + '</td>');
                    tr.push('<td>' + json[i].registered + '</td>');
                    tr.push('<td>' + json[i].updated + '</td>');
                    tr.push('<td><a class=\'btn btn-info editMagazineBtn\' id=' + json[i].id + ' href = ' + url + json[i].id + '>Edit</a></td>');
                    tr.push('<td><a class=\'btn btn-danger deleteMagazineBtn\' id=' + json[i].id + ' href = ' + url + json[i].id + ' >Delete</a></td>');
                    tr.push('</tr>');
                }
                $("#magazineTable").append($(tr.join('')));
            }
        });
    }

    // ADD FORM
    $("#myForm").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        addUser();
        $("form").trigger("reset");
    });

    // DELETE FORM
    $("#deleteForm").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        deleteUser();
    });

    // UPDATE FORM
    $("#editForm").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        editUser();
        $("form").trigger("reset");
    });

    /* Save user */
    function addUser() {
        // PREPARE FORM DATA
        var formData = {
            firstName: $("#firstName").val(),
            lastName: $("#lastName").val(),
            age: $("#age").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            role: $("#role option:selected").text()
        };

        // DO POST
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/save",
            data: JSON.stringify(formData),
            dataType: 'json'
        }).always(function () {
            getListUsers();
        });
    }

    /* Delete user */
    function deleteUser() {
        var id = $("#hiddendeleteId").val();

        // DO DELETE
        $.ajax({
            type: "DELETE",
            url: "/api/delete/" + id,
            cache: false,
            success: function () {
                $('#deleteModal').modal('hide');
                getListUsers();
            }
        })
    }

    /* Edit user */
    function editUser() {
        var formData = {
            id: $("#hiddenId").val(),
            firstName: $("#firstNameEdit").val(),
            lastName: $("#lastNameEdit").val(),
            age: $("#ageEdit").val(),
            email: $("#emailEdit").val(),
            password: $("#passwordEdit").val(),
            role: $("#roleEdit option:selected").text()
        };

        if (formData.password == null || formData.password == "") {
            formData.password = $("#passwordHiddenEdit").val();
        }

        // DO PUT
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "/api/update",
            data: JSON.stringify(formData),
            dataType: 'json'
        }).always(function () {
            $('#editModal').modal('hide');
            getListUsers();
        });

    }

    /* List of roles of user */
    function getRoleOfUserById(id) {
        var roles = "";
        $.ajax({
            type: "GET",
            url: "/api/read/" + id + "/roles",
            async: false,
            success: function (result) {
                $.each(result, function (i, data) {
                    roles += data.name + " ";
                });
            }
        });
        return roles;
    }

    /* List of users for select */
    function getAllUsers() {
        var users = [];
        $.ajax({
            type: "GET",
            url: "/api/read",
            async: false,
            success: function (result) {
                $.each(result, function (i, data) {
                    users.push(data);
                });
            }
        });

        var select = document.getElementById("selectReader");
        var selectEdit = document.getElementById("readerEdit");
        var selectDelete = document.getElementById("readerDelete");
        var options = users;

        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt.lastName + " " + opt.firstName;
            el.value = opt.id;
            select.appendChild(el);
        }
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt.lastName + " " + opt.firstName;
            el.value = opt.id;
            selectEdit.appendChild(el);
        }
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt.lastName + " " + opt.firstName;
            el.value = opt.id;
            selectDelete.appendChild(el);
        }
    }

    // ADD FORM FOR MAGAZINE
    $("#magazineForm").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        addMagazine();
        $("form").trigger("reset");
    });

    // UPDATE FORM FOR MAGAZINE
    $("#editModalMagazine").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        editMagazine();
        $("form").trigger("reset");
    });

    // DELETE FORM FOR MAGAZINE
    $("#deleteFormMagazine").submit(function (event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        deleteMagazine();
    });

    /* Save magazine */
    function addMagazine() {
        // PREPARE FORM DATA
        var formData = {
            name: $("#name").val(),
            author: $("#author").val(),
            edition: $("#edition").val(),
            publisher: $("#publisher").val(),
            language: $("#language option:selected").text(),
            type: $("#type option:selected").text(),
            page: $("#page").val(),
            reader: $("#selectReader option:selected").val(),
        };

        // DO POST
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/api/magazine/save",
            data: JSON.stringify(formData),
            dataType: 'json'
        }).always(function () {
            getListMagazines();
        });
    }

    /* Edit magazine */
    function editMagazine() {
        var formData = {
            id: $("#hiddenMagazineId").val(),
            name: $("#nameEdit").val(),
            author: $("#authorEdit").val(),
            edition: $("#editionEdit").val(),
            publisher: $("#publisherEdit").val(),
            language: $("#languageEdit option:selected").text(),
            type: $("#typeEdit option:selected").text(),
            page: $("#pageEdit").val(),
            reader: $("#readerEdit option:selected").val(),
            status: $("#statusEdit option:selected").val(),
        };

        // DO PUT
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "/api/magazine/update",
            data: JSON.stringify(formData),
            dataType: 'json'
        }).always(function () {
            $('#editModalMagazine').modal('hide');
            getListMagazines();
        });

    }

    /* Delete magazine */
    function deleteMagazine() {
        var id = $("#hiddenMDeleteId").val();

        // DO DELETE
        $.ajax({
            type: "DELETE",
            url: "/api/magazine/delete/" + id,
            cache: false,
            success: function () {
                $('#deleteModalMagazine').modal('hide');
                getListMagazines();
            }
        })
    }
});