// ======================================
// Luu Translator
// App Engine Version 4.0
// ======================================


let luuRules = [];




// โหลดกฎ

async function loadRules(){

    try {

        const response =
            await fetch(
                "data/luu_structure.json"
            );


        const data =
            await response.json();


        luuRules =
            data.rules.sort(
                (a,b)=>
                a.priority - b.priority
            );


        console.log(
            "Luu rules loaded"
        );


    } catch(error){

        console.error(
            "Cannot load rules",
            error
        );

    }

}


loadRules();





// ======================================
// แปล
// ======================================

async function translateLuu(){


    if(luuRules.length === 0){

        await loadRules();

    }



    const input =
        document
        .getElementById("thaiInput")
        .value
        .trim();



    if(!input){

        document
        .getElementById("result")
        .innerText="";

        return;

    }



    const output =
        translateSentence(input);



    document
    .getElementById("result")
    .innerText =
    output;


}







// ======================================
// ประโยค
// ======================================

function translateSentence(text){


    const words =
        text.split(/\s+/);



    return words
    .map(
        word =>
        translateWord(word)
    )
    .join(" ");


}








// ======================================
// คำ
// ======================================

function translateWord(word){



    const syllables =
        splitThaiWord(word);



    return syllables
    .map(
        s =>
        translateSyllable(s)
    )
    .join(" ");


}








// ======================================
// พยางค์
// ======================================

function translateSyllable(syllable){



    const pronunciation =
        analyzePronunciation(
            syllable
        );



    const info =
        analyzeSyllable(
            syllable
        );




    // ใช้เสียงจริงช่วยตรวจ

    if(
        pronunciation.hasLeading
    ){

        info.initial =
            pronunciation.soundInitial;

    }





    const rule =
        selectRule(info);



    if(!rule){

        return syllable;

    }



    return createLuu(
        info,
        rule
    );


}







// ======================================
// เลือกกฎ
// ======================================

function selectRule(info){


    for(
        const rule of luuRules
    ){

        const c =
            rule.condition;



        if(
            c.has_rl &&
            c.has_u_vowel &&
            info.hasRL &&
            info.hasU
        ){

            return rule;

        }



        if(
            c.has_u_vowel &&
            info.hasU
        ){

            return rule;

        }



        if(
            c.has_rl &&
            info.hasRL
        ){

            return rule;

        }



        if(
            c.default
        ){

            return rule;

        }

    }


    return null;


}








// ======================================
// สร้างภาษาลู
// ======================================

function createLuu(info,rule){



    const original =
        info.original;



    const oldInitial =
        info.initial;



    const rest =
        original.substring(1);



    const firstPart =
        rule.transform.replace_initial
        +
        rest;



    const addVowel =
        info.long
        ?
        rule.transform.added_vowel.long
        :
        rule.transform.added_vowel.short;



    const secondPart =
        oldInitial
        +
        addVowel
        +
        info.final;



    return firstPart + secondPart;


}







// ======================================
// Paste
// ======================================

async function pasteText(){

    const text =
        await navigator.clipboard
        .readText();


    document
    .getElementById("thaiInput")
    .value = text;

}







// ======================================
// Clear
// ======================================

function clearText(){

    document
    .getElementById("thaiInput")
    .value="";


    document
    .getElementById("result")
    .innerText="";

}







// ======================================
// Copy
// ======================================

function copyResult(){


    const text =
        document
        .getElementById("result")
        .innerText;



    navigator.clipboard
    .writeText(text);


}
