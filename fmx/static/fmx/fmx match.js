document.addEventListener('DOMContentLoaded', function () {


function get_matches(){
    console.log("try")
        fetch( `round_results`)
        .then(response => response.text())
        .then(text => {
            console.log(text)
            if(text==="empty"){

            }else{
                console.log(text)
                var matches = JSON.parse(text);
                var table_box=document.getElementById("table_box");
                for (var i in matches) {
                   
                    
                    var table_row = document.createElement('tr')
                    //table_row.classList.add('row',    'bg-light')
                    var div1 =document.createElement('td')
                    var home_team =document.createElement('td')
                    var away_team =document.createElement('td')
                    var home_score=document.createElement('td')
                    var away_score=document.createElement('td')
                    var div2 =document.createElement('td')
                    home_team.classList.add('text-end')
/*                     table_row.classList.add('row',    'bg-light')
                    table_row.style.margin="10px"
                    home_team.classList.add('col-3', 'text-end', 'text-black')
                    away_team.classList.add('col-3', 'text-start', 'text-black')
                    home_score.classList.add('col-1')
                    away_score.classList.add('col-1')
                    div1.classList.add('col-2')
                    div2.classList.add('col-2') */
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
                    table_row.append(home_score)
                    table_row.append(away_score)
                    table_row.append(away_team)
                    table_row.append(div2)
                    
                    table_box.append(table_row)
                    //var div1 =document.getElementById("budget");
                    let score_1=matches[i].score_1;
                    let score_2=matches[i].score_2;
                    console.log(score_1+" vs "+score_2)

                }
                
                
            }
        });
    }


get_matches()

 
    //countdown()
 
});