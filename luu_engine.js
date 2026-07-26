// =====================================
// Luu Engine V0.7
// Fix vowel position & compound vowels
// =====================================


function splitSyllables(word){

    const known = {

        "กะเทย":[
            "กะ",
            "เทย"
        ],

        "เปียโน":[
            "เปีย",
            "โน"
        ]

    };


    return known[word] || [word];

}



// -------------------------------------
// วิเคราะห์พยางค์
// -------------------------------------

function parseThaiSyllable(word){


    let data = {

        initial:"",
        vowel:"",
        final:"",
        short:false

    };



    // พยัญชนะต้น

    const clusters=[
        "กร","กล","กว",
        "คร","คล","คว",
        "ตร",
        "ปร","ปล",
        "พร","พล"
    ];


    for(let c of clusters){

        if(word.startsWith(c)){

            data.initial=c;
            break;

        }

    }


    if(!data.initial){

        data.initial=word[0];

    }



    // --------------------------------
    // ตัวสะกด
    // --------------------------------

    const finals=[
        "ก",
        "ง",
        "ด",
        "น",
        "บ",
        "ม",
        "ย",
        "ว"
    ];


    for(let f of finals){

        if(
            word.endsWith(f)
            &&
            word.length > 1
        ){

            data.final=f;

        }

    }



    // --------------------------------
    // สระประสม (ต้องเช็กก่อน)
    // --------------------------------

    if(
        word.includes("เปีย") ||
        word.includes("เอีย")
    ){

        data.vowel="เอีย";

    }

    else if(
        word.includes("เอือ")
    ){

        data.vowel="เอือ";

    }

    else if(
        word.includes("อัว")
    ){

        data.vowel="อัว";

    }



    // --------------------------------
    // สระนำ
    // --------------------------------

    else if(
        word.includes("โ")
    ){

        data.vowel="โอ";

    }

    else if(
        word.includes("เ")
    ){

        data.vowel="เอ";

    }

    else if(
        word.includes("แ")
    ){

        data.vowel="แอ";

    }

    else if(
        word.includes("ไ") ||
        word.includes("ใ")
    ){

        data.vowel="ไอ";

    }



    // --------------------------------
    // สระปกติ
    // --------------------------------

    else if(word.includes("ู")){

        data.vowel="อู";

    }

    else if(word.includes("ี")){

        data.vowel="อี";

    }

    else if(word.includes("า")){

        data.vowel="อา";

    }

    else if(
        word.includes("ุ") ||
        word.includes("ิ") ||
        word.includes("ั")
    ){

        data.vowel="สั้น";
        data.short=true;

    }

    else{

        // สระอะไม่เขียนรูป

        data.vowel="สั้น";
        data.short=true;

    }



    return data;

}



// -------------------------------------
// สร้างพยางค์แรก
// -------------------------------------

function buildFirst(data){


    let initial =
        (data.initial==="ร" ||
         data.initial==="ล")
        ?
        "ซ"
        :
        "ล";



    switch(data.vowel){


        case "เอีย":

            return initial+"เอีย";


        case "เอือ":

            return initial+"เอือ";


        case "อัว":

            return initial+"อัว";


        case "โอ":

            return "โ"+initial;


        case "เอ":

            return "เ"+initial;


        case "แอ":

            return "แ"+initial;


        case "ไอ":

            return "ไ"+initial;



        case "อา":

            return initial+"า";



        case "อี":

            return initial+"ี";



        case "อู":

            return initial+"ู";



        default:

            return initial;

    }

}



// -------------------------------------
// สร้างพยางค์สอง
// -------------------------------------

function buildSecond(data){


    let result =
        data.initial;



    if(data.short){

        result+="ุ";

    }
    else{

        result+="ู";

    }



    if(data.final){

        result+=data.final;

    }


    return result;

}



// -------------------------------------
// แปลง 1 พยางค์
// -------------------------------------

function translateSyllable(word){


    let data =
        parseThaiSyllable(word);



    return (
        buildFirst(data)
        +
        buildSecond(data)
    );

}



// -------------------------------------
// แปลคำ
// -------------------------------------

function translateWord(word){


    return splitSyllables(word)

    .map(
        s=>translateSyllable(s)
    )

    .join(" ");

}



// -------------------------------------
// แปลข้อความ
// -------------------------------------

function translateLuuText(text){


    return text

    .trim()

    .split(/\s+/)

    .map(
        w=>translateWord(w)
    )

    .join(" ");

}
