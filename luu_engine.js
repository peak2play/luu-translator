// =====================================
// Luu Engine V1.2
// Basic Luu Translator
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
        ]

    };

    return known[word] || [word];

}



// =====================================
// Thai Parser
// =====================================

function parseThaiSyllable(word){


    let data={

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



    // พยัญชนะต้น

    const clusters=[
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
        "พล"
    ];


    for(let c of clusters){

        if(word.startsWith(c)){

            data.initial=c;
            break;

        }

    }


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

    else if(word.includes("โอ")){

        data.vowel="โอ";

    }

    else if(word.includes("แอ")){

        data.vowel="แอ";

    }

    else if(word.includes("เอย")
    ){

        data.vowel="เอย";

    }

    else if(word.includes("เอ")){

        data.vowel="เอ";

    }

    else if(word.includes("อา")){

        data.vowel="อา";

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



// =====================================
// สร้างพยางค์แรก
// =====================================

function makeFirst(data){


    let initial =
        (
            data.initial==="ร"
            ||
            data.initial==="ล"
        )
        ?
        "ซ"
        :
        "ล";



    switch(data.vowel){


        case "เอีย":

            return "เลีย";


        case "โอ":

            return "โล";


        case "แอ":

            return "แล";


        case "เอ":

            return "เล";


        case "อา":

            return initial+"า"+(data.final||"");


        case "อะ":

            return initial+"ะ"+(data.final||"");


        default:

            return initial;

    }

}



// =====================================
// สร้างพยางค์สอง
// =====================================

function makeSecond(data){


    let result=data.initial;



    switch(data.vowel){


        case "เอีย":

            result += "ู";

            break;


        case "โอ":

            result += "ู";

            break;


        case "เอ":

            result += "ุ";

            break;


        case "อะ":

            result += "ุ";

            break;


        default:

            result += "ู";

    }



    if(data.final){

        result += data.final;

    }


    return result;

}



// =====================================
// แปล 1 พยางค์
// =====================================

function translateSyllable(word){


    let data=parseThaiSyllable(word);


    return (
        makeFirst(data)
        +
        makeSecond(data)
    );

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
