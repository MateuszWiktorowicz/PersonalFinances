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

function isDateEarlierOrTheSame(date1, date2) {
    if (date1 <= date2) {
        return true;
    } else {
        return false;
    }
}

function checkIsDateInPeriod(startDate, endDate, operationDate) {
    var operationDate = new Date(operationDate).getTime();
    var startDate = new Date(startDate).getTime();
    var endDate = new Date(endDate).getTime();

    if (operationDate >= startDate && operationDate <= endDate) {
        return true;
    } else {
        return false;
    }
}
