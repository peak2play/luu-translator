// ======================================
// Thai Syllable Analyzer
// Version 2.0
// ======================================


// คำช่วยสำหรับแยกพยางค์หลายพยางค์
const commonSyllablePatterns = [

    "กะเทย",
    "วันนี้",
    "ปลาทอง",
    "เครื่องดนตรี",
    "สมุดหนังสือ",
    "ขอบใจ",
    "เก่งมาก",
    "กล้ามาก",
    "รักนะ",
    "ไม่บอก",
    "อยากได้",
    "กำลังไป"

];




// สระไทย
const thaiVowels = [

    "เอีย",
    "เอือ",
    "อัว",

    "อา",
    "อี",
    "อือ",
    "อู",

    "เอ",
    "แอ",
    "โอ",
    "ออ",
    "เออ",

    "อะ",
    "อิ",
    "อึ",
    "อุ",

    "เ",
    "แ"

];




// ตัวสะกด
const thaiFinals = [

    "ก",
    "ข",
    "ค",

    "ง",

    "ด",
    "ต",
    "ท",

    "น",

    "บ",
    "ป",

    "ม",

    "ย",
    "ว"

];




// ======================================
// แยกคำไทยเป็นพยางค์
// ======================================

function splitThaiWord(word){


    // ถ้ามี pattern ที่รู้จัก

    for(
        let pattern of commonSyllablePatterns
    ){

        if(word === pattern){

            return manualSplit(word);

        }

    }



    // ถ้าไม่รู้จัก
    // คืนเป็น 1 พยางค์ก่อน

    return [
        word
    ];

}



// ======================================
// ตารางคำหลายพยางค์พื้นฐาน
// ======================================

function manualSplit(word){


    const table = {


        "กะเทย":
        [
            "กะ",
            "เทย"
        ],


        "วันนี้":
        [
            "วัน",
            "นี้"
        ],


        "ปลาทอง":
        [
            "ปลา",
            "ทอง"
        ],


        "เครื่องดนตรี":
        [
            "เครื่อง",
            "ดน",
            "ตรี"
        ],


        "สมุดหนังสือ":
        [
            "สะ",
            "หมุด",
            "หนัง",
            "สือ"
        ],


        "ขอบใจ":
        [
            "ขอบ",
            "ใจ"
        ],


        "เก่งมาก":
        [
            "เก่ง",
            "มาก"
        ],


        "กล้ามาก":
        [
            "กล้า",
            "มาก"
        ],


        "รักนะ":
        [
            "รัก",
            "นะ"
        ],


        "ไม่บอก":
        [
            "ไม่",
            "บอก"
        ],


        "อยากได้":
        [
            "อยาก",
            "ได้"
        ],


        "กำลังไป":
        [
            "กำ",
            "ลัง",
            "ไป"
        ]

    };


    return table[word] || [word];


}




// ======================================
// วิเคราะห์พยางค์
// ======================================

function analyzeSyllable(syllable){


    let data = {

        original:
        syllable,

        initial:
        "",

        vowel:
        "",

        final:
        "",

        long:
        false,

        short:
        false,

        hasRL:
        false,

        hasU:
        false

    };



    data.initial =
        syllable.charAt(0);




    for(
        let v of thaiVowels
    ){

        if(
            syllable.includes(v)
        ){

            data.vowel=v;

            break;

        }

    }




    for(
        let f of thaiFinals
    ){

        if(
            syllable.endsWith(f)
        ){

            data.final=f;

            break;

        }

    }




    data.hasRL =
        /[รล]/.test(
            syllable
        );



    data.hasU =
        /[ุู]/.test(
            syllable
        );



    data.long =
        isLongVowel(
            data.vowel
        );


    data.short =
        !data.long;



    return data;


}






function isLongVowel(vowel){


    return [

        "อา",
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

    ].includes(vowel);


}
