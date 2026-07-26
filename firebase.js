import { initializeApp } 
from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getFirestore

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



const firebaseConfig = {


apiKey:"ใส่ของคุณพี่",

authDomain:"ใส่ของคุณพี่",

projectId:"ใส่ของคุณพี่"


};



const app =
initializeApp(firebaseConfig);



const db =
getFirestore(app);



export { db };