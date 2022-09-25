// Local Storage Variables
var eventTimeEL;
var eventText;
var timeBlockArray = [9, 10, 11, 12, 13, 14, 15, 16, 17];
// Displays Date & Time
var currentDateEl = $("#currentDate");
var currentDate;
var currentTime;
// Adds color to blocks based on time
var timeblock;
var timerInterval;
var timeblockID = $("textarea[id*='timeblock']");

// Button to save events
var saveBtn = $(".saveBtn");

// Calls Functions to render date, time, and events and set the color
function init() {
  displayTime();
  renderEvents();
  setBGColors();
}

// Sets current date in header
function displayTime() {
  currentDate = moment().format("dddd, LL");
  currentDateEl.text(currentDate);
}

// Displays saved events from local storage
function renderEvents() {
  for (var i = 0; i < timeBlockArray.length; i++) {
    template = $("[id^=timeblock-]").each(function (i, v) {
      $(v).val(localStorage.getItem(timeBlockArray[i]));
    });
  }
}

//  Click button Handler for Saving to local storage
saveBtn.on("click", saveButtonClickHandler);

// When Save Button Clicked, Pulls Corresponding Time and Date Values
function saveButtonClickHandler(event) {
  event.preventDefault();

  eventTimeEL = $(this).attr("id").split("-")[1];

  eventText = $(this).siblings('textarea[name^="timeblock"]').val().trim();

  storeEvents();
}

// Stores json data to local storage
function storeEvents() {
  window.localStorage.setItem(eventTimeEL, eventText);
}

// Changes color of timeblock to indicate past, present, and future
function setBGColors() {
  timeblockID.each(function () {
    timeblock = $(this).attr("id").split("-")[1];

    timeblock = parseInt(moment(timeblock, "H").format("H"));

    currentTime = parseInt(moment().format("H"));

    if (currentTime < timeblock) {
      $(this).removeClass("past present");
      $(this).addClass("future");
    } else if (currentTime === timeblock) {
      $(this).removeClass("past future");
      $(this).addClass("present");
    } else if (currentTime > timeblock) {
      $(this).removeClass("present future");
      $(this).addClass("past");
    } else {
      console.log("Time Calculation Error");
      console.log("future");
    }
  });
}

// Updates display every minute
function setIntervalOnMinute() {
  var currentDateSeconds = new Date().getSeconds();
  if (currentDateSeconds == 0) {
    setInterval(displayTime, 60000);
    setInterval(setBGColors, 60000);
  } else {
    setTimeout(function () {
      setIntervalOnMinute();
    }, (60 - currentDateSeconds) * 1000);
  }
  displayTime();
  setBGColors();
}

setIntervalOnMinute();

// Initializes Page
init();
