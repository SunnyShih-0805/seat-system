const API =
"https://script.google.com/macros/s/AKfycbwGFm2npV_MSA7-CAYcRUh3omPbU-Vsu7Mt-RIk28Ne6kNV4Uv414evLa5Ramfyr_aglA/exec
";





function callAPI(data){


return fetch(API,{

method:"POST",

body:JSON.stringify(data)

})

.then(res=>res.json());


}






function load(){


callAPI({

action:"teacher"

})


.then(data=>{


document
.getElementById("info")
.innerHTML=
`
目前順位：
${data.rank}
<br>
狀態：
${data.enabled?"開放":"停止"}
`;



drawSeats(data.seats);



});


}








function drawSeats(seats){


let html=
`
<div class="podium">
講台
</div>
`;





html+=
`
<div class="grid">
`;



seats.forEach(s=>{


html+=`

<div class="seat 
${s.student?"locked":""}"
onclick="unlock('${s.id}')">


${s.id}

<br>

${s.student||""}


</div>

`;



});



html+="</div>";



document
.getElementById("classroom")
.innerHTML=html;



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



if(!confirm(
"確定全部重置?"
))return;



callAPI({

action:"reset"

})

.then(load);



}






function unlock(id){


if(!confirm(
"解除 "+id+"?"
))return;



callAPI({

action:"unlock",

seat:id

})

.then(load);


}



load();

