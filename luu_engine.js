// =====================================
// Luu Translator Engine V0.2
// Parser based
// =====================================


// -------------------------
// ค่าพื้นฐาน
// -------------------------

const CLUSTERS = [
    "กร","กล","กว",
    "ขร","ขล","ขว",
    "คร","คล","คว",
    "ตร",
    "ปร","ปล",
    "พร","พล",
    "ทร"
];


const LONG_VOWELS = [
    "า","ี","ื","ู",
    "เ","แ","โ","อ",
    "เอีย","เอือ","อัว"
];


const SHORT_VOWELS = [
    "ะ","ั","ิ","ึ","ุ"
];


// -------------------------
// แยกข้อความ
// -------------------------

function splitWords(text){

    return text
        .trim()
        .split(/\s+/);

}


// -------------------------
// วิเคราะห์คำ
// -------------------------

function analyze(word){

    let data = {

        word: word,

        initial:"",

        cluster:"",

        vowel:"",

        final:"",

        short:false

    };


    // ควบกล้ำ

    for(let c of CLUSTERS){

        if(word.startsWith(c)){

            data.cluster = c;
            data.initial = c[0];

            break;

        }

    }


    // ไม่มีควบกล้ำ

    if(!data.cluster){

        data.initial = findInitial(word);

    }



    // ตัวสะกด

    data.final = findFinal(word);



    // สระ

    data.vowel = findVowel(word);



    // สระแฝง

    if(!data.vowel){

        data.vowel = "ะ";

    }


    data.short =
        SHORT_VOWELS.includes(data.vowel)
        ||
        data.vowel==="ะ";


    return data;

}


// -------------------------
// หาพยัญชนะต้น
// -------------------------

function findInitial(word){

    const consonants =
    "กขคฆงจชซญดตถทธนบปผพฟภมยรลวศสห";


    for(let ch of word){

        if(consonants.includes(ch)){

            return ch;

        }

    }


    return "";

}


// -------------------------
// หาตัวสะกด
// -------------------------

function findFinal(word){

    const finals =
    ["ก","ง","ด","น","บ","ม","ย","ว"];


    for(let f of finals){

        if(word.endsWith(f)
        &&
        word[0]!==f){

            return f;

        }

    }


    return "";

}


// -------------------------
// หาสระ
// -------------------------

function findVowel(word){

    for(let v of LONG_VOWELS){

        if(word.includes(v)){

            return v;

        }

    }


    for(let v of SHORT_VOWELS){

        if(word.includes(v)){

            return v;

        }

    }


    return "";

}



// -------------------------
// สร้างคำลู
// -------------------------

function translateWord(word){


    const d = analyze(word);



    // Rule เบื้องต้น

    let first = "";
    let second = "";


    // มี ร ล

    if(
        d.initial==="ร"
        ||
        d.initial==="ล"
    ){

        first =
            word.replace(
                d.initial,
                "ซ"
            );


        second =
            d.initial
            +
            (d.short ? "ุ":"ู");

    }


    // ทั่วไป

    else{


        first =
            word.replace(
                d.initial,
                "ล"
            );


        second =
            d.initial
            +
            (d.short ? "ุ":"ู");

    }



    return first + second;

}



// -------------------------
// แปลข้อความ
// -------------------------

function translateLuuText(text){


    return splitWords(text)

        .map(word=>translateWord(word))

        .join(" ");

}
