const list =
document.getElementById("pendingList");



let suggestions =
JSON.parse(
localStorage.getItem("luuSuggestions")
)
||
[];




function render(){


list.innerHTML="";



if(suggestions.length===0){

list.innerHTML=
"<p>ไม่มีคำรอตรวจสอบ</p>";

return;

}




suggestions.forEach((item,index)=>{


let box =
document.createElement("div");


box.className="box";



box.innerHTML=`

<h3>
${item.thai}
→
${item.luu}
</h3>


<p>
สถานะ:
${item.status}
</p>


<button onclick="approve(${index})">

✅ Approve

</button>


<button onclick="reject(${index})">

❌ Reject

</button>

`;



list.appendChild(box);



});


}




function approve(index){


suggestions[index].status="approved";


save();


}





function reject(index){


suggestions[index].status="rejected";


save();


}




function save(){


localStorage.setItem(

"luuSuggestions",

JSON.stringify(suggestions)

);


render();


}




render();