let dictionary=[];


const input =
document.getElementById("inputText");


const output =
document.getElementById("outputText");


const stars =
document.getElementById("stars");



fetch("data/dictionary.json")

.then(response=>response.json())

.then(data=>{

dictionary=data;

});





function showStars(number){

return "⭐".repeat(number)
+
"☆".repeat(5-number);

}





function translate(){


let text=input.value.trim();



let found =
dictionary.find(
item=>item.thai===text
);



if(found){


output.value=found.luu;


stars.innerHTML=
showStars(found.confidence);


}

else{


output.value="ยังไม่มีข้อมูล";


stars.innerHTML="☆☆☆☆☆";


}


}





input.addEventListener(
"input",
translate
);





document
.getElementById("switchBtn")
.onclick=function(){


let temp=input.value;


input.value=output.value;


output.value=temp;


};







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


let favorite =
JSON.parse(
localStorage.getItem("favorite")
)
||[];



favorite.push({

thai:input.value,

luu:output.value

});



localStorage.setItem(
"favorite",
JSON.stringify(favorite)
);


alert("บันทึกแล้ว 💗");


};








// microphone


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



if(SpeechRecognition){


const recognition =
new SpeechRecognition();


recognition.lang="th-TH";


recognition.onresult=function(event){


input.value =
event.results[0][0].transcript;


translate();


};



document
.getElementById("micBtn")
.onclick=function(){

recognition.start();

};


}






// speaker


document
.getElementById("speakBtn")
.onclick=function(){


let speech =
new SpeechSynthesisUtterance(
output.value
);


speech.lang="th-TH";


speech.rate=0.8;


speechSynthesis.speak(
speech
);


};
