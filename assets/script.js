// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZmJo7cYCUNh2nw4585BLfIkGLBqwJFRQ",
  authDomain: "train-scheduler-cb58b.firebaseapp.com",
  databaseURL: "https://train-scheduler-cb58b.firebaseio.com",
  projectId: "train-scheduler-cb58b",
  storageBucket: "train-scheduler-cb58b.appspot.com",
  messagingSenderId: "447020056772"
};

firebase.initializeApp(config);

// Create variable to link to database
var database = firebase.database();

// Creating the initial on-click event that will trigger new rows of HTML to be created.
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Create variables that grab the user input from the form
  var trainName = $("#train-name").val().trim();
  var trainDestination = $("#train-destination").val().trim();
  var trainTime = moment($("#train-first-time").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#train-frequency").val().trim();

  // Create a local "temporary" object that will hold all of the input train information
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

  // Push data to the database
  database.ref().push(newTrain);

  // Log all of the above to the console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  // Alert that the train was successfully added
  alert("Congratulations - a train off to an unknown land was successfully added!");

  // Clears all of the text boxes once the Submit button is pressed and data is stored
  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-first-time").val("");
  $("#train-frequency").val("");
});

// Create a Firebase event that adds the train info to the database and adds the row of HTML
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into variables
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Log Train info into console
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  // 'Prettify' the train time
  var trainTimePretty = moment.unix(trainTime).format("HH:mm");

  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainTime + "</td><td>" + trainFrequency + "</td></tr>");
});