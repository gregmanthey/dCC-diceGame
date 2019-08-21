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
    strikes: 0,
    currentBaserunners: 0,
    bases: [false, false, false]
  }
  let pitchingResult;
  let battingResult;
  let player = true;
  let computer = false;
  
  while (gameCounters.outs < 3) {
    console.log("There are " + gameCounters.outs + " outs, " + gameCounters.balls + " balls, and " + gameCounters.strikes + " strikes.");
    if (home) {
      pitchingResult = pitching(player);
      gameCounters = updateCounters(pitchingResult, gameCounters, player);
      if (pitchingResult === "in the zone") {
        battingResult = batting(computer);
        gameCounters = updateCounters(battingResult, gameCounters, computer);
      }
    }
    else {
      pitchingResult = pitching(computer);
      gameCounters = updateCounters(pitchingResult, gameCounters, computer);
      if (pitchingResult === "in the zone") {
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
      if (pitchingResult === "in the zone") {
        battingResult = batting(player);
        gameCounters = updateCounters(battingResult, gameCounters, player);
      }
    }
    else {
      pitchingResult = pitching(player);
      gameCounters = updateCounters(pitchingResult, gameCounters, player);
      if (pitchingResult === "in the zone") {
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

function displayGameStatus(gameCounters) {
  if (gameCounters.outs === 1) {
    console.log("Current status: " + gameCounters.outs + " out, " + gameCounters.balls + " balls, and " + gameCounters.strikes + " strikes.");
  }
  else {
    console.log("Current status: " + gameCounters.outs + " outs, " + gameCounters.balls + " balls, and " + gameCounters.strikes + " strikes.");
  }
}

function isHome() {
  switch (prompt("Would you like to be home (1) or away (2) ?")) {
    case "1":
      return true;
      break;
    case "2":
      return false;
      break;  
    default:
      console.log("Please enter a valid choice: 1 or 2.")
      return isHome();
      break;
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
    console.log("Ball is in play!");
    let result = ballInPlay();
    return result;
  }
}

function chooseSwing (choice = 0) {
  if (choice !== 1 && choice !== 2) {
    choice = parseInt(prompt("Would you like to swing for Power (1) or Contact (2) ?"));
  }
  switch (choice) {
    case 1: //Power
      return 7;
      break;
    case 2: //Contact
      return 11;
      break;
    default:
      console.log("Please enter 1 for Power or 2 for Contact.")
      return chooseSwing();
      break;
  }
}

function ballInPlay () {
  let resultingRoll = rollDice(20);
  console.log("Rolling 20 sided die for a ball in play... result is " + resultingRoll);
  if (resultingRoll < 6) {
    console.log("Batter is out.");
    return "out";
  }
  else if (resultingRoll < 11) {
    console.log("Foul ball.");
    return "foul";
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
    console.log("The pitch took a b-line to the batter's keister! That's a walk.")
    return "walk";
  }
  else if (accuracy === pitch) {
    console.log("Perfect pitch! The batter froze and watched the strike go by.");
    return "strike";
  }
  else if (accuracy < 4) {
    console.log("That missed the strike zone for a ball.");
    return "ball";
  }
  else {
    console.log("Pitch is in the strike zone, batter's turn to roll!");
    return "in the zone";
  }
}

function choosePitch (choice = 0) {
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
      return choosePitch();
  }
}

function addBaseRunner(numOfBases, score, gameCounters) {
  if (numOfBases === 4) {
    score += gameCounters.currentBaserunners + 1;
    gameCounters.currentBaserunners = 0;
    gameCounters.bases = [false, false, false];
    return score;
  }
  else if (numOfBases === 3) {
    score += gameCounters.currentBaserunners;
    gameCounters.currentBaserunners = 1;
    gameCounters.bases = [false, false, true];
  }
  else if (numOfBases === 2) {
    if (gameCounters.bases[2]) {
      score++;
      gameCounters.bases[2] = false;
      gameCounters.currentBaserunners--;
    }
    if (gameCounters.bases[1] === true) {
      score++;
      gameCounters.bases[1] = false;
      gameCounters.currentBaserunners--;
    }
    if (gameCounters.bases[0] === true) {
      gameCounters.bases[0] = false;
      gameCounters.bases[2] = true;
      gameCounters.currentBaserunners++;
    }
    return score;
  }
  else if (numOfBases === 1) {
    for (let i = 0; i < gameCounters.bases.length; i++) {
      if (!gameCounters.bases[i]) {
        gameCounters.bases[i] = true;
        gameCounters.currentBaserunners++;
        return score;
      }
    }
    return ++score;
  }
}

function resetBallsAndStrikes (gameCounters) {
  gameCounters.balls = 0;
  gameCounters.strikes = 0;
  return gameCounters;
}

function updateCounters (result, gameCounters, player) {
  switch (result) {
    case "home run":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(4, gameCounters.playerScore, gameCounters);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(4, gameCounters.computerScore, gameCounters);
      }
      gameCounters = resetBallsAndStrikes(gameCounters);
      break;
    case "triple":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(3, gameCounters.playerScore, gameCounters);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(3, gameCounters.computerScore, gameCounters);
      }
      gameCounters = resetBallsAndStrikes(gameCounters);
      break;
    case "double":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(2, gameCounters.playerScore, gameCounters);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(2, gameCounters.computerScore, gameCounters);
      }
      gameCounters = resetBallsAndStrikes(gameCounters);
      break;
    case "single":
      if (player) {
        gameCounters.playerHits++;
        gameCounters.playerScore = addBaseRunner(1, gameCounters.playerScore, gameCounters);
      }
      else {
        gameCounters.computerHits++;
        gameCounters.computerScore = addBaseRunner(1, gameCounters.computerScore, gameCounters);
      }
      gameCounters = resetBallsAndStrikes(gameCounters);
      break;
    case "foul":
      if (gameCounters.strikes <= 2) {
        gameCounters.strikes++;
      }
      break;
    case "strikeout":
    case "out":
      gameCounters.outs++;
      gameCounters = resetBallsAndStrikes(gameCounters);
      break;
    case "walk":
      if (player) {
        addBaseRunner(1, gameCounters.computerScore, gameCounters);
      }
      else {
        addBaseRunner(1, gameCounters.playerScore, gameCounters);
      }
      gameCounters = resetBallsAndStrikes(gameCounters);
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

// function wildPitch(score) {
//   console.log("Wild pitch! Runners advance.");
//   for (let i = 2; i >= 0; i--) {
//     if (gameCounters.bases[i] === true && i == 2) {
//       score++;
//       console.log("Batting team scored! They currently have " + score + " runs.");
//       gameCounters.currentBaserunners--;
//     }
//     else if (gameCounters.bases[i] === true) {
//       gameCounters.bases[i] = false;
//       gameCounters.bases[i + 1] = true;
//     }
//   }
//   return score;
// }

function runGameSummary (gameCounters) {
  console.log("Game summary:");
  console.log("Final score:");
  console.log("You: " + gameCounters.playerScore + " runs");
  console.log("You: " + gameCounters.playerHits + " hits");
  console.log("Computer: " + gameCounters.computerScore + " runs");
  console.log("Computer: " + gameCounters.computerHits + " hits");
  if (gameCounters.playerScore === gameCounters.computerScore) {
    console.log("Wow, it's a tie!");
  }
  else if (gameCounters.playerScore > gameCounters.computerScore) {
    console.log("Conglaturation! A winner is you");
  }
  else {
    console.log("Bummer. Looks like RNG is not on your side. Better luck next time!");
  }
}