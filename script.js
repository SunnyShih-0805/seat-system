const API =
"https://script.google.com/macros/s/AKfycbwYo6oOn96gzSzbxjnM--wu25wsLSiXWs7ffQ76y3PDW6ZR2vlevRy4j9EfRNVOZqxCiw/exec";



let student=null;



function callAPI(data){


return fetch(API,{

method:"POST",

body:JSON.stringify(data)

})

.then(res=>res.json());


}




function login(){


let number=
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



document
.getElementById("studentInfo")
.innerHTML=
`
姓名：${student.name}
<br>
排名：${student.rank}
`;



loadSystem();


});


}




function loadSystem(){



callAPI({

action:"current"


})

.then(sys=>{


if(sys.rank!=student.rank){

document
.getElementById("status")
.innerHTML=
"等待前面同學選位";


return;

}



document
.getElementById("status")
.innerHTML=
"輪到你選位";



loadSeats();


});


}





function loadSeats(){



callAPI({

action:"seats"

})

.then(seats=>{


let html="";



seats.forEach(s=>{


let disabled =
s.student
?
"locked"
:
"";



html+=
`

<div 
class="seat ${disabled}"
onclick="choose('${s.id}')">

${s.id}

</div>

`;



});



document
.getElementById("seatArea")
.innerHTML=html;



});

}




function choose(id){



if(!confirm(
"確定選擇 "+id+"?"
))return;




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



alert("選位成功");



location.reload();


});


}
