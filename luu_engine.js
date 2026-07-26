// =====================================
// Luu Engine V1.1
// Basic Thai -> Luu Translator
// =====================================


// แยกพยางค์ที่จำเป็น
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
// อ่านพยางค์ไทย
// =====================================

function parseThaiSyllable(word){

    let data={

        initial:"",
        vowel:"",
        final:""

    };


    // ตัวสะกด

    const finals=[
        "ก","ง","ด","น",
        "บ","ม","ย","ว"
    ];


    for(let f of finals){

        if(word.endsWith(f)
        && word.length>1){

            data.final=f;
            break;

        }

    }



    // พยัญชนะต้น
    // เช็กควบกล้ำก่อน

    const clusters=[
        "กร","กล","กว",
        "คร","คล","คว",
        "ตร",
        "ปร","ปล",
        "พร","พล"
    ];


    for(let c of clusters){

        if(word.includes(c)){

            data.initial=c;
            break;

        }

    }



    // ถ้าเป็นสระนำ ให้หาพยัญชนะหลังสระ

    if(data.initial===""){

        let chars=[...word];

        for(let ch of chars){

            if(
                "กขคงจชซดตทนบปผพฟมยรลวสห".includes(ch)
            ){

                data.initial=ch;
                break;

            }

        }

    }



    // สระ

    if(
        word.includes("เอีย")
        ||
        word.includes("เปีย")
    ){

        data.vowel="เอีย";

    }

    else if(word.includes("เอือ")){

        data.vowel="เอือ";

    }

    else if(word.includes("อัว")){

        data.vowel="อัว";

    }

    else if(word.includes("โ")){

        data.vowel="โอ";

    }

    else if(word.includes("แ")){

        data.vowel="แอ";

    }

    else if(word.includes("เอย")){

        data.vowel="เอย";

    }

    else if(word.includes("เ")){

        data.vowel="เอ";

    }

    else if(word.includes("า")){

        data.vowel="อา";

    }

    else if(word.includes("ี")){

        data.vowel="อี";

    }

    else if(word.includes("ู")){

        data.vowel="อู";

    }

    else if(
        word.includes("ุ")
        ||
        word.includes("ะ")
        ||
        word.includes("ั")
    ){

        data.vowel="สั้น";

    }

    else{

        data.vowel="สั้น";

    }



    return data;

}



// =====================================
// สร้างภาษูลู
// =====================================

function buildLuu(data){


    let first="";
    let second="";



    // พยัญชนะ ร ล ใช้ ซ

    let luuInitial =
        (
            data.initial==="ร"
            ||
            data.initial==="ล"
        )
        ?
        "ซ"
        :
        "ล";



    // ----- พยางค์แรก -----

    switch(data.vowel){

        case "เอีย":
            first="เลีย";
            second=data.initial+"ปู";
            break;


        case "โอ":
            first="โล";
            second=data.initial+"นู";
            break;


        case "แอ":
            first="แล";
            second=data.initial+"วู";
            break;


        case "เอย":
            first="เลย";
            second=data.initial+"ทุย";
            break;


        case "สั้น":

            first=
                luuInitial
                +
                (data.final || "");

            second=
                data.initial
                +
                "ุ"
                +
                (data.final || "");

            break;


        default:

            first=
                luuInitial;

            second=
                data.initial+"ู";

    }


    return first + second;

}



// =====================================
// แปลพยางค์
// =====================================

function translateSyllable(word){

    let data =
        parseThaiSyllable(word);


    return buildLuu(data);

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
