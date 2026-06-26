const API =
"https://script.google.com/macros/s/AKfycbwGFm2npV_MSA7-CAYcRUh3omPbU-Vsu7Mt-RIk28Ne6kNV4Uv414evLa5Ramfyr_aglA/exec";




function callAPI(data){

return fetch(API,{

method:"POST",

body:JSON.stringify(data)

})
.then(r=>r.json());

}






function update(){


callAPI({

action:"teacher"

})

.then(data=>{


let sys=data.system;



system.innerHTML=
`
狀態：
${sys.status}

<br>

目前順位：
${sys.currentRank}

`;




showStudents(data.students);



drawSeats(data.seats);



});


}








function showStudents(list){


let html="";



list.forEach(s=>{


html+=`

<div>

座號:${s[0]}
姓名:${s[1]}
排名:${s[2]}

${s[5]?"🟢在線":"⚪未登入"}

</div>

`;



});



students.innerHTML=html;



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
<div class="classroom">
`;




seats.forEach(s=>{


let cls="seat";


if(s.student){

cls+=" locked";

}



html+=`

<div class="${cls}">

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

.then(update);



}





function stopSystem(){


callAPI({

action:"stop"

})

.then(update);


}






function resetSystem(){


callAPI({

action:"reset"

})

.then(update);


}








update();


setInterval(update,2000);
