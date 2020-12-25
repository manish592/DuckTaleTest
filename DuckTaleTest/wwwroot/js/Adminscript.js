
(function ($) {


    $('#listing_table').DataTable({
		aoColumnDefs: [{ bSortable: false, aTargets: [-1] }]
	});

	$("#drpShowInPackage").on("change", function (e) {
		var self = this;
		var selectedValue = self.options[e.currentTarget.selectedIndex].value
		if (Boolean(selectedValue)) {
			$("#showInOptions>").each(function (i, item) {
				switch (parseInt(selectedValue)) {
					case 0:
						if ($(item).attr("data-isthirdpart") === "True") {
							$(item).show();
						}
						else {
							$(item).hide();
						}
						break;
					case 1:
						if ($(item).attr("data-isthirdpart") === "False") {
							$(item).show();
						}
						else {
							$(item).hide();
						}
						break;
					default:
						$(item).show();
						break;
				}
			})
		}
	})
	$.sidebarMenu($('.sidebar-menu'))
	$(document).on('click', '.toggle-sidebar', function () {
		$('.left-sidebar').toggleClass('move-side-bar');
		$('.right-side-panel').toggleClass('move-right-panel');
	})
	$(function () {
		$("#isThirdParty").click(function () {
			if ($(this).is(':checked')) {
				$("#Panel").show();
			}
			else {
				$("#Panel").hide();
			}
		});
	});
	
})($);








