$(function () { 
    $(".datepicker").datepicker({  
        format: 'yyyy-mm-dd',
        autoclose: true,
    });
    $(".datepicker").datepicker('setDate', new Date());
});

function getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();

    
}

