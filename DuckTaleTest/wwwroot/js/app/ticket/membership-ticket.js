

var app = angular.module("ticket_purchase");
app.controller("TicketCtrl", function ($scope, $location, CategoryService) {
	$scope.title = "Booking Detail";
	$scope.PackageFK = packageFK;
	$scope.Timming = [];
	var d = new Date()
	var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
	$('#Date').datepicker({
		format: "dd/mm/yyyy", modal: true, header: false, footer: false, minDate: today, uiLibrary: 'bootstrap4',
		change: function (e) {
			getTimming();
		}
	});
	getTimming = function () {
		CategoryService.GetTimming($scope.PackageFK, $('#Date').datepicker().value(),
			function (data) {
				$scope.Timming = data.timming
			});
	}
});
