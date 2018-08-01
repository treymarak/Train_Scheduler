 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB3dFbW0O-Ry8RmROt_F_RGN2shod23-Z0",
    authDomain: "train-scheduler-690a2.firebaseapp.com",
    databaseURL: "https://train-scheduler-690a2.firebaseio.com",
    projectId: "train-scheduler-690a2",
    storageBucket: "",
    messagingSenderId: "595218826145"
  };
  firebase.initializeApp(config);


var database = firebase.database();


$("#add-user").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var firstTrainMoment = moment(firstTrain, "HH:mm");
    var nowMoment = moment();
  
    var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, "minutes");
    var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
    var minutesAway = frequency - minutesSinceLastArrival;
  
    var nextArrival = nowMoment.add(minutesAway, "minutes");
    var formatNextArrival = nextArrival.format("HH:mm");


    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

    

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    console.log(formatNextArrival);
    console.log(minutesAway);



    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        formatNextArrival: formatNextArrival,
        minutesAway: minutesAway,
    });

});



    database.ref().on("child_added", function (snapshot) {
        
        var tableItem = $("<tr>");
        var row = $("<td>")


        row = $("<td>" + snapshot.val().trainName + "</td>");
        tableItem.append(row);

        row = $("<td>" + snapshot.val().destination + "</td>");
        tableItem.append(row);

        row = $("<td>" + snapshot.val().frequency + "</td>");
        tableItem.append(row);

        row = $("<td>" + snapshot.val().formatNextArrival + "</td>")
        tableItem.append(row);

        row = $("<td>" + snapshot.val().minutesAway + "</td>")
        tableItem.append(row);

        $("#dataRow").append(tableItem);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    


    });
