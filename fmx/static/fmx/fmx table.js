document.addEventListener('DOMContentLoaded', function () {


    function get_table(){
            fetch( `get_table`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                     
                    var table_box=document.getElementById("table_box");
                    let rank=1
                    for (var i in squads) {
                        var table_row = document.createElement('div')
                        var div1 =document.createElement('div')
                        var team =document.createElement('div')
                        var elo =document.createElement('div')
                        var away =document.createElement('div')
                        var home=document.createElement('div')
                        var total=document.createElement('div')
                        var total_won =document.createElement('div')
                        var home_won=document.createElement('div')
                        var away_won=document.createElement('div')
                        var div2 =document.createElement('div')
                        table_row.classList.add('row')
                        table_row.style.margin="5px"
                        //table_row.style.color="gray"
                        if (squads[i].name===club_name){
                            table_row.classList.add('fw-bold')
                        }
                        team.classList.add('col-2', 'text-start', 'text-black')
                        elo.classList.add('col',   'text-black')
                        total.classList.add('col', 'text-black', 'd-none', 'd-sm-block' )
                        home.classList.add('col', 'text-black' , 'd-none', 'd-sm-block')
                        away.classList.add('col', 'text-black' , 'd-none', 'd-sm-block')
                        total_won.classList.add('col', 'text-black' , 'd-none', 'd-sm-block')
                        home_won.classList.add('col', 'text-black' , 'd-none', 'd-sm-block')
                        away_won.classList.add('col', 'text-black' , 'd-none', 'd-sm-block')
                        div1.classList.add('col-1', 'text-black' )
                        div2.classList.add('col-2', 'text-black')
                         
                        team.innerHTML=squads[i].name;
                       
                        elo.innerHTML=squads[i].elo;
                        total.innerHTML=squads[i].total_played;
                        home.innerHTML=squads[i].home_played;
                        away.innerHTML=squads[i].away_played;
                        total_won.innerHTML=Number(squads[i].home_won)+Number(squads[i].away_won);
                        home_won.innerHTML=squads[i].home_won;
                        away_won.innerHTML=squads[i].away_won;
                        table_row.append(div1)
                        table_row.append(team)
                        table_row.append(elo)
                        table_row.append(total)
                       table_row.append(home)
                        table_row.append(away)
                        table_row.append(total_won)
                       table_row.append(home_won)
                        table_row.append(away_won)
                       // table_row.append(div2)
                        if(Number(squads[i].total_played)>0){
                            div1.innerHTML=rank
                            rank++
                        table_box.append(table_row)
                    }
                    } 
                }
            });
        }
    
    
    get_table()

 
       
    });