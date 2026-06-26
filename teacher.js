const API =
"https://script.google.com/macros/s/AKfycbwGFm2npV_MSA7-CAYcRUh3omPbU-Vsu7Mt-RIk28Ne6kNV4Uv414evLa5Ramfyr_aglA/exec";



function callAPI(data){

return fetch(API,{
method:"POST",
body:JSON.stringify(data)
})
.then(r=>r.json());

}




function load(){


callAPI({
action:"teacher"
})

.then(d=>{


info.innerHTML=
`
目前排名:${d.rank}
`;



drawSeats(d.seats);


});

}




function drawSeats(seats){


let html=
`
<div class="podium">
講台
</div>
`;



html+=`<div class="classroom">`;



seats.forEach(s=>{


html+=`

<div class="seat ${s.student?"locked":""}">

${s.id}

<br>

${s.student||""}

</div>

`;


});


html+="</div>";


classroom.innerHTML=html;


}





function startSystem(){

callAPI({
action:"start"
})
.then(load);

}



function stopSystem(){

callAPI({
action:"stop"
})
.then(load);

}



function resetSystem(){

callAPI({
action:"reset"
})
.then(load);

}



load();
