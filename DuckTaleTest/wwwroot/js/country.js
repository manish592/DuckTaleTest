$(".country").change(function () {
    getState($(this).val())
});
$(".state").change(function () {
    getCity($(this).val())
});
getState = function (countryFK) {
    var url = "/Home/GetState";
    var type = "GET";
    var dataType = "json";
    var data = { CountryFK: countryFK }
    callback = function (response) {
        $(".state").empty();
        $(".city").empty();
        $(".city").append('<option value="0">--Select--</option>');
        for (i = 0; i < response.length; i++) {
            $(".state").append('<option value="' + response[i].value + '">' + response[i].text + '</option>')
        }
    }
    debugger;
    AJAXRequest(url, type, data, dataType, callback);
}
getCity = function (stateFK) {
    var url = "/Home/GetCity";
    var type = "GET";
    var dataType = "json";
    var data = { StateFK: stateFK }
    callback = function (response) {
        $(".city").empty();
        for (i = 0; i < response.length; i++) {
            $(".city").append('<option value="' + response[i].value + '">' + response[i].text + '</option>')
        }
    }
    AJAXRequest(url, type, data, dataType, callback);
}