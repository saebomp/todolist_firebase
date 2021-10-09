const firebaseConfig = {
    apiKey: "AIzaSyD5JEqRESB2z92xhbK-Oue2a4giaSv8GAU",
    authDomain: "to-do-live-dec31.firebaseapp.com",
    projectId: "to-do-live-dec31",
    storageBucket: "to-do-live-dec31.appspot.com",
    messagingSenderId: "473774381336",
    appId: "1:473774381336:web:677db1d44686b62688666d",
    measurementId: "G-YP7TN9S7FY"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();