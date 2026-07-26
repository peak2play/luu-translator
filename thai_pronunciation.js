// ======================================
// Thai Pronunciation Helper
// Version 1.0
// ======================================


// อักษรนำที่พบบ่อย
const leadingConsonants = {

    "หน": "น",
    "หม": "ม",
    "หง": "ง",
    "หล": "ล",
    "หว": "ว",
    "หร": "ร"

};




// ควบกล้ำ

const consonantClusters = [

    "กล",
    "กร",
    "กว",

    "ขล",
    "ขร",
    "ขว",

    "คล",
    "คร",
    "คว",

    "ปล",
    "ปร",

    "พล",
    "พร",

    "ตร"

];





// ======================================
// แปลงตัวเขียนเป็นเสียงต้น
// ======================================

function getRealInitial(word){


    if(!word){

        return "";

    }



    // เช็คอักษรนำ

    for(
        let key in leadingConsonants
    ){

        if(
            word.startsWith(key)
        ){

            return leadingConsonants[key];

        }

    }



    // เช็คควบกล้ำ

    for(
        let cluster of consonantClusters
    ){

        if(
            word.startsWith(cluster)
        ){

            return cluster;

        }

    }



    return word.charAt(0);


}







// ======================================
// ลบอักษรนำออก
// ======================================

function removeSilentLeading(word){


    for(
        let key in leadingConsonants
    ){

        if(
            word.startsWith(key)
        ){

            return word.substring(1);

        }

    }


    return word;

}






// ======================================
// วิเคราะห์เสียง
// ======================================

function analyzePronunciation(word){


    return {

        written: word,


        soundInitial:
            getRealInitial(word),


        cleaned:
            removeSilentLeading(word),


        hasCluster:
            hasCluster(word),


        hasLeading:
            hasLeading(word)


    };


}






function hasCluster(word){


    return consonantClusters
    .some(
        c =>
        word.startsWith(c)
    );


}




function hasLeading(word){


    return Object.keys(
        leadingConsonants
    )
    .some(
        c =>
        word.startsWith(c)
    );

}
