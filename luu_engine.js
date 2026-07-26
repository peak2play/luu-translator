// =====================================
// Luu Engine V2.0
// Thai syllable parser + Luu builder
// =====================================


// -----------------------------
// แยกคำหลายพยางค์
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
        ],

        "ตอแหล":[
            "ตอ",
            "แหล"
        ]

    };


    return dictionary[word] || [word];

}



// -----------------------------
// วิเคราะห์พยางค์
// -----------------------------

function parseThaiSyllable(word){


    let result = {

        initial:"",
        vowel:"",
        final:""

    };



    // -------------------------
    // จัดการสระประสมก่อน
    // -------------------------

    if(word.includes("เปีย")){

        result.initial="ป";
        result.vowel="เอีย";
        result.final="";

        return result;

    }


    if(word==="โน"){

        result.initial="น";
        result.vowel="โอ";
        result.final="";

        return result;

    }



    if(word==="เทย"){

        result.initial="ท";
        result.vowel="เอย";
        result.final="";

        return result;

    }



    // -------------------------
    // ตัวสะกดจริง
    // -------------------------

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



    // -------------------------
    // พยัญชนะต้น
    // -------------------------

    result.initial = body[0] || "";



    // -------------------------
    // สระ
    // -------------------------

    if(body.includes("ะ")){

        result.vowel="อะ";

    }

    else if(body.includes("า")){

        result.vowel="อา";

    }

    else if(body.includes("ู")){

        result.vowel="อู";

    }

    else if(body.includes("ุ")){

        result.vowel="อุ";

    }

    else if(body.includes("แ")){

        result.vowel="แอ";

    }

    else if(body.includes("โ")){

        result.vowel="โอ";

    }

    else{

        result.vowel="อะ";

    }



    return result;

}



// -----------------------------
// สร้างคำลู
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
// แปลพยางค์
// -----------------------------

function translateSyllable(word){

    let data =
        parseThaiSyllable(word);


    return buildLuu(data);

}



// -----------------------------
// แปลคำ
// -----------------------------

function translateWord(word){

    return splitSyllables(word)

    .map(
        s=>translateSyllable(s)
    )

    .join(" ");

}



// -----------------------------
// แปลข้อความ
// -----------------------------

function translateLuuText(text){

    return text

    .trim()

    .split(/\s+/)

    .map(
        w=>translateWord(w)
    )

    .join(" ");

}
