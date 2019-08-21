"use strict";

function runDiceGame() {
  runSplashScreen();
  let home = isHome();
  let gameCounters = {
    playerScore: 0,
    computerScore: 0,
    playerHits: 0,
    computerHits: 0,
    outs: 0,
    balls: 0,
    strikes: 0
  }
  let pitchingResult;
  let battingResult;
  let player = true;
  let computer = false;
  
  while (gameCounters.outs < 3) {
    if (home) {
      pitchingResult = pitching(player);
      gameCounters = updateCounters(pitchingResult, gameCounters, player);
      if (pitchingResult === "in the zone"){
        battingResult = batting(computer);
        gameCounters = updateCounters(battingResult, gameCounters, computer);
      }
    }
    else {
      pitchingResult = pitching(computer);
      gameCounters = updateCounters(pitchingResult, gameCounters, computer);
      if (pitchingResult === "in the zone"){
        battingResult = batting(player);
        gameCounters = updateCounters(battingResult, gameCounters, player);
      }
    }
  }
  gameCounters.outs = 0;
  while (gameCounters.outs < 3) {
    if (home) {
      pitchingResult = pitching(computer);
      gameCounters = updateCounters(pitchingResult, gameCounters, computer);
      if (pitchingResult === "in the zone"){
        battingResult = batting(player);
        gameCounters = updateCounters(battingResult, gameCounters, player);
      }
    }
    else {
      pitchingResult = pitching(player);
      gameCounters = updateCounters(pitchingResult, gameCounters, player);
      if (pitchingResult === "in the zone"){
        battingResult = batting(computer);
        gameCounters = updateCounters(battingResult, gameCounters, computer);
      }
    }
  }
  runGameSummary(gameCounters);
}

function rollDice(numOfSides) {
  return Math.floor(Math.random() * numOfSides) + 1;
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

function batting (player) {
  let swing;
  if (player === true) {
    swing = chooseSwing();
  }
  else {
    swing = chooseSwing(rollDice(2));
  }
  let hitChance = rollDice(swing);
  console.log("Rolling " + swing + " sided die for batter... result is " + hitChance);
  if (hitChance === swing) {
    console.log("Home run!");
    return "home run";
  }
  else if (hitChance === 1) {
    console.log("Pop fly, batter is out!");
    return "out";
  }
  else if (hitChance < 4) {
    console.log("Swing and a miss!");
    return "strike";
  }
  else {
    let result = ballInPlay();
    return result;
  }
}

function chooseSwing (choice = 0) {
    while(true) {
      if (choice !== 1 && choice !== 2) {
        choice = parseInt(prompt("Would you like to swing for Power (1) or Contact (2) ?"));
      }
      switch (choice) {
        case 1: //Power
          return 8;
          break;
        case 2: //Contact
          return 12;
          break;
        default:
          console.log("Please enter 1 for Power or 2 for Contact.")
          break;
      }
    }
}

function ballInPlay () {
  let resultingRoll = rollDice(20);
  console.log("Rolling 20 sided die for a ball in play... result is " + resultingRoll);
  if (resultingRoll < 11) {
    console.log("Batter is out.");
    return "out";
  }
  else if (resultingRoll < 17) {
    console.log("Base hit!");
    return "single";
  }
  else if (resultingRoll < 19) {
    console.log("In play for a double!");
    return "double";
  }
  else if (resultingRoll < 20) {
    console.log("Ball hits a gap in the outfield for a triple!");
    return "triple";
  }
  else {
    console.log("HOME RUN!!!");
    return "home run";
  }
}

function pitching (player) {
  let pitch;
  if (player) {
    pitch = choosePitch();
  }
  else {
    pitch = choosePitch(rollDice(3));
  }
  let accuracy = rollDice(pitch);  //roll different die based on pitch selection
  console.log("Rolling " + pitch + " sided die for pitcher... result is " + accuracy);

  if (accuracy === 1) {
    return "wild pitch";
  }
  else if (accuracy === pitch) {
    console.log("Perfect pitch! Automatic strike.");
    return "strike";
  }
  else if (accuracy < 4) {
    console.log("That missed the strike zone for a ball.");
    return "ball";
  }
  else {
    console.log("Pitch is in the zone...");
    return "in the zone";
  }
}

function choosePitch (choice = 0) {
  while (true) {
    if (choice !== 1 && choice !== 2 && choice !== 3) {
      choice = parseInt(prompt("Choose a pitch: 1) Fastball 2) Changeup 3) Curveball"));
    }
    switch (choice) {
      case 1: //"Fastball"
        return 12;
        break;
      case 2: //"Changeup"
        return 10;
        break;
      case 3: //"Curveball"
        return 8;
        break;
      default:
        console.log("Please enter a valid choice: 1, 2, or 3.");
    }
  }
}

// function pitchResult (pitch) {
//   let result = rollDice(pitch);
//   if (result === 1) {
//     return "wild";
//   }
//   else if (1 < result < 4) {
//     return false;
//   }
//   else if (4 < result < pitch) {
//     return true;
//   }
//   else {
//     return "perfect";
//   }
// }

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

function updateCounters (result, gameCounters, player) {
  switch (result) {
    case "home run":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(4, gameCounters.playerScore);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(4, gameCounters.computerScore);
      }
      break;
    case "triple":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(3, gameCounters.playerScore);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(3, gameCounters.computerScore);
      }
      break;
    case "double":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(2, gameCounters.playerScore);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(2, gameCounters.computerScore);
      }
      break;
    case "single":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(1, gameCounters.playerScore);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(1, gameCounters.computerScore);
      }
      break;
    case "strikeout":
    case "out":
      gameCounters.outs++;
      gameCounters.strikes = 0;
      gameCounters.balls = 0;
      console.log("There are " + gameCounters.outs + " outs.")
      break;
    case "walk":
      if (player) {
        addBaseRunner(1, gameCounters.computerScore);
      }
      else {
        addBaseRunner(1, gameCounters.playerScore);
      }
      gameCounters.balls = 0;
      gameCounters.strikes = 0;
      break;
    case "wild pitch":
      if (player) {
        gameCounters.computerScore = wildPitch(gameCounters.computerScore);
      }
      else {
        gameCounters.playerScore = wildPitch(gameCounters.playerScore);
      }
      break;
    case "ball":
      gameCounters.balls++;
      if (gameCounters.balls === 4) {
        gameCounters = updateCounters("walk", gameCounters, player);
      }
      break;
    case "strike":
      gameCounters.strikes++;
      if (gameCounters.strikes === 3) {
        gameCounters = updateCounters("strikeout", gameCounters, player);
      }
      break;
    default:
      break;
  }
  return gameCounters;
}

function wildPitch(score) {
  console.log("Wild pitch! Runners advance.");
  for (let i = 2; i >= 0; i--) {
    if (baseRunners.bases[i] === true && i == 2) {
      score++;
      console.log("Batting team scored! They currently have " + score + " runs.");
      baseRunners.total--;
    }
    else if (baseRunners.bases[i] === true) {
      baseRunners.bases[i] = false;
      baseRunners.bases[i + 1] = true;
    }
  }
  return score;
}

function runGameSummary (gameCounters) {
  if (gameCounters.playerScore === gameCounters.computerScore) {
    console.log("Wow, it's a tie!");
  }
  else if (gameCounters.playerScore > gameCounters.computerScore) {
    console.log("Conglaturation! A winner is you");
  }
  else {
    console.log("Bummer. Better luck next time!");
  }
  console.log("Game summary:");
  console.log("Final score:");
  console.log("You: " + gameCounters.playerScore + " runs");
  console.log("You: " + gameCounters.playerHits + " hits");
  console.log("Computer: " + gameCounters.computerScore + " runs");
  console.log("Computer: " + gameCounters.computerHits + " hits");
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