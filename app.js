// Luu Translator
// Rule Engine Version 1.0


let luuRules = null;


// โหลดกฎภาษาลู
async function loadRules() {

    try {

        const response = await fetch("data/luu_structure.json");

        luuRules = await response.json();

        console.log("Luu rules loaded");

    } catch (error) {

        console.error(
            "Cannot load luu_structure.json",
            error
        );

    }

}


loadRules();



// ----------------------------
// ปุ่มแปล
// ----------------------------

async function translateLuu() {


    if (!luuRules) {

        await loadRules();

    }


    const input =
        document.getElementById("thaiInput")
        .value
        .trim();



    if (!input) {

        document.getElementById("result")
        .innerText = "";

        return;

    }



    const result =
        convertText(input);



    document.getElementById("result")
    .innerText = result;


}



// ----------------------------
// แปลงข้อความ
// ----------------------------

function convertText(text) {


    // แยกคำด้วยช่องว่าง

    const words =
        text.split(/\s+/);



    let output = [];



    words.forEach(word => {


        output.push(
            convertWord(word)
        );


    });



    return output.join(" ");


}



// ----------------------------
// แปลงคำ
// ----------------------------

function convertWord(word) {


    /*
        ขั้นนี้เป็น Prototype

        ต่อไปจะเพิ่ม:
        - Thai syllable analyzer
        - vowel detector
        - tone detector
        - final consonant detector
        - cluster detector

    */


    let rule =
        selectRule(word);



    if (!rule) {

        return word;

    }



    return applyRule(
        word,
        rule
    );


}



// ----------------------------
// เลือกกฎ
// ----------------------------

function selectRule(word) {


    const rules =
        luuRules.rules
        .sort(
            (a,b)=>
            a.priority-b.priority
        );



    for (let rule of rules) {


        const condition =
            rule.condition;



        // มี ร หรือ ล

        if (
            condition.has_rl &&
            /[รล]/.test(word)
        ) {

            return rule;

        }



        // มี อุ อู

        if (
            condition.has_u_vowel &&
            /[ุู]/.test(word)
        ) {

            return rule;

        }



        // default

        if (
            condition.default
        ) {

            return rule;

        }


    }



    return null;


}



// ----------------------------
// ใช้กฎสร้างคำ
// ----------------------------

function applyRule(word, rule) {


    let first =
        word.charAt(0);



    let rest =
        word.substring(1);



    let newFirst =
        rule.transform.replace_initial;



    let firstPart =
        newFirst + rest;



    let vowel =
        detectVowel(word);



    let addVowel =
        chooseAddedVowel(
            vowel,
            rule
        );



    let secondPart =
        first +
        addVowel +
        getFinal(word);



    return firstPart + secondPart;


}



// ----------------------------
// ตรวจสระ
// ----------------------------

function detectVowel(word) {


    const longVowels =
        [
            "า",
            "ี",
            "ื",
            "ู",
            "เ",
            "แ",
            "โ",
            "อ",
            "เอ",
            "เอีย",
            "เอือ"
        ];



    for(
        let v of longVowels
    ){

        if(word.includes(v)){

            return "long";

        }

    }


    return "short";


}



// ----------------------------
// เลือกสระเติม
// ----------------------------

function chooseAddedVowel(
    type,
    rule
){

    if(type==="long"){

        return rule
        .transform
        .added_vowel
        .long;

    }


    return rule
    .transform
    .added_vowel
    .short;


}



// ----------------------------
// ตัวสะกด
// ----------------------------

function getFinal(word){

    const finals =
        [
            "ก",
            "ข",
            "ค",
            "ง",
            "ด",
            "ต",
            "น",
            "ม",
            "ย",
            "ว",
            "บ",
            "ป"
        ];



    for(
        let f of finals
    ){

        if(
            word.endsWith(f)
        ){

            return f;

        }

    }


    return "";

}



// ----------------------------
// ปุ่ม Paste
// ----------------------------

async function pasteText(){

    const text =
        await navigator.clipboard.readText();


    document.getElementById("thaiInput")
    .value = text;


}



// ----------------------------
// ปุ่ม Clear
// ----------------------------

function clearText(){

    document.getElementById("thaiInput")
    .value = "";


    document.getElementById("result")
    .innerText = "";

}
