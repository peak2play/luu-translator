// =================================
// Luu Thai Parser V1.0
// อ่านโครงสร้างพยางค์ไทย
// =================================


function parseThaiSyllable(word){


    let data = {

        word: word,

        initial:"",
        vowel:"",
        final:""

    };



    // -------------------------
    // ตัวสะกด
    // -------------------------

    const finals = [
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

            data.final = f;
            break;

        }

    }



    // -------------------------
    // พยัญชนะต้น
    // -------------------------

    const clusters = [

        "กร",
        "กล",
        "กว",

        "คร",
        "คล",
        "คว",

        "ตร",

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



    if(!data.initial){

        data.initial = word[0];

    }



    // -------------------------
    // สระประสม
    // -------------------------

    if(
        word.includes("เปีย")
        ||
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



    // -------------------------
    // สระนำ
    // -------------------------

    else if(word.includes("โ")){

        data.vowel="โอ";

    }

    else if(word.includes("แ")){

        data.vowel="แอ";

    }

    else if(word.includes("เ")){

        data.vowel="เอ";

    }

    else if(
        word.includes("ไ")
        ||
        word.includes("ใ")
    ){

        data.vowel="ไอ";

    }



    // -------------------------
    // สระปกติ
    // -------------------------

    else if(word.includes("า")){

        data.vowel="อา";

    }

    else if(word.includes("ี")){

        data.vowel="อี";

    }

    else if(word.includes("ู")){

        data.vowel="อู";

    }

    else if(word.includes("ุ")){

        data.vowel="อุ";

    }

    else if(
        word.includes("ะ")
        ||
        word.includes("ั")
    ){

        data.vowel="อะ";

    }

    else{

        data.vowel="อะ";

    }



    return data;

}



// ทดสอบ Parser

function testParser(word){

    console.log(
        parseThaiSyllable(word)
    );

}
