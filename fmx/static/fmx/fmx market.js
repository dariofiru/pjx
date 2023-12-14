

document.addEventListener('DOMContentLoaded', function () {

const side_nav_close=document.getElementById("mySidenav"); 
side_nav_close.addEventListener('click', event => {
    //const side_nav=document.getElementById("mySidenav");
    document.getElementById("mySidenav").style.width = "0";
}); 

var budget_box=document.getElementById("budget");
budget_box.innerHTML=`${initial_budget}`
var logo_box=document.getElementById("logo");
logo_box.src=`${logo}`
var club_name_box=document.getElementById("club_name");
club_name_box.innerHTML=`${club_name}`
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

function check_signed(player_id, position){
        // check if a player in the main list is already bought
        let pos_counter=0;
        if(position==="Goalkeeper"){
            pos_counter=2;
        }else if (position==="Attacker"){
            pos_counter=4;
        }else{
            pos_counter=5;
        }
        for (let i = 1; i <= pos_counter; i++) {
            let box = document.getElementById(`${position}-${i}`);
            if(Number(box.dataset.playerid)===player_id){
                return true 
            }
        }
        return false;

}


            // setting up the confirm sign button
function confirm_sign_player() {    
    var modal = document.getElementById("myModal");
    const content_box=document.getElementById("content-box");
    const gif=document.getElementById("shaking-gif");
    content_box.style.display='none'
    gif.style.display='none'
    modal.style.display = "block";
    const confirm_sign_btn=document.getElementById("confirm_sign_btn");
    const det_player_id  =document.getElementById("det_player_id");
    const det_player_value  =document.getElementById("det_player_value");
    const det_player_photo=document.getElementById("det_player_photo");
    const det_player_name=document.getElementById("det_player_name");
    const det_player_position=document.getElementById("det_player_position");

    fetch( "random_headline")
    .then(response => response.text())
    .then(text => {
             console.log("=>"+text)
             const headline_txt=document.getElementById("headline-txt");
              
             var headline = JSON.parse(text);
              
             for (var i in headline) {
                console.log("==>"+headline[i])
                headline = headline[i]
                headline=headline.replace("*name*",det_player_name.innerHTML)
                headline=headline.replace("*team*",club_name)
                 
                headline_txt.innerHTML=headline 
             }
   
        }
    );
 


    confirm_sign_btn.addEventListener('click', event => { // main function for saving the player info
        const content_box=document.getElementById("content-box");
        const gif=document.getElementById("shaking-gif");
        content_box.style.display='block'
        gif.style.display='block'

        let pl_value=Number(det_player_value.innerHTML)
        var budget_box=document.getElementById("budget");
        let curr_budget=Number(budget_box.innerHTML) 
        //if (pl_value>curr_budget){
          //  alert("not enough money");
            //return false;
        //}
 

    var modal = document.getElementById("myModal");
    if(det_player_position.innerHTML==="Goalkeeper"){
        let why = det_player_name.innerHTML
 
        let box =document.getElementById("Goalkeeper-1");
         
        // let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
        // // modifing player box design and funcionality
        // player_box.classList.remove('bg-danger-subtle');
        // player_box.classList.add('bg-danger','text-white');

        if(box.innerHTML==="Goalkeeper 1"){
            let position=box.innerHTML
            boxpic =document.getElementById("Goalkeeper-1-pic");
            boxclose =document.getElementById("Goalkeeper-1-close");
            let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
            boxclose.style.display="block"
            boxclose.dataset.playerid=det_player_id.innerHTML
            boxclose.onclick = () => { remove_sign(player_box,box, boxclose,  "Goalkeeper-1", "Goalkeeper 1", "danger"); };
            //boxclose.addEventListener("click", remove_sign(boxclose));
            boxpic.innerHTML=`<img src="${det_player_photo.src}" style="width:35px;border-radius: 50%;border:1px solid black">`
            box.innerHTML=det_player_name.innerHTML
            box.dataset.playerid=det_player_id.innerHTML
            box.classList.remove('bg-danger-subtle','text-black')
            box.classList.add('bg-danger','text-white') 

            // modifing player box design and funcionality
            player_box.classList.remove('bg-danger-subtle');
            player_box.classList.add('bg-danger','text-white');
           // modal.style.display = "none";

            let remaning_budget = curr_budget-pl_value
            budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
            curr_budget=remaning_budget
            console.log("det_player_value "+ Number(det_player_value.innerHTML))

            return false
        }
        else if (box.innerHTML === why) {
           // modal.style.display = "none";
            return false
        }
        box =document.getElementById("Goalkeeper-2");
        if(box.innerHTML==="Goalkeeper 2"){
            boxpic =document.getElementById("Goalkeeper-2-pic");
            boxclose =document.getElementById("Goalkeeper-2-close");
            let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
            boxclose.style.display="block"
            boxclose.dataset.playerid=det_player_id.innerHTML
            boxclose.onclick = () => { remove_sign(player_box,box, boxclose,  "Goalkeeper-2", "Goalkeeper 2", "danger"); };

            boxpic.innerHTML=`<img src="${det_player_photo.src}" style="width:35px;border-radius: 50%;border:1px solid black">`
            boxclose =document.getElementById("Goalkeeper-2-close");
            box.innerHTML=det_player_name.innerHTML
            box.dataset.playerid=det_player_id.innerHTML
            box.classList.remove('bg-danger-subtle','text-black')
            box.classList.add('bg-danger','text-white') 
            player_box.classList.remove('bg-danger-subtle');
            player_box.classList.add('bg-danger','text-white');

            modal.style.display = "none";
            let remaning_budget = curr_budget-pl_value
            budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
            curr_budget=remaning_budget

                return false
        }
        else if (box.innerHTML === why) {
            modal.style.display = "none";
            return false
        }
                    console.log("full")
        } // end goalkeeper
        else if(det_player_position.innerHTML==="Defender"){
        let why = det_player_name.innerHTML
        for (let i = 1; i < 6; i++) {
            let box = document.getElementById(`Defender-${i}`);
         
            if (box.innerHTML === `Defender ${i}`) {
                boxpic =document.getElementById(`Defender-${i}-pic`);
                boxclose =document.getElementById(`Defender-${i}-close`);
                let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
                boxpic.innerHTML=`<img src="${det_player_photo.src}" style="width:35px;border-radius: 50%;border:1px solid black">`
                box.innerHTML = why
                box.dataset.playerid=det_player_id.innerHTML
                boxclose.onclick = () => { remove_sign(player_box,box, boxclose,  `Defender-${i}`, `Defender ${i}`, "secondary"); };
                boxclose.style.display="block"
                boxclose.dataset.playerid=det_player_id.innerHTML
                box.classList.remove('bg-secondary-subtle','text-black')
                box.classList.add('bg-secondary','text-white') 
                player_box.classList.remove('bg-secondary-subtle');
                player_box.classList.add('bg-secondary','text-white');
                modal.style.display = "none";
                let remaning_budget = curr_budget-pl_value
                budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
                curr_budget=remaning_budget
                return false
            }
            else if (box.innerHTML === why) {
                modal.style.display = "none";
                return false
            }
                }
            }else if(det_player_position.innerHTML==="Midfielder"){
                let why = det_player_name.innerHTML
                for (let i = 1; i < 6; i++) {
                    let box = document.getElementById(`Midfielder-${i}`);
                    if (box.innerHTML === `Midfielder ${i}`) {
                        boxpic =document.getElementById(`Midfielder-${i}-pic`);
                        let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
                        boxclose =document.getElementById(`Midfielder-${i}-close`);
                        boxpic.innerHTML=`<img src="${det_player_photo.src}" style="width:35px;border-radius: 50%;border:1px solid black">`
                        box.innerHTML = why
                        boxclose.onclick = () => { remove_sign(player_box,box, boxclose,  `Midfielder-${i}`, `Midfielder ${i}`, "primary"); };
                
                        boxclose.style.display="block"
                        boxclose.dataset.playerid=det_player_id.innerHTML
                        box.dataset.playerid=det_player_id.innerHTML
                        box.classList.remove('bg-primary-subtle','text-black')
                        box.classList.add('bg-primary','text-white') 
                        player_box.classList.remove('bg-primary-subtle');
                        player_box.classList.add('bg-primary','text-white');
                        modal.style.display = "none";
                        let remaning_budget = curr_budget-pl_value
                        budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
                        curr_budget=remaning_budget
 
                        return false
                    }
                    else if (box.innerHTML === why) {
                        modal.style.display = "none";
                        return false
                    }
                        }
            }else if(det_player_position.innerHTML==="Attacker"){
                let why = det_player_name.innerHTML

                for (let i = 1; i < 5; i++) {
                    let box = document.getElementById(`Attacker-${i}`);
                    if (box.innerHTML === `Attacker ${i}`) {
                        boxpic =document.getElementById(`Attacker-${i}-pic`);
                        boxclose =document.getElementById(`Attacker-${i}-close`);
                        let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
                        boxpic.innerHTML=`<img src="${det_player_photo.src}" style="width:35px;border-radius: 50%;border:1px solid black">`    
                        box.innerHTML = why
                        boxclose.onclick = () => { remove_sign(player_box,box, boxclose,  `Attacker-${i}`, `Attacker ${i}`, "success"); };
                
                        boxclose.style.display="block"
                        boxclose.dataset.playerid=det_player_id.innerHTML
                        box.dataset.playerid=det_player_id.innerHTML
                        box.classList.remove('bg-success-subtle','text-black')
                        box.classList.add('bg-success','text-white') 
                        player_box.classList.remove('bg-success-subtle');
                        player_box.classList.add('bg-success','text-white');
                        modal.style.display = "none";
                        let remaning_budget = Math.round(curr_budget-pl_value)
                        budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
                        curr_budget=remaning_budget
 
                        return false
                    }
                    else if (box.innerHTML === why) {
                        modal.style.display = "none";
                        return false
                    }
                        }
                    }
                
               
            });  

        }

function remove_sign(player_box, box, boxclose, position, empty_position, color){
    console.log(boxclose.dataset.playerid+ " - "+ empty_position+" - "+player_box)
    boxpic =document.getElementById(`${position}-pic`);
    boxclose =document.getElementById(position+"-close");
     
    boxpic.innerHTML=""
    boxclose.style.display="none"
    boxclose.dataset.playerid="0"
    box.classList.add(`bg-${color}-subtle`,`text-black`)
    box.classList.remove(`bg-${color}`,`text-white`) 
    player_box.classList.add(`bg-${color}-subtle`,`text-black`)
    player_box.classList.remove(`bg-${color}`,`text-white`) 
 
    box.innerHTML=empty_position

}

async function get_teams(){ // returns all team names for the search dropdown 

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
   fetchPlayers(1, team_search.value, position_search.value)
});
position_search.addEventListener("change", function() {
    fetchPlayers(1, team_search.value, position_search.value)
});

// listener for save team (temporary)
const save_btn=document.getElementById("save_btn");
save_btn.addEventListener("click", function() {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var jsonSquad = [];
    for (var i = 1; i < 3; i++) {
        let box = document.getElementById(`Goalkeeper-${i}`);
        console.log("json: "+box.innerHTML)
        jsonSquad.push({
            position: `Goalkeeper-${i}`,
            id: box.dataset.playerid
        });
    }
    for (var i = 1; i < 6; i++) {
        let box = document.getElementById(`Defender-${i}`);
        console.log("json: "+box.innerHTML)
        jsonSquad.push({
            position: `Defender-${i}`,
            id: box.dataset.playerid
        });
    }
    for (var i = 1; i < 6; i++) {
        let box = document.getElementById(`Midfielder-${i}`);
        console.log("json: "+box.innerHTML)
        jsonSquad.push({
            position: `Midfielder-${i}`,
            id: box.dataset.playerid
        });
    }
    for (var i = 1; i < 5; i++) {
        let box = document.getElementById(`Attacker-${i}`);
        console.log("json: "+box.innerHTML)
        jsonSquad.push({
            position: `Attacker-${i}`,
            id: box.dataset.playerid
        });
    }
    var budget_box=document.getElementById("budget");
    let curr_budget=Number(budget_box.innerHTML)  

    fetch(`/save_squad`, {
        method: 'PUT',
        headers: { 'X-CSRFToken': csrftoken },
        mode: 'same-origin',
        body: JSON.stringify({
            csrfmiddlewaretoken: csrftoken,
            squad: jsonSquad,
            squad_name: club_name,
            curr_budget:curr_budget
        })
    }).then(response=>response.text())
    .then(data=>{ console.log("hello "+data); })

    //console.log(JSON.stringify(jsonSquad))
});


const sign_btn=document.getElementById("sign_btn");
sign_btn.addEventListener('click', event => {
           confirm_sign_player()
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
                   // player_hidden_id.id=`player-${player[i].id}`
                    player_hidden_id.innerHTML=`${player[i].id}`
                    player_hidden_id.style.display="none";
                    player_box.classList.add('border', 'rounded-3', 'player-details', 'bg-bs-light');
 

                    // drag drop start
                     let is_signed=check_signed(player_id, player_position) // check player already bought      

                    // drag drop end 



                    const player_name = document.createElement("div");
                    player_name.id=`player-${player[i].id}`
                    //player_name.setAttribute("id", player_fullname)
                    player_name.setAttribute("idreal", player_id)
                    player_name.setAttribute("draggable", "true")
                    player_name.setAttribute("ondragstart", "drag(event)")
                    player_name.innerHTML=`<b style="color:black">${player[i].name}</b> `;
                            
                    player_name.style.padding="4px"
                    //player_name.classList.add('player_name', 'text-primary-emphasis','bg-subtle','bs-info-bg-subtle')
                    player_name.classList.add('player_name', 'text-primary-emphasis')
                    //player_name.classList.add('bg-primary-subtle');
                     if (player[i].position ==="Attacker"){
                        if(is_signed) 
                            player_name.classList.add( 'bg-success');
                        else
                            player_name.classList.add( 'bg-success-subtle')    
                    } else if (player[i].position ==="Midfielder"){
                        if(is_signed) 
                            player_name.classList.add( 'bg-primary');
                        else
                            player_name.classList.add( 'bg-primary-subtle')
                    }
                    else if (player[i].position ==="Defender"){
                        if(is_signed) 
                            player_name.classList.add( 'bg-secondary');
                        else
                            player_name.classList.add( 'bg-secondary-subtle')
                    } 
                    else if (player[i].position ==="Goalkeeper"){
                        if(is_signed) 
                            player_name.classList.add( 'bg-danger');
                        else
                            player_name.classList.add( 'bg-danger-subtle')
                    }
                    const player_name_extra_info = document.createElement("div"); 
                    //player_name.classList.add('border-primary-subtle');
                    player_name_extra_info.classList.add('fs-6');
                    player_name_extra_info.innerHTML=` <div class="row"><div class="col-4">
                    <img style="width:50px;" src="${player[i].photo}" ></div><div class="col-8 text-start">
                      ${player[i].position}<br>
                      $ ${player[i].value} <br>
                   
                      </div></div>
                    `;
                    const player_img = document.createElement("img");
                    player_img.style.margin = "5px";
                   /// player_img.style.width = "30px"
                    player_img.style.border = "1px solid gray"
                    //player_img.src = `${player[i].photo}`;
  
                    const player_stats = document.createElement("div");
                    player_stats.classList.add('player_stats','fw-normal');
                    player_stats.classList.add('player_stats','fw-normal');
                    player_stats.id='player_stats';
               
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
                        show_details_btn.style.margin="5px"
                        show_details_btn.addEventListener('click', event => {
                            const side_nav=document.getElementById("mySidenav");
                       
                            if(side_nav.style.width==="0px"){
                                get_player_details(event.target.id)
                                document.getElementById("mySidenav").style.width = "340px";
                            }
                            else{
                                get_player_details(event.target.id)
                                document.getElementById("mySidenav").style.width = "0";
                                 
                                document.getElementById("mySidenav").style.width = "340px"; 
                            }    
                            //document.getElementById("main").style.marginLeft = "300px";
                        });  
                        show_det_nice.append(show_details_btn);
                        player_name.append(player_name_extra_info);
                        //player_name.append(show_details_btn);
                        player_stats.append(show_details_btn);
   
                        
                        //// end offcanvas


                    const player_btn_div= document.createElement("div");
                    player_btn_div.style.paddingBottom="10px"
                    player_btn_div.classList.add('d-grid','border','col-6', 'gap-2', 'mx-auto');
                    const add_player_btn = document.createElement("button");
                    //add_player_btn.className = 'btn btn-sm buy_btn btn-outline-success';
                    add_player_btn.classList.add('btn', 'btn-sm', 'buy_btn', 'btn-outline-success')
                    //add_player_btn.classList.add('btn-sm')
                    
                    //dd_player_btn.classList.add('buy_btn')
                    add_player_btn.id=`player-${player[i].id}`
                    //dd_player_btn.classList.add('btn-outline-success')
                    add_player_btn.textContent ="Buy!";
                    player_btn_div.append(add_player_btn);
                    player_name.append(player_hidden_id)
                    player_box.append(player_name)
                    player_box.append(player_stats)
                    //player_box.append(player_btn_div)

                    player_list.append(player_box)     
                     
                    add_player_btn.addEventListener('click', event => {
                        buyPlayer(player_id, player_value,player_position, player_fullname);
                        return false;
                    });             
                    }                                       
            });
            return false 
        }
        

let close_nav_btn = document.getElementById("close_nav_btn")
close_nav_btn.onclick = function() {
    document.getElementById("mySidenav").style.width = "0";
  }

function get_club_details( ){
    fetch(`players/${page}/${team}/${position}`  )
            .then(response => response.text())
            .then(text => {
                 console.log(" =>" +text)
                });
            }

get_teams() // get team names for search options  
//fetchPlayers_bug(1, "0", "0")
fetchPlayers(1, "0", "0") // fetch players for first time
//get_data()

 
    
  var span = document.getElementById("myModal");
  var close = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  close.onclick = function() {
    span.style.display = "none";
  }


});