const API =
"https://script.google.com/macros/s/AKfycbwGFm2npV_MSA7-CAYcRUh3omPbU-Vsu7Mt-RIk28Ne6kNV4Uv414evLa5Ramfyr_aglA/exec";



let timer;



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



let current=sys.currentStudent;



system.innerHTML=
`

狀態：
${sys.status}

<br>

目前順位：
${sys.currentRank}

<br>

目前學生：
${current?
current.number+"號 "+current.name:
"無"}

`;



showStudents(data.students);



drawSeats(data.seats);



});

}









function showStudents(list){


let html="";



list.forEach(s=>{


let online="⚪";



if(s[5]){


let t =
new Date(s[5]);

let now =
new Date();


if(
(now-t)/1000 < 10
){

online="🟢";

}


}



html+=`

<div>

${online}

座號:${s[0]}

姓名:${s[1]}

排名:${s[2]||"-"}

座位:${s[3]||"未選"}

</div>

`;



});



students.innerHTML=html;


}









function drawSeats(seats){


html=

`

<div

class="podium"

style="
grid-column:1 / 9;
grid-row:1;
"

>

講台

</div>

`;


seats.forEach(s=>{


let cls="seat";


if(s.student){

cls+=" locked";

}



html+=`

<div

class="${cls}"

style="
grid-row:${Number(s.row)+1};
grid-column:${s.col};
"

onclick="unlock('${s.id}')"

>

${s.id}

<br>

${s.student||""}


</div>


`;



});




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


if(!confirm("確定重置？"))
return;


callAPI({

action:"reset"

})

.then(update);



}









function unlock(id){


if(!confirm(
"解除 "+id+"?"
))

return;



callAPI({

action:"unlock",

seat:id


})

.then(update);


}









update();



timer=setInterval(
update,
2000
);
