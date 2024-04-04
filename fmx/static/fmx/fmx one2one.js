document.addEventListener('DOMContentLoaded', function () {
   // const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    const csrftoken = csrftoken3;
function Challange_box(){

}
function get_matches(){
    //console.log("try")
        fetch( `get_one2one_teams`)
        .then(response => response.text())
        .then(text => {
            //console.log(text)
            if(text==="empty"){

            }else{
                //console.log(text)
                var matches = JSON.parse(text);
                ////console.log(matches)
                var table_box=document.getElementById("table_box");
                var clubs=matches.length
                var row =  document.createElement('div')
                row.classList.add('row' )
                for (var i in matches) {
                   
                    var col =  document.createElement('div')
                    var card = document.createElement('div')
                    col.classList.add('col-md-3' )
                    card.classList.add('card', 'text-bg-light', 'border-dark', 'mb-2')
                    card.style.width="14rem"
                    //table_row.classList.add('row',    'bg-light')
                    var logo =document.createElement('img')
                    logo.classList.add('card-img-top')
                    logo.src=matches[i].club_logo
                    logo.style.width="80px"
                    var club_name =document.createElement('h6')
                    club_name.classList.add('card-title')
                    club_name.innerHTML=matches[i].club_name
               
                    var data =document.createElement('div')
                    data.classList.add('card-footer', 'lh-1')
                    data.style.fontSize="12px"
                    data.innerHTML=`score: ${matches[i].elo}   <br>
                    Played: ${matches[i].total_played} - Won: ${matches[i].total_won}<br><br>`
                    var chall_btn=document.createElement('a')
                    chall_btn.href="#"
                    chall_btn.classList.add('btn','btn-success')
                    chall_btn.innerHTML="Challenge"
                    chall_btn.dataset.clubid=matches[i].club_id
                    chall_btn.dataset.clubname=matches[i].club_name
                    
                    chall_btn.addEventListener('click', event => {
                        var braved=document.getElementById("braved");
                        braved.dataset.bravedid=event.target.dataset.clubid
                        var modal=document.getElementById("myModal-chll");
                        var chall_text=document.getElementById("chall_text");    
                        chall_text.innerHTML=`Ready to challenge <b>${event.target.dataset.clubname}</b?`
                        modal.style.display='block'
                        //console.log("?>"+event.target.dataset.clubname)
                    });
                   
                    if(matches[i].pending){
                        
                        var pending_box =document.createElement('div')
                        pending_box.innerHTML="<b>Challenge pending</b>"
                        data.append(pending_box)
                    }else{
                        
                    data.append(chall_btn)
                }
                    var away_score=document.createElement('td')
                    var div2 =document.createElement('td')
                    card.append(logo)
                    card.append(club_name)
                    card.append(data)
                    col.append(card)
                    row.append(col)
                    //table_box.append(card)
                    //var div1 =document.getElementById("budget");
                }
             table_box.append(row)   
                
            }
        });
    }


get_matches()

var confirm_chall_btn=document.getElementById("confirm_chall_btn");
confirm_chall_btn.addEventListener('click', event => {
    var typeNumber=document.getElementById("typeNumber");
   
    if (typeNumber.value ==""||typeNumber.value ==0){return false; }
    if (Number(typeNumber.value)>20){

        alert("Bet too high")
        return false;
    }
    var braved=document.getElementById("braved");
    var bet=document.getElementById("typeNumber");
     
    var bravedid=braved.dataset.bravedid 

    fetch(`/challenge/${bravedid}`, {
        method: 'PUT',
        headers: { 'X-CSRFToken': csrftoken },
        mode: 'same-origin',
        body: JSON.stringify({
            csrfmiddlewaretoken: csrftoken,
            bet: bet.value
        })
    }).then(response => {
        return response.text()
    }).then(data => {
            
         var modal=document.getElementById("myModal-chll");
         modal.style.display="none"
         alert("your challange has been delivered")
         window.location.reload ()
    }
    );



});
 
    //countdown()
 
});