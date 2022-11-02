///////////////////GET, POST, PUT Y DELETE

function getReservaciones(){

    $.ajax({
        url:"http://152.67.41.118:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservation(respuesta);
        }
    });

}


function postReservaciones(){

    if ( $("#startDate").val().length==0 || 
    $("#devolutionDate").val().length==0 ){
    //alert("Todos los campos son obligatorios");
    Swal.fire('Todos los campos son obligatorios');
    }else{
        
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:{idClient: +$("#select-client").val()},
            tool:{id: +$("#select-tool").val()},
        };
        console.log(cajas);
        
        $.ajax({
            url:"http://152.67.41.118:8080/api/Reservation/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                //alert("se creo correctamente la reservacion");
                Swal.fire('Se creo correctamente la reservaciÓn');
            window.location.reload();
                }
            });
    }
    
}


function putReservaciones(idBotonActualizar){
    
    if ( $("#startDate").val().length==0 || 
    $("#devolutionDate").val().length==0 ){
    //alert("Todos los campos son obligatorios");
    Swal.fire('Todos los campos son obligatorios');
    }else{
        Swal.fire({
            title: 'Esta seguro de actualizar la reservaciòn?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
               
                let cajas = {
                    idReservation:idBotonActualizar,
                    startDate:$("#startDate").val(),
                    devolutionDate:$("#devolutionDate").val(),
                    status:$("#status").val(),
                    client:{idClient: +$("#select-client").val()},
                    tool:{id: +$("#select-tool").val()},
                };
                console.log(cajas);
                
                $.ajax({
                    url:"http://152.67.41.118:8080/api/Reservation/update",
                    type:"PUT",
                    datatype:"JSON",
                    contentType:"application/json; charset=utf-8",
                    data: JSON.stringify(cajas),
                    success:function(respuesta){
                        alert("se actualizo correctamente la reservacion");
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

function deleteReservaciones(idBotonBorrar){
    
    Swal.fire({
        title: 'Esta seguro de borrar la reservaciòn?',
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
                url:"http://152.67.41.118:8080/api/Reservation/"+ idBotonBorrar,
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

function getTool_Reservaciones(){

    $.ajax({
        url:"http://152.67.41.118:8080/api/Tool/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
            let $select = $("#select-tool");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
            })
        }
    });
    
}

function getClient_Reservaciones(){
    
    $.ajax({
        url:"http://152.67.41.118:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           // console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function (id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            })
        }
    });
}

function pintarReservation(respuesta){

    let myTable="<center> <table class='min-w-full'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idReservation+"</td>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].tool.name+"</td>";
        myTable+="<td> <button onclick='putReservaciones("+respuesta[i].idReservation+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteReservaciones("+respuesta[i].idReservation+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button> "
       
        myTable+="</tr>";   
    }
    myTable+="</table> </center>";
    $("#resultado4").html(myTable);
}
