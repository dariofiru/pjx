


document.addEventListener('DOMContentLoaded', function () {

class Squad{
    constructor(){
        this.club=user.club;
        this.initial_budget=user.initial_budget;
        this.current_budget=user.initial_budget;
    }
}
 
async function fetchPlayers() {
        var my_likesR = [];
        await fetch("players")
            .then(response => response.text())
            .then(text => {
                var player = JSON.parse(text);
                const player_list= document.getElementById('player-list')
                for (var i in player) {
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
                    add_player_btn.id=`${player[i].id}`
                    add_player_btn.classList.add('btn-outline-success')
                    add_player_btn.textContent ="Buy!";
                    player_name.append(player_hidden_id)
                    player_box.append(player_name)
                    player_box.append(player_stats)
                    player_name.append(add_player_btn)
                 
                    player_list.append(player_box)                     
                    }                                       
            });
            return false 
        }
        
  fetchPlayers()

 
async function buyPlayer(){


}

const squad_name = new Squad()
console.log("classe: "+ squad_name.initial_budget)

});