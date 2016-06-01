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
		url = "http://ygiis.mx/api?m=busqueda&u="+$(this).val()+"&id="+localStorage.getItem("userid");
		$.ajax({
			url : url,
			success : function(data){
					$('#resultadosbusqueda').html('');
				$.each(data, function( index, value ) {
					output = '<div class="bus">';
					output += '<a href="#"><i class="fa fa-check-circle" aria-hidden="true" style="font-size:20px; color:#1fa67a; margin:3px"></i></a>';
					output += '<a href="#"><i class="fa fa-plus-circle" aria-hidden="true" style="font-size:20px; color:#ffcc00; margin:3px"></i></a>';
					output += '<a href="#"><i class="fa fa-user-plus" aria-hidden="true" style="font-size:20px; color:#1fa67a; margin:3px"></i></a>';
					output+='<a href="#" class="botonbusqueda" rel="'+value.id+'">'+value.name+'</a></div>';
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