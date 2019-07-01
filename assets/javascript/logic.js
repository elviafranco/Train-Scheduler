// 1. Initialize Firebase
const config = {
    apiKey: "AIzaSyBrgfC-fJW-GJQHvtQ0ZXGK-3dllU_rQWw",
    authDomain: "my-awesome-project-83c8e.firebaseapp.com",
    databaseURL: "https://my-awesome-project-83c8e.firebaseio.com",
    projectId: "my-awesome-project-83c8e",
    storageBucket: "my-awesome-project-83c8e.appspot.com",
    messagingSenderId: "755374872840",
    appId: "1:755374872840:web:858cdb9b70e43222"
  };
  
  firebase.initializeApp(config);
  
  const database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    const trainName = $("#train-name-input").val().trim();
    const trainDest = $("#destination-input").val().trim();
    const trainStart = $("#start-input").val().trim();
    const trainFreq = $("#frequency-input").val().trim();


    // Creates local "temporary" object for holding train data
    const newTrain = {
      name: trainName,
      destination: trainDest,
      start: trainStart,
      frequency: trainFreq,
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    const trainName = childSnapshot.val().name;
    const trainDest = childSnapshot.val().destination;
    const trainStart = childSnapshot.val().start;
    const trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);

    // Frequency Assumption
    let tFrequency = trainFreq;

    // First Train Time
    let firstTime = trainStart;

     // First Time (pushed back 1 year to make sure it comes before current time)
     let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
     console.log(firstTimeConverted);

     // Current Time
    let currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

     // Difference between the times
     let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
    let tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    let tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    
    // Create the new row
    let newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      // $("<td>").text(trainStart),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });