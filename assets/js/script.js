// Displays Date
var currentDateEl = $("#currentDate");
var currentDate;
var currentTime;

// Local Storage Variables
var eventTimeEL;
var eventText;
var timeBlockArray = [9, 10, 11, 12, 13, 14, 15, 16, 17,];
console.log(eventText);
// Button to save events
var saveBtn = $(".saveBtn");

// Determine Color
var calTimeblock;
var timerInterval;
var timeblockID = document.querySelector(".time-block");

// Calls Functions to Render Date and Events to the DOM & Update Colors
function init() {
  currentMomentDate();
  renderEvents();
  setBGColors();
}

// Gets Current Date and Renders in Jumbotron Header
function currentMomentDate() {
  currentDate = moment().format("dddd, LL");
  currentDateEl.text(currentDate);
}

// Renders Events Pulled from Local Storage to DOM
function renderEvents() {
  for (var i = 0; i < timeBlockArray.length; i++) {
    var timeData = timeBlockArray[i];
    template = 
    `<div class="row time-block">
    <label for="calTime9" class="hour col-md-1">${timeData}</label>
    <textarea class="col-md-10" id="timeblock-9" type="text" name="timeblock-9"></textarea>
    <button class="btn saveBtn col-12 col-md-1" id="btn-9"><i class="fas fa-save"></i></button>
  </div>`
    
    
    
    
    
    
    $("[id^=timeblock-]").each(function (i, v) {
      $(v).val(localStorage.getItem(timeBlockArray[i]));
    });
  }
}

//  Click button Handler for Saving to local storage
saveBtn.on("click", saveButtonClickHandler);

// When Save Button Clicked, Pulls Corresponding Time and Date Values
function saveButtonClickHandler(event) {
  // Keeps Form from Sending
  event.preventDefault();
  // Sets Value to Time Associated with Clicked Save Button
  eventTimeEL = $(this).attr("id").split("-")[1];
  // Sets Value to the User's Input Text
  eventText = $(this)
    .siblings('textarea[name^="timeblock"]')
    .val()
    .trim();
  // Calls Function to Store in Local Storage
  storeEvents();
}

// Stores Time and Text Values to Local Storage where (Time = Key) and (User's Input Text = Value)
function storeEvents() {
  window.localStorage.setItem(eventTimeEL, eventText);
}

// Updates Timeblock Classes/Colors as Time Progresses
function setBGColors() {
  // For each timeblock ID,
  timeblockID.each(function () {
    // Split it to display the time contained at the end of the ID,
    calTimeBlock = $(this).attr("id").split("-")[1];
    // And convert it to a Moment.js format, then an integer
    calTimeBlock = parseInt(moment(calTimeBlock, "H").format("H"));
    // Get Moment.js Time & format identically
    currentTime = parseInt(moment().format("H"));

    if (currentTime < calTimeBlock) {
      $(this).removeClass("past present");
      $(this).addClass("future");
    } else if (currentTime === calTimeBlock) {
      $(this).removeClass("past future");
      $(this).addClass("present");
    } else if (currentTime > calTimeBlock) {
      $(this).removeClass("present future");
      $(this).addClass("past");
    } else {
      console.log("Time Calculation Error");
      console.log("future");
    }
  });
}

// Updates Date/Time and Colors Once Per Minute On The Minute
function setIntervalOnMinute() {
  var currentDateSeconds = new Date().getSeconds();
  if (currentDateSeconds == 0) {
    setInterval(currentMomentDate, 60000);
    setInterval(setBGColors, 60000);
  } else {
    setTimeout(function () {
      setIntervalOnMinute();
    }, (60 - currentDateSeconds) * 1000);
  }
  currentMomentDate();
  setBGColors();
}

setIntervalOnMinute();

// Initializes Page
init();
