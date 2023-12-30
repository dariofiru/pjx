document.addEventListener('DOMContentLoaded', function () {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

function Challange_box(){

}
function get_matches(challenge_status, challenge_order,braved_status,braved_order){
    console.log(`my_one2one_data/${challenge_status}/${challenge_order}/${braved_status}/${braved_order}`)
    var cleanup= document.getElementById('challenge_box_in')
    cleanup.innerHTML=""
    cleanup= document.getElementById('braved_box_in')
    cleanup.innerHTML=""
        fetch( `my_one2one_data/${challenge_status}/${challenge_order}/${braved_status}/${braved_order}`)
        .then(response => response.text())
        .then(text => {
           console.log(text)
            if(text==="empty"){

            }else{
                //console.log(text)
                var matches = JSON.parse(text);
                var challenge_box=document.getElementById("challenge_box_in");
                var braved_box=document.getElementById("braved_box_in"); 
                
                for (var i in matches) {
                    if(matches[i].braved==='false'){
                        console.log("not braved")
                    var row =  document.createElement('div')
                    var challenge_header=document.getElementById("challenge_header");
                    //challenge_header.style.display='block'
                    row.classList.add('row','m-2','border-black','border','rounded-2')
                    var col =  document.createElement('div')
                    date=new Date(`${matches[i].time}`)
                    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const formattedTime = formatter.format(date);
                    col.classList.add('col-4',   'text-black','align-self-center')
                    col.innerHTML=` ${matches[i].club_name}<br>${matches[i].id}
                    <span style="font-size:10px"> <i>${date.toDateString()}  </i></span>`
                    var col2 =  document.createElement('div')
                    col2.classList.add('col', 'm-1', 'text-black','align-self-center')
                    col2.innerHTML=`${matches[i].status}`
                    row.append(col)
                    var col2b=document.createElement('div')
                    col2b.classList.add('col', 'm-1', 'text-black','align-self-center')
                    col2b.innerHTML=`$${matches[i].bet}`
                    var col3 =  document.createElement('div')
                    col3.classList.add('col',   'text-black','align-self-center')
                    if(matches[i].status==='accepted'){
                       
                        var res_btn=document.createElement('button')
                        res_btn.classList.add('btn','btn-primary', 'btn-sm','m-1')
                        res_btn.id="res_btn"
                        res_btn.dataset.one2oneid=matches[i].id
                        res_btn.innerHTML="View results"
                        res_btn.addEventListener('click', event => { //// results
                            console.log("->"+event.target.dataset.one2oneid)
                            var myModal_chall=document.getElementById("myModal-result");  
                             myModal_chall.style.display='block'
                            fetch( `get_one2one/${event.target.dataset.one2oneid} `)
                            .then(response => response.text())
                            .then(text => {
                                var result = JSON.parse(text);
                                    var logo_1=document.getElementById("logo_1");
                                    logo_1.src=`${result[0].logo_1}`
                                    var logo_2=document.getElementById("logo_2");
                                    logo_2.src=`${result[0].logo_2}`
                                    var club_1=document.getElementById("club_1");
                                    club_1.innerHTML=`${result[0].lineup_1_name}`
                                    var club_2=document.getElementById("club_2");
                                    club_2.innerHTML=`${result[0].lineup_2_name}`
                                    var score_1=document.getElementById("score_1");
                                    score_1.innerHTML=`${result[0].score_1}`
                                    var score_2=document.getElementById("score_2");
                                    score_2.innerHTML=`${result[0].score_2}`
                            });



                        });
                        col3.append(res_btn)
                        
                    }else if(matches[i].status==='pending'){
                        col2.innerHTML=matches[i].status
                        col3.innerHTML=`<span style="font-size:12px">Challenge not yet accepted</span>`
                    }
                    else if(matches[i].status==='refused'){
                        row.classList.add('bg-danger', 'text-white') 
                    }
                    
                    row.append(col2b)
                    row.append(col2)
                    row.append(col3)
                    challenge_box.append(row)
                    }else{
                        console.log(" braved")
                        var row =  document.createElement('div')
                    row.classList.add('row','m-2','border-black','border','rounded-2')
                    var col =  document.createElement('div')
                    date=new Date(`${matches[i].time}`)
                    const formatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const formattedTime = formatter.format(date);
                    col.classList.add('col-4',   'text-black', 'align-self-center')
                    col.innerHTML=` ${matches[i].club_name}<br>${matches[i].id}
                    <span style="font-size:10px"> <i>${date.toDateString()}  </i></span>`
                     
                    var col2 =  document.createElement('div')
                    col2.classList.add('col', 'm-1', 'text-black','align-self-center')
                    col2.innerHTML=`${matches[i].status}`
                    var col2b=document.createElement('div')
                    col2b.classList.add('col', 'm-1', 'text-black','align-self-center')
                    col2b.innerHTML=`$${matches[i].bet}`
                    row.append(col)
                    row.append(col2b)
                    row.append(col2)
                    var col3 =  document.createElement('div')
                    col3.classList.add('col',   'text-black','align-self-center')
                    if(matches[i].status==='accepted'){
                       
                        var res_btn=document.createElement('button')
                        res_btn.classList.add('btn','btn-primary', 'btn-sm','m-1')
                        res_btn.id="res_btn"
                        res_btn.dataset.one2oneid=matches[i].id
                        res_btn.innerHTML="View results"
                        res_btn.addEventListener('click', event => { //results
                            console.log("->"+event.target.dataset.one2oneid)
                            var myModal_chall=document.getElementById("myModal-result");  
                             myModal_chall.style.display='block'
                            fetch( `get_one2one/${event.target.dataset.one2oneid} `)
                            .then(response => response.text())
                            .then(text => {
                                    console.log( text)
                                    var result = JSON.parse(text);
                                    var logo_1=document.getElementById("logo_1");
                                    logo_1.src=`${result[0].logo_1}`
                                    var logo_2=document.getElementById("logo_2");
                                    logo_2.src=`${result[0].logo_2}`
                                    var club_1=document.getElementById("club_1");
                                    club_1.innerHTML=`${result[0].lineup_1_name}`
                                    var club_2=document.getElementById("club_2");
                                    club_2.innerHTML=`${result[0].lineup_2_name}`

                                    var score_1=document.getElementById("score_1");
                                    score_1.innerHTML=`${result[0].score_1}`
                                    var score_2=document.getElementById("score_2");
                                    score_2.innerHTML=`${result[0].score_2}`

                            });
                        });
                        col3.append(res_btn)
                        row.append(col3)
                    }else if(matches[i].status==='pending'){
                       
                        var accept_btn=document.createElement('button')
                        accept_btn.classList.add('btn','btn-success', 'm-1', 'btn-sm')
                        accept_btn.dataset.one2oneid=matches[i].id
                        accept_btn.addEventListener('click', event => {
                            console.log("->"+event.target.dataset.one2oneid)
                            var myModal_chall=document.getElementById("myModal-chall");  
                            myModal_chall.style.display='block'
                            fetch(`/accept_challenge/${event.target.dataset.one2oneid}`, {
                                method: 'PUT',
                                headers: { 'X-CSRFToken': csrftoken },
                                mode: 'same-origin',
                                body: JSON.stringify({
                                    csrfmiddlewaretoken: csrftoken 
                                })
                            }).then(response => {
                                return response.text()
                            }).then(data => {
                                 console.log("here") 
                                 var spinner=document.getElementById("spinner"); 
                                 spinner.style.display='none' 
                                 var view_chall_btn=document.getElementById("view_chall_btn");  
                                 view_chall_btn.style.display='block'
                                 var close_chall_btn=document.getElementById("close_chall_btn");  
                                 close_chall_btn.style.display='block'   
                                 var chall_text=document.getElementById("chall_text"); 
                                 chall_text.style.display='none' 
                                 
                                 
                                 
                            }
                            );

                        });
                        accept_btn.innerHTML="Accept"
                        col3.append(accept_btn)
                        
                        var refuse_button=document.createElement('button')
                        refuse_button.dataset.one2oneid=matches[i].id
                        refuse_button.classList.add('btn','btn-danger', 'm-1', 'btn-sm')
                        refuse_button.addEventListener('click', event => {
                            console.log("->"+event.target.dataset.one2oneid)
                        });
                        refuse_button.innerHTML="Refuse"
                        
                        col3.append(refuse_button)
                    row.append(col3)
                    
                    }braved_box.append(row)
                    }
                }
            // table_box.append(row)   
                
            }
        });
    }


get_matches(0,0,0,0)
 
 
const challenge_status=document.getElementById("challenge_status"); 
console.log("- "+challenge_status.value)
const challenge_order=document.getElementById("challenge_order");
console.log("- "+challenge_order.value)
const braved_status=document.getElementById("braved_status"); 
const braved_order=document.getElementById("braved_order"); 
challenge_status.addEventListener("change", function() {
    console.log("change1")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});
challenge_order.addEventListener("change", function() {
    console.log("change2")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});
braved_status.addEventListener("change", function() {
    console.log("change3")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});
braved_order.addEventListener("change", function() {
    console.log("change4")
    get_matches(challenge_status.value, challenge_order.value,braved_status.value,braved_order.value)
});



 
});