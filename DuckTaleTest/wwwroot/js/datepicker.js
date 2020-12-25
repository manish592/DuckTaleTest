var d = new Date()
var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
today = today.getFullYear() + "-" + today.getMonth()+1 + "-" + today.getDate();
var initilizeDatePicker = function (elementId) {
    $(elementId).datepicker({
        format: "yyyy-mm-dd", modal: true, header: false, footer: false, uiLibrary: 'bootstrap4',
        change: function (e) {
        }
    });
}
