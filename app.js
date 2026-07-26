let dictionary = [];



const input =
document.getElementById("thaiInput");


const output =
document.getElementById("luuOutput");


const stars =
document.getElementById("stars");





fetch("data/dictionary.json")

.then(response=>response.json())

.then(data=>{

dictionary=data;

});







function translate(){


let text =
input.value.trim();



if(text===""){


output.value="";

stars.innerHTML="☆☆☆☆☆";

return;


}



let words =
text.split(/\s+/);



let result=[];

let score=[];




words.forEach(word=>{


let found =
dictionary.find(
item=>item.thai===word
);



if(found){


result.push(found.luu);


score.push(
found.confidence
);


}

else{


result.push(word);

score.push(0);


}



});





output.value =
result.join(" ");





let avg =
score.reduce(
(a,b)=>a+b,
0
)
/score.length;



stars.innerHTML =
"⭐".repeat(Math.round(avg))
+
"☆".repeat(
5-Math.round(avg)
);


}







input.addEventListener(
"input",
translate
);








// Paste

document
.getElementById("pasteBtn")
.onclick = async()=>{


let text =
await navigator.clipboard.readText();


input.value=text;


translate();


};








// Clear

document
.getElementById("clearBtn")
.onclick=()=>{


input.value="";

output.value="";

stars.innerHTML="☆☆☆☆☆";


};








// Copy

document
.getElementById("copyBtn")
.onclick=()=>{


navigator.clipboard.writeText(
output.value
);


};
