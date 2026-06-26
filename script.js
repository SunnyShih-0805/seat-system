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



loginBox.style.display="none";



studentInfo.innerHTML=
`
姓名:${student.name}<br>
排名:${student.rank}
`;



loadSystem();


});


}







function loadSystem(){


callAPI({
action:"current"
})

.then(sys=>{


if(Number(sys.rank)
!=
Number(student.rank)){


status.innerHTML=
"等待前面同學";

return;

}


status.innerHTML=
"輪到你選";


setInterval(loadSystem,2000);


});


}







function loadSeats(){


callAPI({
action:"seats"
})

.then(seats=>{


let html="";


seats.forEach(s=>{


html+=`

<div class="seat ${s.student?"locked":""}"
onclick="choose('${s.id}')">

${s.id}

</div>

`;

});


seatArea.innerHTML=html;


});

}






function choose(id){


if(!confirm("選擇 "+id+" ?"))
return;



callAPI({

action:"choose",

number:student.seatNumber,

seat:id

})

.then(res=>{


if(!res.success){

alert(res.message);

return;

}


alert("完成");

student.selectedSeat=id;
student.locked=true;


document.getElementById("seatArea").innerHTML=
"選位完成，等待下一位";


setTimeout(()=>{

loadSystem();

},1000);

});


}
