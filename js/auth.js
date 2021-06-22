container_Login.addEventListener('submit', e => {
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            alert(errorMessage)
                // buttonsDiv.innerHTML += /*html*/ `<span class="badge badge-danger"> ${errorMessage} </span>`
        });
})

firebase.auth().onAuthStateChanged(user => {
    if (user) {

        container_Login.classList.add("visually-hidden")
        container_media.classList.remove('visually-hidden')
        container_new_media.classList.remove('visually-hidden')
        header.classList.remove('visually-hidden')
        logout_session()
        save_media(user.uid)
        media_player(user.uid)


    } else {

        container_Login.classList.remove("visually-hidden")
        header.classList.add('visually-hidden')
        container_media.classList.add('visually-hidden')
        container_new_media.classList.add('visually-hidden')
    }
})

const show_hidden_SignUp = () => {
    sign_Up.addEventListener('click', e => {
        container_Register.classList.remove('visually-hidden')
    })
    close_sign.addEventListener('click', e => {
        close_sign.href = container_Login.querySelector('#container_login')
        container_Register.classList.add('visually-hidden')

    })
}

show_hidden_SignUp()


const logout_session = () => {
    logout.addEventListener('click', e => {

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Sign-out successful');
        }).catch((error) => {
            // An error happened.
        });

    })
}