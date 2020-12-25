AJAXRequest = function (url, type, data, dataType, callback) {
    if (Boolean(dataType) == false) {
        dataType = "json";
	}
	$(".loader").css("display", "flex");
    $.ajax
        ({
            type: type,
            url: url,
            data: data,
            dataType: dataType,
			success: function (data) {
				$(".loader").css("display","none");
                callback(data);
            },

            error: function (ex) {
				console.log(ex);
				$(".loader").hide();
                alert("Error");
            }
        });
}