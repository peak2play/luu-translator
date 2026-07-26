// =====================================
// Luu Engine V2.4
// Stable Base Version
// =====================================


// -----------------------------
// Split word
// -----------------------------

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

        }
        else{

            result.push(w);

        }

    }


    return result;

}



// -----------------------------
// Split syllable
// -----------------------------

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



// -----------------------------
// Parser
// -----------------------------

function parseThaiSyllable(word){


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



    // ตัวสะกด

    let finals=[
        "ก",
        "ง",
        "ด",
        "น",
        "บ",
        "ม",
        "ว"
    ];


    let body=word;


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



    if(body.includes("ะ")){

        data.vowel="อะ";

    }

    else if(body.includes("ู")){

        data.vowel="อู";

    }

    else{

        data.vowel="อะ";

    }



    return data;

}



// -----------------------------
// Build Luu
// -----------------------------

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



        case "เอีย":

            first="เลีย";

            second =
                data.initial
                +
                "ู";

            break;



        case "โอ":

            first="โล";

            second =
                data.initial
                +
                "ู";

            break;



        case "เอย":

            first="เลย";

            second =
                data.initial
                +
                "ุย";

            break;



        default:

            first=firstInitial;
            second=data.initial+"ู";

    }



    // สำคัญ: ไม่ใส่ช่องว่างตรงนี้

    return first + second;

}



// -----------------------------
// Translate
// -----------------------------

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
