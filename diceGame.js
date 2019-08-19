function runDiceGame() {
  runSplashScreen();
  let home = isHome();
  // if (home) {
  //   startPitching();
  //   startBatting();
  // }
  // else {
  //   startBatting();
  //   startPitching();
  // }
  // runGameSummary();
}

function rollDice(numOfSides) {
  return Math.floor(Math.random() * numOfSides + 1);
}

function runSplashScreen () {
  console.log("Welcome to the greatest baseball dice game of all time!")
  console.log("Now let us begin.")
}

function isHome() {
  let home;
  while(home == undefined) {
    switch (prompt("Would you like to be home (1) or away (2) ?")) {
      case "home":
        case "Home":
          case "1":
            home = true;
            return home;
            break;
      case "away":
        case "Away":
          case "2":
            home = false;
            return home;
            break;  
      default:
        break;
    }
  }
}

let fastball = {
  hitChance: 90,
  hitPower: 90,
  accuracy: 90,
}