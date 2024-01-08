document.addEventListener('DOMContentLoaded', function () {


    function get_best_players(){
        console.log("try")
            fetch( `stats_player_ranking`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                    var best_players=document.getElementById("best_players");
                    var table_row_h = document.createElement('div')
                    var div1_h =document.createElement('div')
                    var player_name_h=document.createElement('div')
                    var avg_h =document.createElement('div')
                    div1_h.innerHTML="#"
                    player_name_h.innerHTML="Player"
                    avg_h.innerHTML="Avg"
                    table_row_h.classList.add('row', 'm-0', 'fw-bold',  'bg-success-subtle')
                    player_name_h.classList.add('col-9', 'm-0','p-0', 'border','text-start' )
                    avg_h.classList.add('col','m-0', 'p-0','border'  )
                    div1_h.classList.add('col-1' ,'m-0','p-0', 'border' )
                    table_row_h.append(div1_h)
                    table_row_h.append(player_name_h)
                    table_row_h.append(avg_h)
                    best_players.append(table_row_h) 
                    for (var i in squads) {
                        var player_name=document.createElement('div')
                        var table_row = document.createElement('div')
                        var div1 =document.createElement('div')
                        var player_name =document.createElement('div')
                        var avg =document.createElement('div')
                        table_row.classList.add('row', 'm-0',   'bg-success-subtle')
                        player_name.classList.add('col-9', 'm-0','p-0', 'border','text-start' )
                        avg.classList.add('col','m-0', 'p-0','border'  )
                        div1.classList.add('col-1' ,'m-0','p-0', 'border' )
                        div1.innerHTML=`<b>${Number(i)+1}</b>`
                        player_name.innerHTML=squads[i].name;
                        avg.innerHTML=squads[i].avg;
                        table_row.append(div1)
                        table_row.append(player_name)
                        table_row.append(avg)
                        best_players.append(table_row) 
                     
                    }
                          
                }
            });
        }



    function get_goalscorers(){
        console.log("try")
            fetch( `stats_goalscores`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                    var top_scorers=document.getElementById("top_scorers");

                    var table_row_h = document.createElement('div')
                    var div1_h =document.createElement('div')
                    var player_name_h=document.createElement('div')
                    var avg_h =document.createElement('div')
                    div1_h.innerHTML="#"
                    player_name_h.innerHTML="Player"
                    avg_h.innerHTML="Total"
                    table_row_h.classList.add('row', 'm-0', 'fw-bold',  'bg-success-subtle')
                    player_name_h.classList.add('col-9', 'm-0','p-0', 'border','text-start' )
                    avg_h.classList.add('col','m-0', 'p-0','border'  )
                    div1_h.classList.add('col-1' ,'m-0','p-0', 'border' )
                    table_row_h.append(div1_h)
                    table_row_h.append(player_name_h)
                    table_row_h.append(avg_h)
                    top_scorers.append(table_row_h) 




                    for (var i in squads) {
                        var player_name=document.createElement('div')
                        var table_row = document.createElement('div')
                        var div1 =document.createElement('div')
                        var player_name =document.createElement('div')
                        var avg =document.createElement('div')
                        table_row.classList.add('row', 'm-0',   'bg-success-subtle')
                        player_name.classList.add('col-9', 'm-0','p-0', 'border','text-start' )
                        avg.classList.add('col','m-0', 'p-0','border'  )
                        div1.classList.add('col-1' ,'m-0','p-0', 'border' )
                        div1.innerHTML=`<b>${Number(i)+1}</b>`
                        player_name.innerHTML=squads[i].name;
                        avg.innerHTML=squads[i].total;
                        table_row.append(div1)
                        table_row.append(player_name)
                        table_row.append(avg)
                        top_scorers.append(table_row) 
                     
                    }      
                }
            });
        }
    
    
        get_goalscorers()

    get_best_players()
    

   
       
    });