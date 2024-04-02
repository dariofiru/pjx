

document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
//console.log("csrftoken3: "+csrftoken3)
    const save_btn=document.getElementById("save_btn");
    const clear_btn=document.getElementById("clear_btn");
    save_btn.style.display="none"
    clear_btn.style.display="none"
    clear_btn.addEventListener('click', event => {
    
    clear_players()
    
});

function clear_players(){
    const chosen_formation=document.getElementById("chosen_formation");
    formation=chosen_formation.innerHTML 
    console.log("formation:" +formation)
        color_d="secondary"
        player_position_d='Defender'
        line_d = Number(chosen_formation.innerHTML[0]);
        color_m="primary"
        player_position_m='Midfielder'
        line_m = Number(chosen_formation.innerHTML[1]);
       color_a="success"
       player_position_a='Attacker'
        line_a = Number(chosen_formation.innerHTML[2]);
        const box=document.getElementById('Goalkeeper-1');   
           if (box.classList.contains(`bg-danger`)){
               box.classList.add(`bg-danger-subtle`)
               box.classList.remove(`bg-danger`)           
           }

       for(let i = 1; i<=line_d; i++){
           const box=document.getElementById(`${player_position_d}-${i}-${line_d}`);   
           if (box.classList.contains(`bg-${color_d}`)){
               box.classList.add(`bg-${color_d}-subtle`)
               box.classList.remove(`bg-${color_d}`)             
           }
       }
       for(let i = 1; i<=line_m; i++){
        const box=document.getElementById(`${player_position_m}-${i}-${line_m}`);   
        if (box.classList.contains(`bg-${color_m}`)){
            box.classList.add(`bg-${color_m}-subtle`)
            box.classList.remove(`bg-${color_m}`)           
        }
    }
    for(let i = 1; i<=line_a; i++){
        const box=document.getElementById(`${player_position_a}-${i}-${line_a}`);   
        if (box.classList.contains(`bg-${color_a}`)){
            box.classList.add(`bg-${color_a}-subtle`)
            box.classList.remove(`bg-${color_a}`)           
        }
    }
    if(formation==='352'){
        f_352()
    }
    if(formation==='532'){
        f_532()
    }
    if(formation==='442'){
        f_442()
    }
    if(formation==='433'){
        f_433()
    }
    
}

    const l_352=document.getElementById("352");
    const l_532=document.getElementById("532");
    const l_442=document.getElementById("442");
    const l_433=document.getElementById("433");

function formation_cleaner(){
    var cleaner = document.getElementsByClassName("lineup_box")
    for (var i = 0; i < cleaner.length; i++) {
        cleaner[i].classList.remove('lineup', 'player-box-market', 'lineup_goalkeeper','lineup_attacker','lineup_defender','lineup_midfielder');
        cleaner[i].innerHTML=""
    }
    
    clear_btn.style.display="block"
    save_btn.style.display="block"
    return false;
}

function f_532(){
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="532"
    formation_cleaner();
    
    G_1=document.getElementsByClassName("Goalkeeper-1")[0];
    G_1.classList.add('lineup_goalkeeper', 'player-box-market')

    D_1=document.getElementsByClassName("Defender-1-5")[0];
    D_2=document.getElementsByClassName("Defender-2-5")[0];
    D_3=document.getElementsByClassName("Defender-3-5")[0];
    D_4=document.getElementsByClassName("Defender-4-5")[0];
    D_5=document.getElementsByClassName("Defender-5-5")[0];
    Defender_3_line=document.getElementById("Defenders-3-line");
    Defender_4_line=document.getElementById("Defenders-4-line");
    Defender_5_line=document.getElementById("Defenders-5-line");
    Defender_3_line.display="none" 
    Defender_4_line.display="none" 
    Defender_5_line.display="block" 
    Defender_5_line.style.fontSize="12px"
    D_1.classList.add('lineup_defender', 'player-box-market')
    D_2.classList.add( 'lineup_defender','player-box-market')
    D_3.classList.add('lineup_defender', 'player-box-market')
    D_4.classList.add('lineup_defender', 'player-box-market')
    D_5.classList.add('lineup_defender', 'player-box-market')
    M_1=document.getElementsByClassName("Midfielder-1-3")[0];
    M_2=document.getElementsByClassName("Midfielder-2-3")[0];
    M_3=document.getElementsByClassName("Midfielder-3-3")[0];

    Midfielder_3_line=document.getElementById("Midfielders-3-line");
    Midfielder_4_line=document.getElementById("Midfielders-4-line");
    Midfielder_5_line=document.getElementById("Midfielders-5-line");
    Midfielder_4_line.display="none" 
    Midfielder_5_line.display="none" 
    Midfielder_3_line.display="block" 

    M_1.classList.add('lineup_midfielder', 'player-box-market')
    M_2.classList.add('lineup_midfielder', 'player-box-market')
    M_3.classList.add('lineup_midfielder', 'player-box-market')

    A_1=document.getElementsByClassName("Attacker-1-2")[0];
    A_2=document.getElementsByClassName("Attacker-2-2")[0];
    Attacker_2_line=document.getElementById("Attackers-2-line");
    Attacker_3_line=document.getElementById("Attackers-3-line");
    Attacker_3_line.display="none" 
    Attacker_2_line.display="block" 
    A_1.classList.add('lineup_attacker', 'player-box-market')
    A_2.classList.add('lineup_attacker', 'player-box-market')

    G_1.innerHTML="Goalkeeper 1"
    D_1.innerHTML="Defender 1"
    D_2.innerHTML="Defender 2"
    D_3.innerHTML="Defender 3"
    D_4.innerHTML="Defender 4"
    D_5.innerHTML="Defender 5"
    M_1.innerHTML="Midfielder 1"
    M_2.innerHTML="Midfielder 2"
    M_3.innerHTML="Midfielder 3"
    A_1.innerHTML="Attacker 1"
    A_2.innerHTML="Attacker 2" 
}
function f_352(){
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="352"
    formation_cleaner();
 
    G_1=document.getElementsByClassName("Goalkeeper-1")[0];
    G_1.classList.add('lineup_goalkeeper', 'player-box-market')
    D_1=document.getElementsByClassName("Defender-1-3")[0];
    D_2=document.getElementsByClassName("Defender-2-3")[0];
    D_3=document.getElementsByClassName("Defender-3-3")[0];

    Defender_3_line=document.getElementById("Defenders-3-line");
    Defender_4_line=document.getElementById("Defenders-4-line");
    Defender_5_line=document.getElementById("Defenders-5-line");
    Defender_4_line.display="none" 
    Defender_5_line.display="none" 
    Defender_3_line.display="block" 
    Defender_3_line.style.fontSize="16px" 
    D_1.classList.add('lineup_defender', 'player-box-market')
    D_2.classList.add('lineup_defender', 'player-box-market')
    D_3.classList.add('lineup_defender', 'player-box-market')
    M_1=document.getElementsByClassName("Midfielder-1-5")[0];
    M_2=document.getElementsByClassName("Midfielder-2-5")[0];
    M_3=document.getElementsByClassName("Midfielder-3-5")[0];
    M_4=document.getElementsByClassName("Midfielder-4-5")[0];
    M_5=document.getElementsByClassName("Midfielder-5-5")[0];
    Midfielder_3_line=document.getElementById("Midfielders-3-line");
    Midfielder_4_line=document.getElementById("Midfielders-4-line");
    Midfielder_5_line=document.getElementById("Midfielders-5-line");
    Midfielder_3_line.display="none" 
    Midfielder_4_line.display="none" 
    Midfielder_5_line.display="block" 
    Midfielder_5_line.style.fontSize="12px"
    M_1.classList.add('lineup_midfielder', 'player-box-market')
    M_2.classList.add('lineup_midfielder', 'player-box-market')
    M_3.classList.add('lineup_midfielder', 'player-box-market')
    M_4.classList.add('lineup_midfielder', 'player-box-market')
    M_5.classList.add('lineup_midfielder', 'player-box-market')
     
    A_1=document.getElementsByClassName("Attacker-1-2")[0];
    A_2=document.getElementsByClassName("Attacker-2-2")[0];
    Attacker_2_line=document.getElementById("Attackers-2-line");
    Attacker_3_line=document.getElementById("Attackers-3-line");
    Attacker_3_line.display="none" 
    Attacker_2_line.display="block" 
    A_1.classList.add('lineup_attacker', 'player-box-market')
    A_2.classList.add('lineup_attacker', 'player-box-market')

    G_1.innerHTML="Goalkeeper 1"
    D_1.innerHTML="Defender 1"
    D_2.innerHTML="Defender 2"
    D_3.innerHTML="Defender 3"
    M_1.innerHTML="Midfielder 1"
    M_2.innerHTML="Midfielder 2"
    M_3.innerHTML="Midfielder 3"
    M_4.innerHTML="Midfielder 4"
    M_5.innerHTML="Midfielder 5"
    A_1.innerHTML="Attacker 1"
    A_2.innerHTML="Attacker 2"
}
function f_442(){
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="442"
    formation_cleaner();
    //const side_nav=document.getElementById("mySidenav");
    G_1=document.getElementsByClassName("Goalkeeper-1")[0];
    G_1.classList.add('lineup_goalkeeper', 'player-box-market')
    D_1=document.getElementsByClassName("Defender-1-4")[0];
    D_2=document.getElementsByClassName("Defender-2-4")[0];
    D_3=document.getElementsByClassName("Defender-3-4")[0];
    D_4=document.getElementsByClassName("Defender-4-4")[0];
    Defender_3_line=document.getElementById("Defenders-3-line");
    Defender_4_line=document.getElementById("Defenders-4-line");
    Defender_5_line=document.getElementById("Defenders-5-line");
    Defender_5_line.display="none" 
    Defender_3_line.display="none" 
    Defender_4_line.display="block" 
    Defender_4_line.style.fontSize="12px"
    D_1.classList.add('lineup_defender', 'player-box-market')
    D_2.classList.add('lineup_defender', 'player-box-market')
    D_3.classList.add('lineup_defender', 'player-box-market')
    D_4.classList.add('lineup_defender', 'player-box-market')
     
    
    M_1=document.getElementsByClassName("Midfielder-1-4")[0];
    M_2=document.getElementsByClassName("Midfielder-2-4")[0];
    M_3=document.getElementsByClassName("Midfielder-3-4")[0];
    M_4=document.getElementsByClassName("Midfielder-4-4")[0];
     
    Midfielder_3_line=document.getElementById("Midfielders-3-line");
    Midfielder_4_line=document.getElementById("Midfielders-4-line");
    Midfielder_5_line=document.getElementById("Midfielders-5-line");
    Midfielder_3_line.display="none" 
    Midfielder_5_line.display="none" 
    Midfielder_4_line.display="block" 
    Midfielder_4_line.style.fontSize="12px"
    M_1.classList.add('lineup_midfielder', 'player-box-market')
    M_2.classList.add('lineup_midfielder', 'player-box-market')
    M_3.classList.add('lineup_midfielder', 'player-box-market')
    M_4.classList.add('lineup_midfielder', 'player-box-market')
  
    A_1=document.getElementsByClassName("Attacker-1-2")[0];
    A_2=document.getElementsByClassName("Attacker-2-2")[0];
    Attacker_2_line=document.getElementById("Attackers-2-line");
    Attacker_3_line=document.getElementById("Attackers-3-line");
    Attacker_3_line.display="none" 
    Attacker_2_line.display="block" 
    A_1.classList.add('lineup_attacker', 'player-box-market')
    A_2.classList.add('lineup_attacker', 'player-box-market')

    G_1.innerHTML="Goalkeeper 1"
    D_1.innerHTML="Defender 1"
    D_2.innerHTML="Defender 2"
    D_3.innerHTML="Defender 3"
    D_4.innerHTML="Defender 4"
    M_1.innerHTML="Midfielder 1"
    M_2.innerHTML="Midfielder 2"
    M_3.innerHTML="Midfielder 3"
    M_4.innerHTML="Midfielder 4"
    A_1.innerHTML="Attacker 1"
    A_2.innerHTML="Attacker 2"
}
function f_433(){
    const chosen_formation=document.getElementById("chosen_formation");
        chosen_formation.innerHTML="433"
        formation_cleaner();
        //const side_nav=document.getElementById("mySidenav");
        G_1=document.getElementById("Goalkeeper-1");
        G_1.classList.add('lineup_goalkeeper', 'player-box-market')
        D_1=document.getElementById("Defender-1-4");
        D_2=document.getElementById("Defender-2-4");
        D_3=document.getElementById("Defender-3-4");
        D_4=document.getElementById("Defender-4-4");
        Defender_3_line=document.getElementById("Defenders-3-line");
        Defender_4_line=document.getElementById("Defenders-4-line");
        Defender_5_line=document.getElementById("Defenders-5-line");
        Defender_5_line.display="none" 
        Defender_3_line.display="none" 
        Defender_4_line.display="block" 
        Defender_4_line.style.fontSize="12px"
        D_1.classList.add('lineup_defender', 'player-box-market')
        D_2.classList.add('lineup_defender', 'player-box-market')
        D_3.classList.add('lineup_defender', 'player-box-market')
        D_4.classList.add('lineup_defender', 'player-box-market')
        M_1=document.getElementById("Midfielder-1-3");
        M_2=document.getElementById("Midfielder-2-3");
        M_3=document.getElementById("Midfielder-3-3");
         
        Midfielder_3_line=document.getElementById("Midfielders-3-line");
        Midfielder_4_line=document.getElementById("Midfielders-4-line");
        Midfielder_5_line=document.getElementById("Midfielders-5-line");
        Midfielder_4_line.display="none" 
        Midfielder_5_line.display="none" 
        Midfielder_3_line.display="block" 

        M_1.classList.add('lineup_midfielder', 'player-box-market')
        M_2.classList.add('lineup_midfielder', 'player-box-market')
        M_3.classList.add('lineup_midfielder', 'player-box-market')
        //M_5.classList.add('lineup', 'player-box-market')

        A_1=document.getElementById("Attacker-1-3");
        A_2=document.getElementById("Attacker-2-3");
        A_3=document.getElementById("Attacker-3-3");
        Attacker_2_line=document.getElementById("Attackers-2-line");
        Attacker_3_line=document.getElementById("Attackers-3-line");
        Attacker_2_line.display="none" 
        Attacker_3_line.display="block" 

        A_1.classList.add('lineup_attacker', 'player-box-market')
        A_2.classList.add('lineup_attacker', 'player-box-market')
        A_3.classList.add('lineup_attacker', 'player-box-market')

        console.log('before');
    
        G_1.innerHTML="Goalkeeper 1"
        D_1.innerHTML="Defender 1"
        D_2.innerHTML="Defender 2"
        D_3.innerHTML="Defender 3"
        D_4.innerHTML="Defender 4"
        M_1.innerHTML="Midfielder 1"
        M_2.innerHTML="Midfielder 2"
        M_3.innerHTML="Midfielder 3"
        A_1.innerHTML="Attacker 1"
        A_2.innerHTML="Attacker 2"
        A_3.innerHTML="Attacker 3"

    
        
}
l_532.addEventListener('click', event => {
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="532"
    clear_players()
    f_532()
});
l_352.addEventListener('click', event => {
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="352"
    clear_players()
    f_352()
});
l_442.addEventListener('click', event => {
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="442"
    clear_players()
    f_442()   
});
l_433.addEventListener('click', event => {
    const chosen_formation=document.getElementById("chosen_formation");
    chosen_formation.innerHTML="433"
    clear_players()
    f_433()     
});


const current_lineup=document.getElementById("current_lineup")
current_lineup.addEventListener('click', event => {
   
    document.getElementById("myModal-lineup").style.display = "block";
}); 


function get_lineup(){
    const lineup_list=document.getElementById("lineup_list")
   // console.log(lineup_list.innerHTML)
    const modal=document.getElementById("myModal-lineup")
        fetch( `get_lineup`)
        .then(response => response.text())
        .then(text => {
            if(text==="empty"){
                current_lineup.classList.add('visually-hidden')
                
                //console.log("none")
            }else{
                if(current_lineup.classList.contains('visually-hidden'))
                current_lineup.classList.remove('visually-hidden')
                var lineup = JSON.parse(text);
               // console.log(text)
                for (var i in lineup) {
                    const row_formation = document.createElement("div");
                    row_formation.classList.add('row')
                        const col_formation= document.createElement("div");
                        
                        col_formation.classList.add('col-12','text-center', 'pt-0', 'mt-0')
                        col_formation.innerHTML=`Formation: ${lineup[0]['formation']}`
                        lineup_list.append(col_formation)
                        let D_tot= lineup[0]['formation'][0]
                        let M_tot= lineup[0]['formation'][1]
                        let A_tot= lineup[0]['formation'][2]
                       
                    for(var j=1; j<12; j++){
                        const div1= document.createElement("div");
                        const div2= document.createElement("div");
                        div1.classList.add('col-2')
                        div2.classList.add('col-2')
                        const row = document.createElement("div");
                        row.classList.add('row')
                        const col= document.createElement("div");
                         
                        col.style.fontSize="12px"
                        col.style.fontWeight="bold"
                        col.innerHTML=lineup[0][`player_${Number(j)}`]
                        if(j==1){
                            col.classList.add('bg-danger')
                        }
                        if(j>1 && j<=Number(D_tot)+1){
                           // console.log(j+" "+lineup[0][`player_${Number(j)}`])
                            col.classList.add('bg-secondary')
                        }
                        if(j>Number(D_tot)+1 && j<=Number(D_tot)+Number(M_tot)+1 ){
                            col.classList.add('bg-primary')
                        }
                        if(j>Number(D_tot)+Number(M_tot)+1  ){
                            col.classList.add('bg-success')
                        }
                        col.classList.add('col-8','text-center')
                        col.style.fontSize="12px"
                        col.innerHTML=lineup[0][`player_${Number(j)}`]
                        row.append(div1)
                        row.append(col)
                        row.append(div2)
                        lineup_list.append(row)
                        // var player = {}
                        // player['id'] = lineup[0][`player_${Number(j)}_id`]
                        // player['name']= lineup[0][`player_${Number(j)}`]
                        // let player_name=lineup[0][`player_${Number(j)}_id`]
                        //list_lineup.push(player)
                        //console.log(list_lineup[j])
                    }
                    
                    
                }            
                
            }
        });
    }

    get_lineup()    

// const current_lineup=document.getElementById("current_lineup")
// current_lineup.addEventListener('click', event => {
//     const side_nav=document.getElementById("mySidenavLineup");
//     document.getElementById("mySidenavLineup").style.width = "0";

//     if(side_nav.style.width==="0px"){
        
//         document.getElementById("mySidenavLineup").style.width = "340px";
//     }
//     else{
//         document.getElementById("mySidenavLineup").style.width = "0";
//     }  


// }); 

const side_nav_close=document.getElementById("mySidenav"); 
side_nav_close.addEventListener('click', event => {
   
    document.getElementById("mySidenav").style.width = "0";
}); 

 

async function get_data(){
        fetch( `user_club/${user_id}`)
        .then(response => response.text())
        .then(text => {
            if(text==="empty"){

            }else{
                var club_data = JSON.parse(text);
                for (var i in club_data) {
                    var budget_box=document.getElementById("budget");
                    budget_box.innerHTML = club_data[i].initial_budget;
                    option.value = teams_data[i].id;
                    team_search.add(option);
                }  
            }
        });
    }

 
 
/// listeners for search dropdowns (teams and position)
 

// listener for save team (temporary)
 
save_btn.addEventListener("click", function() {
    const chosen_formation=document.getElementById("chosen_formation");
    formation=chosen_formation.innerHTML;
    D_line = Number(chosen_formation.innerHTML[0]);
    M_line = Number(chosen_formation.innerHTML[1]);
    A_line = Number(chosen_formation.innerHTML[2]);
    //const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const csrftoken = csrftoken3;
    var jsonSquad = [];
        let box = document.getElementById(`Goalkeeper-1`);
        if(box.innerHTML.includes("Goalkeeper")){
            alert("Please fill up all positions")
            return;
        }
       // console.log("json: "+box.innerHTML)
        let j = 1; 
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid }); 
        // const box=document.getElementById(`${player_position}-${i}-${line}`);
    for (var i = 1; i <= D_line; i++) {
        j++;
        const box=document.getElementById(`Defender-${i}-${D_line}`);
        if(box.innerHTML.includes("Defender")){
            alert("Please fill up all positions")
            return;
        }
        //console.log("json: "+box.innerHTML)
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid});
    }
    for (var i = 1; i <= M_line; i++) {
        j++;
        let box = document.getElementById(`Midfielder-${i}-${M_line}`);
        if(box.innerHTML.includes("Midfielder")){
            alert("Please fill up all positions")
            return;
        }
       // console.log("json: "+box.innerHTML)
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid});
    }
    for (var i = 1; i <= A_line; i++) {
        j++;
        let box = document.getElementById(`Attacker-${i}-${A_line}`);
        if(box.innerHTML.includes("Attacker")){
            alert("Please fill up all positions")
            return;
        }
       // console.log("json: "+box.innerHTML)
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid});
    }
    console.log(jsonSquad)
    fetch(`/save_lineup`, {
        method: 'PUT',
        headers: { 'X-CSRFToken': csrftoken },
        mode: 'same-origin',
        body: JSON.stringify({
            csrfmiddlewaretoken: csrftoken,
            squad: jsonSquad,
            squad_name: club_name,
            formation: formation
        })
    }).then(response=>response.text())
    .then(data=>{  
    saved_squad=document.getElementById('Modal-saved-squad')
    if(has_lineup=='False' ){
        saved_squad.style.height="160px;"
        document.getElementById('first_lineup_msg').style.display='block'
        document.getElementById('new_lineup_msg').style.display='none'
        //alert("false")
    }
    else{
        saved_squad.style.height="100px;"
        document.getElementById('first_lineup_msg').style.display='none'
        document.getElementById('new_lineup_msg').style.display='block'
        //alert("true")
    }
    saved_squad.style.display='block'
     
    })

     
});
// const run_round_btn=document.getElementById("run_round_btn");
// run_round_btn.addEventListener("click", function() {
//     console.log("run round!")
//  });

    
async function get_player_details(id){
    //////////////
    // creates the side bar with player statistics.
    //
    //////////////
 
    const side_nav=document.getElementById("mySidenav");
    const det_player_id  =document.getElementById("det_player_id");
    const det_player_value  =document.getElementById("det_player_value");

    const det_player_photo=document.getElementById("det_player_photo");
    const det_player_name=document.getElementById("det_player_name");
    const det_player_squad_name=document.getElementById("det_player_squad_name");
             
    const det_player_position=document.getElementById("det_player_position");
    const det_player_1=document.getElementById("det_player_1");
    const det_player_2=document.getElementById("det_player_2");
    const stat_player_1=document.getElementById("stat_player_1");
    const stat_player_2=document.getElementById("stat_player_2");
    
    det_player_id.innerHTML=`${id}`
    // sign button eventhandler 

    fetch( `get_player_details/${id}`)
    .then(response => response.text())
    .then(text => {
        
            var player_data = JSON.parse(text);
            for (var i in player_data) {
            det_player_value.innerHTML=`${player_data[i].value}`
            det_player_photo.src=`${player_data[i].photo}`
            det_player_position.innerHTML=`${player_data[i].position}`
            
            det_player_name.innerHTML=`${player_data[i].name}`
            det_player_squad_name.innerHTML=`${player_data[i].team_name} <img src="${player_data[i].teamlogo}" width="40px">`
   
            det_player_1.innerHTML=`<b>Position:</b> ${player_data[i].position}<br><br>
            <b>Nationality:</b> ${player_data[i].nationality} `;
            det_player_2.innerHTML=`<b>Age:</b> ${player_data[i].age}<br><br>
            <b>Height:</b> ${player_data[i].height}<br><br> 
            <b>Rating:</b> ${Number(player_data[i].rating).toFixed(1)}`;     
            stat_player_1.innerHTML=`<span style="font-size:14px">Lineups: ${player_data[i].lineups}<br> 
            Goals: ${player_data[i].goals}<br>
            Assists: ${player_data[i].assists}<br></span>`;
             
            stat_player_2.innerHTML=`<span style="font-size:14px"><img src="static/fmx/yellowcard.jpg"
            width=15px>: ${player_data[i].yellowcard}<br> 
            <img src="static/fmx/redcard.jpg"
            width=15px>:
             ${player_data[i].redcard}<br>
            Pen won: ${player_data[i].penaltywon}<br></span>`; 
            return false;
            }
    });
}

const position_search=document.getElementById("position_search");
 
position_search.addEventListener("change", function() {
    fetchPlayers(1,  position_search.value)
});

 
async function fetchPlayers(page,  position) {
    //const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const csrftoken = csrftoken3;
        var my_likesR = [];

          //fetch(`players/${page}/${team}/${position}` )
            //.then(response => response.text())
            //.then(text => {
            fetch(`club_players/${position}`  )
            .then(response => response.text())
            .then(text => {
                var player = JSON.parse(text);
                //console.log(player)
                const player_list= document.getElementById('player-list')
                        player_list.innerHTML=""
                        for (var i in player) {

                    let player_id=player[i].id;
                    let player_value=player[i].value;
                    let player_position = player[i].position
                    let player_fullname= player[i].name
                    let player_photo = player[i].photo
                    const player_box = document.createElement("div");
                    player_box.id = 'player_box'
                    const player_hidden_id = document.createElement("div")
                   // player_hidden_id.id=`player-${player[i].id}`
                    player_hidden_id.innerHTML=`${player[i].id}`
                    player_hidden_id.style.display="none";
                    player_box.classList.add(  'rounded-3', 'player-details', 'bg-bs-light');
                    player_box.style.border="1px solid black"        
                    const player_name = document.createElement("div");
                     
                    player_name.id=`player-${player[i].id}`
                    //player_name.setAttribute("id", player_fullname)
                    // player_name.setAttribute("idreal", player_id)
                    // player_name.setAttribute("draggable", "true")
                    // player_name.setAttribute("ondragstart", "drag(event)")
                    
                    //player_name.innerHTML=`<b style="color:black">${player[i].name}</b> `;
                    player_name.innerHTML=` <div class="row align-items-start">
                    <div class="col-3 text-center">
                    <img style="width:50px;margin:5px;border:1px solid black" src="${player[i].photo}" >
                    </div>
                    <div class="col-6 text-start">
                    <b style="color:black">${player[i].name}</b> <br>
                    
                      ${player[i].position} <br>
                      <span style="font-size:11px"><b>${player[i].team_name}</b></span>
                    </div> 
                    <div id="add_box-${player[i].id}" class="col-3 text-center  ">
                     
                    </div> 
                      </div>
                    `;      

                      
                    player_name.style.padding="4px"
                    //player_name.classList.add('player_name', 'text-primary-emphasis','bg-subtle','bs-info-bg-subtle')
                     
                    player_name.classList.add('player_name', 'text-primary-emphasis','rounded-top-3')
                    //player_name.classList.add('bg-primary-subtle');
                     if (player[i].position ==="Attacker"){
                            player_name.classList.add( 'bg-success-subtle')    
                    } 
                    else if (player[i].position ==="Midfielder"){
                            player_name.classList.add( 'bg-primary-subtle')
                    }
                    else if (player[i].position ==="Defender"){
                             player_name.classList.add( 'bg-secondary-subtle')
                    } 
                    else if (player[i].position ==="Goalkeeper"){
                            player_name.classList.add( 'bg-danger-subtle')
                    }
                
                    const player_img = document.createElement("img");
                    player_img.style.margin = "5px";
                    player_img.style.border = "1px solid gray"
               
                        //// try offcanvas
                        const player_stats = document.createElement("div");
                    player_stats.classList.add('player_stats','fw-normal');
                    player_stats.id='player_stats';
                        const show_det_nice = document.createElement("figure");
                        show_det_nice.classList.add('text-center');
                        //show_det_nice.innerHTML=`<button class="btn btn-sm' buy_btn btn-outline-success" id="${player[i].id}">ciao</button>`
                        //player_name.append(show_det_nice);
                        show_det_nice.style.padding="5px"
                        const show_details_btn = document.createElement("button");
                        show_details_btn.classList.add('btn', 'btn-sm',  'btn-outline-success')
                        show_details_btn.id=`${player[i].id}`
                        show_details_btn.textContent ="Stats";
                        show_details_btn.style.margin="3px"
                        show_details_btn.addEventListener('click', event => {
                        
                            const side_nav=document.getElementById("mySidenav");
                            console.log("called:" + side_nav.style.width  )
                            if(side_nav.style.width==="0px"){
                                get_player_details(event.target.id)
                                document.getElementById("mySidenav").style.width = "340px";
                            }
                            else{
                                document.getElementById("mySidenav").style.width = "0";
                                //document.getElementById("mySidenav").style.width = "340px"; 
                            }    
                            //document.getElementById("main").style.marginLeft = "300px";
                        });  
                        //show_det_nice.append(show_details_btn);
                       // player_name_extra_info.append(show_details_btn)
                       // player_name.append(player_name_extra_info);
                       // player_name.append(show_details_btn);
                        player_stats.append(show_details_btn);
   
                        
                        //// end offcanvas

                    player_name.append(player_hidden_id)
                    player_box.append(player_name)
                   player_box.append(player_stats)
                    //player_box.append(player_btn_div)

                    player_list.append(player_box)     
                    
                    add_box=document.getElementById(`add_box-${player[i].id}`)
                    const add_lineup_btn = document.createElement("button");
                     
                    add_lineup_btn.classList.add('btn', 'btn-sm',  'btn-outline-dark','p-1',  'm-0')
                    add_lineup_btn.innerHTML =`<span style="font-size:12px;color:black" class=close > Add 
                    <span style="font-size:16px">&plus;</span>  </span>`;  
                    add_lineup_btn.id=`${player[i].id}`      
                    add_box.innerHTML=""
                    add_box.append(add_lineup_btn)        
                     
                    add_lineup_btn.addEventListener('click', event => {
                        const side_nav=document.getElementById("mySidenav");
                   
                         
                            add_player_to_lineup(player_id,player_position, player_fullname, player_photo)

                        //document.getElementById("main").style.marginLeft = "300px";
                    });  
                             
                    }                                       
            });
            return false 
        }
        

function add_player_to_lineup(player_id,player_position, player_fullname, player_photo) { 
    //console.log(player_id+" "+player_position+" "+player_fullname+" "+player_photo)
    
    if (player_position==='Goalkeeper'){
    const position_slot=document.getElementById("Goalkeeper-1")
    position_slot.classList.remove("bg-danger-subtle")
    position_slot.classList.add("bg-danger")
    position_slot.dataset.playerid=player_id;
    position_slot.innerHTML=`${player_fullname}<br>
    <img src="${player_photo}" style="width:50px;margin:5px;border:1px solid black;border-radius: 50%;">
    `
    }    
    var line = 0;
    var color=""
    const chosen_formation=document.getElementById("chosen_formation");
    if (player_position==='Defender'){
         color="secondary"
         line = Number(chosen_formation.innerHTML[0]);
        }
    else if (player_position==='Midfielder'){ 
         color="primary"
         line = Number(chosen_formation.innerHTML[1]);
        }
    else if (player_position==='Attacker'){ 
        color="success"
         line = Number(chosen_formation.innerHTML[2]);
        }

    //console.log(line+ "" + player_position)
        for(let i = 1; i<=line; i++){
            const box=document.getElementById(`${player_position}-${i}-${line}`);
             
            if (box.innerHTML.includes(player_position)){
                box.classList.remove(`bg-${color}-subtle`)
                box.classList.add(`bg-${color}`)
                box.dataset.playerid=player_id;
                box.innerHTML=`${player_fullname}<br>
                <img src="${player_photo}" style="width:50px;margin:5px;border:1px solid black;border-radius: 50%;">`
                return false;

            }else if  (box.innerHTML.includes(player_fullname)){
               return false;
            }
        }


   

 }


function get_club_details( ){
    fetch(`club_players`  )
            .then(response => response.text())
            .then(text => {
                let player_list = []
                let players = JSON.parse(text);
                for (var i in players) {
                    //console.log(players[i])
                }

                       for (let i = 1;i<6;i++) {
                            let player_id=players[0][`defender_${i}`]
                            //console.log(" =>" +players)
                            player_list.push(player_id)
                       }
                 //console.log(player_list)
                 for (var i in player_list) {
                    //console.log("again2: "+player_list[i])
                 }
                });
            }

 
//fetchPlayers_bug(1, "0", "0")
fetchPlayers(1, "Goalkeeper") // fetch players for first time
//get_club_details()
//get_club_details()

 
    
  var span = document.getElementById("myModal");
  var close = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  close.onclick = function() {
    span.style.display = "none";
  }


});