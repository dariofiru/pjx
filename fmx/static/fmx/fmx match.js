document.addEventListener('DOMContentLoaded', function () {


function get_matches(){
    console.log("try")
        fetch( `round_results/4`)
        .then(response => response.text())
        .then(text => {
            console.log(text)
            if(text==="empty"){

            }else{
                var matches = JSON.parse(text);
                for (var i in matches) {
                    
                    let score_1=matches[i].score_1;
                    let score_2=matches[i].score_2;
                    console.log(score_1+" vs "+score_2)
                }
                
                
            }
        });
    }


get_matches()


});