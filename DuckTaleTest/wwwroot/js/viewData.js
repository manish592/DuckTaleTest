var app = angular.module("ReportApp", ['ui.bootstrap']);
app.controller("ReportCtrl", function ($scope, $filter) {
    $scope.title = "Booking Detail";
    $scope.itemsPerPage = 10;
    $scope.PageSize = [5, 10, 20, 50, 100, 200, 500];
    $scope.maxSize = 5;

    $scope.OrignalData = JSON.parse(jsonResponse);
    $scope.SecondaryData = [];
    debugger;
    if (Boolean(secondaryJsonResponse.trim()))
        $scope.SecondaryData = JSON.parse(secondaryJsonResponse);
    secondaryJsonResponse

    GetKeys = function () {

        var keys = [];
        if ($scope.OrignalData.length > 0) {
            for (var k in $scope.OrignalData[0]) {
                var rgx = new RegExp("_", "i");
                if (!rgx.test(k)) {
                    keys.push(k);
                }
            }
        }
        $scope.DataKeys = keys;
    }
    GetKeys();

    GetSecondaryKeys = function () {

        var keys = [];
        if ($scope.SecondaryData.length > 0) {
            for (var k in $scope.SecondaryData[0]) {
                var rgx = new RegExp("_", "i");
                if (!rgx.test(k)) {
                    keys.push(k);
                }
            }
        }
        $scope.SecondaryDataKey = keys;
    }
    GetSecondaryKeys();
    /*Pagination*/
    $scope.bigTotalItems = $scope.OrignalData.length;
    $scope.bigCurrentPage = 1;
    $scope.$watch('bigCurrentPage + itemsPerPage', function () {
        if ($scope.OrignalData.length > 0) {
            var begin = (($scope.bigCurrentPage - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
            $scope.ReportData = $scope.OrignalData.slice(begin, end);
        }
    });
    /*Date CHeck*/
    $scope.IsValidDate = function (date) {
        var d = new Date(date);
        return !isNaN(d.getFullYear());
    }
    /*Filter*/
    //$scope.$watch('search', function (val) {
    //    debugger;
    //    $scope.ReportData = $filter('filter')($scope.OrignalData, val);
    //});
});