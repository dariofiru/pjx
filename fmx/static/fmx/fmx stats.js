document.addEventListener('DOMContentLoaded', function () {


    function get_best_players(){
        
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
                        avg.innerHTML=Number(squads[i].avg).toFixed(1);
                        table_row.append(div1)
                        table_row.append(player_name)
                        table_row.append(avg)
                        best_players.append(table_row) 
                     
                    }
                          
                }
            });
        }



    function get_goalscorers(){
         
            fetch( `stats_goalscores`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                    var top_scorers=document.getElementById("top_scorers");
                    console.log(squads)
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
                        
                        avg.classList.add('col','m-0', 'p-0','border' ,'text-center' )
                        div1.classList.add('col-1' ,'m-0','p-0', 'border' )
                        div1.innerHTML=`<b>${Number(i)+1}</b>`
                        player_name.innerHTML=squads[i].player;
                        
                        avg.innerHTML=squads[i].goals;
                        table_row.append(div1)
                        table_row.append(player_name)
                        
                        table_row.append(avg)
                        top_scorers.append(table_row) 
                     
                    }      
                }
            });
        }
    
function get_team_numbers(){
            //console.log("try")
                fetch( `get_team_stats`)
                .then(response => response.text())
                .then(text => {
                    if(text==="empty"){
                    }else{
                        //console.log(text)
                        var squads = JSON.parse(text);
                        var last_matches=document.getElementById("last_matches");
                        //console.log(squads)
                         
                        for (var i in squads) {
                            var table_row = document.createElement('div')
                            var team_1=document.createElement('div')
                            var team_2 = document.createElement('div')
                            var score_1 =document.createElement('div')
                            var score_2 =document.createElement('div')
                            team_1.classList.add('col-4','m-0', 'p-0', 'text-end')
                            team_2.classList.add('col-4','m-0', 'p-0','text-start')
                            score_1.classList.add('col-2','m-0', 'p-0', 'text-center')
                            score_2.classList.add('col-2','m-0', 'p-0','text-center')
                            table_row.classList.add('row', 'm-0',   'bg-success-subtle' )
                            // if(Number(squads[i].score_1)>=Number(squads[i].score_2)){
                            //     team_1.classList.add('fw-bold')
                            //     score_1.classList.add('fw-bold')
                            // }else{
                            //     team_2.classList.add('fw-bold')
                            //     score_2.classList.add('fw-bold')
                            // }
                          
                           // div1.innerHTML=`<b>${Number(i)+1}</b>`
                        //    team_1.innerHTML=squads[i].lineup_1_name;
                        //    team_2.innerHTML=squads[i].lineup_2_name; 
                        //    score_1.innerHTML=squads[i].score_1;
                        //    score_2.innerHTML=squads[i].score_2; 
                        //     //avg.innerHTML=squads[i].total;
                        //     //table_row.append(div1)
                        //     table_row.append(team_1)
                        //     table_row.append(score_1)
                        //     table_row.append(score_2)
                        //     table_row.append(team_2)
                        //     last_matches.append(table_row) 
                         
                        }      
                    }
                });
            }




function get_last_matches(){
            //console.log("try")
                fetch( `get_last_results`)
                .then(response => response.text())
                .then(text => {
                    if(text==="empty"){
                    }else{
                        //console.log(text)
                        var squads = JSON.parse(text);
                        var last_matches=document.getElementById("last_matches");
                        //console.log(squads)
                         
                        for (var i in squads) {
                            var table_row = document.createElement('div')
                            var team_1=document.createElement('div')
                            var team_2 = document.createElement('div')
                            var score_1 =document.createElement('div')
                            var score_2 =document.createElement('div')
                            team_1.classList.add('col-4','m-0', 'p-0', 'text-end')
                            team_2.classList.add('col-4','m-0', 'p-0','text-start')
                            score_1.classList.add('col-2','m-0', 'p-0', 'text-center')
                            score_2.classList.add('col-2','m-0', 'p-0','text-center')
                            table_row.classList.add('row', 'm-0',   'bg-success-subtle' )
                            if(Number(squads[i].score_1)>=Number(squads[i].score_2)){
                                team_1.classList.add('fw-bold')
                                score_1.classList.add('fw-bold')
                            }else{
                                team_2.classList.add('fw-bold')
                                score_2.classList.add('fw-bold')
                            }
                          
                           // div1.innerHTML=`<b>${Number(i)+1}</b>`
                           team_1.innerHTML=squads[i].lineup_1_name;
                           team_2.innerHTML=squads[i].lineup_2_name; 
                           score_1.innerHTML=squads[i].score_1;
                           score_2.innerHTML=squads[i].score_2; 
                            //avg.innerHTML=squads[i].total;
                            //table_row.append(div1)
                            table_row.append(team_1)
                            table_row.append(score_1)
                            table_row.append(score_2)
                            table_row.append(team_2)
                            last_matches.append(table_row) 
                         
                        }      
                    }
                });
            }






function get_my_stats(){
            //console.log("try")
                fetch( `club_stats`)
                .then(response => response.text())
                .then(text => {
                    if(text==="empty"){
                    }else{
                        //console.log(text)
                        var squads = JSON.parse(text);
                        var top_scorers=document.getElementById("my_stats");
                       // console.log(squads)
                        var table_row_h = document.createElement('div')
                        var div1_h =document.createElement('div')
                        var player_name_h=document.createElement('div')
                        var avg_h =document.createElement('div')
                        var player_role_h=document.createElement('div')
                        var variation_h =document.createElement('div')
                        variation_h.innerHTML="&Delta; Value"
                        player_role_h.innerHTML="Position"
                        div1_h.innerHTML="#"
                        player_name_h.innerHTML="Player"
                        avg_h.innerHTML="Avg"
                        table_row_h.classList.add('row', 'm-0', 'fw-bold',  'bg-success-subtle')
                        player_name_h.classList.add('col-4', 'm-0','p-0', 'border','text-start' )
                        player_role_h.classList.add('col-3', 'm-0','p-0', 'border','text-start' )
                        avg_h.classList.add('col-2','m-0', 'p-0','border'  )
                        div1_h.classList.add('col-1' ,'m-0','p-0', 'border' )
                        variation_h.classList.add('col-2' ,'m-0','p-0', 'border' )
                        table_row_h.append(div1_h)
                        table_row_h.append(player_name_h)
                        table_row_h.append(player_role_h)
                        table_row_h.append(avg_h)
                        table_row_h.append(variation_h)
                        top_scorers.append(table_row_h) 
                        for (var i in squads) {
                            var player_name=document.createElement('div')
                            var table_row = document.createElement('div')
                            var div1 =document.createElement('div')
                            var player_name =document.createElement('div')
                            var role=document.createElement('div')
                            var avg =document.createElement('div')
                            var variation =document.createElement('div')
                            table_row.classList.add('row', 'm-0', 'p-0',  'bg-success-subtle')
                            player_name.classList.add('col-4', 'm-0','p-0', 'border','text-start' )
                            role.classList.add('col-3', 'm-0','p-0', 'border','text-start' )
                            avg.classList.add('col-2','m-0', 'p-0','border'  )
                            div1.classList.add('col-1' ,'m-0','p-0', 'border' )
                            variation.classList.add('col-2' ,'m-0','p-0', 'border' )
                            div1.innerHTML=`<b>${Number(i)+1}</b>`
                            player_name.innerHTML=squads[i].name;
                            avg.innerHTML=Number(squads[i].avg).toFixed(1)
                            role.innerHTML=squads[i].position;
                            delta=(Number(squads[i].current_value)-Number(squads[i].value)).toFixed(1)
                            if(delta>0)
                                variation.innerHTML=`+${delta}`
                            else
                                variation.innerHTML=delta
                            table_row.append(div1)
                            table_row.append(player_name)
                            table_row.append(role)
                            table_row.append(avg)
                            table_row.append(variation)
                            top_scorers.append(table_row) 
                         
                        }      
                    }
                });
            }

function get_squad_value(){
                //console.log("try value")
                    fetch( `club_stats`)
                    .then(response => response.text())
                    .then(text => {
                        if(text==="empty"){
                        }else{
                          //  console.log(text)
                            var squads = JSON.parse(text);
                            //console.log(squads)
                            let start_value =0
                            let current_value=0
                            for (var i in squads) {
                                start_value=start_value+Number(squads[i].value)
                                current_value = current_value+Number(squads[i].current_value)
                            } 
                            var start_value_el=document.getElementById("start_value");
                            var current_value_el=document.getElementById("current_value");
                            start_value_el.innerHTML=start_value.toFixed(1)
                            current_value_el.innerHTML=current_value.toFixed(1)
                        }
             });
}
    
 

function get_squad_best_men(){
   // console.log("try value")
        fetch( `club_numbers`)
        .then(response => response.text())
        .then(text => {
            if(text==="empty"){
            }else{
                //console.log(text)
                var data = JSON.parse(text);
                console.log(data)
                var club_goals=document.getElementById("club_goals");
                var club_assists=document.getElementById("club_assists");
                var club_yellowcard=document.getElementById("club_yellowcard");
                var club_redcard=document.getElementById("club_redcard");
                club_goals.innerHTML=data[0]['goals']
                club_assists.innerHTML=data[0]['assists']
                club_yellowcard.innerHTML=data[0]['yellow']
                club_redcard.innerHTML=data[0]['red']
            }
 });
}

    get_goalscorers()

    get_best_players()
    
    get_my_stats()
   
    get_last_matches()

    get_squad_value()

    get_squad_best_men()

    get_team_numbers()

    });