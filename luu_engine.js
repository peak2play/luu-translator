// =====================================
// Luu Engine V0.6
// Rebuild syllable output
// =====================================


// ----------------------
// แยกพยางค์
// ----------------------

function splitSyllables(word){

    const known = {

        "กะเทย":[
            "กะ",
            "เทย"
        ],

        "เปียโน":[
            "เปีย",
            "โน"
        ]

    };


    return known[word] || [word];

}



// ----------------------
// วิเคราะห์พยางค์
// ----------------------

function parseThaiSyllable(word){


    let data={

        initial:"",
        vowel:"",
        final:""

    };


    // ควบกล้ำ
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



    // สระ

    if(word.includes("เอีย")){

        data.vowel="เอีย";

    }
    else if(word.includes("ี")){

        data.vowel="อี";

    }
    else if(word.includes("า")){

        data.vowel="อา";

    }
    else if(word.includes("โ")){

        data.vowel="โอ";

    }
    else if(word.includes("เ")){

        data.vowel="เอ";

    }
    else if(word.includes("แ")){

        data.vowel="แอ";

    }
    else if(word.includes("ไ") ||
            word.includes("ใ")){

        data.vowel="ไอ";

    }
    else if(word.includes("ู")){

        data.vowel="อู";

    }
    else if(word.includes("ุ")){

        data.vowel="อุ";

    }
    else if(word.includes("ะ") ||
            word.includes("ั")){

        data.vowel="อะ";

    }
    else{

        data.vowel="อะ";

    }



    // ตัวสะกด

    const finals=[
        "ก","ง","ด",
        "น","บ","ม",
        "ย","ว"
    ];


    for(let f of finals){

        if(
            word.endsWith(f)
            &&
            !word.startsWith(f)
        ){

            data.final=f;

        }

    }


    return data;

}



// ----------------------
// สร้างคำลู
// ----------------------

function buildLuu(word){


    let d=parseThaiSyllable(word);


    let luInitial =
        (d.initial==="ร" ||
         d.initial==="ล")
        ?
        "ซ"
        :
        "ล";



    // พยางค์แรก
    let first="";



    // สระนำ

    if(
        d.vowel==="เอีย"
    ){

        first =
            luInitial
            +
            "ีย";

    }
    else if(
        d.vowel==="โอ"
    ){

        first =
            luInitial
            +
            "โอ";

    }
    else if(
        d.vowel==="เอ"
    ){

        first =
            "เ"
            +
            luInitial;

    }
    else{

        first =
            luInitial
            +
            getVowel(word);

    }



    // พยางค์สอง

    let second =
        d.initial;



    if(
        d.vowel==="อะ"
    ){

        second+="ุ";

    }
    else{

        second+="ู";

    }



    if(d.final){

        second+=d.final;

    }



    return first+second;

}



// ----------------------
// ดึงรูปสระ
// ----------------------

function getVowel(word){

    if(word.includes("า"))
        return "า";

    if(word.includes("ี"))
        return "ี";

    if(word.includes("ู"))
        return "ู";

    return "";

}



// ----------------------
// แปลคำ
// ----------------------

function translateWord(word){

    return splitSyllables(word)

    .map(
        x=>buildLuu(x)
    )

    .join(" ");

}



// ----------------------
// แปลข้อความ
// ----------------------

function translateLuuText(text){

    return text
    .trim()
    .split(/\s+/)
    .map(
        w=>translateWord(w)
    )
    .join(" ");

}
