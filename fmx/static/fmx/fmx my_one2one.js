document.addEventListener('DOMContentLoaded', function () {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

const btn_stats=document.getElementById("btn_stats"); 
btn_stats.addEventListener("click", function() {
    var modal_box= document.getElementById('modal_box')
    if(modal_box.style.height==="700px"){
        modal_box.style.height="500px"
        var stats= document.getElementById('stats')
        //stats.innerHTML=event.target.dataset.one2oneid
        stats.style.display='none'
    }else if(modal_box.style.height==="500px"){
        modal_box.style.height="700px"
        var stats= document.getElementById('stats')
        //stats.innerHTML=event.target.dataset.one2oneid
        stats.style.display='block'
    }
});

const close_result_btn=document.getElementById("close_result_btn"); 
close_result_btn.addEventListener("click", function() {
    var modal_box= document.getElementById('modal_box')
        modal_box.style.height="500px"
        var stats= document.getElementById('stats')
        var col_team_1= document.getElementById('col_team_1')
        var col_team_2= document.getElementById('col_team_2')
        col_team_1.innerHTML=""
        col_team_2.innerHTML=""
        stats.style.display='none'
        document.getElementById('myModal-result').style.display='none'
    
});


function get_matches(challenge_status, challenge_order,braved_status,braved_order){
    console.log(`my_one2one_data/${challenge_status}/${challenge_order}/${braved_status}/${braved_order}`)
    var cleanup= document.getElementById('challenge_box_in')
    cleanup.innerHTML=""
    cleanup= document.getElementById('braved_box_in')
    cleanup.innerHTML=""
        fetch( `my_one2one_data/${challenge_status}/${challenge_order}/${braved_status}/${braved_order}`)
        .then(response => response.text())
        .then(text => {
           console.log(text)
            if(text==="empty"){

            }else{
                //console.log(text)
                var matches = JSON.parse(text);
                var challenge_box=document.getElementById("challenge_box_in");
                var braved_box=document.getElementById("braved_box_in"); 
                
                for (var i in matches) {
                    if(matches[i].braved==='false'){
                        console.log("not braved")
                    var row =  document.createElement('div')
                    var challenge_header=document.getElementById("challenge_header");
                    //challenge_header.style.display='block'
                    row.classList.add('row','m-2','border-black','border','rounded-2')
                    var col =  document.createElement('div')
                    date=new Date(`${matches[i].time}`)
                    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const formattedTime = formatter.format(date);
                    col.classList.add('col-3',   'text-black','align-self-center')
                    col.innerHTML=` ${matches[i].club_name} <br>
                    <span style="font-size:10px"> <i>${date.toDateString()}  </i></span>`
                    var col2 =  document.createElement('div')
                    col2.classList.add('col-3', 'm-1', 'text-black','align-self-center')
                    col2.innerHTML=`${matches[i].status}`
                    row.append(col)
                    var col2b=document.createElement('div')
                    col2b.classList.add('col-2', 'm-1', 'text-black','align-self-center')
                    col2b.innerHTML=`$${matches[i].bet}`
                    var col3 =  document.createElement('div')
                    col3.classList.add('col',   'text-black','align-self-center')
                    if(matches[i].status==='accepted'){
                       
                        var res_btn=document.createElement('button')
                        res_btn.classList.add('btn','btn-primary', 'btn-sm','m-1')
                        res_btn.id="res_btn"
                        res_btn.dataset.one2oneid=matches[i].id
                        res_btn.innerHTML="View results"
                        res_btn.addEventListener('click', event => { //// results
                            console.log("->"+event.target.dataset.one2oneid)
                            var myModal_chall=document.getElementById("myModal-result");  
                             myModal_chall.style.display='block'
                            fetch( `get_one2one/${event.target.dataset.one2oneid} `)
                            .then(response => response.text())
                            .then(text => {
                                var result = JSON.parse(text);
                                console.log(result)
                                console.log("call one2one: "+"get_one2one/"+event.target.dataset.one2oneid)
                                    var btn_stats=document.getElementById("btn_stats");
                                     
                                    btn_stats.dataset.one2oneid=event.target.dataset.one2oneid
                                    var logo_1=document.getElementById("logo_1");
                                    logo_1.src=`${result[0].logo_1}`
                                    console.log(result[0].logo_1)
                                    var logo_2=document.getElementById("logo_2");
                                    logo_2.src=`${result[0].logo_2}`
                                    var club_1=document.getElementById("club_1");
                                    club_1.innerHTML=`${result[0].lineup_1_name}`
                                    var club_2=document.getElementById("club_2");
                                    club_2.innerHTML=`${result[0].lineup_2_name}`
                                    var score_1=document.getElementById("score_1");
                                    var score_2=document.getElementById("score_2");
                                     
                                    var result_text=document.getElementById("result_text");
                                    var bet_data=document.getElementById("bet_data");
                                     
                                    var score_1_correct=0.0
                                    var score_2_correct=0.0
                                      // fetch and create stats 
                                      fetch( `get_one2one_stats/${event.target.dataset.one2oneid} `)
                                      .then(response => response.text())
                                      .then(text => {
                                        console.log("call stats: "+"get_one2one_stats/"+event.target.dataset.one2oneid)
                                        document.getElementById('stats').style.display='none'
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
                                              console.log(players)
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
                                                  if(Number(players[i].club)===Number(result[0].club_1_id)){
                                                      console.log("qui")
                                                      score_1_correct=score_1_correct+Number(players[i].score) 
                                                      col_team_1.append(row)
                                                      //console.log(col_team_2.innerHTML)
                                                  }else if(Number(players[i].club)===Number(result[0].club_2_id)){
                                                      console.log("team: "+players[i].club + " - "+result[0].lineup_2)
                                                      score_2_correct=score_2_correct+Number(players[i].score)
                                                      col_team_2.append(row)
                                                      //console.log(col_team_2.innerHTML)
                                                  }
                                              }
                                              console.log("score1 correct: "+ score_1_correct+ " score2 correct: "+score_2_correct)
                                              if(score_1_correct<score_2_correct){
                                                score_1.style.color="red"
                                                score_2.style.color="green"
                                                if(club_name===`${result[0].lineup_1_name}`){
                                                    result_text.innerHTML=`you lost <img src="static/fmx/redsmile.png" style="width:25px">`
                                                    result_text.style.color="red"
                                                    bet_data.innerHTML=`You lost <b>$${result[0].bet}</b> `
                                                }else if(club_name===`${result[0].lineup_2_name}`){
                                                    result_text.innerHTML=`you won <img src="static/fmx/greensmile.png" style="width:25px">`
                                                    result_text.style.color="green"
                                                    bet_data.innerHTML=`You won <b>$${result[0].bet}</b>`
                                                }
                                            }else{
                                                score_1.style.color="green"
                                                score_2.style.color="red"
                                                if(club_name===`${result[0].lineup_1_name}`){
                                                    result_text.innerHTML=`you won <img src="static/fmx/greensmile.png" style="width:25px">`
                                                    result_text.style.color="green"
                                                    bet_data.innerHTML=`You won <b>$${result[0].bet}</b>`
                                                }else if(club_name===`${result[0].lineup_2_name}`){
                                                    result_text.innerHTML=`you lost <img src="static/fmx/redsmile.png" style="width:25px">`
                                                    result_text.style.color="red"
                                                    bet_data.innerHTML=`You won <b>$${result[0].bet}</b>`
                                                }
                                            }
                                            score_1.innerHTML=`${score_1_correct.toFixed(1)}`
                                            score_2.innerHTML=`${score_2_correct.toFixed(1)}`
                                      });

                            // END create stats
                            });
                        });
                        col3.append(res_btn)
                        
                    }else if(matches[i].status==='pending'){
                        col2.innerHTML=matches[i].status
                        col3.innerHTML=`<span style="font-size:12px">Challenge not yet accepted</span>`
                    }
                    else if(matches[i].status==='refused'){
                        row.classList.add('bg-danger', 'text-white') 
                    }
                    
                    row.append(col2b)
                    row.append(col2)
                    row.append(col3)
                    challenge_box.append(row)
                    }else{
                        console.log(" braved")
                        var row =  document.createElement('div')
                    row.classList.add('row','m-2','border-black','border','rounded-2')
                    var col =  document.createElement('div')
                    date=new Date(`${matches[i].time}`)
                    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const formattedTime = formatter.format(date);
                    col.classList.add('col-3',   'text-black', 'align-self-center')
                    col.innerHTML=` ${matches[i].club_name}<br> 
                    <span style="font-size:10px"> <i>${date.toDateString()}  </i></span>`
                     
                    var col2 =  document.createElement('div')
                    col2.classList.add('col-3', 'm-1', 'text-black','align-self-center')
                    col2.innerHTML=`${matches[i].status}`
                    var col2b=document.createElement('div')
                    col2b.classList.add('col-2', 'm-1', 'text-black','align-self-center')
                    col2b.innerHTML=`$${matches[i].bet}`
                    row.append(col)
                    row.append(col2b)
                    row.append(col2)
                    var col3 =  document.createElement('div')
                    col3.classList.add('col', 'text-center',  'text-black','align-self-center')
                    if(matches[i].status==='accepted'){
                       
                        var res_btn=document.createElement('button')
                        res_btn.classList.add('btn','btn-primary', 'btn-sm','m-1')
                        res_btn.id="res_btn"
                        res_btn.dataset.one2oneid=matches[i].id
                        
                        res_btn.innerHTML="View results"
                        res_btn.addEventListener('click', event => { //results
                            console.log("->"+event.target.dataset.one2oneid)
                            var myModal_chall=document.getElementById("myModal-result");  
                             myModal_chall.style.display='block'
                            fetch( `get_one2one/${event.target.dataset.one2oneid} `)
                            .then(response => response.text())
                            .then(text => {
                                    
                                    var result = JSON.parse(text);
                                    console.log( result)
                                    var btn_stats=document.getElementById("btn_stats");
                                    
                                    btn_stats.dataset.one2oneid=event.target.dataset.one2oneid
                                    var logo_1=document.getElementById("logo_1");
                                    logo_1.src=`${result[0].logo_1}`
                                    //console.log(result[22]["one2one"].logo_1)
                                    var logo_2=document.getElementById("logo_2");
                                    logo_2.src=`${result[0].logo_2}`
                                    var club_1=document.getElementById("club_1");
                                    club_1.innerHTML=`${result[0].lineup_1_name}`
                                    var club_2=document.getElementById("club_2");
                                    club_2.innerHTML=`${result[0].lineup_2_name}`
                                    //console.log("me: "+ " "+club_name)
                                    var score_1=document.getElementById("score_1");
                                    var score_2=document.getElementById("score_2");
                                    
                                    var result_text=document.getElementById("result_text");
                                    var bet_data =document.getElementById("bet_data");
                                    
                                    
                                    var score_1_correct=0.0
                                    var score_2_correct=0.0
                                    // fetch and create stats 
                            fetch( `get_one2one_stats/${event.target.dataset.one2oneid} `)
                            .then(response => response.text())
                            .then(text => {
                                        document.getElementById('stats').style.display='none'
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
                                    console.log(players)
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
                                        if(Number(players[i].club)===Number(result[0].club_1_id)){
                                           // console.log("qui")
                                           score_1_correct=score_1_correct+Number(players[i].score) 
                                            col_team_1.append(row)
                                            //console.log(col_team_2.innerHTML)
                                        }else if(Number(players[i].club)===Number(result[0].club_2_id)){
                                            console.log("team: "+players[i].club + " - "+result[0].lineup_2)
                                            score_2_correct=score_2_correct+Number(players[i].score)
                                            col_team_2.append(row)
                                            //console.log(col_team_2.innerHTML)
                                        }
                                    }
                                    console.log("score1 correct: "+ score_1_correct+ " score2 correct: "+score_2_correct)
                                              if(score_1_correct<score_2_correct){
                                                score_1.style.color="red"
                                                score_2.style.color="green"
                                                if(club_name===`${result[0].lineup_1_name}`){
                                                    result_text.innerHTML=`you lost <img src="static/fmx/redsmile.png" style="width:25px">`
                                                    result_text.style.color="red"
                                                    bet_data.innerHTML=`You lost <b>$${result[0].bet}</b> `
                                                }else if(club_name===`${result[0].lineup_2_name}`){
                                                    result_text.innerHTML=`you won <img src="static/fmx/greensmile.png" style="width:25px">`
                                                    result_text.style.color="green"
                                                    bet_data.innerHTML=`You won <b>$${result[0].bet}</b>`
                                                }
                                            }else{
                                                score_1.style.color="green"
                                                score_2.style.color="red"
                                                if(club_name===`${result[0].lineup_1_name}`){
                                                    result_text.innerHTML=`you won <img src="static/fmx/greensmile.png" style="width:25px">`
                                                    result_text.style.color="green"
                                                    bet_data.innerHTML=`You won <b>$${result[0].bet}</b>`
                                                }else if(club_name===`${result[0].lineup_2_name}`){
                                                    result_text.innerHTML=`you lost <img src="static/fmx/redsmile.png" style="width:25px">`
                                                    result_text.style.color="red"
                                                    bet_data.innerHTML=`You lost <b>$${result[0].bet}</b>`
                                                }
                                            }
                                            score_1.innerHTML=`${score_1_correct.toFixed(1)}`
                                            score_2.innerHTML=`${score_2_correct.toFixed(1)}`
                                    
                            });

                            // END create stats

                            });
                        });
                        col3.append(res_btn)
                        row.append(col3)
                    }else if(matches[i].status==='pending'){
                       
                        var accept_btn=document.createElement('button')
                        accept_btn.classList.add('btn','btn-success', 'm-1', 'btn-sm')
                        accept_btn.dataset.one2oneid=matches[i].id
                        accept_btn.dataset.lineup1=club_1.innerHTML
                        accept_btn.dataset.lineup2=matches[i].club_name
                        
                        accept_btn.addEventListener('click', event => {
                            console.log("->"+event.target.dataset.one2oneid)
                            console.log("1:"+matches[i].club_name)
                            console.log("2:"+club_name)
                            var myModal_chall=document.getElementById("myModal-chall");  
                            myModal_chall.style.display='block'
///////////////////////////////////////////////////////
                            var headline_var="hello"
                                 fetch( "random_headline/one2one")
                                 .then(response => response.text())
                                 .then(text => {
                                          const headline_txt=document.getElementById("headline-txt");
                                          var headline = JSON.parse(text);
                                          for (var i in headline) {
                                             headline = headline[i]
                                             headline_var=headline[i]
                                             headline=headline.replace("AX",club_name)
                                             headline=headline.replace("BX",accept_btn.dataset.lineup2) 
                                             headline_txt.innerHTML=headline 
                                          }
                                          fetch(`/accept_challenge/${event.target.dataset.one2oneid}`, {
                                            method: 'PUT',
                                            headers: { 'X-CSRFToken': csrftoken },
                                            mode: 'same-origin',
                                            body: JSON.stringify({
                                                csrfmiddlewaretoken: csrftoken 
                                            })
                                        }).then(response => {
                                            return response.text()
                                        }).then(data => {
                                             
                                            
                                             var spinner=document.getElementById("spinner"); 
                                             spinner.style.display='none' 
                                             var view_chall_btn=document.getElementById("view_chall_btn");  
                                              
                                             var close_chall_btn=document.getElementById("close_chall_btn");  
                                            // view_chall_btn.classList.add('visually-hidden')
                                             //close_chall_btn.classList.add('visually-hidden')
                                             var button_box=document.getElementById("button_box"); 
                                             button_box.classList.remove('visually-hidden')
                                             var chall_text=document.getElementById("chall_text"); 
                                             chall_text.style.display='none' 
                                         }
                                        );
                                     }
                                 );
                                 console.log(headline_var)


/////////////////////////////////////////////////////////////////////////////////



                            // fetch(`/accept_challenge/${event.target.dataset.one2oneid}`, {
                            //     method: 'PUT',
                            //     headers: { 'X-CSRFToken': csrftoken },
                            //     mode: 'same-origin',
                            //     body: JSON.stringify({
                            //         csrfmiddlewaretoken: csrftoken 
                            //     })
                            // }).then(response => {
                            //     return response.text()
                            // }).then(data => {
                            //      console.log("here") 
                            //      console.log("3:"+matches[i].club_name)
                            // console.log("4:"+club_name)
                            //     // var headline_var="hello"
                            //     //  fetch( "random_headline/one2one")
                            //     //  .then(response => response.text())
                            //     //  .then(text => {
                            //     //           const headline_txt=document.getElementById("headline-txt");
                            //     //           var headline = JSON.parse(text);
                            //     //           for (var i in headline) {
                            //     //              headline = headline[i]
                            //     //              headline_var=headline[i]
                            //     //              headline=headline.replace("AX",club_name)
                            //     //              headline=headline.replace("BX",accept_btn.dataset.lineup2) 
                            //     //              headline_txt.innerHTML=headline 
                                             
                            //     //           }
                            //     //      }
                            //     //  );
                            //     //  console.log(headline_var)
                            //     //  var now = Date.now(), end = now + 2000;
                            //     //  while (now < end) { now = Date.now(); }
                            //      var spinner=document.getElementById("spinner"); 
                            //      spinner.style.display='none' 
                            //      var view_chall_btn=document.getElementById("view_chall_btn");  
                                  
                            //      var close_chall_btn=document.getElementById("close_chall_btn");  
                            //     // view_chall_btn.classList.add('visually-hidden')
                            //      //close_chall_btn.classList.add('visually-hidden')
                            //      var button_box=document.getElementById("button_box"); 
                            //      button_box.classList.remove('visually-hidden')
                            //      var chall_text=document.getElementById("chall_text"); 
                            //      chall_text.style.display='none' 
                            //  }
                            // );

                        });
                        accept_btn.innerHTML="Accept"
                        col3.append(accept_btn)
                        
                        var refuse_button=document.createElement('button')
                        refuse_button.dataset.one2oneid=matches[i].id
                        refuse_button.classList.add('btn','btn-danger', 'm-1', 'btn-sm')
                        refuse_button.addEventListener('click', event => {
                            console.log("->"+event.target.dataset.one2oneid)
                            fetch( `refuse_challenge/${event.target.dataset.one2oneid}`)
                            .then(response => response.text())
                            .then(text => {
                               //console.log(text)
                     });
                            alert("You have refused the challenge")

                            window.location.reload ()
                        });
                        refuse_button.innerHTML="Refuse"
                        
                        col3.append(refuse_button)
                    row.append(col3)
                    
                    }braved_box.append(row)
                    }
                }
            // table_box.append(row)   
                
            }
        });
    }


get_matches(0,0,0,"timestamp")
 
 
const challenge_status=document.getElementById("challenge_status"); 
console.log("- "+challenge_status.value)
const challenge_order=document.getElementById("challenge_order");
console.log("- "+challenge_order.value)
const braved_status=document.getElementById("braved_status"); 
const braved_order=document.getElementById("braved_order"); 
challenge_status.addEventListener("change", function() {
    console.log("change1")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});
challenge_order.addEventListener("change", function() {
    console.log("change2")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});
braved_status.addEventListener("change", function() {
    console.log("change3")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});
braved_order.addEventListener("change", function() {
    console.log("change4")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});



 
});