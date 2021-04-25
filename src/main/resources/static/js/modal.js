$(document).ready(function () {
    $(document).delegate('.editBtn', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (user) {
            $('#hiddenId').val(user.id);
            $('#idEdit').val(user.id);
            $('#firstNameEdit').val(user.firstName);
            $('#lastNameEdit').val(user.lastName);
            $('#ageEdit').val(user.age);
            $('#passwordHiddenEdit').val(user.password);
            $('#emailEdit').val(user.email);
        });
        $('#editModal').modal();
    });


    $(document).delegate('.deleteBtn', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (user) {
            $('#hiddendeleteId').val(user.id);
            $('#idDelete').val(user.id);
            $('#firstNameDelete').val(user.firstName);
            $('#lastNameDelete').val(user.lastName);
            $('#ageDelete').val(user.age);
            $('#emailDelete').val(user.email);
        });
        $('#deleteModal').modal();
    });


    $(document).delegate('.editMagazineBtn', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (magazine) {
            $('#hiddenMagazineId').val(magazine.id);
            $('#idMEdit').val(magazine.id);
            $('#nameEdit').val(magazine.name);
            $('#authorEdit').val(magazine.author);
            $('#editionEdit').val(magazine.edition);
            $('#publisherEdit').val(magazine.publisher);
            $('#languageEdit').val(magazine.language);
            $('#typeEdit').val(magazine.type);
            $('#pageEdit').val(magazine.page);
            $('#readerEdit').val(magazine.reader);
            $('#statusEdit').val(magazine.status);
        });
        $('#editModalMagazine').modal();
    });

    $(document).delegate('.deleteMagazineBtn', 'click', function () {
        event.preventDefault();
        var href = $(this).attr('href');

        $.get(href, function (magazine) {
            $('#hiddenMDeleteId').val(magazine.id);
            $('#idMDelete').val(magazine.id);
            $('#nameDelete').val(magazine.name);
            $('#authorDelete').val(magazine.author);
            $('#editionDelete').val(magazine.edition);
            $('#publisherDelete').val(magazine.publisher);
            $('#languageDelete').val(magazine.language);
            $('#typeDelete').val(magazine.type);
            $('#pageDelete').val(magazine.page);
            $('#readerDelete').val(magazine.reader);
            $('#statusDelete').val(magazine.status);
        });
        $('#deleteModalMagazine').modal();
    });
});