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
	$('#busqueda input').keyup(function() { 
		url = "http://ygiis.mx/api?m=busqueda&u="+$(this).val();
		$.ajax({
			url : url,
			success : function(data){
					$('#resultadosbusqueda').html('');
				$.each(data, function( index, value ) {
					output = '<div class="bus"><a href="#" class="botonbusqueda" rel="'+value.id+'">'+value.name+'</a></div>';
					$('#resultadosbusqueda').append(output);
				})
			}
		})
	});
	$(document).on("click",".botonbusqueda",function(event){
		localStorage.setItem('busqueda_usuario', $(this).attr('rel'));
		window.location = "perfil-otro.html";
	});
})