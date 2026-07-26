let mode="thai";


let dictionary=[];



const input =
document.getElementById("inputText");


const output =
document.getElementById("outputText");


const info =
document.getElementById("info");





fetch("data/dictionary.json")

.then(res=>res.json())

.then(data=>{


dictionary=data;


});







function translateSentence(text){


let words =
text.split(" ");


let result=[];

let score=[];



words.forEach(word=>{


let found =
dictionary.find(
item=>item.thai===word
);



if(found){


result.push(found.luu[0]);


score.push(found.confidence);


}

else{


result.push(word);


}


});




return {


text:result.join(" "),


score:

score.length

?

Math.round(
score.reduce((a,b)=>a+b)
/
score.length
)

:

0


};



}







function translateBack(text){



let words =
text.split(" ");



let result=[];



words.forEach(word=>{


let found =
dictionary.find(
item=>item.luu.includes(word)
);



if(found){

result.push(found.thai);

}

else{

result.push(word);

}


});



return result.join(" ");



}








function run(){


let text =
input.value.trim();



if(!text){

output.value="";

info.innerHTML="";

return;

}




if(mode==="thai"){


let result =
translateSentence(text);


output.value=result.text;



if(result.score){

info.innerHTML=
"💗 ความมั่นใจ "
+
result.score
+
"%";

}

else{

info.innerHTML=
"📝 มีคำที่ยังไม่มีในฐานข้อมูล";

}


}


else{


output.value=
translateBack(text);


}


}







input.addEventListener(
"input",
run
);







document
.getElementById("switchBtn")
.onclick=function(){


mode =
mode==="thai"
?
"luu"
:
"thai";


input.value="";

output.value="";

info.innerHTML="";


};







document
.getElementById("clearBtn")
.onclick=function(){

input.value="";

output.value="";

info.innerHTML="";

};







document
.getElementById("copyBtn")
.onclick=function(){


navigator.clipboard.writeText(
output.value
);


alert("คัดลอกแล้ว");

};