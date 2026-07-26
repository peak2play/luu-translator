// ======================================
// Luu Translator
// App Engine Version 3.0
// ======================================


let luuRules = [];




// ======================================
// Load Rule
// ======================================

async function loadRules(){

    try{

        const response =
            await fetch(
                "data/luu_structure.json"
            );


        const data =
            await response.json();


        luuRules =
            data.rules.sort(
                (a,b)=>
                a.priority-b.priority
            );


        console.log(
            "Luu Rule Loaded"
        );


    }

    catch(error){

        console.error(
            error
        );

    }

}



loadRules();







// ======================================
// Translate Button
// ======================================

async function translateLuu(){


    if(
        luuRules.length===0
    ){

        await loadRules();

    }



    let text =
        document
        .getElementById("thaiInput")
        .value
        .trim();



    if(!text){

        document
        .getElementById("result")
        .innerText="";

        return;

    }



    let result =
        translateSentence(text);



    document
    .getElementById("result")
    .innerText=result;


}








// ======================================
// Translate Sentence
// ======================================


function translateSentence(sentence){


    let words =
        sentence.split(/\s+/);



    return words
    .map(
        word =>
        translateWord(word)
    )
    .join(" ");


}








// ======================================
// Translate Word
// ======================================


function translateWord(word){



    let syllables =
        splitThaiWord(word);



    return syllables
    .map(
        syllable =>
        translateSyllable(syllable)
    )
    .join(" ");


}








// ======================================
// Translate Syllable
// ======================================


function translateSyllable(syllable){


    let info =
        analyzeSyllable(
            syllable
        );



    let rule =
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
// Select Rule
// ======================================


function selectRule(info){



    for(
        let rule of luuRules
    ){



        let c =
            rule.condition;





        // ร ล + อุ อู

        if(

            c.has_rl &&
            c.has_u_vowel &&
            info.hasRL &&
            info.hasU

        ){

            return rule;

        }





        // อุ อู

        if(

            c.has_u_vowel &&
            info.hasU

        ){

            return rule;

        }





        // ร ล

        if(

            c.has_rl &&
            info.hasRL

        ){

            return rule;

        }





        // default

        if(
            c.default
        ){

            return rule;

        }


    }



    return null;


}








// ======================================
// Create Luu Word
// ======================================


function createLuu(info,rule){



    let original =
        info.original;



    let first =
        info.initial;



    let remaining =
        original.substring(1);





    // พยางค์แรก

    let firstPart =
        rule.transform.replace_initial
        +
        remaining;





    // พยางค์สอง

    let vowel =
        getAddedVowel(
            info,
            rule
        );





    let secondPart =
        first
        +
        vowel
        +
        info.final;





    return firstPart + secondPart;


}








// ======================================
// Added Vowel
// ======================================


function getAddedVowel(info,rule){


    if(info.long){

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








// ======================================
// Paste
// ======================================


async function pasteText(){


    let text =
        await navigator
        .clipboard
        .readText();



    document
    .getElementById("thaiInput")
    .value=text;


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


    let text =
        document
        .getElementById("result")
        .innerText;



    navigator
    .clipboard
    .writeText(text);


}
