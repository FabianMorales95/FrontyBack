
function getStatus(){
    $.ajax({
        url:"http://152.67.41.118:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarStatus(respuesta);
            console.log(respuesta);
        }
    });
}
function pintarStatus(respuesta){
    let myTable="<center> <table class='min-w-full'>";
        myTable+="<tr>";
        myTable+="<th>completadas</th>";
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<th>canceladas</th>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";   
 
    myTable+="</table></center>";
    $("#resultado6").html(myTable);
}

function getFechas(){
    let dato1= $("#startDate1").val();
    let dato2= $("#startDate2").val();
    
    $.ajax({
        url:"http://152.67.41.118:8080/api/Reservation/report-dates/"+dato1+"/"+dato2,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarFechas(respuesta);
            console.log(respuesta);
        }
    });

}

function pintarFechas(respuesta){
    let myTable="<center> <table class='min-w-full'>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="</tr>";   
    }
    myTable+="</table></center>";
    $("#resultado7").html(myTable);
}

function getClientes(){
   
}

