// Function to display the current day:
// Defines a function named displayCurrentDay
function displayCurrentDay() {
  // Use dayjs() to get the current date and time
  // then use the format() method to format it as "dddd"-Day of Week, "MMMM"-Month Name, "D"- day
  var currentDay = dayjs().format("dddd, MMMM D");
  // Find the HTML element with the id "currentDay" using jQuery
  // and update its text content with (currentDay) variable
  $("#currentDay").text(currentDay);
}

////////////////////////////////////////////////////
// Function to create time blocks for the schedule//
function createSchedule() {
   // Use dayjs() to get the current date and time,
  // and then use the hour() method to extract the current hour
  var currentTime = dayjs().hour();

  // Loop through the hours (I've added hours from 7 AM to 10 PM to add some flexibility, or space for evening and morning activities)
  for (var hour = 7; hour <= 22; hour++) {
        // Create a new <div> element using jQuery
        // Add the classes "row" and "time-block" to the <div>
        // Store the resulting jQuery object in the variable timeBlock
        var timeBlock = $("<div>").addClass("row time-block");

        // Create hour column
        // (div with  classes: "col-md-1" and "hour")
        var hourColumn = $("<div>").addClass("col-md-1 hour").text(formatHour(hour));
        //add hourColumn headings
        timeBlock.append(hourColumn);
      
        // Create textarea for user input
        var descriptionColumn = $("<textarea>").addClass("col-md-10 description");

        //Added this to display text from localStorage into descriptionColumn
        // Retrieve stored value from local storage and set as initial value
        var storedValue = localStorage.getItem(hour);
        if (storedValue) {
          descriptionColumn.val(storedValue);
        }

        timeBlock.append(descriptionColumn);


        // Set the background color based on past, present, or future
        if (hour < currentTime) {
          descriptionColumn.addClass("past");
        } else if (hour === currentTime) {
          descriptionColumn.addClass("present");
        } else {
          descriptionColumn.addClass("future");
        }

        // Create save button
        var saveButton = $("<button>").addClass("col-md-1 saveBtn").html("<i class='fas fa-save'></i>");
        timeBlock.append(saveButton);

        //Add elements to HTML:
        // Find the HTML element with the id "container" using jQuery
        // Append (timeBlock) to html
        $(".container").append(timeBlock);   
    }


    // Add event listener for the save buttons
    $(".saveBtn").on("click", function () {
      // Get the description textarea and corresponding hour
      var description = $(this).siblings(".description").val();
      var hour = parseInt($(this).siblings(".hour").text().split(" ")[0]);

      // Save to local storage
      localStorage.setItem(hour, description);
      console.log('saved to storage');
      
      var debugText = 'This is a debug message';
      localStorage.setItem('debugText', debugText);
      console.log('Debug message:', debugText, hour, description);
    });

  }
   //Create Schedule Function ends here//
  ///////////////////////////////////


// Format the hour for display
function formatHour(hour) {
  var formattedHour = (hour % 12 === 0) ? 12 : hour % 12;
  var period = (hour < 12) ? "AM" : "PM";
  return formattedHour + " " + period;
}

// Call functions when the document is ready
$(document).ready(function () {
  displayCurrentDay();
  createSchedule();

  
});
