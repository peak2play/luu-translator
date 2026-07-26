let dictionary = [];


const input =
document.getElementById("inputText");


const output =
document.getElementById("outputText");


const stars =
document.getElementById("stars");


const notice =
document.getElementById("notice");




// โหลดฐานข้อมูลคำ

fetch("data/dictionary.json")

.then(response => response.json())

.then(data => {

    dictionary = data;

});





// แสดงดาว

function showStars(number){

    return "⭐".repeat(number)
    +
    "☆".repeat(5-number);

}





// แปลประโยค

function translateSentence(){


    let sentence =
    input.value.trim();



    if(sentence === ""){

        output.value = "";

        stars.innerHTML =
        "☆☆☆☆☆";

        if(notice){

            notice.innerHTML = "";

        }

        return;

    }





    let words =
    sentence.split(/\s+/);



    let result = [];

    let scores = [];

    let missing = [];






    words.forEach(word => {



        let found =
        dictionary.find(
            item => item.thai === word
        );



        if(found){



            // รองรับหลายรูปแบบ

            if(Array.isArray(found.luu)){

                result.push(
                    found.luu[0]
                );

            }

            else{

                result.push(
                    found.luu
                );

            }



            scores.push(
                found.confidence
            );



        }


        else{


            result.push(word);


            missing.push(word);


        }


    });






    output.value =
    result.join(" ");





    // คำนวณคะแนนเฉลี่ย

    if(scores.length > 0){



        let average =
        Math.round(

            scores.reduce(
                (a,b)=>a+b,
                0
            )
            /
            scores.length

        );



        stars.innerHTML =
        showStars(average);



    }

    else{


        stars.innerHTML =
        "☆☆☆☆☆";


    }





    if(notice){



        if(missing.length > 0){


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



}





// พิมพ์แล้วแปลทันที

input.addEventListener(
"input",
translateSentence
);







// สลับภาษา

document
.getElementById("switchBtn")
.onclick = function(){



    let temp =
    input.value;



    input.value =
    output.value;



    output.value =
    temp;



};







// คัดลอก

document
.getElementById("copyBtn")
.onclick = function(){



    navigator.clipboard.writeText(
        output.value
    );


};







// บันทึกคำโปรด

document
.getElementById("favBtn")
.onclick = function(){



    let favorites =

    JSON.parse(

        localStorage.getItem(
            "favorites"
        )

    )
    ||
    [];




    favorites.push({

        thai:
        input.value,


        luu:
        output.value


    });





    localStorage.setItem(

        "favorites",

        JSON.stringify(
            favorites
        )

    );



    alert(
        "บันทึกแล้ว 💗"
    );


};








// ระบบไมโครโฟน

const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;





if(SpeechRecognition){



    const recognition =
    new SpeechRecognition();



    recognition.lang =
    "th-TH";




    recognition.onresult =
    function(event){



        input.value =

        event.results[0][0]
        .transcript;



        translateSentence();



    };





    const mic =
    document.getElementById(
        "micBtn"
    );



    if(mic){


        mic.onclick =
        function(){


            recognition.start();


        };


    }



}







// อ่านออกเสียง

const speakButton =
document.getElementById(
"speakBtn"
);



if(speakButton){



    speakButton.onclick =
    function(){



        let speech =

        new SpeechSynthesisUtterance(

            output.value

        );



        speech.lang =
        "th-TH";



        speech.rate =
        0.8;



        speechSynthesis.speak(
            speech
        );


    };


}
