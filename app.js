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


let text =
input.value.trim();



let found =
dictionary.find(
item=>item.thai===text
);




if(found){


output.value =
found.luu;


stars.innerHTML =
showStars(found.confidence);


}

else{


output.value =
"ยังไม่มีข้อมูล";


stars.innerHTML =
"☆☆☆☆☆";


}



}





input.addEventListener(
"input",
translate
);





document
.getElementById("switchBtn")
.onclick=function(){


let temp =
input.value;


input.value =
output.value;


output.value =
temp;


};






document
.getElementById("copyBtn")
.onclick=function(){


navigator.clipboard.writeText(
output.value
);


alert("คัดลอกแล้ว 💗");


};






document
.getElementById("favBtn")
.onclick=function(){


let fav =
JSON.parse(
localStorage.getItem("favorites")
)
||
[];



fav.push({

thai:input.value,

luu:output.value

});



localStorage.setItem(
"favorites",
JSON.stringify(fav)
);


alert("บันทึกแล้ว 💗");


};
