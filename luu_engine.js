// =====================================
// Luu Engine V1.0
// Thai Parser + Debug Mode
// =====================================


// -----------------------------
// แยกพยางค์
// -----------------------------

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



// -----------------------------
// อ่านโครงสร้างพยางค์
// -----------------------------

function parseThaiSyllable(word){


    let data={

        word:word,
        initial:"",
        vowel:"",
        final:""

    };


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
            break;

        }

    }



    // พยัญชนะต้นควบ

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




    // สระประสม

    if(
        word.includes("เอีย")
        ||
        word.includes("เปีย")
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



    // สระปกติ

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



// -----------------------------
// Debug
// -----------------------------

function debugParser(text){


    return text

    .trim()

    .split(/\s+/)

    .map(word=>{

        let syllables =
            splitSyllables(word);


        return syllables.map(s=>{

            return parseThaiSyllable(s);

        });

    });


}



// -----------------------------
// ฟังก์ชันหลักที่ app.js เรียก
// -----------------------------

function translateLuuText(text){


    // ตอนนี้คืนค่า Debug ก่อน

    return JSON.stringify(
        debugParser(text),
        null,
        2
    );

}
