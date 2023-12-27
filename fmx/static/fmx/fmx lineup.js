

document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const save_btn=document.getElementById("save_btn");
    const clear_btn=document.getElementById("clear_btn");
    save_btn.style.display="none"
    clear_btn.style.display="none"

    const l_352=document.getElementById("352");
    const l_532=document.getElementById("532");
    const l_442=document.getElementById("442");
    const l_433=document.getElementById("433");
    function formation_cleaner(){
        var cleaner = document.getElementsByClassName("lineup_box")
        for (var i = 0; i < cleaner.length; i++) {
            cleaner[i].classList.remove('lineup', 'player-box-market', 'lineup_attacker','lineup_defender','lineup_midfielder');
            cleaner[i].innerHTML=""
        }
        clear_btn.style.display="block"
        save_btn.style.display="block"
        return false;
    }

    l_532.addEventListener('click', event => {
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
        D_1.classList.add('lineup_defender', 'player-box-market')
        D_2.classList.add('lineup_defender', 'player-box-market')
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

        console.log('before');
    setTimeout(function(){
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
         

    },2000);
        
    });
    l_352.addEventListener('click', event => {
        const chosen_formation=document.getElementById("chosen_formation");
        chosen_formation.innerHTML="352"
        formation_cleaner();
        // var cleaner = document.getElementsByClassName("lineup_box")
        // for (var i = 0; i < cleaner.length; i++) {
        //     cleaner[i].classList.remove('lineup', 'player-box-market', 'lineup_attacker');
        //     cleaner[i].classList.remove('lineup_defender' );
        //     cleaner[i].classList.remove('lineup_midfielder' );
        //     cleaner[i].classList.remove('lineup' );
        //     cleaner[i].innerHTML=""
        // }
        //const side_nav=document.getElementById("mySidenav");
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

        
    setTimeout(function(){
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

    },2000);
        
    });
    l_442.addEventListener('click', event => {
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

        M_1.classList.add('lineup_midfielder', 'player-box-market')
        M_2.classList.add('lineup_midfielder', 'player-box-market')
        M_3.classList.add('lineup_midfielder', 'player-box-market')
        M_4.classList.add('lineup_midfielder', 'player-box-market')
        //M_5.classList.add('lineup', 'player-box-market')

        A_1=document.getElementsByClassName("Attacker-1-2")[0];
        A_2=document.getElementsByClassName("Attacker-2-2")[0];
        Attacker_2_line=document.getElementById("Attackers-2-line");
        Attacker_3_line=document.getElementById("Attackers-3-line");
        Attacker_3_line.display="none" 
        Attacker_2_line.display="block" 
        A_1.classList.add('lineup_attacker', 'player-box-market')
        A_2.classList.add('lineup_attacker', 'player-box-market')

        console.log('before');
    setTimeout(function(){
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

    },2000);
        
    });
    l_433.addEventListener('click', event => {
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
    setTimeout(function(){
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

    },2000);
        
    });
 


const side_nav_close=document.getElementById("mySidenav"); 
side_nav_close.addEventListener('click', event => {
    //const side_nav=document.getElementById("mySidenav");
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
 
const position_search=document.getElementById("position_search");
 
position_search.addEventListener("change", function() {
    fetchPlayers(1, team_search.value, position_search.value)
});

// listener for save team (temporary)
 
save_btn.addEventListener("click", function() {
    const chosen_formation=document.getElementById("chosen_formation");
    formation=chosen_formation.innerHTML;
    D_line = Number(chosen_formation.innerHTML[0]);
    M_line = Number(chosen_formation.innerHTML[1]);
    A_line = Number(chosen_formation.innerHTML[2]);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var jsonSquad = [];
        let box = document.getElementById(`Goalkeeper-1`);
        console.log("json: "+box.innerHTML)
        let j = 1; 
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid }); 
        // const box=document.getElementById(`${player_position}-${i}-${line}`);
    for (var i = 1; i <= D_line; i++) {
        j++;
        const box=document.getElementById(`Defender-${i}-${D_line}`);
         
        console.log("json: "+box.innerHTML)
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid});
    }
    for (var i = 1; i <= M_line; i++) {
        j++;
        let box = document.getElementById(`Midfielder-${i}-${M_line}`);
        console.log("json: "+box.innerHTML)
        jsonSquad.push({position: `player-${j}`, id: box.dataset.playerid});
    }
    for (var i = 1; i <= A_line; i++) {
        j++;
        let box = document.getElementById(`Attacker-${i}-${A_line}`);
        console.log("json: "+box.innerHTML)
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
            squad_name: club_name
        })
    }).then(response=>response.text())
    .then(data=>{ console.log("hello "+data); 
    document.getElementById('Modal-saved-squad').style.display='block'
     
    })

    //console.log(JSON.stringify(jsonSquad))
});
const run_round_btn=document.getElementById("run_round_btn");
run_round_btn.addEventListener("click", function() {
    console.log("run round!")
 });

    
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
            det_player_1.innerHTML=`<b>Position:</b> ${player_data[i].position}<br><br>
            <b>Nationality:</b> ${player_data[i].nationality} `;
            det_player_2.innerHTML=`<b>Age:</b> ${player_data[i].age}<br><br>
            <b>Height:</b> ${player_data[i].height}<br><br> `;
            
             
            stat_player_1.innerHTML=`<span style="font-size:14px">Lineups: ${player_data[i].lineups}<br> 
            Goals: ${player_data[i].goals}<br>
            Assists: ${player_data[i].assists}<br></span>`;
            stat_player_2.innerHTML=`<span style="font-size:14px"><img src="https://banner2.cleanpng.com/20180325/vdw/kisspng-penalty-card-yellow-card-association-football-refe-sim-cards-5ab74207cf9f95.5798399315219594318504.jpg"
            Assists: ${player_data[i].assists}<br></span>`;
            stat_player_2.innerHTML=`<span style="font-size:14px"><img src="https://banner2.cleanpng.com/20180325/vdw/kisspng-penalty-card-yellow-card-association-football-refe-sim-cards-5ab74207cf9f95.5798399315219594318504.jpg"
            width=15px>: ${player_data[i].yellowcard}<br> 
            <img src="https://png2.cleanpng.com/sh/fd5049e50e3d24a2343c26b68ce164bc/L0KzQYm3U8I5N6Zuj5H0aYP2gLBuTgBmdpJxjOs2Y3H1dH7okCNwa5pmjNt4bj3pf7F7gvFtdF53fdhucnXoPcHzgglmel5oeeRtLUXkcrO6UsFnQGc2SNM6Lka6QoWCVsIyOWY3SqQ6N0WzQ4a7WcEveJ9s/kisspng-penalty-card-association-football-referee-player-card-5abb321f8610a1.6724962115222175035491.png"
            width=15px>:
             ${player_data[i].redcard}<br>
            Pen won:${player_data[i].penaltywon}<br></span>`; 
            return false;
            }
    });
}

 

async function fetchPlayers(page, team, position) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        var my_likesR = [];

          //fetch(`players/${page}/${team}/${position}` )
            //.then(response => response.text())
            //.then(text => {
            fetch(`club_players`  )
            .then(response => response.text())
            .then(text => {
                var player = JSON.parse(text);
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
                    player_box.classList.add('border', 'rounded-3', 'player-details', 'bg-bs-light');
 
                    const player_name = document.createElement("div");
                    player_name.id=`player-${player[i].id}`
                    //player_name.setAttribute("id", player_fullname)
                    player_name.setAttribute("idreal", player_id)
                    player_name.setAttribute("draggable", "true")
                    player_name.setAttribute("ondragstart", "drag(event)")
                    
                    //player_name.innerHTML=`<b style="color:black">${player[i].name}</b> `;
                    player_name.innerHTML=` <div class="row align-items-start">
                    <div class="col-md-3 text-center">
                    <img style="width:50px;margin:5px;border:1px solid black" src="${player[i].photo}" >
                    </div>
                    <div class="col-md-6 text-start">
                    <b style="color:black">${player[i].name}</b> <br>
                      ${player[i].position} 
                    </div> 
                    <div id="add_box-${player[i].id}" class="col-md-3 text-center border">
                     
                    </div> 
                      </div>
                    `;      

                      
                    player_name.style.padding="4px"
                    //player_name.classList.add('player_name', 'text-primary-emphasis','bg-subtle','bs-info-bg-subtle')
                    player_name.classList.add('player_name', 'text-primary-emphasis')
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
                       
                            if(side_nav.style.width==="0px"){
                                get_player_details(event.target.id)
                                document.getElementById("mySidenav").style.width = "340px";
                            }
                            else{
                                document.getElementById("mySidenav").style.width = "0";
                            }    
                            //document.getElementById("main").style.marginLeft = "300px";
                        });  
                        //show_det_nice.append(show_details_btn);
                       // player_name_extra_info.append(show_details_btn)
                       // player_name.append(player_name_extra_info);
                        player_name.append(show_details_btn);
                       // player_stats.append(show_details_btn);
   
                        
                        //// end offcanvas

                    player_name.append(player_hidden_id)
                    player_box.append(player_name)
                   //player_box.append(player_stats)
                    //player_box.append(player_btn_div)

                    player_list.append(player_box)     
                    
                    add_box=document.getElementById(`add_box-${player[i].id}`)
                    const add_lineup_btn = document.createElement("button");
                     
                    add_lineup_btn.classList.add('btn', 'btn-sm',  'btn-dark', 'p-1', 'm-0')
                    add_lineup_btn.innerHTML ="<span class=close > &plus;  </span>";  
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
    console.log(player_id+" "+player_position+" "+player_fullname+" "+player_photo)
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

    console.log(line+ "" + player_position)
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
                    console.log(players[i])
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
fetchPlayers(1, "0", "0") // fetch players for first time
//get_club_details()
//get_club_details()

 
    
  var span = document.getElementById("myModal");
  var close = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  close.onclick = function() {
    span.style.display = "none";
  }


});