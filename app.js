// =====================================
// Luu Translator App
// =====================================


// แปลภาษาไทยเป็นภาษาลู
function translateLuu(){

    const input =
        document.getElementById("thaiInput").value;


    const result =
        document.getElementById("result");


    if(!input.trim()){

        result.innerText = "";

        return;

    }


    const luu =
        translateLuuText(input);


    result.innerText = luu;

}


// Paste จาก Clipboard
async function pasteText(){

    try{

        const text =
            await navigator.clipboard.readText();


        document.getElementById("thaiInput").value = text;


    }
    catch(error){

        alert("ไม่สามารถวางข้อความได้ กรุณาอนุญาตการเข้าถึง Clipboard");

    }

}


// Clear ช่องบน
function clearText(){

    document.getElementById("thaiInput").value = "";

    document.getElementById("result").innerText = "";

}


// Copy ผลลัพธ์
async function copyResult(){

    const result =
        document.getElementById("result").innerText;


    if(!result){

        return;

    }


    try{

        await navigator.clipboard.writeText(result);

        alert("Copy แล้ว");

    }
    catch(error){

        alert("ไม่สามารถ Copy ได้");

    }

}
