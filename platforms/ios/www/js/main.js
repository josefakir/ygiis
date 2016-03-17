$(document).ready(function(){
	$('#triggermenu').click(function(e){
		e.preventDefault();
		$('#menu').slideToggle();
	})
	$('#logout').click(function(e){
		e.preventDefault();
		localStorage.setItem('userid', '');
		localStorage.setItem('username', '');
		localStorage.setItem('session_id', '');
		window.location = 'index.html';
	});
})