//connecting to twitter//
//import twitter//
const Twitter = require("twitter");
const WebSocket = require("ws");
const WebSocketServer = WebSocket.Server,
  wss = new WebSocketServer({ port: 7253 });
let termsFequancy = ["", "", ""];
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("received: ", message);

    const termsArray = JSON.parse(message);
    if (message === "disconnect") {
      stream.destroy();
    } else {
      connectToTwitter(termsArray);
    }

    ws.send(message.split("").reverse().join(""));
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

//adding access keys//
const client = new Twitter({
  consumer_key: "beftbPi7zX0NwJuiZjTgkoPhx",
  consumer_secret: "C8hDzgVF4upjhauSN8POPnMSiDtYyTXKeW6zWNeUalpzA8oMvD",
  access_token_key: "1109957498-qrGGdts4oF1iHCgxJ5KnRRdd3MMcxzpwgDCpIu5",
  access_token_secret: "AwekM7m8T1UN83kepth8H6QC1MzAguYwJgoazg0dCXTHb",
});

let stream = null;
//the twitter connection
function connectToTwitter(termsArray) {
  if (stream !== null) {
    stream.destroy();
  }
  const termsString = termsArray.join(",");

  //creating a request for the twitter stream//
  stream = client.stream("statuses/filter", {
    track: termsString,
    language: "en",
  });

  //listening to the twitter stream//
  stream.on("data", (event) => {
    if (!event.text) {
      return;
    }

    //which terms are mentioned//

    //counter//

    //console log the event//
    console.log(`@${event.user.screen_name} - ${event.text}`);
  });

  stream.on("error", (error) => {
    throw error;
  });
}

//setting timer//

//https://www.npmjs.com/package/ws//
setInterval(function () {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      termsFequancy = ["", "", ""];
      //rest the counter//
      client.send(JSON.stringify(termsFequancy));
    }
  });
}, 1000);
