"use strict";

function runDiceGame() {
  runSplashScreen();
  let home = isHome();
  let playerScore = 0;
  let computerScore = 0;
  let balls = 0;
  let strikes = 0;
  let outs = 0;
  let pitchingResult;
  let battingResult;
  let player = true;
  let computer = false;
  
  while (outs < 3) {
    if (home) {
      pitchingResult = pitching(balls, strikes, computerScore, player);
      if (pitchingResult === "strikeout") {
        outs++;
      }
      else if (pitchingResult === "walk") {
        addBaseRunner(1, computerScore);
      }
      else {
        battingResult = batting(balls, strikes, !player);
      }
    }
    else {
      pitching(balls, strikes, computer);
      battingResult = batting(balls, strikes, player);
      
    }
  }
  runGameSummary(playerScore, computerScore);
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

function batting (balls, strikes, player) {
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
    //figure out in play results and what to do. Maybe roll a d20.
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
  if (resultingRoll < 6) {
    console.log("Batter is out. No runners advance.");
    return "out";
  }
  else if (resultingRoll < 11) {
    console.log("Batter is out, runners advance.");
    return "advance";
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

function pitching (balls, strikes, score, player) {
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
    score = wildPitch(score);
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

function wildPitch(score) {
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

function runGameSummary (userScore, computerScore) {
  if (userScore === computerScore) {
    console.log("Wow, it's a tie!");
  }
  else if (userScore > computerScore) {
    console.log("Conglaturation! A winner is you");
  }
  else {
    console.log("Bummer. Better luck next time!");
  }
  console.log("Game summary:");
  console.log("Final score:");
  console.log("You: " + userScore + " runs");
  // console.log("You: " + userHits + " hits");
  console.log("Computer: " + computerScore + " runs");
  // console.log("Computer: " + computerHits + " hits");
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