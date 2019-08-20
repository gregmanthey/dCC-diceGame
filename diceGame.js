"use strict";

function runDiceGame() {
  runSplashScreen();
  let home = isHome();
  let playerScore = 0;
  let computerScore = 0;
  let balls = 0;
  let strikes = 0;
  let outs = 0;
  let player = true;
  let accuracy;
  while (outs < 3) {
    if (home) {
      let result = pitching(balls, strikes, player);
      if (result === "strikeout") {
        outs++;
      }
      else if (result === "walk") {
        addBaseRunner(1, computerScore);
      }
      else {
        batting(result, !player);
      }
    }
    else {
      batting(accuracy, player);
      pitching(balls, strikes, !player);
    }
  }
  runGameSummary(playerScore, computerScore);
}

function rollDice(numOfSides) {
  return Math.floor(Math.random() * numOfSides + 1);
}

function runSplashScreen () {
  console.log("Welcome to the greatest baseball dice game of all time!");
  console.log("Now let us begin.");
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

function batting () {
  
}

function pitching (balls, strikes, player) {
  let pitch;
  if (player) {
    pitch = choosePitch();
  }
  else {
    pitch = choosePitch(rollDice(3));
  }
  let accuracy = rollDice(pitch);  //roll different die based on pitch selection
  console.log("Rolling " + pitch + " sided die for pitcher... result is " + accuracy);
  if (accuracy === pitch && strikes === 2) {
    console.log("Strike three! Batter's out!");
    return "strikeout";
  }
  else if (accuracy < 4 && balls === 3) {
    console.log("That's ball four. Take your base!");
    return "walk";
  }
  else if (accuracy === 1) {
    balls++;
    console.log("Wild pitch! Runners advance.");
  }
  else if (accuracy === pitch) {
    strikes++;
    console.log("Perfect pitch! Automatic strike.");
  }
  else if (accuracy < 4) {
    balls++;
    console.log("That missed the strike zone. Ball " + balls + ".");
  }
  else {
    console.log("Pitch is in the zone...");
    return accuracy;
  }
  pitching(balls, strikes, player);
}

function choosePitch () {
  let pitch;
  while (pitch == undefined) {
    switch (prompt("Choose a pitch: 1) Fastball 2) Changeup 3) Curveball")) {
      case "1": //"Fastball"
        return 12;
        break;
      case "2": //"Changeup"
        return 10;
        break;
      case "3": //"Curveball"
        return 8;
        break;
      default:
        console.log("Please enter a valid choice: 1, 2, or 3.");
    }
  }
}

function pitchResult (pitch) {
  let result = rollDice(pitch);
  if (result === 1) {
    return "wild";
  }
  else if (1 < result < 4) {
    return false;
  }
  else if (4 < result < pitch) {
    return true;
  }
  else {
    return "perfect";
  }
}

function addBaseRunner(numOfBases, score) {
  if (numOfBases === 4) {
    score += baseRunners.total + 1;
    baseRunners.total = 0;
    baseRunners.bases = [false, false, false];
    return score;
  }
  else if (numOfBases === 3) {
    score += baseRunners.total;
    baseRunners.total = 1;
    baseRunners.bases = [false, false, true];
  }
  else if (numOfBases === 2) {
    if (baseRunners.bases[2]) {
      score++;
      baseRunners.bases[2] = false;
      baseRunners.total--;
    }
    if (baseRunners.bases[1] === true) {
      score++;
      baseRunners.bases[1] = false;
      baseRunners.total--;
    }
    if (baseRunners.bases[0] === true) {
      baseRunners.bases[0] = false;
      baseRunners.bases[2] = true;
      baseRunners.total++;
    }
    return score;
  }
  else if (numOfBases === 1) {
    for (let i = 0; i < baseRunners.bases.length; i++) {
      if (!baseRunners.bases[i]) {
        baseRunners.bases[i] = true;
        baseRunners.total++;
        return score;
      }
    }
    return ++score;
  }
}

function runGameSummary () {

}

let fastball = {
  hitChance: 90,
  hitPower: 90,
  accuracy: 90,
}

let baseRunners = {
  total: 0,
  bases: [false, false, false]
}