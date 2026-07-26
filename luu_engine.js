// =====================================
// Luu Engine V0.8
// Rebuild syllable correctly
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



// =====================================
// วิเคราะห์พยางค์
// =====================================

function parseThaiSyllable(word){

    let data = {

        initial:"",
        vowel:"",
        final:"",
        short:false

    };


    // พยัญชนะต้น

    const initials = [
        "กร","กล","กว",
        "คร","คล","คว",
        "ตร",
        "ปร","ปล",
        "พร","พล",
        "ก","ข","ค","ง",
        "จ","ช","ซ",
        "ด","ต","ถ",
        "ท","น",
        "บ","ป","ผ",
        "พ","ฟ",
        "ม","ย",
        "ร","ล",
        "ว","ส","ห"
    ];


    for(let i of initials){

        if(word.startsWith(i)){

            data.initial=i;
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
        "ย",
        "ว"
    ];


    for(let f of finals){

        if(
            word.endsWith(f)
            &&
            word.length>1
        ){

            data.final=f;

        }

    }



    // ตัดตัวสะกดออกเพื่อดูสระ

    let body = word;

    if(data.final){

        body =
        word.substring(
            0,
            word.length-1
        );

    }



    // สระประสม

    if(
        body.includes("เปีย")
        ||
        body.includes("เอีย")
    ){

        data.vowel="เอีย";

    }

    else if(body.includes("เอือ")){

        data.vowel="เอือ";

    }

    else if(body.includes("อัว")){

        data.vowel="อัว";

    }


    // สระนำ

    else if(body.includes("โ")){

        data.vowel="โอ";

    }

    else if(body.includes("เ")){

        data.vowel="เอ";

    }

    else if(body.includes("แ")){

        data.vowel="แอ";

    }

    else if(
        body.includes("ไ")
        ||
        body.includes("ใ")
    ){

        data.vowel="ไอ";

    }


    // สระปกติ

    else if(body.includes("า")){

        data.vowel="อา";

    }

    else if(body.includes("ี")){

        data.vowel="อี";

    }

    else if(body.includes("ู")){

        data.vowel="อู";

    }

    else if(
        body.includes("ุ")
        ||
        body.includes("ั")
        ||
        body.includes("ิ")
    ){

        data.vowel="อุ";
        data.short=true;

    }

    else{

        data.vowel="อะ";
        data.short=true;

    }


    return data;

}



// =====================================
// สร้างพยางค์แรก
// =====================================

function buildFirst(data){

    let firstInitial;


    if(
        data.initial==="ร"
        ||
        data.initial==="ล"
    ){

        firstInitial="ซ";

    }
    else{

        firstInitial="ล";

    }



    switch(data.vowel){

        case "เอีย":
            return "เลีย";

        case "เอือ":
            return "เลือ";

        case "อัว":
            return "ลัว";

        case "โอ":
            return "โล";

        case "เอ":
            return "เล";

        case "แอ":
            return "แล";

        case "ไอ":
            return "ไล";

        case "อา":
            return firstInitial+"า";

        case "อี":
            return firstInitial+"ี";

        case "อู":
            return firstInitial+"ู";

        case "อุ":
            return firstInitial+"ุ";

        default:
            return firstInitial;

    }

}



// =====================================
// สร้างพยางค์สอง
// =====================================

function buildSecond(data){


    let second =
        data.initial;



    if(data.short){

        second += "ุ";

    }
    else{

        second += "ู";

    }



    if(data.final){

        second += data.final;

    }


    return second;

}



// =====================================
// แปลงพยางค์
// =====================================

function translateSyllable(word){

    let data =
        parseThaiSyllable(word);


    return (
        buildFirst(data)
        +
        buildSecond(data)
    );

}



// =====================================
// แปลคำ
// =====================================

function translateWord(word){

    return splitSyllables(word)

    .map(
        s=>translateSyllable(s)
    )

    .join(" ");

}



// =====================================
// แปลข้อความ
// =====================================

function translateLuuText(text){

    return text

    .trim()

    .split(/\s+/)

    .map(
        w=>translateWord(w)
    )

    .join(" ");

}
