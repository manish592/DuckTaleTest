var app = angular.module("ticket_purchase");
app.controller("MemberCtrl", function ($scope, $location, MemberService) {
    $scope.Categories = categories
    $scope.Category;
    $scope.MemberDetails = [];
    var memberDetail = {Name:"",Age:"",Id:0};

    console.log($scope.Categories);
    $scope.SelectedCategory = function (Category) {
        $scope.Category = Category;
        $scope.MemberDetails = [];
        if (Category.TotalMembers > 1) {
            for (i = 0; i < Category.TotalMembers; i++) {
                $scope.MemberDetails.push({ Name: "", Age: "", Id: i });
            }
        }
    }
    $scope.SelectFile = function () {
        debugger;
    }
});
