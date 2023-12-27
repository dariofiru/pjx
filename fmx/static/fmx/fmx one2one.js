document.addEventListener('DOMContentLoaded', function () {


function get_matches(){
    console.log("try")
        fetch( `get_one2one_teams`)
        .then(response => response.text())
        .then(text => {
            console.log(text)
            if(text==="empty"){

            }else{
                console.log(text)
                var matches = JSON.parse(text);
                var table_box=document.getElementById("table_box");
                var clubs=matches.length
                var row =  document.createElement('div')
                row.classList.add('row','m-2')
                for (var i in matches) {
                   
 /*                   <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>            
</div> */
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
                    data.append(chall_btn)
                    var away_score=document.createElement('td')
                    var div2 =document.createElement('td')
                    //home_team.classList.add('text-end')
/*                     table_row.classList.add('row',    'bg-light')
                    table_row.style.margin="10px"
                    home_team.classList.add('col-3', 'text-end', 'text-black')
                    away_team.classList.add('col-3', 'text-start', 'text-black')
                    home_score.classList.add('col-1')
                    away_score.classList.add('col-1')
                    div1.classList.add('col-2')
                    div2.classList.add('col-2') 
                    home_team.innerHTML=matches[i].lineup_1_name;
                    away_team.innerHTML=matches[i].lineup_2_name;
                    home_score.innerHTML=matches[i].score_1;
                    away_score.innerHTML=matches[i].score_2;
                    if (matches[i].lineup_1_name===club_name){
                        home_team.style.fontWeight="bold"
                    }else if (matches[i].lineup_2_name===club_name){
                        away_team.style.fontWeight="bold"
                    }
                    table_row.append(div1)
                    table_row.append(home_team)
                    table_row.append(home_score)*/
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

 
    //countdown()
 
});