// =====================================
// Luu Translator Engine V0.3
// Add syllable splitter
// =====================================


// -------------------------
// รายการพยางค์พื้นฐาน
// -------------------------

const KNOWN_SPLITS = {

    "เปียโน": ["เปีย","โน"],

    "กะเทย": ["กะ","เทย"],

    "เครื่องดนตรี": [
        "เครื่อง",
        "ดน",
        "ตรี"
    ],

    "ปลาทอง":[
        "ปลา",
        "ทอง"
    ]

};


// -------------------------
// แยกคำเป็นพยางค์
// -------------------------

function splitSyllables(word){


    if(KNOWN_SPLITS[word]){

        return KNOWN_SPLITS[word];

    }


    // เบื้องต้น
    // ถ้าไม่มีข้อมูล ให้ถือว่า 1 พยางค์

    return [word];

}



// -------------------------
// วิเคราะห์พยางค์
// -------------------------

function analyzeSyllable(word){


    let data={

        word:word,

        initial:"",

        vowel:"",

        final:"",

        short:false

    };


    const consonants =
    "กขคฆงจชซญฎฏฐฑฒณดตถทธนบปผพฟภมยรลวศษสห";


    for(let c of word){

        if(consonants.includes(c)){

            data.initial=c;
            break;

        }

    }


    // สระ

    if(word.includes("ู")){

        data.vowel="ู";

    }
    else if(word.includes("ุ")){

        data.vowel="ุ";

    }
    else if(
        word.includes("ี") ||
        word.includes("า") ||
        word.includes("เ") ||
        word.includes("แ") ||
        word.includes("โอ")
    ){

        data.vowel="long";

    }
    else{

        // สระแฝง
        data.vowel="ะ";

        data.short=true;

    }



    return data;

}



// -------------------------
// สร้างภาษาลู
// -------------------------

function translateSyllable(word){


    let d =
        analyzeSyllable(word);



    let first="";
    let second="";


    // ร ล

    if(
        d.initial==="ร" ||
        d.initial==="ล"
    ){

        first =
            word.replace(
                d.initial,
                "ซ"
            );

    }

    else{

        first =
            word.replace(
                d.initial,
                "ล"
            );

    }



    // คำเสียงสั้น

    if(d.short){

        second =
            d.initial+"ุ";

    }

    else{

        second =
            d.initial+"ู";

    }



    return first + second;

}



// -------------------------
// แปลคำ
// -------------------------

function translateWord(word){


    let syllables =
        splitSyllables(word);



    return syllables

        .map(s =>
            translateSyllable(s)
        )

        .join(" ");


}



// -------------------------
// แปลข้อความ
// -------------------------

function translateLuuText(text){


    return text

        .trim()

        .split(/\s+/)

        .map(word =>
            translateWord(word)
        )

        .join(" ");


}
