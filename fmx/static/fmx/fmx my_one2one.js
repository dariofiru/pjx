document.addEventListener('DOMContentLoaded', function () {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

function Challange_box(){

}
function get_matches(){
    console.log("try")
        fetch( `my_one2one`)
        .then(response => response.text())
        .then(text => {
            //console.log(text)
            if(text==="empty"){

            }else{
                //console.log(text)
                var matches = JSON.parse(text);
                var table_box=document.getElementById("challenge_box");
                 
                
                for (var i in matches) {
                    var row =  document.createElement('div')
                    row.classList.add('row','m-2')
                    var col =  document.createElement('div')
                    var card = document.createElement('div')
                    col.classList.add('col', 'm-1')
                    card.classList.add('card', 'text-bg-light', 'border-dark', 'mb-3')
                    card.style.width="16rem"
                    //table_row.classList.add('row',    'bg-light')
                    var logo =document.createElement('img')
                    logo.classList.add('card-img-top')
                    logo.src=matches[i].club_logo
                    logo.style.width="100px"
                    var club_name =document.createElement('h6')
                    club_name.classList.add('card-title')
                    club_name.innerHTML=matches[i].club_name
               
                    var data =document.createElement('div')
                    data.classList.add('card-footer', 'lh-1')
                    data.innerHTML=`score: ${matches[i].elo}   <br>
                    Played: ${matches[i].total_played} - Won: ${matches[i].total_won}<br><br>`
                    var chall_btn=document.createElement('a')
                    chall_btn.href="#"
                    chall_btn.classList.add('btn','btn-success')
                    chall_btn.innerHTML="Challange"
                    chall_btn.dataset.clubid=matches[i].club_id
                    chall_btn.dataset.clubname=matches[i].club_name
                    chall_btn.addEventListener('click', event => {
                        var braved=document.getElementById("braved");
                        braved.dataset.bravedid=event.target.dataset.clubid
                        var modal=document.getElementById("myModal-chll");
                        var chall_text=document.getElementById("chall_text");    
                        chall_text.innerHTML=`Do you want to challenge team ${event.target.dataset.clubname}?`
                        modal.style.display='block'
                        console.log("?>"+event.target.dataset.clubname)
                    });
                    data.append(chall_btn)
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
         console.log("here")    
         alert("your challange has been delivered")
    }
    );



});
 
    //countdown()
 
});