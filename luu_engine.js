// =====================================
// Luu Translator Engine V0.1
// Rule based Thai -> Luu
// =====================================


// -----------------------------
// ตารางสระ
// -----------------------------

const LONG_VOWELS = [
    "า","ี","ื","ู",
    "เอ","แอ","โอ","ออ","เออ",
    "เอีย","เอือ","อัว"
];

const SHORT_VOWELS = [
    "ะ","ิ","ึ","ุ"
];


// -----------------------------
// วิเคราะห์พยางค์แบบง่าย
// -----------------------------

function parseSyllable(word){

    let result = {
        original: word,
        initial:"",
        vowel:"",
        final:"",
        tone:""
    };


    // พยัญชนะต้น
    const consonants =
        "กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอ";


    for(let i=0;i<word.length;i++){

        if(consonants.includes(word[i])){

            result.initial = word[i];
            break;

        }

    }


    // ตัวสะกด
    const finals =
        ["ก","ง","ด","น","บ","ม","ย","ว"];

    for(let f of finals){

        if(word.endsWith(f) && f !== result.initial){

            result.final = f;

        }

    }


    // หาเสียงสระแบบง่าย

    for(let v of LONG_VOWELS){

        if(word.includes(v)){

            result.vowel = v;
            break;

        }

    }


    if(!result.vowel){

        for(let v of SHORT_VOWELS){

            if(word.includes(v)){

                result.vowel = v;
                break;

            }

        }

    }


    return result;

}


// -----------------------------
// ตรวจประเภท
// -----------------------------

function hasRL(data){

    return data.initial === "ร"
        || data.initial === "ล";

}


function hasUU(data){

    return data.vowel === "ู"
        || data.vowel === "ุ";

}


// -----------------------------
// Rule 1
// คำทั่วไป
// -----------------------------

function ruleNormal(data){

    let lu = "ล";

    let first =
        replaceInitial(
            data,
            lu
        );


    let second =
        data.initial +
        addU(data);


    return first + second;

}


// -----------------------------
// Rule 2
// มี ร ล
// -----------------------------

function ruleRL(data){

    let first =
        replaceInitial(
            data,
            "ซ"
        );


    let second =
        data.initial +
        addU(data);


    return first + second;

}


// -----------------------------
// Rule 3
// มี อุ อู
// -----------------------------

function ruleUU(data){

    let first =
        replaceInitial(
            data,
            "หล"
        );


    let second =
        data.initial +
        addI(data);


    return first + second;

}


// -----------------------------
// Rule 4
// ร ล + อุ อู
// -----------------------------

function ruleRLUU(data){

    let first =
        replaceInitial(
            data,
            "ซ"
        );


    let second =
        data.initial +
        addI(data);


    return first + second;

}


// -----------------------------
// เปลี่ยนพยัญชนะต้น
// -----------------------------

function replaceInitial(data,newInitial){

    let word=data.original;


    let index =
        word.indexOf(data.initial);


    if(index>=0){

        return (
            word.substring(0,index)
            +
            newInitial
            +
            word.substring(index+1)
        );

    }


    return newInitial + word;

}


// -----------------------------
// เติม อู
// -----------------------------

function addU(data){

    if(data.vowel==="ุ")
        return "ุ";

    return "ู";

}


// -----------------------------
// เติม อิ / อี
// -----------------------------

function addI(data){

    if(data.vowel==="ู")
        return "ี";

    return "ิ";

}


// -----------------------------
// แปล 1 พยางค์
// -----------------------------

function translateSyllable(word){

    const data =
        parseSyllable(word);


    let rule;


    if(hasRL(data) && hasUU(data)){

        rule = 4;

    }
    else if(hasUU(data)){

        rule = 3;

    }
    else if(hasRL(data)){

        rule = 2;

    }
    else{

        rule = 1;

    }



    switch(rule){

        case 1:
            return ruleNormal(data);

        case 2:
            return ruleRL(data);

        case 3:
            return ruleUU(data);

        case 4:
            return ruleRLUU(data);

    }

}


// -----------------------------
// แปลข้อความ
// -----------------------------

function translateLuuText(text){

    let words =
        text.trim().split(/\s+/);


    return words
        .map(word=>translateSyllable(word))
        .join(" ");

}
