// =====================================
// Luu Engine V2.4
// Stable Base Version
// =====================================


// แยกคำ
function splitWords(text){

    const dictionary = {

        "รักแมว":[
            "รัก",
            "แมว"
        ]

    };


    let result = [];


    for(let w of text.trim().split(/\s+/)){

        if(dictionary[w]){

            result.push(...dictionary[w]);

        } else {

            result.push(w);

        }

    }


    return result;

}



// แยกพยางค์
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



// วิเคราะห์พยางค์
function parseThaiSyllable(word){


    // คำพิเศษ

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



    let data = {

        initial:"",
        vowel:"",
        final:""

    };



    let body = word;



    // ตัวสะกด

    const finals = [
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
            word.length > 1
        ){

            data.final = f;

            body =
                word.substring(
                    0,
                    word.length - 1
                );

            break;

        }

    }



    // พยัญชนะต้น

    data.initial =
        body[0] || "";



    // ตัดพยัญชนะออกเพื่อดูสระ

    let vowelPart =
        body.substring(1);



    // สระ

    if(word.includes("ะ")){

        data.vowel="อะ";

    }

    else if(word.includes("ู")){

        data.vowel="อู";

    }

    else if(word.includes("า")){

        data.vowel="อา";

    }

    else {

        data.vowel="อะ";

    }



    return data;

}



// สร้างภาษูลู
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


        // สระอะ

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


            } else {


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



        // สระอู

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



    // สำคัญ: ไม่มีช่องว่างระหว่าง 2 ส่วน

    return first + second;

}



// แปลพยางค์
function translateSyllable(word){

    return buildLuu(
        parseThaiSyllable(word)
    );

}



// แปลคำ
function translateWord(word){

    return splitSyllables(word)

    .map(
        s => translateSyllable(s)
    )

    .join(" ");

}



// แปลข้อความ
function translateLuuText(text){

    return splitWords(text)

    .map(
        w => translateWord(w)
    )

    .join(" ");

}
