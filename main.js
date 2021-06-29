//getting textarea elements//
let termsText = document.getElementById("terms");

//grabbing elements//
let btnsubmit = document.getElementById("submit");
let btnConnect = document.getElementById("connect");

//getting canvas elements//
let canvas = document.getElementById("canvas");

//event listner to submit the terms//
btnsubmit.addEventListener("click", submitTerms, false);

//setting up websocket connection//
const ws = new WebSocket("ws://localhost:7253");
ws.onopen = () => {
  console.log("WebSocket connection is open...");
};
ws.onmessage = (e) => {
  console.log('recevied:' , e.data);

//json parse 
JSON.parse();

//loop through each term

//inner text for outputting
canvas.innerHTML = e.data;

};
ws.onclose = () => {
  console.log("WebSocket has disconnected");
};

//function for submitting terms//
function submitTerms(e) {
  // Stop the form from submitting
  e.preventDefault();

  // Read out the raw string
  var termsString = termsText.value;
  console.log("Terms String: ", termsString);

  // Convert the string to an array
  // 2 - Complete the line below
  var termsArray = termsString.split("\n");
  console.log("Terms Array: ", termsArray);

  // Remove any blanks from the array
  // Why do we go through in reverse?
  termsArray = termsArray.filter((term) => term.length > 0);

  // Cleaned up terms array
  console.log("Terms Array (Blanks Removed): ", termsArray);

  sendTermsToServer(termsArray);
}

function sendTermsToServer(termsArray) {
  // Send these through a WebSocket
  //sending something over the websocket//
  ws.send(JSON.stringify(termsArray));
}

// Call this when you have new term frequency data from your websocket
function termFrequencyDataReceived(termFrequencyObject) {
  var htmlString = "<ul>";

  for (var term in termFrequencyObject) {
    if (termFrequencyObject.hasOwnProperty(term)) {
      var frequency = termFrequencyObject[term];
      htmlString += "<li>" + term + ": " + frequency;
    }
  }

  htmlString += "</ul>";
  btnConnect.innerHTML = htmlString;
}

// 4 - Remove this!
// Pretend we're getting term frequency data:
setInterval(function () {
  if (Math.random() < 0.5) termFrequencyDataReceived({ red: 4, green: 3 });
  else termFrequencyDataReceived({ red: 2, green: 6 });
}, 1000);
