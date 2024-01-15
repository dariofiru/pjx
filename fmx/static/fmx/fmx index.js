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
    
function get_one2ones(){
    console.log("try")
        fetch(`my_one2one_data/0/timestamp/0/timestamp`)
        .then(response => response.text())
        .then(text => {
            if(text==="empty"){
            }else{
                var matches = JSON.parse(text);
                var next_match=document.getElementById("one2ones");
                next_match.innerHTML=""
                console.log(matches)
                for (var i in matches) {
                    if(matches[i].braved==='false'){
                        if(matches[i].status==='pending'){
                            var text_row =document.createElement('div')
                            text_row.classList.add('row', 'm-0', 'text-start')
                            text=document.createElement('div')
                            text.classList.add('col' ,'m-0','p-0' )
                            text.innerHTML=`${matches[i].club_name} challenge is pending`
                            text_row.prepend(text)
                            next_match.prepend(text_row)
                        }
                        if(matches[i].status==='accepted'){
                            var text_row =document.createElement('div')
                            text_row.classList.add('row', 'm-0', 'text-start')
                            text=document.createElement('div')
                            text.classList.add('col' ,'m-0','p-0' )
                            text.innerHTML=`${matches[i].club_name} challenge was accepted`
                            text_row.append(text)
                            next_match.append(text_row)
                        }  
                    }else{
                        if(matches[i].status==='pending'){
                            var text_row =document.createElement('div')
                            text_row.classList.add('row', 'm-0', 'text-start')
                            text=document.createElement('div')
                            text.classList.add('col' ,'m-0','p-0' )
                            text.innerHTML=`Your challenge to ${matches[i].club_name} is pending`
                            text_row.prepend(text)
                            next_match.prepend(text_row)
                        }
                        if(matches[i].status==='accepted'){
                            var text_row =document.createElement('div')
                            text_row.classList.add('row', 'm-0', 'text-start')
                            text=document.createElement('div')
                            text.classList.add('col' ,'m-0','p-0' )
                            text.innerHTML=`Challenge to ${matches[i].club_name} was accepted`
                            text_row.append(text)
                            next_match.append(text_row)
                        }

                    }
                    if(i>1){console.log("BREAK!"+i)
                    break}
                //next_match.innerHTML=`${squads["lineup_1_name"]} vs ${squads["lineup_2_name"]}`        
            }
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
                   // console.log(text)
                    var squads = JSON.parse(text);
                    var table_box=document.getElementById("table_box");
                    for (var i in squads) {
                        var table_row = document.createElement('div')
                        var div1 =document.createElement('div')
                        var team =document.createElement('div')
                        var elo =document.createElement('div')
                        table_row.classList.add('row', 'm-0',   'bg-success-subtle')
                        team.classList.add('col-7', 'm-0','p-0', 'border','text-start' )
                        elo.classList.add('col-4','m-0', 'p-0','border'  )
                        div1.classList.add('col-1' ,'m-0','p-0', 'border' )
                        div1.innerHTML=`<b>${Number(i)+1}</b>`
                        team.innerHTML=squads[i].name;
                        elo.innerHTML=squads[i].elo;
                        table_row.append(div1)
                        table_row.append(team)
                        table_row.append(elo)
                        if(Number(squads[i].total_played)>0){
                       table_box.append(table_row) 
                        }
                       if(i>4){break}
                    }      
                }
            });
        }
    
    
    get_table()

    get_next_match()

    get_one2ones()

   
       
    });