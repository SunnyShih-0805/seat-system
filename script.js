const API =
"https://script.google.com/macros/s/AKfycbwGFm2npV_MSA7-CAYcRUh3omPbU-Vsu7Mt-RIk28Ne6kNV4Uv414evLa5Ramfyr_aglA/exec";



let student=null;



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





if(
!student.rank
){


rankBox.style.display="block";


return;


}





show();



startUpdate();


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


rankBox.style.display="none";


show();


startUpdate();


});


}









function show(){



info.innerHTML=
`
姓名:${student.name}
<br>
排名:${student.rank}
`;



}









function startUpdate(){



update();


setInterval(update,2000);



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



if(sys.status!="RUNNING"){


status.innerHTML=
`
等待老師開始

<br>

目前尚未開始

`;

return;

}



if(
Number(student.rank)
==
Number(sys.currentRank)
&&
!student.seat
){


status.innerHTML=
`
目前輪到：
${sys.currentRank} 號

<br>

你的排名：
${student.rank}

<br>

可以選位

`;


enableSeat=true;


}

else{


status.innerHTML=
`
目前輪到：
${sys.currentStudent.number}號
(${sys.currentStudent.name})
<br>
排名：
${sys.currentRank}

<br>

你的排名：
${student.rank}

<br>

等待中

`;



enableSeat=false;


}




});

}








let enableSeat=false;








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


});


}
