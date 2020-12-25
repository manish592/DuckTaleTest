var initilizeDatePicker = function (elementId) {
    $(elementId).datepicker({
        format: "yyyy-mm-dd", modal: true, header: false, footer: false, uiLibrary: 'bootstrap4',
        change: function (e) {
        }
    });
}
var initilize = function () {
    initilizeDatePicker("#DateFrom");
    initilizeDatePicker("#DateTo");
}
initilize();

HideShowFileType = function () {
    var checkBox = document.getElementById("IsDownload");
    if (!Boolean(checkBox))
        return false;
    var FileType = document.getElementById("FileType");
    if (checkBox.checked == true) {
        FileType.style.display = "block";
    } else {
        FileType.style.display = "none";
    }
}
HideShowFileType();

GenrateReport = function () {
    document.getElementById("IsDownload").checked = false;
    var FileType = document.getElementById("FileType");
    FileType.style.display = "none";
}

$(".dwonload-btn").click(function () {
    var filter = "";
    var text = "";
    var val = "";
    $(this).closest("form").each(function () {

        $(this).find('.reportfilter').each(function () {
            text = $(this).find("label").text();
            if (!Boolean(text))
                return true;
            if ($($(this).find(".form-control")).is("select")) {
                val = $(this).find("option:selected").text();
            }
            else if ($($(this).find(".form-control")).is(":checkbox")) {
                debugger;
                val = $($(this).find(".form-control")).prop("checked");
            }
            else {
                val = $(this).find(".form-control").val();
            }
            filter += text + "=" + val + "|";
        })
        $("#StringFilter").val(filter);
    });
})
GenrateReport();
