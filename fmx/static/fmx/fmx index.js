document.addEventListener('DOMContentLoaded', function () {


    function get_next_match(){
        console.log("try")
            fetch( `get_next_match`)
            .then(response => response.text())
            .then(text => {
                if(text==="empty"){
                }else{
                    //console.log(text)
                    var squads = JSON.parse(text);
                    var next_match=document.getElementById("next_match");
                    next_match.innerHTML=`${squads["lineup_1_name"]} vs ${squads["lineup_2_name"]}`        
                }
            });
        }



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
                        table_row.classList.add('row', 'm-0',   'bg-success-subtle')
                        team.classList.add('col-5', 'm-0','p-0', 'border','text-start' )
                        elo.classList.add('col','m-0', 'p-0','border'  )
                        div1.classList.add('col-1' ,'m-0','p-0', 'border' )
                        div1.innerHTML=`<b>${Number(i)+1}</b>`
                        team.innerHTML=squads[i].name;
                        elo.innerHTML=squads[i].elo;
                        table_row.append(div1)
                        table_row.append(team)
                        table_row.append(elo)
                       table_box.append(table_row) 
                       if(i>4){break}
                    }      
                }
            });
        }
    
    
    get_table()

    get_next_match()
    

   
       
    });