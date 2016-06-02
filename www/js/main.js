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
		if($(this).val()==''){
			$('#resultadosbusqueda').hide();
		}
		url = "http://ygiis.mx/api?m=busqueda&u="+$(this).val()+"&id="+localStorage.getItem("userid");
		$.ajax({
			url : url,
			success : function(data){
					$('#resultadosbusqueda').html('');
					$('#resultadosbusqueda').show();
				$.each(data, function( index, value ) {
					output = '<div class="bus">';
					output+='<a href="#" class="botonbusqueda" >'+value.name+'</a>';
					output += '<div style="width:100%;">';
					if(value.ha_solicitado==1 && value.status_solicitud==1){
						output += '<a href="#" class="iconoamistad"><i class="fa fa-check-circle" aria-hidden="true" style="font-size:20px; color:green; margin:3px"></i><br>Amigos</a>';
					}else{
						output += '<a href="#" class="iconoamistad"><i class="fa fa-times-circle" aria-hidden="true" style="font-size:20px; color:red; margin:3px"></i><br>Amigos</a>';
					}
					output += '<a href="#" class="iconoamistad botonbusqueda" rel="'+value.id+'" ><i class="fa fa-eye" aria-hidden="true" style="font-size:20px; color:#7aa8e7; margin:3px"></i><br>Ver Perfil</a>';
					if(value.ha_solicitado==1){
						output += '<span class="iconoamistad"><i class="fa fa-user-plus" aria-hidden="true" style="font-size:20px; color:gray; margin:3px"></i><br>Enviada</span></div>';
					}else{
						output += '<a href="#" class="iconoamistad botonsolicitudamistad" rel="'+value.id+'"><i class="fa fa-user-plus" aria-hidden="true" style="font-size:20px; color:#7aa8e7; margin:3px"></i><br>Agregar</a></div>';
					}
					output += '</div><div class="clear"></div>';
					$('#resultadosbusqueda').append(output);
				})
			}
		})
	});
	$(document).on("click",".botonbusqueda",function(event){
		localStorage.setItem('busqueda_usuario', $(this).attr('rel'));
		window.location = "perfil-otro.html";
	});
	$(document).on("click",".botonsolicitudamistad",function(event){
		url = "http://ygiis.mx/api/?m=sendRequest&t="+$(this).attr('rel')+"&f="+localStorage.getItem("userid");
		//alert(url);
		$.ajax({
				url : url,
				dataType: 'text',
				success : function(data){
					$('#loading').fadeOut('fast');
					alert('Solicitud enviada');
					$('#resultadosbusqueda').hide();
				},
				beforeSend : function(data){
					$('#loading').fadeIn('fast');
				}
			});
	});
})