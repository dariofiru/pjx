

document.addEventListener('DOMContentLoaded', function () {

    
    //console.log("csrftoken3: "+csrftoken3)
previous = document.getElementById("page-item-Previous")
next = document.getElementById("page-item-Next")


next.addEventListener('click', event => {
    if (next.classList.contains('disabled'))
        return false;
   
    const team_search=document.getElementById("team_search"); 
    const position_search=document.getElementById("position_search");
    const price_search=document.getElementById("price_search"); 
    const order_search=document.getElementById("order_search"); 
    fetchPlayers(next.value, team_search.value, position_search.value, price_search.value, order_search.value)
    if(next.value===2){
        previous.classList.remove('disabled')
    }
     
    previous.value = previous.value + 1
    next.value = next.value + 1
   
    return false;
    });
previous.addEventListener('click', event => {
    if (previous.classList.contains('disabled'))
        return false;
    
    const team_search=document.getElementById("team_search"); 
    const position_search=document.getElementById("position_search");
    const price_search=document.getElementById("price_search"); 
    const order_search=document.getElementById("order_search"); 
    fetchPlayers(previous.value, team_search.value, position_search.value, price_search.value, order_search.value)
    
    previous.value = previous.value - 1
    next.value = next.value - 1
    if(next.value===2){
        previous.classList.add('disabled')
    }
     
    //fetchPlayers(1, "0", "0", "0", "name") 
    return false;
    });

const side_nav_close=document.getElementById("mySidenav"); 
side_nav_close.addEventListener('click', event => {
    //const side_nav=document.getElementById("mySidenav");
    document.getElementById("mySidenav").style.width = "0";
}); 
let list_lineup=[];
function get_lineup(){
    fetch( `get_lineup`)
    .then(response => response.text())
    .then(text => {
        if(text==="empty"){
            console.log("none")
        }else{
            var lineup = JSON.parse(text);
            //var list_lineup=[]
            //console.log(text)
            for (var i in lineup) {
                for(var j=1; j<12; j++){
                    var player = {}
                    player['id'] = lineup[0][`player_${Number(j)}_id`]
                    player['name']= lineup[0][`player_${Number(j)}`]
                    playerid=lineup[0][`player_${Number(j)}_id`]
                    let player_name=lineup[0][`player_${Number(j)}_id`]
                    list_lineup.push(player)
                    
                }
                
                
            }            
        }
    });
}

get_lineup()    



var budget_box=document.getElementById("budget");
budget_box.innerHTML=`${initial_budget}`
async function get_data(){
    let curr_budget=initial_budget
        fetch( `user_club/${user_id}`)
        .then(response => response.text())
        .then(text => {
            if(text==="empty"){
                return text;
            }else{
                var club_data = JSON.parse(text);
                var budget_box=document.getElementById("budget");
                var remaining_budget=club_data[0].remaining_budget
                budget_box.innerHTML=`${remaining_budget.toFixed(1)}`
              
                for (i in club_data){
                
                let box =document.getElementById(`${club_data[i].position}`);
                boxpic =document.getElementById(`${club_data[i].position}-pic`);
                boxclose =document.getElementById(`${club_data[i].position}-close`);
                let player_box=document.getElementById(`player-${club_data[i]['id']}`);
             
                box.dataset.price=club_data[i].value

                boxclose.style.display="block"
                boxclose.dataset.playerid=club_data[i]['id']
                
                let player_in_team =document.getElementById(`player-${club_data[i].id}`);
                if (player_in_team!==null){
                    var classes = player_in_team.classList;
                   // console.log("first:"+classes);
                    //console.log("**"+club_data[i]['name']+" - "+club_data[i].position)
                    if (club_data[i].position.includes("Attacker")){
                        //console.log("**"+club_data[i]['name']+" - ")
                        if(player_in_team.classList.contains('bg-success-subtle')){
                            player_in_team.classList.remove( 'bg-success-subtle');
                            player_in_team.classList.add( 'bg-success');
                        }
                            
                    } else if (club_data[i].position.includes("Midfielder")){
                        if(player_in_team.classList.contains('bg-primary-subtle')){
                            player_in_team.classList.remove( 'bg-primary-subtle');
                            player_in_team.classList.add( 'bg-primary');
                        }
                            
                    }
                    else if (club_data[i].position.includes("Defender")){
                        if(player_in_team.classList.contains('bg-secondary-subtle')){
                            player_in_team.classList.remove( 'bg-secondary-subtle');
                            player_in_team.classList.add( 'bg-secondary');
                        }
                    }
                    else if (club_data[i].position.includes("Goalkeeper")){
                        if(player_in_team.classList.contains('bg-danger-subtle'))
                        {
                            player_in_team.classList.remove( 'bg-danger-subtle');
                            player_in_team.classList.add( 'bg-danger');
                        }
                    }
                    classes = player_in_team.classList;
                   
                }
                 

                boxclose.dataset.position=club_data[i]['position']
                 //boxclose.addEventListener("click", remove_sign(boxclose));
                boxpic.innerHTML=`<img src="${club_data[i]['photo']}" style="width:35px;border-radius: 50%;border:1px solid black">`
                box.innerHTML=club_data[i]['name']
                box.dataset.playerid=club_data[i]['id']
                box.dataset.position=club_data[i]['position']
                if(club_data[i]['position'].includes('Goalkeeper')){
                    //console.log("=>"+club_data[i]['position']);
                    //console.log("=>"+box.id);
                    //console.log("=>"+boxclose.id);
                    box.dataset.color='danger'
                    boxclose.onclick = () => { 
                        sell_player(club_data[i]['id'],box, boxclose, club_data[i]['position'],  club_data[i]['position'].replace("-", " "), "danger");
                     };
               
                    box.classList.remove('bg-danger-subtle','text-black')
                    box.classList.add('bg-danger','text-white') 
                }else if(club_data[i]['position'].includes('Defender')){

                    box.dataset.color='secondary'
                    boxclose.onclick = () => { sell_player(club_data[i]['id'],box, boxclose,club_data[i]['position'],  club_data[i]['position'].replace("-", " "),  "secondary"); };
               
                    box.classList.remove('bg-secondary-subtle','text-black')
                    box.classList.add('bg-secondary','text-white') 
                }
                else if(club_data[i]['position'].includes('Midfielder')){

                    box.dataset.color='primary'
                    boxclose.onclick = () => { sell_player(club_data[i]['id'],box, boxclose,club_data[i]['position'],  club_data[i]['position'].replace("-", " "), "primary"); };
               
                    box.classList.remove('bg-primary-subtle','text-black')
                    box.classList.add('bg-primary','text-white') 
                }
                else if(club_data[i]['position'].includes('Attacker')){

                    box.dataset.color='success'
                    boxclose.onclick = () => { sell_player(club_data[i]['id'],box, boxclose,club_data[i]['position'],  club_data[i]['position'].replace("-", " "),  "success"); };
               
                    box.classList.remove('bg-success-subtle','text-black')
                    box.classList.add('bg-success','text-white') 
                }
                
                }
            }
        });
    }

/* confirm_sell_btn.addEventListener('click', event => {

}); */

var sold_list=[]
//sell_player(player_box,club_data[i]['id'],box, boxclose,club_data[i].position,  club_data[i].position.replace("-", " "),  "success")
function sell_player(player_id, box, boxclose, position_del, empty_position, color_del){
    var sold_name= box.innerHTML
 
    var modal = document.getElementById("myModal-sell");
    const content_box=document.getElementById("content-box-sell");
    //const gif=document.getElementById("shaking-gif");
    //content_box.style.display='none'
    //gif.style.display='none'
    modal.style.display = "block";
    const confirm_sell_btn=document.getElementById("confirm_sell_btn");
    const sell_player_id  =document.getElementById("sell_player_id");
    const sell_player_name=document.getElementById("sell_player_name");
    sell_player_id.innerHTML=box.dataset.playerid
    sell_player_name.innerHTML=box.innerHTML
    let position=box.dataset.position
    let color=box.dataset.color
        
    //console.log("plater name: "+sell_player_name.innerHTML+ " player id: "+sell_player_id.innerHTML)
    fetch( "random_headline/sell")
    .then(response => response.text())
    .then(text => {
             const headline_txt=document.getElementById("headline-txt-sell");
             var headline = JSON.parse(text);
             for (var i in headline) {
                headline = headline[i]
                headline=headline.replace("*name*",sold_name)
                headline=headline.replace("*team*",club_name) 
                headline_txt.innerHTML=headline 
                
             }
             const player_sell_name=document.getElementById("player_sell_name");
                player_sell_name.innerHTML=sold_name
        }
    );
    confirm_sell_btn.dataset.playername=sell_player_name.innerHTML
    confirm_sell_btn.dataset.playerid=sell_player_id.innerHTML
    confirm_sell_btn.dataset.color=box.dataset.color
    confirm_sell_btn.addEventListener('click', event => {
       
        let player_box_sold=document.getElementById(`player-${event.target.dataset.playerid}`);

        if (typeof(player_box_sold) != 'undefined' && player_box_sold != null)
        {
 
            if(player_box_sold.innerHTML.includes(event.target.dataset.playername)){

    
                player_box_sold.classList.add(`bg-${event.target.dataset.color}-subtle`,`text-black`)
                player_box_sold.classList.remove(`bg-${event.target.dataset.color}`,`text-white`) 
            }        }   
        
        
        var available = document.getElementsByClassName('player-box-market');
       // console.log(event.target.dataset.playername)
        if(event.target.dataset.playername!==box.innerHTML){
            return false;
        }
        var player = {}
        player['id'] = box.dataset.playerid
        player['name']= box.innerHTML
        player['position']=position
        sold_list.push(player)
        add_to_budget=Number(box.dataset.price)
        
        boxpic =document.getElementById(`${box.id}-pic`);
    boxclose =document.getElementById(box.id+"-close");
    //initial_budget=initial_budget+        
    boxpic.innerHTML=""
    boxclose.style.display="none"
    boxclose.dataset.playerid="0"
    box.classList.add(`bg-${color}-subtle`,`text-black`)
    box.classList.remove(`bg-${color}`,`text-white`) 
    //cd csplayer_box.classList.add(`bg-${color}-subtle`,`text-black`)
    box.dataset.playerid="0"
    box.innerHTML=box.id.replace("-", " ")
    let pl_value= Number(box.dataset.price)
    var budget_box=document.getElementById("budget");
    let curr_budget=Number(budget_box.innerHTML)
    let remaning_budget = curr_budget+pl_value
     
    
    budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
    curr_budget=remaning_budget
    myModal_sell=document.getElementById("myModal-sell").style.display='none';
    
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
    const det_player_value  =document.getElementById("det_player_value");
    let pl_value=Number(det_player_value.innerHTML)
    var budget_box=document.getElementById("budget");
    if(Number(budget_box.innerHTML)<pl_value){
        alert("Not enough budget")
        return false;
    } 
    var modal = document.getElementById("myModal");
    const content_box=document.getElementById("content-box");
    modal.style.display = "block";
    const confirm_sign_btn=document.getElementById("confirm_sign_btn");
    const det_player_id  =document.getElementById("det_player_id");
    const det_player_photo=document.getElementById("det_player_photo");
    const det_player_name=document.getElementById("det_player_name");
    const det_player_position=document.getElementById("det_player_position");
    
    

    fetch( "random_headline/buy")
    .then(response => response.text())
    .then(text => {
             const headline_txt=document.getElementById("headline-txt");
             var headline = JSON.parse(text);
             for (var i in headline) {
                headline = headline[i]
                headline=headline.replace("*name*",det_player_name.innerHTML)
                headline=headline.replace("*team*",club_name)
                headline=headline.replace("*Name*",det_player_name.innerHTML)
                headline=headline.replace("*Team*",club_name)
                headline_txt.innerHTML=headline 
             }
             const player_buy_name=document.getElementById("player_buy_name");
             player_buy_name.innerHTML=det_player_name.innerHTML
        }
    );

    confirm_sign_btn.dataset.playername=det_player_name.innerHTML   
    confirm_sign_btn.dataset.playervalue=det_player_value.innerHTML
    confirm_sign_btn.addEventListener('click', event => { // main function for saving the player info

        //// TODO AVOID CALL LOOP
         var available = document.getElementsByClassName('player-box-market');
         var is_available=false
         //console.log(event.target.dataset.playername)
        // console.log(det_player_name.innerHTML)
         for(var index=0;index < available.length;index++){
            //console.log(available[index].innerHTML);
            let available_txt=available[index].innerHTML
           // console.log(available_txt.includes(`${det_player_position.innerHTML}`))
            if(available_txt.includes(`${det_player_position.innerHTML}`)==true)
                is_available=true
            if(available_txt.includes(`${event.target.dataset.playername}`)==true)
                return false;
        }
       // console.log("nome: "+event.target.dataset.playername)
        if(is_available==false)
           alert("Position full")

        const content_box=document.getElementById("content-box");
       // const gif=document.getElementById("shaking-gif");
        content_box.style.display='block'
        //gif.style.display='block'

        let pl_value_tmp=Number(det_player_value.innerHTML)
        let curr_budget=Number(budget_box.innerHTML) 
        let remaning_budget = curr_budget-pl_value_tmp
     
    
        budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
        curr_budget=remaning_budget
     
 

    var modal = document.getElementById("myModal");
    
    if(det_player_position.innerHTML==="Goalkeeper"){
        let why = det_player_name.innerHTML
        
        let box =document.getElementById("Goalkeeper-1");
       
        // let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
        // // modifing player box design and funcionality
        // player_box.classList.remove('bg-danger-subtle');
        // player_box.classList.add('bg-danger','text-white');
        let player_box_price=document.getElementById(`player-${det_player_id.innerHTML}`);
        box.dataset.price=player_box_price.dataset.price
        if(box.innerHTML==="Goalkeeper 1"){
            let position=box.innerHTML
            boxpic =document.getElementById("Goalkeeper-1-pic");
            boxclose =document.getElementById("Goalkeeper-1-close");
            let player_box=document.getElementById(`player-${det_player_id.innerHTML}`);
            boxclose.style.display="block"
            boxclose.dataset.playerid=det_player_id.innerHTML
            boxclose.dataset.playervalue=player_box_price.dataset.price
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
            modal.style.display = "none";


            return false
        }
        else if (box.innerHTML === why) {
            modal.style.display = "none";
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
         

                return false
        }
        else if (box.innerHTML === why) {
            modal.style.display = "none";
            return false
        }
                   // console.log("full")
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
     
    //lineupDelete_players
    let player_box_price=document.getElementById(`player-${det_player_id.innerHTML}`);
    let pl_value=Number(player_box_price.dataset.price)
    boxpic =document.getElementById(`${position}-pic`);
    boxclose =document.getElementById(position+"-close");
    boxpic.innerHTML=""
    boxclose.style.display="none"
    boxclose.dataset.playerid="0"
    box.classList.add(`bg-${color}-subtle`,`text-black`)
    box.classList.remove(`bg-${color}`,`text-white`) 
    player_box.classList.remove(`bg-${color}`,`text-white`) 
     
    player_box.classList.add(`bg-${color}-subtle`,`text-black`)
    box.innerHTML=empty_position
    //let pl_value= Number(box.dataset.price)
 
    var budget_box=document.getElementById("budget");
    let curr_budget=Number(budget_box.innerHTML)
  
    let remaning_budget = curr_budget+pl_value
    budget_box.innerHTML=`${remaning_budget.toFixed(1)}`
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
const price_search=document.getElementById("price_search"); 
const order_search=document.getElementById("order_search"); 
team_search.addEventListener("change", function() {
   next.value=2
   previous.value=0
   previous.classList.add('disabled')
   fetchPlayers(1, team_search.value, position_search.value,price_search.value,order_search.value)
});
position_search.addEventListener("change", function() {
    next.value=2
    previous.value=0
    previous.classList.add('disabled')
    fetchPlayers(1, team_search.value, position_search.value,price_search.value,order_search.value)
});
price_search.addEventListener("change", function() {
    next.value=2
    previous.value=0
    previous.classList.add('disabled')
    fetchPlayers(1, team_search.value, position_search.value,price_search.value,order_search.value)
});
order_search.addEventListener("change", function() {
    next.value=2
    previous.value=0
    previous.classList.add('disabled')
    fetchPlayers(1, team_search.value, position_search.value,price_search.value,order_search.value)
});
// listener for save team  
const save_btn=document.getElementById("save_btn");
save_btn.addEventListener("click", function() {
    var check_complete = document.getElementsByClassName("player-box-market")
    for (var i = 0; i < check_complete.length; i++) {
         if((check_complete[i].innerHTML.includes('Defender'))||(check_complete[i].innerHTML.includes('Midfielder'))||(check_complete[i].innerHTML.includes('Attacker')) )
         {
            // probably not needed
         }
    }
    //console.log("csrftoken3_2:" +csrftoken3)
    //const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const csrftoken = csrftoken3;
    
    var jsonSquad = [];
    var lineupDelete = [];
    for (var i = 1; i < 3; i++) {
        let box = document.getElementById(`Goalkeeper-${i}`);
        //console.log("json: "+box.innerHTML+ " *" + box.innerHTML.includes("Goalkeeper"))
        if(box.innerHTML.includes("Goalkeeper")){
            alert("Please fill up all positions")
            return;
        }
        jsonSquad.push({ position: `Goalkeeper-${i}`,id: box.dataset.playerid});
  
        if(list_lineup.includes(Number(box.dataset.playerid)) ) 
            lineupDelete.push(Number(box.dataset.playerid))

    }
    for (var i = 1; i < 6; i++) {
        let box = document.getElementById(`Defender-${i}`);
      
        if(box.innerHTML.includes("Defender")){
            alert("Please fill up all positions")
            return;
        }
        jsonSquad.push({ position: `Defender-${i}`, id: box.dataset.playerid });
     
        if(list_lineup.includes(Number(box.dataset.playerid)) ) 
            lineupDelete.push(Number(box.dataset.playerid))
    }
    for (var i = 1; i < 6; i++) {
        let box = document.getElementById(`Midfielder-${i}`);
      
        if(box.innerHTML.includes("Midfielder")){
            alert("Please fill up all positions")
            return;
        }
        jsonSquad.push({position: `Midfielder-${i}`, id: box.dataset.playerid});
      
        if(list_lineup.includes(Number(box.dataset.playerid)) ) 
            lineupDelete.push(Number(box.dataset.playerid))
    }
    for (var i = 1; i < 5; i++) {
        let box = document.getElementById(`Attacker-${i}`);
       
        jsonSquad.push({ position: `Attacker-${i}`, id: box.dataset.playerid});
        if(box.innerHTML.includes("Attacker")){
            alert("Please fill up all positions")
            return;
        }
        
        if(list_lineup.includes(Number(box.dataset.playerid)) ) 
            lineupDelete.push(Number(box.dataset.playerid))
    }
    
    var budget_box=document.getElementById("budget");
    let curr_budget=Number(budget_box.innerHTML)  
    
    modal_box=document.getElementById('Modal-saved-squad')
     
     
    document.getElementById('Modal-saved-squad').style.display='block'
   


    fetch(`/save_squad`, {
        method: 'PUT',
        headers: { 'X-CSRFToken': csrftoken },
        mode: 'same-origin',
        body: JSON.stringify({
            csrfmiddlewaretoken: csrftoken,
            squad: jsonSquad,
            squad_name: club_name,
            curr_budget:curr_budget,
            lineupDelete: sold_list
        })
    }) 

    modal_box=document.getElementById('Modal-saved-squad')
   
    if(has_squad==true){
      
        document.getElementById('upd_squad_msg').style.display='block'
        document.getElementById('new_squad_msg').style.display='none'
    }else{
      
        document.getElementById('upd_squad_msg').style.display='none'
        document.getElementById('new_squad_msg').style.display='block'
    }
    document.getElementById('Modal-saved-squad').style.display='block'
    
    return false;
// })
     
    //console.log(JSON.stringify(jsonSquad))
});

const create_lineup_btn=document.getElementById("create_lineup_btn");
const later_lineup_btn=document.getElementById("later_lineup_btn");
create_lineup_btn.addEventListener('click', event => {
    document.getElementById('Modal-saved-squad').style.display='none'
    window.location.href = lineup_link
});     
later_lineup_btn.addEventListener('click', event => {
    document.getElementById('Modal-saved-squad').style.display='none'
    window.location.href = index_link
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
    const det_player_squad_name=document.getElementById("det_player_squad_name");
    const det_player_position=document.getElementById("det_player_position");
    const det_player_1=document.getElementById("det_player_1");
    const det_player_2=document.getElementById("det_player_2");
    const stat_player_1=document.getElementById("stat_player_1");
    const stat_player_2=document.getElementById("stat_player_2");
    
    det_player_id.innerHTML=`${id}`
    // sign button eventhandler 
    const sign_btn_disable  =document.getElementById("sign_btn");
    sign_btn_disable.style.display="block"
    

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
 
            stat_player_2.innerHTML=`<span style="font-size:14px">
            <img src="static/fmx/yellowcard.jpg"
            width=15px>: ${player_data[i].yellowcard}<br> 
            <img src="static/fmx/redcard.jpg"
            width=15px>:
             ${player_data[i].redcard}<br>
            Pen won: ${player_data[i].penaltywon}<br></span>`; 


            let is_signed=check_signed(player_data[i].id, player_data[i].position)
             
            if(is_signed){
                const sign_btn_disable  =document.getElementById("sign_btn");
                sign_btn_disable.style.display="none"

            }
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
    
    
 

async function fetchPlayers(page, team, position, price, order) {
    const csrftoken = csrftoken3;
    //const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  
        var my_likesR = [];
          
          fetch(`players/${page}/${team}/${position}/${price}/${order}/${user_id}` )
            .then(response => response.text())
            .then(text => {
                var player = JSON.parse(text);
                //console.log(player)
                tot_pages=player[0].pages
                if(page===tot_pages){
                     next.classList.add('disabled')

                }else{
                    if (next.classList.contains('disabled'))
                    next.classList.remove('disabled')
                }
                //console.log(page+" "+tot_pages)
                const player_list= document.getElementById('player-list')
                player_list.innerHTML=""
                for (var i in player) {
                    //console.log(player[i].in_squad)
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
                    player_box.classList.add( 'rounded-3', 'player-details', 'bg-bs-light');
                    player_box.style.border="1px solid black"

                     
                     let is_signed=check_signed(player_id, player_position) // check player already bought      

                    
                    const player_name = document.createElement("div");
                    player_name.id=`player-${player[i].id}`
                    player_name.dataset.price=player[i].value
                    player_name.innerHTML=`<b style="color:black">${player[i].name}</b> `;
                            
                    player_name.style.padding="0px"
                    //player_name.classList.add('player_name', 'text-primary-emphasis','bg-subtle','bs-info-bg-subtle')
                    player_name.classList.add('player_name', 'text-primary-emphasis','rounded-top-3')
                    var check_complete = document.getElementsByClassName("player-box-market")
                    still_bought=false    
                    for (var j = 0; j < check_complete.length; j++) {
                       // console.log("=>"+check_complete[j].innerHTML)
                        //    console.log("=>"+player[i].name)
                        if(check_complete[j].innerHTML.includes(`${player[i].name}`)) 
                        {  
                            still_bought=true
                        }
                    }
                   
                     if (player[i].position ==="Attacker"){
                        if((is_signed || player[i].in_squad)&&still_bought) 
                            player_name.classList.add( 'bg-success');
                        else
                            player_name.classList.add( 'bg-success-subtle')    
                    } else if (player[i].position ==="Midfielder"){
                        if((is_signed || player[i].in_squad)&&still_bought) 
                            player_name.classList.add( 'bg-primary');
                        else
                            player_name.classList.add( 'bg-primary-subtle')
                    }
                    else if (player[i].position ==="Defender"){
                        if((is_signed || player[i].in_squad)&&still_bought) 
                            player_name.classList.add( 'bg-secondary');
                        else
                            player_name.classList.add( 'bg-secondary-subtle')
                    } 
                    else if (player[i].position ==="Goalkeeper"){
                        if((is_signed || player[i].in_squad)&&still_bought) 
                            player_name.classList.add( 'bg-danger');
                        else
                            player_name.classList.add( 'bg-danger-subtle')
                    }

                    //check if player was recently sold
                       


                    const player_name_extra_info = document.createElement("div"); 
                    //player_name.classList.add('border-primary-subtle');
                    player_name_extra_info.classList.add('fs-6');
                    player_name_extra_info.innerHTML=` <div class="row m-0 p-0">
                    <div class="col-3 m-0 p-0 ">
                    <img style="width:50px;margin:5px;border:1px solid black" src="${player[i].photo}" >
                    </div>
                    <div class="col-6 m-0 p-0 lh-sm text-start">
                      ${player[i].position}   <br>
                      $ ${player[i].value} <br>
                      <span style="font-size:11px"><b>${player[i].team_name}</b></span>
                      </div>
                      <div id="add_box-${player[i].id}" class="col-3 text-center  ">
                     
                    </div> 
                      </div>
                    `;
                    const player_img = document.createElement("img");
                    player_img.style.margin = "5px";
                   /// player_img.style.width = "30px"
                    player_img.style.border = "1px solid gray"
                    //player_img.src = `${player[i].photo}`;
  
                    const player_stats = document.createElement("div");
                    player_stats.classList.add('player_stats','fw-normal');
                    player_stats.id='player_stats';
               
                        //// try offcanvas
                        const show_det_nice = document.createElement("figure");
                        show_det_nice.classList.add('text-center');
                        //show_det_nice.innerHTML=`<button class="btn btn-sm' buy_btn btn-outline-success" id="${player[i].id}">ciao</button>`
                        //player_name.append(show_det_nice);
                        show_det_nice.style.padding="5px"
                        const show_details_btn = document.createElement("button");
                        show_details_btn.classList.add('btn', 'btn-sm',  'btn-outline-dark')
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
                        //// qqq
                        if(player[i].in_squad){
                            console.log(player)
                            //fillup_squad(player_position, player_fullname, player_id, player[i].photo, player_value)
                        }
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
                    add_box=document.getElementById(`add_box-${player[i].id}`)
                    const add_lineup_btn = document.createElement("button");

                    add_lineup_btn.classList.add('btn', 'btn-sm',  'btn-outline-dark','p-1',  'm-0')
                    add_lineup_btn.innerHTML =`<span style="font-size:12px;color:black" class=close > Sign 
                    <span style="font-size:12px">&#36; </span>  </span>`;  
                    add_lineup_btn.id=`${player[i].id}`
                    //add_lineup_btn.dataset.plname=      
                    add_box.innerHTML=""
                    add_box.append(add_lineup_btn)       
                    let photo=player[i].photo;
                     
                    add_lineup_btn.addEventListener('click', event => {
                       // const confirm_sign_btn=document.getElementById("confirm_sign_btn");
                        const det_player_id  =document.getElementById("det_player_id");
                        det_player_id.innerHTML=player_id
                        const det_player_value  =document.getElementById("det_player_value");
                        det_player_value.innerHTML=player_value
                        const det_player_photo=document.getElementById("det_player_photo");
                        det_player_photo.src=photo
                        const det_player_name=document.getElementById("det_player_name");
                        det_player_name.innerHTML=player_fullname
                        const det_player_position=document.getElementById("det_player_position");
                        det_player_position.innerHTML=player_position
                     

                        var available = document.getElementsByClassName('player-box-market');
                        var is_available=false
                      
                       // console.log(det_player_name.innerHTML)
                        for(var index=0;index < available.length;index++){
                           //console.log(available[index].innerHTML);
                           let available_txt=available[index].innerHTML
                          // console.log(available_txt.includes(`${det_player_position.innerHTML}`))
                           if(available_txt.includes(`${player_position}`)==true)
                               is_available=true
                           if(available_txt.includes(`${player_fullname}`)==true)
                               return false;
                       }
                       if(is_available==false){
                          alert(`${player_position}s already filled`)
                          return false;
                       }

                        confirm_sign_player()
                        //buyPlayer(player_id, player_value,player_position, player_fullname);
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
                 //console.log(" =>" +text)
                });
            }

get_teams() // get team names for search options  
//fetchPlayers_bug(1, "0", "0")
get_data()
fetchPlayers(1, "0", "0", "0", "name") // fetch players for first time


 
    
  var span = document.getElementById("myModal");
  var close = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  close.onclick = function() {
    span.style.display = "none";
  }



});