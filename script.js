const API =
"https://script.google.com/macros/s/AKfycbwGFm2npV_MSA7-CAYcRUh3omPbU-Vsu7Mt-RIk28Ne6kNV4Uv414evLa5Ramfyr_aglA/exec";



let student=null;

let enableSeat=false;

let timer=null;





function callAPI(data){

return fetch(API,{

method:"POST",

body:JSON.stringify(data)

})
.then(r=>r.json());

}







function login(){


let number =
document.getElementById("number").value;



callAPI({

action:"login",

number:number


})

.then(res=>{


if(!res.success){

alert(res.message);

return;

}



student=res.student;



document
.getElementById("loginBox")
.style.display="none";





if(!student.rank){


document
.getElementById("rankBox")
.style.display="block";


return;

}





start();


});


}









function submitRank(){


let rank =
document.getElementById("rank").value;



callAPI({

action:"rank",

number:student.number,

rank:rank


})

.then(res=>{


if(!res.success){

alert(res.message);

return;

}



student.rank=rank;



document
.getElementById("rankBox")
.style.display="none";



start();



});

}









function start(){


showInfo();



update();



if(timer)return;



timer=setInterval(update,2000);



setInterval(heartbeat,5000);



}









function heartbeat(){


if(!student)return;


callAPI({

action:"heartbeat",

number:student.number


});


}









function showInfo(){


info.innerHTML=
`
姓名：
${student.name}

<br>

排名：
${student.rank}

`;



}









function update(){



callAPI({

action:"status",

number:student.number


})

.then(data=>{


student=data.student;



drawSeats(data.seats);



let sys=data.system;



let current=sys.currentStudent;



if(sys.status!="RUNNING"){


document.getElementById("status").innerHTML=
`
等待老師開始

`;

enableSeat=false;

return;


}







if(current){


document.getElementById("status").innerHTML=
`
目前輪到：

${current.number}號
${current.name}

<br>

排名：
${current.rank}

`;

}
else{


document.getElementById("status").innerHTML=
`

目前輪到：

尚未開始或無資料

<br>

目前排名：
${sys.currentRank}

`;

}



if(
Number(student.rank)
==
Number(sys.currentRank)
&&
!student.seat
){


document.getElementById("status").innerHTML+=
`
<br>
可以選位
`;

enableSeat=true;


}

else{


document.getElementById("status").innerHTML+=
`
<br>
等待中
`;

enableSeat=false;


}



});

}









function drawSeats(seats){


let html="";



seats.forEach(s=>{


let cls="seat";



if(s.student){

cls+=" locked";

}



if(
student &&
s.student==student.number
){

cls+=" mine";

}



html+=`

<div

class="${cls}"

style="
grid-row:${s.row};
grid-column:${s.col};
"

onclick="choose('${s.id}')"

>

${s.id}

</div>

`;



});



seatArea.innerHTML=html;


}









function choose(id){


if(!enableSeat){

return;

}



callAPI({

action:"choose",

number:student.number,

seat:id


})

.then(res=>{


if(!res.success){


alert(res.message);

return;

}



enableSeat=false;



update();



});


}
