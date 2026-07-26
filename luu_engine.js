// =====================================
// Luu Engine V2.3
// =====================================


// -----------------------------
// แยกคำ
// -----------------------------

function splitWords(text){

    const specialSplit = {

        "รักแมว":[
            "รัก",
            "แมว"
        ]

    };


    let words=[];


    for(let token of text.trim().split(/\s+/)){


        if(specialSplit[token]){

            words.push(...specialSplit[token]);

        }

        else{

            words.push(token);

        }

    }


    return words;

}



// -----------------------------
// แยกพยางค์
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


    // คำล็อกที่ซับซ้อน

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



    // ---------------------
    // ควบกล้ำ
    // ---------------------

    const clusters=[

        "กร",
        "กล",
        "กว",

        "คร",
        "คล",
        "คว",

        "ปร",
        "ปล",

        "พร",
        "พล"

    ];



    for(let c of clusters){

        if(word.startsWith(c)){

            data.initial=c;

            break;

        }

    }



    let body=word;



    if(data.initial){

        body =
        word.substring(
            data.initial.length
        );

    }



    // ---------------------
    // ตัวสะกด
    // ---------------------

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
            body.endsWith(f)
            &&
            body.length>1
        ){

            data.final=f;


            body =
            body.substring(
                0,
                body.length-1
            );


            break;

        }

    }



    if(!data.initial){

        data.initial =
            body[0] || "";

        body =
            body.substring(1);

    }



    // ---------------------
    // สระ
    // ---------------------

    if(body.includes("ู")){

        data.vowel="อู";

    }

    else if(body.includes("า")){

        data.vowel="อา";

    }

    else if(body.includes("ะ")){

        data.vowel="อะ";

    }

    else{

        data.vowel="อะ";

    }



    return data;

}



// -----------------------------
// Builder
// -----------------------------

function buildLuu(data){


    let firstInitial =

    (
        data.initial.includes("ร")
        ||
        data.initial.includes("ล")
    )

    ?
    "ซ"

    :
    "ล";



    let first="";
    let second="";



    // สระอะ

    if(data.vowel==="อะ"){


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

    }



    // สระอู

    else if(data.vowel==="อู"){


        first =
            firstInitial
            +
            "ู";


        second =
            data.initial
            +
            "ุ";


    }



    else{


        first =
            firstInitial;


        second =
            data.initial
            +
            "ู";

    }



    return first+" "+second;

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
