document.addEventListener('DOMContentLoaded', function () {
    
    function listQ(){
        changedText.textContent = this.value;
    }
    document.getElementById("list").onchange = listQ;


function get_data(){
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
    
    
 
async function fetchPlayers() {
        var my_likesR = [];
        await fetch("players")
            .then(response => response.text())
            .then(text => {
                var player = JSON.parse(text);
                const player_list= document.getElementById('player-list')
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
                    player_box.classList.add('bg-bs-light');
                    player_box.classList.add('border');
                    player_box.classList.add('rounded-3');
                    player_box.classList.add('player-details');
                    const player_name = document.createElement("div");
                    player_name.innerHTML=`${player[i].name}`;
                    player_name.classList.add('player_name')
                    player_name.classList.add('text-primary-emphasis');
                    player_name.classList.add('bg-primary-subtle');
                    player_name.classList.add('border-primary-subtle');
                    player_name.classList.add('fs-6');
                    const player_img = document.createElement("img");
                    player_img.style.margin = "5px";
                    player_img.style.width = "30px"
                    //player_img.style.border = "1px solid gray"
                   // player_img.src = `${player[i].photo}`;

                    const player_stats = document.createElement("div");
                    player_stats.classList.add('player_stats');
                    player_stats.id='player_stats';
                    player_stats.classList.add('fs-6');
                    player_stats.innerHTML=`<b>Position:</b> ${player[i].position}<br>
                    <b>Age:</b> ${player[i].age}<br>
                    <b>appearences:</b> ${player[i].appearences}<br>
                    <b>Rating:</b> ${player[i].rating}<br>
                    <b>Current Price:</b> ${player[i].value}
                    `;

                    const add_player_btn = document.createElement("button");
                    add_player_btn.classList.add('btn')
                    add_player_btn.classList.add('buy_btn')
                    add_player_btn.id=`${player[i].id}`
                    add_player_btn.classList.add('btn-outline-success')
                    add_player_btn.textContent ="Buy!";
                     
                    player_name.append(player_hidden_id)
                    player_box.append(player_name)
                    player_box.append(player_stats)
                    player_name.append(add_player_btn)
                 
                    player_list.append(player_box)     
                     
                    add_player_btn.addEventListener('click', event => {
                        buyPlayer(player_id, player_value,player_position, player_fullname);
                        return false;
                    });             
                    }                                       
            });
            return false 
        }
        

 
fetchPlayers()


});