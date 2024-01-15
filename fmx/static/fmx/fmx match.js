document.addEventListener('DOMContentLoaded', function () {


function get_matches(){
   // console.log("try")
        fetch( `round_results`)
        .then(response => response.text())
        .then(text => {
            //console.log(text)
            if(text==="empty"){

            }else{
                console.log(text)
                var matches = JSON.parse(text);
                var table_box=document.getElementById("table_box");
                for (var i in matches) {
                    var table_row = document.createElement('row')
                    table_row.classList.add('row',    'bg-light')
                    var div1 =document.createElement('div')
                    var home_team =document.createElement('div')
                    var away_team =document.createElement('div')
                    var home_score=document.createElement('div')
                    var away_score=document.createElement('div')
                    var home_logo=document.createElement('img')
                    var away_logo=document.createElement('img')
                    var home_logo_div=document.createElement('div')
                    var away_logo_div=document.createElement('div')
                    home_logo.style.width="30px"
                    away_logo.style.width="30px"
                    home_logo.src=matches[i].img_1
                    away_logo.src=matches[i].img_2
                    home_logo_div.classList.add("col-1")
                    away_logo_div.classList.add("col-1")
                    home_logo_div.append(home_logo)
                    away_logo_div.append(away_logo)
                    var div2 =document.createElement('div')
                    home_team.classList.add('text-end')
                    table_row.classList.add('row',    'bg-light')
                    table_row.style.margin="10px"
                    home_team.classList.add('col-md-2', 'text-center' )
                    away_team.classList.add('col-md-2', 'text-center' )
                    home_score.classList.add('col-md-1')
                    away_score.classList.add('col-md-1')
                    div1.classList.add('col-2')
                    div2.classList.add('col-2', 'text-start' ) 
                    home_team.innerHTML=matches[i].lineup_1_name;
                    away_team.innerHTML=matches[i].lineup_2_name;
                    home_score.innerHTML=matches[i].score_1;
                    away_score.innerHTML=matches[i].score_2;
                    home_score.classList.add('text-black', 'fw-bold')
                    away_score.classList.add('text-black','fw-bold' )
                    if(Number(matches[i].score_1)>=Number(matches[i].score_2)){
                        home_team.classList.add('text-success', 'fw-bold')
                        away_team.classList.add('text-danger',)
                        //home_score.classList.add('text-success', 'fw-bold')
                        //away_score.classList.add('text-danger', )
                    }else{
                        home_team.classList.add('text-danger', )
                        away_team.classList.add('text-success', 'fw-bold')
                        //home_score.classList.add('text-danger', )
                        //away_score.classList.add('text-success', 'fw-bold')
                    }
                    if (matches[i].lineup_1_name===club_name){
                        home_team.classList.add('border','bg-success-subtle')
                        away_team.classList.add('border','bg-success-subtle')
                        home_score.classList.add('border','bg-success-subtle')
                        away_score.classList.add('border','bg-success-subtle')
                        var stats_btn =document.createElement('button')
                        stats_btn.classList.add('btn', 'btn-sm',  'btn-outline-success', 'd-block')
                        stats_btn.innerHTML="View Stats"
                        stats_btn.dataset.matchid=matches[i].id
                        stats_btn.dataset.club1=matches[i].lineup_1_name
                        stats_btn.dataset.club2=matches[i].lineup_2_name
                        stats_btn.dataset.score1=matches[i].score_1
                        stats_btn.dataset.score2=matches[i].score_2
                        stats_btn.dataset.logo1=matches[i].img_1
                        stats_btn.dataset.logo2=matches[i].img_2
                        stats_btn.dataset.club1id=matches[i].club_1_id
                        stats_btn.dataset.club2id=matches[i].club_2_id
                        
                        stats_btn.addEventListener('click', event => {
                            console.log("click")
                            console.log(event.target.dataset.matchid)
                            var result_box=document.getElementById("myModal-result");
                            var club_1=document.getElementById("club_1");
                            club_1.innerHTML=event.target.dataset.club1
                            var club_2=document.getElementById("club_2");
                            club_2.innerHTML=event.target.dataset.club2
                            var score_1=document.getElementById("score_1");
                            score_1.innerHTML=event.target.dataset.score1
                            var score_2=document.getElementById("score_2");
                            score_2.innerHTML=event.target.dataset.score2
                            var logo_1=document.getElementById("logo_1");
                            logo_1.src=event.target.dataset.logo1
                            var logo_2=document.getElementById("logo_2");
                            logo_2.src=event.target.dataset.logo2
                            score_1_tot=Number(event.target.dataset.score1)
                            score_2_tot=Number(event.target.dataset.score2)
                            if(score_1_tot<score_2_tot){
                                score_1.style.color="red"
                                score_2.style.color="green"
                            }else{
                                score_1.style.color="green"
                                score_2.style.color="red"
                            }


                            fetch( `get_match_stats/${event.target.dataset.matchid}`)
                            .then(response => response.text())
                            .then(text => {
                                if(text==="empty"){
                                    console.log(text)
                                }else{
                                   // console.log(text)
                                    //var squads = JSON.parse(text);
                                   // console.log(squads)
                                    /////////////
                                    //////// creating stats box
                                    //////////////////
                                    document.getElementById('stats').style.display='block'
                                        var col_team_1=document.getElementById("col_team_1");
                                        var col_team_2=document.getElementById("col_team_2");
                                        col_team_1.innerHTML=""
                                        col_team_2.innerHTML=""
                                        var row_top=  document.createElement('div')
                                        row_top.classList.add('row', 'border', 'm-0','p-0',  'text-black')  
                                        var row_top2=  document.createElement('div')
                                        row_top2.classList.add('row', 'border', 'm-0','p-0',  'text-black')  
                                        var col1 = document.createElement('div')
                                        var col2 = document.createElement('div')
                                        var col3 = document.createElement('div')
                                        var col4 = document.createElement('div')
                                        var col5 = document.createElement('div')
                                        var col6 = document.createElement('div')
                                        col1.classList.add('col-5', 'border', 'm-0','p-0',  'text-black')  
                                        col2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col3.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col4.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col5.classList.add('col-1', 'border',  'p-0',  'text-black')
                                        col6.classList.add('col-2',   'text-black')  
                                        col1.innerHTML="Player"
                                        col2.innerHTML="G"
                                        col3.innerHTML="A"
                                        col4.innerHTML="YC"
                                        col5.innerHTML="RC"
                                        col6.innerHTML="Score"
                                        var col1_2 = document.createElement('div')
                                        var col2_2 = document.createElement('div')
                                        var col3_2 = document.createElement('div')
                                        var col4_2 = document.createElement('div')
                                        var col5_2 = document.createElement('div')
                                        var col6_2 = document.createElement('div')
                                        col1_2.classList.add('col-5', 'border', 'm-0','p-0',  'text-black')  
                                        col2_2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col3_2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col4_2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col5_2.classList.add('col-1', 'border',  'p-0',  'text-black')
                                        col6_2.classList.add('col-2',   'text-black')  
                                        col1_2.innerHTML="Player"
                                        col2_2.innerHTML="G"
                                        col3_2.innerHTML="A"
                                        col4_2.innerHTML="YC"
                                        col5_2.innerHTML="RC"
                                        col6_2.innerHTML="Score"
                                        row_top.append(col1)
                                        row_top.append(col2)
                                        row_top.append(col3)
                                        row_top.append(col4)
                                        row_top.append(col5)
                                        row_top.append(col6)
                                        col_team_1.append(row_top)
                                        row_top2.append(col1_2)
                                        row_top2.append(col2_2)
                                        row_top2.append(col3_2)
                                        row_top2.append(col4_2)
                                        row_top2.append(col5_2)
                                        row_top2.append(col6_2)
                                        col_team_2.append(row_top2)   
                                var players = JSON.parse(text);
                                    //console.log(players)
                                    for (var i in players) {
                                        var row =  document.createElement('div')
                                            row.classList.add('row','border', 'm-0','p-0',  'text-black')
                                            var col1 =  document.createElement('div')
                                            col1.classList.add('col-5','fw-bold', 'border', 'm-0','p-0',  'text-black')
                                            var col1g =  document.createElement('div')
                                            col1g.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col1a =  document.createElement('div')
                                            col1a.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col1y =  document.createElement('div')
                                            col1y.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col1r =  document.createElement('div')
                                            col1r.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col2 =  document.createElement('div')
                                            col2.classList.add('col-2','fw-bold', 'border',   'text-black')
                                            col1.innerHTML=`${players[i].name}`
                                            col1g.innerHTML=`${players[i].goals}`
                                            col1a.innerHTML=`${players[i].assists}`
                                            col1y.innerHTML=`${players[i].yellow}`
                                            col1r.innerHTML=`${players[i].red}`
                                            col2.innerHTML=`${players[i].score}`
                                            row.append(col1)
                                            row.append(col1g)
                                            row.append(col1a)
                                            row.append(col1y)
                                            row.append(col1r)
                                            
                                            row.append(col2)
                                        if(Number(players[i].club)===Number(stats_btn.dataset.club1id)){
                                            console.log("qui")
                                             
                                            col_team_1.append(row)
                                            //console.log(col_team_2.innerHTML)
                                        }else if(Number(players[i].club)===Number(stats_btn.dataset.club2id)){
                                            console.log("team: "+players[i].club + " - "+stats_btn.dataset.club2id)
                                           
                                            col_team_2.append(row)
                                            //console.log(col_team_2.innerHTML)
                                        }
                                    }
                                    //////////
                                    //// end stats box
                                    ////////


                                }
                                result_box.style.display='block'
                     });
                        });  
                        div2.append(stats_btn)
                    }else if (matches[i].lineup_2_name===club_name){
                        home_team.classList.add('border','bg-success-subtle')
                        away_team.classList.add('border','bg-success-subtle')
                        home_score.classList.add('border','bg-success-subtle')
                        away_score.classList.add('border','bg-success-subtle')
                        var stats_btn =document.createElement('button')
                        stats_btn.classList.add('btn','btn-sm',  'btn-outline-success' )
                        stats_btn.innerHTML="View Stats!"
                        stats_btn.dataset.matchid=matches[i].id
                        stats_btn.dataset.club1=matches[i].lineup_1_name
                        stats_btn.dataset.club2=matches[i].lineup_2_name
                        stats_btn.dataset.score1=matches[i].score_1
                        stats_btn.dataset.score2=matches[i].score_2
                        stats_btn.dataset.logo1=matches[i].img_1
                        stats_btn.dataset.logo2=matches[i].img_2
                        stats_btn.dataset.club1id=matches[i].club_1_id
                        stats_btn.dataset.club2id=matches[i].club_2_id
                        stats_btn.addEventListener('click', event => {
                            console.log("click")
                            console.log(event.target.dataset.matchid)
                            var result_box=document.getElementById("myModal-result");
                            var club_1=document.getElementById("club_1");
                            club_1.innerHTML=event.target.dataset.club1
                            var club_2=document.getElementById("club_2");
                            club_2.innerHTML=event.target.dataset.club2
                            var score_1=document.getElementById("score_1");
                            score_1.innerHTML=event.target.dataset.score1
                            var score_2=document.getElementById("score_2");
                            score_2.innerHTML=event.target.dataset.score2
                            var logo_1=document.getElementById("logo_1");
                            logo_1.src=event.target.dataset.logo1
                            var logo_2=document.getElementById("logo_2");
                            logo_2.src=event.target.dataset.logo2
                            score_1_tot=Number(event.target.dataset.score1)
                            score_2_tot=Number(event.target.dataset.score2)
                            if(score_1_tot<score_2_tot){
                                score_1.style.color="red"
                                score_2.style.color="green"
                            }else{
                                score_1.style.color="green"
                                score_2.style.color="red"
                            }


                            fetch( `get_match_stats/${event.target.dataset.matchid}`)
                            .then(response => response.text())
                            .then(text => {
                                if(text==="empty"){
                                    console.log(text)
                                }else{
                                   // console.log(text)
                                    //var squads = JSON.parse(text);
                                   // console.log(squads)
                                    /////////////
                                    //////// creating stats box
                                    //////////////////
                                    document.getElementById('stats').style.display='block'
                                        var col_team_1=document.getElementById("col_team_1");
                                        var col_team_2=document.getElementById("col_team_2");
                                        col_team_1.innerHTML=""
                                        col_team_2.innerHTML=""
                                        var row_top=  document.createElement('div')
                                        row_top.classList.add('row', 'border', 'm-0','p-0',  'text-black')  
                                        var row_top2=  document.createElement('div')
                                        row_top2.classList.add('row', 'border', 'm-0','p-0',  'text-black')  
                                        var col1 = document.createElement('div')
                                        var col2 = document.createElement('div')
                                        var col3 = document.createElement('div')
                                        var col4 = document.createElement('div')
                                        var col5 = document.createElement('div')
                                        var col6 = document.createElement('div')
                                        col1.classList.add('col-5', 'border', 'm-0','p-0',  'text-black')  
                                        col2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col3.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col4.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col5.classList.add('col-1', 'border',  'p-0',  'text-black')
                                        col6.classList.add('col-2',   'text-black')  
                                        col1.innerHTML="Player"
                                        col2.innerHTML="G"
                                        col3.innerHTML="A"
                                        col4.innerHTML="YC"
                                        col5.innerHTML="RC"
                                        col6.innerHTML="Score"
                                        var col1_2 = document.createElement('div')
                                        var col2_2 = document.createElement('div')
                                        var col3_2 = document.createElement('div')
                                        var col4_2 = document.createElement('div')
                                        var col5_2 = document.createElement('div')
                                        var col6_2 = document.createElement('div')
                                        col1_2.classList.add('col-5', 'border', 'm-0','p-0',  'text-black')  
                                        col2_2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col3_2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col4_2.classList.add('col-1', 'border',  'p-0',  'text-black')  
                                        col5_2.classList.add('col-1', 'border',  'p-0',  'text-black')
                                        col6_2.classList.add('col-2',   'text-black')  
                                        col1_2.innerHTML="Player"
                                        col2_2.innerHTML="G"
                                        col3_2.innerHTML="A"
                                        col4_2.innerHTML="YC"
                                        col5_2.innerHTML="RC"
                                        col6_2.innerHTML="Score"
                                        row_top.append(col1)
                                        row_top.append(col2)
                                        row_top.append(col3)
                                        row_top.append(col4)
                                        row_top.append(col5)
                                        row_top.append(col6)
                                        col_team_1.append(row_top)
                                        row_top2.append(col1_2)
                                        row_top2.append(col2_2)
                                        row_top2.append(col3_2)
                                        row_top2.append(col4_2)
                                        row_top2.append(col5_2)
                                        row_top2.append(col6_2)
                                        col_team_2.append(row_top2)   
                                var players = JSON.parse(text);
                                    //console.log(players)
                                    for (var i in players) {
                                        var row =  document.createElement('div')
                                            row.classList.add('row','border', 'm-0','p-0',  'text-black')
                                            var col1 =  document.createElement('div')
                                            col1.classList.add('col-5','fw-bold', 'border', 'm-0','p-0',  'text-black')
                                            var col1g =  document.createElement('div')
                                            col1g.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col1a =  document.createElement('div')
                                            col1a.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col1y =  document.createElement('div')
                                            col1y.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col1r =  document.createElement('div')
                                            col1r.classList.add('col-1','border',  'p-0',  'text-black')
                                            var col2 =  document.createElement('div')
                                            col2.classList.add('col-2','fw-bold', 'border',   'text-black')
                                            col1.innerHTML=`${players[i].name}`
                                            col1g.innerHTML=`${players[i].goals}`
                                            col1a.innerHTML=`${players[i].assists}`
                                            col1y.innerHTML=`${players[i].yellow}`
                                            col1r.innerHTML=`${players[i].red}`
                                            col2.innerHTML=`${players[i].score}`
                                            row.append(col1)
                                            row.append(col1g)
                                            row.append(col1a)
                                            row.append(col1y)
                                            row.append(col1r)
                                            
                                            row.append(col2)
                                        if(Number(players[i].club)===Number(stats_btn.dataset.club1id)){
                                            console.log("qui")
                                             
                                            col_team_1.append(row)
                                            //console.log(col_team_2.innerHTML)
                                        }else if(Number(players[i].club)===Number(stats_btn.dataset.club2id)){
                                            console.log("team: "+players[i].club + " - "+stats_btn.dataset.club2id)
                                           
                                            col_team_2.append(row)
                                            //console.log(col_team_2.innerHTML)
                                        }
                                    }
                                    //////////
                                    //// end stats box
                                    ////////


                                }
                                result_box.style.display='block'
                     });
                        });  

                        div2.append(stats_btn)


                        
                    }
                    table_row.append(div1)
                    table_row.append(home_logo_div)
                    table_row.append(home_team)
                    table_row.append(home_score)
                    table_row.append(away_score)
                    table_row.append(away_team)
                    table_row.append(away_logo_div)
                    table_row.append(div2)
                    
                    table_box.append(table_row)
                    //var div1 =document.getElementById("budget");
                    let score_1=matches[i].score_1;
                    let score_2=matches[i].score_2;
                    console.log(score_1+" vs "+score_2)

                }
                
                
            }
        });
    }

    const close_result_btn=document.getElementById("close_result_btn"); 
    close_result_btn.addEventListener("click", function() {
         
            
            var stats= document.getElementById('stats')
            var col_team_1= document.getElementById('col_team_1')
            var col_team_2= document.getElementById('col_team_2')
            col_team_1.innerHTML=""
            col_team_2.innerHTML=""
             
            document.getElementById('myModal-result').style.display='none'
        
    });




get_matches()

 
    //countdown()
 
});