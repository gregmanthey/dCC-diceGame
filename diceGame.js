function runDiceGame() {
  runSplashScreen();
}

function rollDice(numOfSides) {
  return Math.floor(Math.random() * numOfSides + 1);
}

function runSplashScreen () {
  console.log("Welcome to the greatest baseball dice game of all time!")
  console.log("Now let us begin.")
}
