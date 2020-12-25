var i = 0;

function value_dec(){
	i--;
	document.getElementById('inc_dec').value =i;
}
function value_inc(){
	i++;
	document.getElementById('inc_dec').value =i;
}

$('.datepicker').datepicker({ uiLibrary: 'bootstrap4' })
	
 $('.timepicker').timepicker({
            uiLibrary: 'bootstrap4'
		});
		

$(function () {
	scrollStyle();
});

scrollStyle=function()
{
	$(".book-ticket-wrap ul.nav-tabs","body").niceScroll({
		cursorwidth: "6px",
		bouncescroll: false
	});
}
		  
	  