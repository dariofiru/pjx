document.addEventListener('DOMContentLoaded', function () {


    function get_table(){
            fetch( `get_table`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                    var table_box=document.getElementById("table_box");
                    for (var i in squads) {
                        var table_row = document.createElement('div')
                        var div1 =document.createElement('div')
                        var team =document.createElement('div')
                        var elo =document.createElement('div')
                        var away =document.createElement('div')
                        var home=document.createElement('div')
                        var total=document.createElement('div')
                        var total_won =document.createElement('div')
                        var home_won=document.createElement('div')
                        var away_won=document.createElement('div')
                        var div2 =document.createElement('div')
                        table_row.classList.add('row',    'bg-light')
                        table_row.style.margin="5px"
                        team.classList.add('col-2', 'text-start', 'text-black')
                        elo.classList.add('col-2',   'text-black')
                        total.classList.add('col-1', 'text-black')
                        home.classList.add('col-1', 'text-black')
                        away.classList.add('col-1', 'text-black')
                        total_won.classList.add('col-1', 'text-black')
                        home_won.classList.add('col-1', 'text-black')
                        away_won.classList.add('col-1', 'text-black')
                        div1.classList.add('col-1', 'text-black')
                        div2.classList.add('col-2', 'text-black')
                        div1.innerHTML=Number(i)+1
                        team.innerHTML=squads[i].name;
                        //away_team.innerHTML=squads[i].lineup_2_name;
                        elo.innerHTML=squads[i].elo;
                        total.innerHTML=squads[i].total_played;
                        home.innerHTML=squads[i].home_played;
                        away.innerHTML=squads[i].away_played;
                        total_won.innerHTML=Number(squads[i].home_won)+Number(squads[i].away_won);
                        home_won.innerHTML=squads[i].home_won;
                        away_won.innerHTML=squads[i].away_won;
                        table_row.append(div1)
                        table_row.append(team)
                        table_row.append(elo)
                        table_row.append(total)
                        table_row.append(home)
                        table_row.append(away)
                        table_row.append(total_won)
                        table_row.append(home_won)
                        table_row.append(away_won)
                       // table_row.append(div2)
                        
                        table_box.append(table_row)
                    } 
                }
            });
        }
    
    
    get_table()

// var start_round;
// function startcheckRound(url){
//         setInterval(async function(){
//           const response = await fetch(url);
//           const text = await response.text();
//           var start = JSON.parse(text);
//           start= start['round_num'] 
//           if(start>start_round){
//             console.log("New match available: "+start+"-"+start_round)
//             start_round=start
//           }
//           else{
//             console.log("still on round: "+start+"-"+start_round)
//           }   
//         }, 20000);     
//       }
// fetch(`get_start`)
// .then(response => response.text())
// .then(text => {
// var start = JSON.parse(text);
// // 2024-01-05T22:55:32.839Z
// start_round= start['round_num'] 
//     console.log(" =>" +start_round)
//     });
// startcheckRound('get_start')
    

tst_btn.addEventListener('click', function () {
        var countDownDate = new Date().getTime() + 600000;
        sessionStorage.setItem('countDownDate', countDownDate);
        countdown()
    });
    //console.log("=> "+table_box)    
       
    });