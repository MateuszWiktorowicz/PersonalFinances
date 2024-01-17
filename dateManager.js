function confirmAccountOperationAdded() {
    $(".formButtons").after("<div class='text-center text-success operationAddInfo'>Operation successfully added!</div>");

    setTimeout(function() {
        $(".operationAddInfo").fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1500);
}