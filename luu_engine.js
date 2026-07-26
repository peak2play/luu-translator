// =====================================
// Luu Engine V0.5
// Build syllable instead of replace text
// =====================================


// ----------------------------
// วิเคราะห์พยางค์พื้นฐาน
// ----------------------------

function parseThaiSyllable(word){

    let result = {
        original: word,
        initial: "",
        vowel: "",
        final: "",
        short: false
    };


    const initials =
    [
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

            result.initial = i;
            break;

        }

    }



    // สระนำ

    if(word.includes("เอีย")){

        result.vowel="เอีย";

    }
    else if(word.includes("เอือ")){

        result.vowel="เอือ";

    }
    else if(word.includes("อู")){

        result.vowel="อู";

    }
    else if(word.includes("ู")){

        result.vowel="อู";

    }
    else if(word.includes("ี")){

        result.vowel="อี";

    }
    else if(word.includes("า")){

        result.vowel="อา";

    }
    else if(word.includes("เ")){

        result.vowel="เอ";

    }
    else if(word.includes("แ")){

        result.vowel="แอ";

    }
    else if(word.includes("โ")){

        result.vowel="โอ";

    }
    else if(
        word.includes("ะ") ||
        word.includes("ั") ||
        word.includes("ิ") ||
        word.includes("ุ")
    ){

        result.vowel="สั้น";
        result.short=true;

    }
    else{

        // สระอะโดยไม่เขียน
        result.vowel="สั้น";
        result.short=true;

    }



    // ตัวสะกด

    const finals =
    [
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

            result.final=f;

        }

    }


    return result;

}




// ----------------------------
// สร้างพยางค์ลู
// ----------------------------

function buildLuu(syl){

    let p =
        parseThaiSyllable(syl);


    let firstInitial =
        p.initial;


    let luuInitial =
        (p.initial==="ร" ||
         p.initial==="ล")
        ?
        "ซ"
        :
        "ล";



    // พยางค์แรก

    let first =
        luuInitial
        +
        syl.substring(
            p.initial.length
        );



    // พยางค์ที่สอง

    let second =
        firstInitial;



    if(p.short){

        second += "ุ";

    }
    else{

        second += "ู";

    }



    if(p.final){

        second += p.final;

    }


    return first + second;

}




// ----------------------------
// แยกพยางค์
// ----------------------------

function splitSyllables(word){


    const dictionary = {

        "กะเทย":
        [
            "กะ",
            "เทย"
        ],

        "เปียโน":
        [
            "เปีย",
            "โน"
        ]

    };


    if(dictionary[word]){

        return dictionary[word];

    }


    return [word];

}



// ----------------------------
// แปลคำ
// ----------------------------

function translateWord(word){

    return splitSyllables(word)

    .map(
        x=>buildLuu(x)
    )

    .join(" ");

}



// ----------------------------
// แปลข้อความ
// ----------------------------

function translateLuuText(text){

    return text

    .split(/\s+/)

    .map(
        word=>translateWord(word)
    )

    .join(" ");

}
