function getMensaje(){

    $.ajax({
        url:"http://152.67.41.118:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarMensaje(respuesta);
        }
    });
}

function getTool_Name(){

    $.ajax({
        url:"http://152.67.41.118:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
            let $select = $("#selectTool");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });

}

function getClient_Name(){

    $.ajax({
        url:"http://152.67.41.118:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
            let $select = $("#selectClient");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });

}

function postMensaje(){
    
    if ( $("#messageText").val().length==0 ){
        //alert("Todos los campos son obligatorios");
        Swal.fire('Todos los campos son obligatorios');
    }else{

        let cajas = {
            //selectTool:$("#selectTool").val(),
            messageText:$("#messageText").val(),
        };
        console.log(cajas);
        
        $.ajax({
            url:"http://152.67.41.118:8080/api/Message/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                //alert("Se creo correctamente el mensaje");
                Swal.fire('Todos los campos son obligatorios');
                window.location.reload();
            }

        });
    }
}

function putMensaje(idBotonActualizar){
    
    if ( $("#messageText").val().length==0 ){
        //alert("Todos los campos son obligatorios");
        Swal.fire('Todos los campos son obligatorios');
    }else{
        
        Swal.fire({
            title: '¿Esta seguro de actualizar el mensaje?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
        
                let cajas = {
                    id:idBotonActualizar,
                    messageText:$("#messageText").val(),
                };
                
                $.ajax({
                    url:"http://152.67.41.118:8080/api/Message/update",
                    type:"PUT",
                    datatype:"JSON",
                    contentType:"application/json",
                    data: JSON.stringify(cajas),
                    success:function(respuesta){
                        //alert("se actualizo correctamente el mensaje");
                        window.location.reload();
                    }
        
                });
        
              Swal.fire(
                'Updated!',
                'Your file has been updated.',
                'success'
              )
            }
        })      
    }

}  


function deleteMensaje( idBotonBorrar){

    Swal.fire({
        title: 'Esta seguro de borrar el mensaje?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
           
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://152.67.41.118:8080/api/Message/"+ idBotonBorrar,
                type:"DELETE",
                datatype:"JSON",
                data: JSON.stringify(myData),
                contentType:"application/json",
                success:function(respuesta){
                   // alert("se borro correctamente la categoria");
                    window.location.reload();
                }
            });
        
            Swal.fire(
        
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
    })
}


function pintarMensaje(respuesta){

    let myTable="<center> <table class='min-w-full'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button onclick='putMensaje("+respuesta[i].idMessage+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteMensaje("+respuesta[i].idMessage+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button> " 
        myTable+="</tr>";   
    }
    myTable+="</table>";
    $("#resultado9").html(myTable);

}
