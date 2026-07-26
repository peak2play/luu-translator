let dictionary = [];



const thaiInput =
document.getElementById("thaiInput");


const luuOutput =
document.getElementById("luuOutput");


const stars =
document.getElementById("stars");





fetch("data/dictionary.json")

.then(response => response.json())

.then(data => {

dictionary = data;

});






function translateLuu(){


let text =
thaiInput.value.trim();



if(text===""){

luuOutput.value="";

stars.innerHTML="☆☆☆☆☆";

return;

}



let words =
text.split(/\s+/);



let result=[];

let scores=[];



words.forEach(word=>{


let found =
dictionary.find(
item => item.thai === word
);



if(found){

result.push(found.luu);

scores.push(found.confidence || 0);

}

else {

result.push(word);

scores.push(0);

}


});



luuOutput.value =
result.join(" ");



let average =
scores.reduce(
(a,b)=>a+b,
0
) / scores.length;



let star =
Math.round(average);



stars.innerHTML =
"⭐".repeat(star)
+
"☆".repeat(5-star);



}




thaiInput.addEventListener(
"input",
translateLuu
);





// Paste

document
.getElementById("pasteBtn")
.onclick = async()=>{


try {


let text =
await navigator.clipboard.readText();


thaiInput.value=text;


translateLuu();


}

catch(error){

alert("ไม่สามารถวางข้อความได้ กรุณาอนุญาต Clipboard");

}


};





// Clear

document
.getElementById("clearBtn")
.onclick = ()=>{


thaiInput.value="";

luuOutput.value="";

stars.innerHTML="☆☆☆☆☆";


};





// Copy

document
.getElementById("copyBtn")
.onclick = async()=>{


await navigator.clipboard.writeText(
luuOutput.value
);


};
