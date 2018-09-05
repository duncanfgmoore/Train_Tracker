$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyBDq-qqmD9Q2R0PQMzIUWRHO3NbDhPWrUI",
        authDomain: "train-tracker-90044.firebaseapp.com",
        databaseURL: "https://train-tracker-90044.firebaseio.com",
        projectId: "train-tracker-90044",
        storageBucket: "",
        messagingSenderId: "435416863400"
      };

      firebase.initializeApp(config);

var database = firebase.database();



$("#submitButton").on("click", function(event){

    var trainNameInput = $("#trainNameInput").val();
    var destinationInput = $("#destinationInput").val();
    var firstTrainInput = $("#firstTimeInput").val();
    var frequencyInput = $("#frequencyInput").val();


    database.ref().push({
        trainName: trainNameInput,
        destination: destinationInput,
        firstTrain: firstTrainInput,
        frequency: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });


    $("#trainNameInput").val(" ");
    $("#destinationInput").val(" ");
    $("#firstTimeInput").val(" ");
    $("#frequencyInput").val(" ");

   

});




database.ref().on("child_added", function(snapshot) {

var sv = snapshot.val();

var firstTime = moment(sv.firstTrain, "hh:mm").subtract(1, "years");

var currentTime = moment().format("LT");

var timeDifference = moment().diff(moment(firstTime), "minutes");

var timeRemaining = timeDifference % sv.frequency;

var minutesTillTrain = sv.frequency - timeRemaining;

console.log(minutesTillTrain);

var nextTrain = moment().add(minutesTillTrain, "minutes");

    nextTrain = moment(nextTrain).format("hh:mm");


var newRow = $("<tr>");
var nameTd = $("<td>");
var destinationTd = $("<td>");
var frequencyTd = $("<td>");
var arrivalTd = $("<td>");
var awayTd = $("<td>");


nameTd.text(sv.trainName);
destinationTd.text(sv.destination);
frequencyTd.text(sv.frequency);
arrivalTd.text(nextTrain);
awayTd.text(minutesTillTrain);


newRow.append(nameTd);
newRow.append(destinationTd);
newRow.append(frequencyTd);
newRow.append(arrivalTd);
newRow.append(awayTd);



$("#trainRows").append(newRow);

removeButton.click(function () {
    newRow.hide();

    
})

});

});