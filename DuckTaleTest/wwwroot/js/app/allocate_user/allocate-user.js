var app = angular.module("ticket_purchase",[]);
app.controller("AllocateUserCtrl", function ($scope, CategoryService) {
    $scope.ItemFK = "";
    $scope.User = [];
    $scope.ItemSelection = function (ItemFK) {
        $scope.ItemFK = ItemFK;
        GetUser();
    }
    GetUser = function () {
        CategoryService.GetItemUser($scope.ItemFK, function (data) {
            debugger;
            console.log(data);
            $scope.User = data.user;
        });
    }
 
});