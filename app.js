let dictionary=[];


const input =
document.getElementById("inputText");


const output =
document.getElementById("outputText");


const stars =
document.getElementById("stars");


const notice =
document.getElementById("notice");





fetch("data/dictionary.json")

.then(r=>r.json())

.then(data=>{

dictionary=data;

});





function star(score){

return "⭐".repeat(score)
+
"☆".repeat(5-score);

}







function translateSentence(){


let sentence =
input.value.trim();



if(!sentence){

output.value="";

stars.innerHTML="☆☆☆☆☆";

notice.innerHTML="";

return;

}




let words =
sentence.split(/\s+/);



let result=[];

let scores=[];

let missing=[];




words.forEach(word=>{


let found =
dictionary.find(
item=>item.thai===word
);



if(found){


result.push(found.luu);


scores.push(found.confidence);


}

else{


result.push(word);


missing.push(word);


}


});





output.value =
result.join(" ");




if(scores.length){


let avg =
Math.round(

scores.reduce(
(a,b)=>a+b
)
/scores.length

);


stars.innerHTML =
star(avg);


}

else{


stars.innerHTML =
"☆☆☆☆☆";


}





if(missing.length){


notice.innerHTML =
"📝 ยังไม่มีข้อมูล: "
+
missing.join(", ");


}

else{


notice.innerHTML =
"✨ แปลครบทุกคำ";


}


}







input.addEventListener(
"input",
translateSentence
);







document
.getElementById("copyBtn")
.onclick=function(){


navigator.clipboard.writeText(
output.value
);


};







document
.getElementById("favBtn")
.onclick=function(){


localStorage.setItem(

"favorite",

JSON.stringify({

thai:input.value,

luu:output.value

})

);


alert("บันทึกแล้ว 💗");


};







document
.getElementById("switchBtn")
.onclick=function(){


let temp=input.value;


input.value=output.value;


output.value=temp;


};
