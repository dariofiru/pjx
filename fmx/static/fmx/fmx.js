


document.addEventListener('DOMContentLoaded', function () {
 
    const r442 =document.getElementById('select-442');
    const r433 =document.getElementById('select-433');
    const r343 =document.getElementById('select-343');
    r442.addEventListener('change', event => { 
    //formazione = document.querySelector('input[name="select-formation"]:checked').value;
    //console.log("formazione: " + formazione)
        const f442= document.getElementById('442')
        f442.style.display = 'block';
        const f433= document.getElementById('433')
        f433.style.display = 'none';
        const f343= document.getElementById('343')
        f343.style.display = 'none';     
    return false;  
    });
    r433.addEventListener('change', event => { 
        //formazione = document.querySelector('input[name="select-formation"]:checked').value;
        //console.log("formazione: " + formazione)
            const f442= document.getElementById('442')
            f442.style.display = 'none';
            const f433= document.getElementById('433')
            f433.style.display = 'block';
            const f343= document.getElementById('343')
            f343.style.display = 'none';     
        return false;  
        });
    r343.addEventListener('change', event => { 
        //formazione = document.querySelector('input[name="select-formation"]:checked').value;
       // console.log("formazione: " + formazione)
            const f442= document.getElementById('442')
            f442.style.display = 'none';
            const f433= document.getElementById('433')
            f433.style.display = 'none';
            const f343= document.getElementById('343')
            f343.style.display = 'block';     
        return false;  
        });

 
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
                    `;
                    player_box.append(player_name)
                    player_box.append(player_stats)
                    player_box.append(player_hidden_id)
                    //player_box.append(player_img)


                    player_list.append(player_box)
                    var left = "player_box",
                        right = "def_c_1";
                        dragula([document.getElementById('player-list'), document.getElementById(right)])
                        .on('dragend', function (el) {
                            const to_hide= el.querySelector('#player_stats')
                            to_hide.hidden=true     
                        }).on('drop', function (el) {
                        const to_hide= el.querySelector('#player_stats')
                        to_hide.hidden=true
                        }).on('out', function (el, container) {
                        const to_hide= el.querySelector('#player_stats')
                        to_hide.hidden=false
                        player_box.append(player_stats)
                        }).on('drag', function (el) {
                            const to_hide= el.querySelector('#player_stats')
                            to_hide.hidden=true     
                        })  

                        
                    }   
                                        
 
            });
            return false 
        }
        

  fetchPlayers()

 




});