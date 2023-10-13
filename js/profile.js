import { app, auth, db, storage } from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs, getDoc, addDoc, where, query, onSnapshot, orderBy, updateDoc, doc, deleteField, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

var localstorageemail = JSON.parse(localStorage.getItem("email"))
onAuthStateChanged(auth, async (user) => {
    if(user){

        // document.getElementById("postadder").style.display = "block"
        var email = user.email
        var userss = document.getElementById("userss")
        var logout = document.getElementById("logout")
        var logout1 = document.getElementById("logout1")
        var loginmain = document.getElementById("loginmain")
        var blog = document.getElementById('blog')
        loginmain.style.display = "none"
        logout.style.display = "block"
        logout1.style.display = "block"
        userss.style.display = "block"
       blog.style.display = "block"
        const q2 = query(collection(db, "users"), where("email", "==", user.email));
        onSnapshot(q2, (querySnapshot) => {
          document.getElementById("mainpostcontainer").innerHTML = ''
          querySnapshot.forEach((doc) => {
    
            userss.innerText = doc.data().fname + " " + doc.data().lname
            // console.log(doc.data());
    
            name = doc.data().fname + " " + doc.data().lname
            logout.innerText = " logout"
    
            userss.addEventListener("click", async () => {
    
              window.location.href = "./update.html"
            })
          })
        })
      }else{
    
      }





    const q2 = query(collection(db, "posts"));
    onSnapshot(q2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // getDownloadURL(ref(storage, doc.data().email))
            // .then((url) => {
            var emailemail = JSON.parse(localStorage.getItem("email"))
            var namename = JSON.parse(localStorage.getItem("name"))
            var detailurl = JSON.parse(localStorage.getItem("detailurl"))
            document.getElementById("userpicemail").innerText = emailemail
            document.getElementById("userpicname").innerText = namename
            document.getElementById("userpicimage").src = detailurl
            var currentemail = doc.data().email
            if (currentemail == localstorageemail) {

                document.getElementById("mainpostcontainer").innerHTML +=
                    `
                <div class="post" style="width:88%;">
                <div class="usershowinpost">
    <div>

        <img class="postimg" src="${detailurl}" alt="">
    </div>
    <div>
        <h3 class="postuser" id="postnamenavigate">${doc.data().postname}</h3>
       <p class="postdate">${doc.data().name} ${doc.data().strTime} </p>
       </div>
</div>
<div class="postpara">
<p id="postpara">${doc.data().postdesc}</p>
</div>
<div class="editbtn">

</div>


</div>
`


            } else {
                console.log("no no");
            }
            // })
            // .catch((error) => {
            //   // Handle any errors
            // });             // }
        })
    })

})
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    window.location.href = "../pages/index.html"
  }).catch((error) => {
    // An error happened.
  });
})