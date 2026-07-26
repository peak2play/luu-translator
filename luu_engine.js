// =====================================
// Luu Engine Debug Parser V0.9
// Thai syllable analyzer
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
        ],

        "ตอแหล":[
            "ตอ",
            "แหล"
        ]

    };


    return known[word] || [word];

}



// =====================================
// วิเคราะห์พยางค์ไทย
// =====================================

function parseThaiSyllable(word){


    let data = {

        word: word,

        initial:"",
        vowel:"",
        final:""

    };



    // ตัวสะกดก่อน

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

            data.final=f;
            break;

        }

    }



    // พยัญชนะต้น

    const initials=[

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
        "พล",

        "ก",
        "ข",
        "ค",
        "ง",
        "จ",
        "ช",
        "ซ",
        "ด",
        "ต",
        "ท",
        "น",
        "บ",
        "ป",
        "ผ",
        "พ",
        "ฟ",
        "ม",
        "ย",
        "ร",
        "ล",
        "ว",
        "ส",
        "ห"

    ];


    for(let i of initials){

        if(word.startsWith(i)){

            data.initial=i;
            break;

        }

    }



    // สระประสม

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



    // สระนำ

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



    // สระปกติ

    else if(
        word.includes("า")
    ){

        data.vowel="อา";

    }

    else if(
        word.includes("ี")
    ){

        data.vowel="อี";

    }

    else if(
        word.includes("ู")
    ){

        data.vowel="อู";

    }

    else if(
        word.includes("ุ")
    ){

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



// =====================================
// Debug output
// =====================================

function debugWord(word){

    let result=[];


    let syllables =
        splitSyllables(word);


    syllables.forEach(s=>{

        result.push(
            parseThaiSyllable(s)
        );

    });


    return JSON.stringify(
        result,
        null,
        2
    );

}



// =====================================
// ระบบแปล (พักไว้ก่อน)
// =====================================

function translateLuuText(text){

    return debugWord(text);

}
