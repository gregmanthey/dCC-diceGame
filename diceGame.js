function runDiceGame() {
  runSplashScreen();
  let home = isHome();
  if (home) {
    startPitching();
    startBatting();
  }
  else {
    startBatting();
    startPitching();
  }
  runGameSummary();
}

function rollDice(numOfSides) {
  return Math.floor(Math.random() * numOfSides + 1);
}

function runSplashScreen () {
  console.log("Welcome to the greatest baseball dice game of all time!")
  console.log("Now let us begin.")
}

function isHome() {
  while(true) {
    switch (prompt("Would you like to be home (1) or away (2) ?")) {
      case "1":
        return true;
        break;
      case "2":
        return false;
        break;  
      default:
        console.log("Please enter a valid choice: 1 or 2.")
        break;
    }
  }
}

function startBatting () {

}

function startPitching () {
  //select a pitch
  let outs = 0;
  while (outs < 3) {
    let pitch = choosePitch();
    outs = 3; //exit loop for testing
  }
  //roll different die based on pitch selection
}

function choosePitch () {
  let pitch;
  while (pitch == undefined) {
    switch (prompt("Choose a pitch: 1) Fastball 2) Changeup 3) Curveball")) {
      case "1":
        return "Fastball";
        break;
      case "2":
        return "Changeup";
        break;
      case "3":
        return "Curveball";
        break;
      default:
        console.log("Please enter a valid choice: 1, 2, or 3.")
    }
  }
}

function runGameSummary () {
  
}

let fastball = {
  hitChance: 90,
  hitPower: 90,
  accuracy: 90,
}