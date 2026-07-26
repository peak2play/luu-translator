// ======================================
// Thai Syllable Analyzer
// Version 1.0
// ======================================


// กลุ่มสระไทย

const thaiVowels = [

    "เอีย",
    "เอือ",
    "อัว",

    "า",
    "อี",
    "อือ",
    "อู",

    "เอ",
    "แอ",
    "โอ",
    "ออ",
    "เออ",

    "ะ",
    "ิ",
    "ึ",
    "ุ",

    "เ",
    "แ"

];



// ตัวสะกดที่พบบ่อย

const thaiFinals = [

    "ก",
    "ข",
    "ค",

    "ง",

    "จ",
    "ช",
    "ซ",

    "ด",
    "ต",
    "ถ",
    "ท",

    "น",

    "บ",
    "ป",
    "พ",

    "ม",

    "ย",
    "ว"

];




// ======================================
// วิเคราะห์พยางค์
// ======================================


function analyzeSyllable(word){


    let result = {

        original: word,

        initial: "",

        vowel: "",

        final: "",

        tone: "",

        short: false,

        long: false

    };



    if(!word){

        return result;

    }





    // หา พยัญชนะต้น

    result.initial =
        word.charAt(0);





    // หา สระ

    for(
        let v of thaiVowels
    ){

        if(
            word.includes(v)
        ){

            result.vowel = v;

            break;

        }

    }





    // หา ตัวสะกด

    for(
        let f of thaiFinals
    ){

        if(
            word.endsWith(f) &&
            word.length > 1
        ){

            result.final=f;

            break;

        }

    }






    // เช็คเสียงสั้นยาว

    result.long =
        isLongVowel(
            result.vowel
        );


    result.short =
        !result.long;



    return result;


}






// ======================================
// ตรวจสระยาว
// ======================================


function isLongVowel(vowel){


    const long = [

        "า",
        "อี",
        "อือ",
        "อู",

        "เอ",
        "แอ",
        "โอ",
        "ออ",
        "เออ",

        "เอีย",
        "เอือ",
        "อัว"

    ];



    return long.includes(vowel);


}






// ======================================
// แยกคำหลายพยางค์เบื้องต้น
// ======================================


function splitThaiWord(word){


    /*
    
    Version แรก:
    คืนค่าเป็นคำเดียวก่อน

    Version ต่อไป:
    จะเพิ่ม Dictionary
    ตำแหน่งตัดเสียง
    และ Pattern ภาษาไทย

    */


    return [
        analyzeSyllable(word)
    ];

}
