

document.addEventListener('DOMContentLoaded', function () {

const side_nav_close=document.getElementById("mySidenav"); 
side_nav_close.addEventListener('click', event => {
    //const side_nav=document.getElementById("mySidenav");
    document.getElementById("mySidenav").style.width = "0";
}); 

async function get_teams(){ // returns all team names for the search dropdown 
    console.log("teams: " )
    const team_search=document.getElementById("team_search");
        fetch( "get_teams")
        .then(response => response.text())
        .then(text => {
           
                var teams_data = JSON.parse(text);
                for (var i in teams_data) {
                    var option = document.createElement("option");
                    option.text = teams_data[i].name;
                    option.value = teams_data[i].id;
                    team_search.add(option);
                }
            }
        );
    }

/// listeners for search dropdowns (teams and position)
const team_search=document.getElementById("team_search"); 
const position_search=document.getElementById("position_search");
team_search.addEventListener("change", function() {
   console.log("team: " +team_search.value)
   fetchPlayers(1, team_search.value, position_search.value)
});
position_search.addEventListener("change", function() {
    console.log("position: " +position_search.value)
    fetchPlayers(1, team_search.value, position_search.value)
});


async function get_data(){
    console.log("budget: "+initial_budget)
        fetch( `user_club/${user_id}`)
        .then(response => response.text())
        .then(text => {
            if(text==="empty"){

            }else{
                var user_data = JSON.parse(text);
                
            }
        });
    }
async function get_player_details(id){
    //////////////
    // creates the side bar with player statistics.
    //
    //////////////
    const side_nav=document.getElementById("mySidenav");
    const det_player_photo=document.getElementById("det_player_photo");
    const det_player_name=document.getElementById("det_player_name");
    const det_player_1=document.getElementById("det_player_1");
    const det_player_2=document.getElementById("det_player_2");
    
    const stat_player_1=document.getElementById("stat_player_1");
    const stat_player_2=document.getElementById("stat_player_2");
    fetch( `get_player_details/${id}`)
    .then(response => response.text())
    .then(text => {
        
            var player_data = JSON.parse(text);
            for (var i in player_data) {
            det_player_photo.src=`${player_data[i].photo}`
            det_player_name.innerHTML=`${player_data[i].name}`
            det_player_1.innerHTML=`<b>Position:</b> ${player_data[i].position}<br><br>
            <b>Nationality:</b> ${player_data[i].nationality} `;
            det_player_2.innerHTML=`<b>Age:</b> ${player_data[i].age}<br><br>
            <b>Height:</b> ${player_data[i].height}<br><br> `;
            }
            stat_player_1.innerHTML=`Lineups: ${player_data[i].lineups}<br> 
            Goals: ${player_data[i].goals}<br>
            Assists:<i> ${player_data[i].assists}</i><br>`;
            stat_player_2.innerHTML=`<img src="https://banner2.cleanpng.com/20180325/vdw/kisspng-penalty-card-yellow-card-association-football-refe-sim-cards-5ab74207cf9f95.5798399315219594318504.jpg"
            width=15px>: ${player_data[i].yellowcard}<br> 
            <img src="https://png2.cleanpng.com/sh/fd5049e50e3d24a2343c26b68ce164bc/L0KzQYm3U8I5N6Zuj5H0aYP2gLBuTgBmdpJxjOs2Y3H1dH7okCNwa5pmjNt4bj3pf7F7gvFtdF53fdhucnXoPcHzgglmel5oeeRtLUXkcrO6UsFnQGc2SNM6Lka6QoWCVsIyOWY3SqQ6N0WzQ4a7WcEveJ9s/kisspng-penalty-card-association-football-referee-player-card-5abb321f8610a1.6724962115222175035491.png"
            width=15px>:
             ${player_data[i].redcard}<br>
            Pen won:${player_data[i].penaltywon}<br>`;
            return false;
    });
}

async function buyPlayer(player_id, player_value,player_position, player_fullname){
        if(player_value>initial_budget){
             Alert("Not enough budget!");
             return false;
        }
        else{
            for (let i = 1; i < 6; i++) {
                const player_slot= document.getElementById(`${player_position}-${String(i)}`)   
                if(player_slot.dataset.playerid==="0"){
                    player_slot.dataset.playerid=player_id;
                    player_slot.innerHTML=player_fullname
                    if (i==5){
                        let full = player_slot.getElementsByClassName('buy_btn');
                        for (i in full) {
                            console.log("=>"+full[i].innerHTML)
                            full[i].classList.remove('btn-outline-success')
                            full[i].classList.add('btn-danger')
                            }
                    }
                    break; 
                }
                if (i==5){
                    alert("no more")
                    break;
                }
              }
              return false;
        }
        return false;
    }
    
    
 
async function fetchPlayers(page, team, position) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    console.log("link"+`players/${page}/${team}/${position}`)
        var my_likesR = [];
          fetch(`players/${page}/${team}/${position}` )
            .then(response => response.text())
            .then(text => {
                 console.log(text)
                 
                var player = JSON.parse(text);
                const player_list= document.getElementById('player-list')
                        player_list.innerHTML=""
                        for (var i in player) {
                    let player_id=player[i].id;
                    let player_value=player[i].value;
                    let player_position = player[i].position
                    let player_fullname= player[i].name
                    const player_box = document.createElement("div");
                    player_box.id = 'player_box'
                    const player_hidden_id = document.createElement("div")
                    player_hidden_id.innerHTML=`${player[i].id}`
                    player_hidden_id.style.display="none";
                    player_box.classList.add('border', 'rounded-3', 'player-details', 'bg-bs-light');
 

                    // drag drop start


                    // drag drop end 



                    const player_name = document.createElement("div");
                    player_name.setAttribute("id", player_fullname)
                    player_name.setAttribute("idreal", player_id)
                    player_name.setAttribute("draggable", "true")
                    player_name.setAttribute("ondragstart", "drag(event)")
                    player_name.innerHTML=`<b>${player[i].name}</b> `;
                    
                    player_name.style.padding="4px"
                    player_name.classList.add('player_name', 'text-primary-emphasis', 'bg-success-subtle')
                    //player_name.classList.add('border-primary-subtle');
                    player_name.classList.add('fs-6');
                    const player_img = document.createElement("img");
                    player_img.style.margin = "5px";
                    player_img.style.width = "30px"
                    //player_img.style.border = "1px solid gray"
                   // player_img.src = `${player[i].photo}`;

                    const player_stats = document.createElement("div");
                    player_stats.classList.add('player_stats','fw-normal');
                    player_stats.id='player_stats';
                    player_stats.innerHTML=`<b>Position:</b> ${player[i].position}<br>
                    <b>Current Price:</b> ${player[i].value}
                    `;
                        //// try offcanvas
                        const show_det_nice = document.createElement("figure");
                        show_det_nice.classList.add('text-end');
                        //show_det_nice.innerHTML=`<button class="btn btn-sm' buy_btn btn-outline-success" id="${player[i].id}">ciao</button>`
                        //player_name.append(show_det_nice);

                        const show_details_btn = document.createElement("button");
                        show_details_btn.classList.add('btn', 'btn-sm', 'buy_btn', 'btn-outline-success')
                        show_details_btn.id=`${player[i].id}`
                        show_details_btn.textContent ="details";
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
                        show_det_nice.append(show_details_btn);
                        player_name.append(show_det_nice);
                        //player_name.append(show_details_btn);
                         
   
                        
                        //// end offcanvas


                    const player_btn_div= document.createElement("div");
                    player_btn_div.style.paddingBottom="10px"
                    player_btn_div.classList.add('d-grid','border','col-6', 'gap-2', 'mx-auto');
                    const add_player_btn = document.createElement("button");
                    //add_player_btn.className = 'btn btn-sm buy_btn btn-outline-success';
                    add_player_btn.classList.add('btn', 'btn-sm', 'buy_btn', 'btn-outline-success')
                    //add_player_btn.classList.add('btn-sm')
                    
                    //dd_player_btn.classList.add('buy_btn')
                    add_player_btn.id=`${player[i].id}`
                    //dd_player_btn.classList.add('btn-outline-success')
                    add_player_btn.textContent ="Buy!";
                    player_btn_div.append(add_player_btn);
                    player_name.append(player_hidden_id)
                    player_box.append(player_name)
                    player_box.append(player_stats)
                    player_box.append(player_btn_div)
                        
                    player_list.append(player_box)     
                     
                    add_player_btn.addEventListener('click', event => {
                        buyPlayer(player_id, player_value,player_position, player_fullname);
                        return false;
                    });             
                    }                                       
            });
            return false 
        }
        




function fetchPlayers_bug(page, team, position){
    console.log("try: " + `players/${page}/${team}/${position}` )
    fetch(`players/${page}/${team}/${position}`  )
            .then(response => response.text())
            .then(text => {
                 console.log(" =>" +text)
                });
            }

get_teams() // get team names for search options  
//fetchPlayers_bug(1, "0", "0")
fetchPlayers(1, "0", "0") // fetch players for first time
 
  
 

 
    
  var span = document.getElementById("myModal");
  var close = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  close.onclick = function() {
    span.style.display = "none";
  }


});