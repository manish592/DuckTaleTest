var monthViewVisitor = { x: [], y: [] };
var monthViewSale = { x: [], y: [] };

var dayViewVisitor = { x: [], y: [] };
var dayViewSale = { x: [], y: [] };
getDashBoardCount = function () {
    var url = "/Account/GetDashBoardCount";
    var type = "GET";
    var data = {};
    var dataType = "JSON";;
    var callback = function (response) {
        setMonthViewData(response);
        setDayViewData(response);
        response = response.count[0];
        $("#VisitorOfDay").text('');
        $("#SaleOfDay").text('');
        $("#VisitorOfMonth").text('');
        $("#SaleOfMonth").text('');
        $("#VisitorOfDay").text(response.visitorOfDay);
        $("#VisitorOfMonth").text(response.visitorOfMonth);
        $("#SaleOfDay").text(response.saleOfDay);
        $("#SaleOfMonth").text(response.saleOfMonth);
        chart('chtDailyVisitor', dayViewVisitor.x, dayViewVisitor.y, 'Daily Visitors','rgba(92, 187, 240, .6)');
        chart('chtDailySale', dayViewSale.x, dayViewSale.y, 'Daily Sale', 'rgba(108, 199, 190, .6)');
        chart('chtMonthSale', monthViewSale.x, monthViewSale.y, 'Monthly Sale', 'rgba(108, 199, 190, .6)');
        chart('chtMonthVisitor', monthViewVisitor.x, monthViewVisitor.y, 'Monthly Visitors','rgba(92, 187, 240, .6)');
    }

    AJAXRequest(url, type, data, dataType, callback);
}
setMonthViewData = function (response) {
    console.log(response);
    monthViewVisitor.x = response.monthView.map(function (value) {
        return value.noOfVisitor
    });
    monthViewVisitor.y = response.monthView.map(function (value) {
        return value.month;
    });
    monthViewSale.y = monthViewVisitor.y;
    monthViewSale.x = response.monthView.map(function (value) {
        return value.totalAMount
    });
}

setDayViewData = function (response) {
    dayViewVisitor.x = response.dayView.map(function (value) {
        return value.noOfVisitor
    });
    dayViewVisitor.y = response.dayView.map(function (value) {
        return value.date;
    });
    dayViewSale.y = dayViewVisitor.y;
    dayViewSale.x = response.dayView.map(function (value) {
        return value.totalAMount
    });
}

chart = function (elementId, xAxis, yAxis, label, backgroundColor) {
    var ctx = document.getElementById(elementId)
    if (Boolean(ctx)) {
        $(ctx).prev().text(label);
        ctx.getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yAxis,
                datasets: [{
                    label: label,
                    data: xAxis,
                    backgroundColor: [
                        backgroundColor
                        //'rgba(92, 187, 240, .6)',
                        ,
                    ],
                    borderColor: [
                        //'rgba(92, 187, 240, .6)',
                        backgroundColor
                    ],
                }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
    }
}

init = function () {
    getDashBoardCount();
}
init();