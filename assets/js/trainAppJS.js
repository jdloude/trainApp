 // Initialize Firebase
  let config = {
    apiKey: "AIzaSyDar_gReY-E40e9kwP9fLENR3lylFIg_Zc",
    authDomain: "train-app-640bf.firebaseapp.com",
    databaseURL: "https://train-app-640bf.firebaseio.com",
    projectId: "train-app-640bf",
    storageBucket: "train-app-640bf.appspot.com",
    messagingSenderId: "684841174392"
  };

firebase.initializeApp(config);

let database = firebase.database();

$('.addTrainBtn').on("click", function() {

  // take user input
  let trainName = $(".trainNameInput").val().trim();
  let destination = $(".destinationInput").val().trim();
  let firstTrain = moment($(".timeInput").val().trim(), "HH:mm").format("HH:mm");
  let frequency = $(".frequencyInput").val().trim();

  //creates local temporary object to hold train data
  let newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }

  // uploads train data to the database
  database.ref().push(newTrain);

  // clears all the text-boxes
  $(".trainNameInput").val("");
  $(".destinationInput").val("");
  $(".timeInput").val("");
  $(".frequencyInput").val("");

  // Prevents moving to new page
  return false;
});

//  Creates a user defined train
database.ref().on("child_added", childSnapshot => {

  // Stores varibles from child snapshot
  let trainName = childSnapshot.val().name;
  let destination = childSnapshot.val().place;
  let firstTrain = childSnapshot.val().ftrain;
  let frequency = childSnapshot.val().freq;

  //Works out the time inforamtion for the new train
  let firstTimeConverted = moment(firstTrain, "HH:mm");
  let currentTime = moment().format("HH:mm");
  let timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  let timeRemainder = timeDiff % frequency;
  let minToTrain = frequency - timeRemainder;

  // new train added
  let nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");

  //adds new train into the html
  $(".trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");

});