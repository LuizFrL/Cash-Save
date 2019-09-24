// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCw2DUCoUfB5R8VUrsVbTxZvghe1v8q6DE",
    authDomain: "cash-save.firebaseapp.com",
    databaseURL: "https://cash-save.firebaseio.com",
    projectId: "cash-save",
    storageBucket: "",
    messagingSenderId: "697816366797",
    appId: "1:697816366797:web:7086cff55523b9e2633384",
    measurementId: "G-MJZXVTZ7K9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        if (location.pathname == '/login.html') {
            window.location.pathname = '/index.html'

        }

        var idUsuario = user.uid

        firebase.database().ref('users/' + idUsuario).set({
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL
        });

    }
    else {
        if (location.pathname != '/login.html') {
            debugger
            window.location.pathname = '/login.html'

        }
    }
})

var login = $("#login");
login.click(function () {
    $("#spinner").toggle()
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
        $("#spinner").toggle()

    }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + '\n' + errorMessage);
        $("#spinner").toggle()

    })
});

var logout = $("#Logout");
logout.click(() => {
    firebase.auth().signOut().catch(function (error) {
        console.log(error);
    })
});