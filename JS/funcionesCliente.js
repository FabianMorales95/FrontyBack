// GET, POST, PUT Y DELETE

function getCliente(){
    $.ajax({
        url:"http://152.67.41.118:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarCliente(respuesta);
        }
    });
}

function postCliente(){

    if ($("#email").val().length==0 || 
    $("#password").val().length==0 || 
    $("#name").val().length==0 || 
    $("#age").val().length==0 ){
    //alert("Todos los campos son obligatorios");
    Swal.fire('Todos los campos son obligatorios');
    }else{
        let cajas = {
            email:$("#email").val(),
            password:$("#password").val(),
            name:$("#name").val(),
            age:$("#age").val()
        };
        
        $.ajax({
            url:"http://152.67.41.118:8080/api/Client/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                //alert("se creo correctamente el cliente");
                Swal.fire('Se creo correctamente el cliente');
                window.location.reload();
            }

        });
    }
}

function putCliente(idBotonActualizar){

    if ($("#email").val().length==0 || $("#password").val().length==0 || $("#name").val().length==0 || $("#age").val().length==0){
        //alert("Todos los campos son obligatorios");
        Swal.fire('Todos los campos son obligatorios');
    }else{

        Swal.fire({
            title: '¿Esta seguro de actualizar el cliente?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
        
                let cajas = {
                    idClient:idBotonActualizar,
                    email:$("#email").val(),
                    password:$("#password").val(),
                    name:$("#name").val(),
                    age:$("#age").val()
                  
                };
                console.log(cajas);
                $.ajax({
                    url:"http://152.67.41.118:8080/api/Client/update",
                    type:"PUT",
                    datatype:"JSON",
                    contentType:"application/json",
                    data: JSON.stringify(cajas),
                    success:function(respuesta){
                        //alert("se actualizo correctamente la categoria");
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

function deleteCliente(idBotonBorrar){
    Swal.fire({
        title: 'Esta seguro de borrar el cliente?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            console.log(idBotonBorrar+"hola mundo");
            let myData={
                id:idBotonBorrar
            };
            $.ajax({
                url:"http://152.67.41.118:8080/api/Client/"+ idBotonBorrar,
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


function pintarCliente(respuesta){
    let myTable="<center> <table class='min-w-full'";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick='putCliente("+respuesta[i].idClient+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Actualizar</button> "
        myTable+="<td> <button onclick='deleteCliente("+respuesta[i].idClient+")' class='flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>Borrar</button> "
        myTable+="</tr>";   
    }
    myTable+="</table> </center>";
    $("#resultado2").html(myTable);
}
