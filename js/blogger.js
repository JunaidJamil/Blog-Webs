import { app, auth, db, storage } from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs, getDoc, addDoc, where, query, onSnapshot, orderBy, updateDoc, doc, deleteField, deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

// getDownloadURL(ref(storage, doc.data().email))
//   .then((url) => {

// })

function detailpage(name, email, id, url) {
  localStorage.setItem("name", JSON.stringify(name))
  localStorage.setItem("email", JSON.stringify(email))
  localStorage.setItem("id", JSON.stringify(id))
  localStorage.setItem("detailurl", JSON.stringify(url))
  window.location.href = "../pages/profile.html"
}
window.detailpage = detailpage


var name;
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
      document.getElementById("mainpostcontainer").innerHTML = ''
      querySnapshot.forEach((change) => {
        console.log(change.data(), "without user");
    
        getDownloadURL(ref(storage, change.data().email))
          .then((url) => {

            document.getElementById("mainpostcontainer").innerHTML +=
              `
                <div class="post">
                <div class="usershowinpost">
                <div>
      
                <img class="postimg" src="${url}" alt="">
              </div>
              <div>
              <h3 class="postuser" >${change.data().postname}</h3>
              <p class="postdate">${change.data().name} ${change.data().strTime} </p>
              </div>
              </div>
              <div class="postpara">
              <p id="postpara">${change.data().postdesc}</p>
              </div>
              <div class="editbtn">
              
          </div>
          <div style="display:flex; column-gap:20px; color: #7749F8;">
          <div class="delbtn" onclick="detailpage('${change.data().name}','${change.data().email}','${change.id}' , '${url}')">
          detail
          </div>
          <div/>
          
          </div>
          `
          })
          .catch((error) => {
            // Handle any errors
          });
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

  
    