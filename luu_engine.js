// =====================================
// Luu Engine V2.5
// =====================================


// -----------------------------
// แยกคำ
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


    // คำพิเศษที่รู้แน่นอน

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



    // ควบกล้ำ

    const clusters=[

        "กร",
        "กล",
        "กว",
        "คร",
        "คล",
        "คว",
        "ปล",
        "ปร"

    ];



    for(let c of clusters){

        if(word.startsWith(c)){

            data.initial=c;

            body =
            word.substring(c.length);

            break;

        }

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



    if(data.final===""){


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

    }



    // พยัญชนะต้นธรรมดา

    if(data.initial===""){

        data.initial =
            body[0] || "";


        body =
            body.substring(1);

    }



    // สระ

    if(word.includes("เอีย")){

        data.vowel="เอีย";

    }

    else if(word.includes("โอ")){

        data.vowel="โอ";

    }

    else if(word.includes("ู")){

        data.vowel="อู";

    }

    else if(word.includes("า")){

        data.vowel="อา";

    }

    else if(word.includes("ะ")){

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



        default:


            first =
                firstInitial;


            second =
                data.initial
                +
                "ู";

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
