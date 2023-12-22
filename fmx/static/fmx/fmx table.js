document.addEventListener('DOMContentLoaded', function () {


    function get_table(){
        console.log("try")
            fetch( `get_table`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
    
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                    var table_box=document.getElementById("table_box");
                    for (var i in squads) {
                       
                        
                        var table_row = document.createElement('div')
                        var div1 =document.createElement('div')
                        var team =document.createElement('div')
                        var elo =document.createElement('div')

                        var away =document.createElement('div')
                        var home=document.createElement('div')
                        var total=document.createElement('div')
                        var div2 =document.createElement('div')
                        table_row.classList.add('row',    'bg-light')
                        table_row.style.margin="10px"
                        team.classList.add('col-2', 'text-start', 'text-black')
                        elo.classList.add('col-2',   'text-black')
                        total.classList.add('col-1', 'text-black')
                        home.classList.add('col-1', 'text-black')
                        away.classList.add('col-1', 'text-black')
                        div1.classList.add('col-1', 'text-black')
                        div2.classList.add('col-2', 'text-black')
                        team.innerHTML=squads[i].name;
                        //away_team.innerHTML=squads[i].lineup_2_name;
                        elo.innerHTML=squads[i].elo;
                        total.innerHTML=squads[i].total_played;
                        home.innerHTML=squads[i].home_played;
                        away.innerHTML=squads[i].away_played;
                        table_row.append(div1)
                        table_row.append(team)
                        table_row.append(elo)
                        table_row.append(total)
                        table_row.append(home)
                        table_row.append(away)
                        //table_row.append(away_score)
                       //table_row.append(away_team)
                        table_row.append(div2)
                        
                        table_box.append(table_row)
                        
    
                    }
                    
                    
                }
            });
        }
    
    
    get_table()


    

    tst_btn.addEventListener('click', function () {
        var countDownDate = new Date().getTime() + 600000;
        sessionStorage.setItem('countDownDate', countDownDate);
        countdown()
    });
    //console.log("=> "+table_box)    
       
    });