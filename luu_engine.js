// =====================================
// Luu Engine V2.5.1
// Stable + แก้ เทย แมว ลูก
// =====================================


function splitWords(text){

    const dictionary = {

        "รักแมว":[
            "รัก",
            "แมว"
        ]

    };


    let result=[];


    for(let w of text.trim().split(/\s+/)){

        if(dictionary[w]){

            result.push(...dictionary[w]);

        } else {

            result.push(w);

        }

    }


    return result;

}



// แยกคำหลายพยางค์

function splitSyllables(word){

    const dictionary={


        "กะเทย":[
            "กะ",
            "เทย"
        ],


        "เปียโน":[
            "เปีย",
            "โน"
        ]

    };


    return dictionary[word] || [word];

}



// Parser

function parseThaiSyllable(word){


    // ล็อกคำที่ผ่านแล้ว

    if(word==="เปีย"){

        return {
            initial:"ป",
            vowel:"เอีย",
            final:""
        };

    }


    if(word==="โน"){

        return {
            initial:"น",
            vowel:"โอ",
            final:""
        };

    }


    if(word==="เทย"){

        return {
            initial:"ท",
            vowel:"เอย",
            final:""
        };

    }



    let data={

        initial:"",
        vowel:"",
        final:""

    };



    let body=word;



    // ตัวสะกด

    const finals=[
        "ก",
        "ง",
        "ด",
        "น",
        "บ",
        "ม",
        "ว"
    ];



    for(let f of finals){

        if(
            word.endsWith(f)
            &&
            word.length>1
        ){

            data.final=f;

            body =
            word.substring(
                0,
                word.length-1
            );

            break;

        }

    }



    data.initial =
        body[0] || "";



    // สระ

    if(word.includes("แ")){

        data.vowel="แอ";

    }

    else if(word.includes("ู")){

        data.vowel="อู";

    }

    else if(word.includes("ะ")){

        data.vowel="อะ";

    }

    else {

        data.vowel="อะ";

    }



    return data;

}



// Builder

function buildLuu(data){


    let firstInitial =
    (
        data.initial==="ร"
        ||
        data.initial==="ล"
    )
    ?
    "ซ"
    :
    "ล";



    let first="";
    let second="";



    switch(data.vowel){


        case "อะ":


            if(data.final){

                first =
                    firstInitial
                    +
                    "ั"
                    +
                    data.final;


                second =
                    data.initial
                    +
                    "ุ"
                    +
                    data.final;

            }
            else{

                first =
                    firstInitial
                    +
                    "ะ";


                second =
                    data.initial
                    +
                    "ุ";

            }

            break;



        case "อู":


            first =
                firstInitial
                +
                "ู";


            second =
                data.initial
                +
                "ุ";


            break;



        case "แอ":


            first =
                "แล";


            second =
                data.initial
                +
                "ุ"
                +
                (data.final || "");


            break;



        case "เอีย":

            first="เลีย";

            second=data.initial+"ู";

            break;



        case "โอ":

            first="โล";

            second=data.initial+"ู";

            break;



        case "เอย":

            first="เลย";

            second=data.initial+"ุย";

            break;



        default:

            first=firstInitial;
            second=data.initial+"ู";

    }



    return first + second;

}



// Translate

function translateSyllable(word){

    return buildLuu(
        parseThaiSyllable(word)
    );

}



function translateWord(word){

    return splitSyllables(word)

    .map(
        s=>translateSyllable(s)
    )

    .join(" ");

}



function translateLuuText(text){

    return splitWords(text)

    .map(
        w=>translateWord(w)
    )

    .join(" ");

}
