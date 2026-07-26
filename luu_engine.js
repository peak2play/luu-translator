// =====================================
// Luu Translator Engine V0.4
// Thai syllable structure parser
// =====================================


// ------------------------------
// พยัญชนะควบกล้ำ
// ------------------------------

const CLUSTERS = [
    "กร","กล","กว",
    "คร","คล","คว",
    "ตร",
    "ปร","ปล",
    "พร","พล",
    "ทร"
];


// ------------------------------
// สระเสียงยาว
// ------------------------------

const LONG_VOWELS = [
    "า",
    "ี",
    "ู",
    "ื",
    "อ",
    "โอ",
    "เอ",
    "แอ",
    "ไอ",
    "ใอ",
    "เอา",
    "อำ",
    "เอีย",
    "เอือ",
    "อัว"
];


// ------------------------------
// สระเสียงสั้น
// ------------------------------

const SHORT_VOWELS = [
    "ะ",
    "ั",
    "ิ",
    "ึ",
    "ุ"
];



// ------------------------------
// แยกคำเป็นพยางค์
// ------------------------------

function splitSyllables(word){


    // คำที่แยกได้แน่นอน

    const known = {

        "เปียโน":[
            "เปีย",
            "โน"
        ],

        "กะเทย":[
            "กะ",
            "เทย"
        ],

        "ตอแหล":[
            "ตอ",
            "แหล"
        ],

        "เครื่องดนตรี":[
            "เครื่อง",
            "ดน",
            "ตรี"
        ]

    };


    if(known[word]){

        return known[word];

    }


    return [word];

}



// ------------------------------
// วิเคราะห์พยางค์
// ------------------------------

function parseSyllable(word){


    let data={

        text:word,

        initial:"",

        vowel:"",

        final:"",

        tone:"",

        short:false

    };



    // วรรณยุกต์

    if(word.includes("่"))
        data.tone="่";

    if(word.includes("้"))
        data.tone="้";

    if(word.includes("๊"))
        data.tone="๊";

    if(word.includes("๋"))
        data.tone="๋";



    // พยัญชนะต้น

    for(let c of CLUSTERS){

        if(word.startsWith(c)){

            data.initial=c;

            break;

        }

    }


    if(!data.initial){

        data.initial =
            word[0];

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



    // สระ

    for(let v of LONG_VOWELS){

        if(word.includes(v)){

            data.vowel=v;
            break;

        }

    }


    if(!data.vowel){

        for(let v of SHORT_VOWELS){

            if(word.includes(v)){

                data.vowel=v;
                break;

            }

        }

    }



    // สระแฝง

    if(!data.vowel){

        data.vowel="ะ";

    }



    data.short =
        SHORT_VOWELS.includes(data.vowel)
        ||
        data.vowel==="ะ";



    return data;

}



// ------------------------------
// แทนพยัญชนะต้น
// ------------------------------

function replaceInitial(word,oldChar,newChar){


    return word.replace(
        oldChar,
        newChar
    );

}



// ------------------------------
// สร้างพยางค์ลู
// ------------------------------

function translateSyllable(word){


    let d =
        parseSyllable(word);



    let first="";
    let second="";



    // กรณี ร ล

    if(
        d.initial==="ร"
        ||
        d.initial==="ล"
    ){

        first =
            replaceInitial(
                word,
                d.initial,
                "ซ"
            );

    }

    else{

        first =
            replaceInitial(
                word,
                d.initial,
                "ล"
            );

    }



    // เลือกเสียงเติม

    let addVowel =
        d.short
        ?
        "ุ"
        :
        "ู";



    second =
        d.initial
        +
        addVowel;



    // ใส่ตัวสะกดกลับ

    if(d.final){

        second += d.final;

    }



    return first + second;

}



// ------------------------------
// แปลคำ
// ------------------------------

function translateWord(word){


    return splitSyllables(word)

        .map(
            s =>
            translateSyllable(s)
        )

        .join(" ");

}



// ------------------------------
// แปลข้อความ
// ------------------------------

function translateLuuText(text){


    return text

        .trim()

        .split(/\s+/)

        .map(
            w =>
            translateWord(w)
        )

        .join(" ");

}
