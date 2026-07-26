// =====================================
// Luu Engine V2.1
// =====================================


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



// =====================================
// Parser
// =====================================

function parseThaiSyllable(word){


    let result = {

        initial:"",
        vowel:"",
        final:""

    };


    // คำพิเศษที่ต้องล็อก

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


    let body=word;


    for(let f of finals){

        if(
            word.endsWith(f)
            &&
            word.length>1
        ){

            result.final=f;

            body =
            word.substring(
                0,
                word.length-1
            );

            break;

        }

    }



    result.initial =
        body[0] || "";



    if(body.includes("ะ")){

        result.vowel="อะ";

    }
    else{

        result.vowel="อะ";

    }


    return result;

}



// =====================================
// Builder
// =====================================

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


            // มีตัวสะกด
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


            // ไม่มีตัวสะกด
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

            second=
                data.initial
                +
                "ู";

            break;



        case "โอ":

            first="โล";

            second=
                data.initial
                +
                "ู";

            break;



        case "เอย":

            first="เลย";

            second=
                data.initial
                +
                "ุย";

            break;



        default:

            first=firstInitial;

            second=data.initial+"ู";

    }



    return first + second;

}



// =====================================
// Translate
// =====================================

function translateSyllable(word){

    let data =
        parseThaiSyllable(word);


    return buildLuu(data);

}



function translateWord(word){

    return splitSyllables(word)

    .map(
        s=>translateSyllable(s)
    )

    .join(" ");

}



function translateLuuText(text){


    return text

    .trim()

    .split(/\s+/)

    .map(
        w=>translateWord(w)
    )

    .join(" ");

}
