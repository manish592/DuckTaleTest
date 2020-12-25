var app = angular.module("ticket_purchase");
app.controller("TicketBookingListCtrl", function ($scope, CategoryService) {
	$scope.title = "Booking Detail"
	$scope.message = ""
	$scope.TicketDetail = [];

	ticketDetail = function () {
		CategoryService.GetUserSelectedTickets().then(function (data) {
			$scope.TicketDetail = data.selectedTickets;
		}, function (reason) {
			if (Boolean(reason) && reason.hasOwnProperty("data")) {
				$scope.message = reason.data.TicketDetail.join("|");
				$scope.TicketDetail = [];
			}
		})
	};
	ticketDetail()
});