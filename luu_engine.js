// =====================================
// Luu Engine V2.5.2
// Stable Basic Dictionary Patch
// =====================================


function splitWords(text){

    return text
        .trim()
        .split(/\s+/);

}



// -----------------------------
// แยกพยางค์
// -----------------------------

function splitSyllables(word){


    const dictionary = {

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


    // ===== Special Cases =====


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
            special:"เลยทุย"
        };

    }


    if(word==="ลูก"){

        return {
            special:"ซักลุก"
        };

    }



    let data={

        initial:"",
        vowel:"",
        final:""

    };



    let body=word;



    const finals=[

        "ก",
        "ง",
        "ด",
        "น",
        "บ",
        "ม"

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



    if(word.includes("ะ")){

        data.vowel="อะ";

    }

    else if(word.includes("ู")){

        data.vowel="อู";

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


    if(data.special){

        return data.special;

    }



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



    else if(data.vowel==="เอีย"){


        first="เลีย";

        second =
            data.initial
            +
            "ู";

    }



    else if(data.vowel==="โอ"){


        first="โล";

        second =
            data.initial
            +
            "ู";

    }



    else{


        first=firstInitial;

        second=data.initial+"ู";

    }



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
