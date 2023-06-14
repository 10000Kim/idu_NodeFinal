const figlet = require("figlet");
const readline = require('readline');
const chalk = require('chalk');

// console.log(figlet.textSync("CLI   GAME!!"));



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  // 가위바위보 게임
  function playRockPaperScissors() {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
    rl.question('Choose your move (rock, paper, scissors): ', (userChoice) => {
      userChoice = userChoice.toLowerCase();
  
      if (!choices.includes(userChoice)) {
        console.log('Invalid choice. Please choose rock, paper, or scissors.');
        playRockPaperScissors();
        return;
      }
  
      console.log(`Computer chooses: ${computerChoice}`);
  
      if (userChoice === computerChoice) {
        console.log(chalk.yellow('It\'s a tie!'));
      } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
      ) {
        console.log(chalk.green('Congratulations! You win!'));
      } else {
        console.log(chalk.red('You lose! Try again!'));
      }
  
      rl.close();
    });
  }
  
  // 숫자 맞추기 게임
  function playNumberGuessingGame() {
    const secretNumber = generateRandomNumber(1, 100);
    let attempts = 0;
  
    function generateRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  
    function makeGuess() {
      rl.question('Enter your guess (between 1 and 100): ', (input) => {
        const guess = parseInt(input, 10);
  
        if (isNaN(guess) || guess < 1 || guess > 100) {
          console.log('Invalid guess. Please enter a valid number.');
          makeGuess();
          return;
        }
  
        attempts++;
  
        if (guess === secretNumber) {
          console.log(chalk.green(`Congratulations! You guessed the secret number ${secretNumber} correctly in ${attempts} attempts.`));
          rl.close();
        } else if (guess < secretNumber) {
          console.log(chalk.yellow('Too low! Try a higher number.'));
          makeGuess();
        } else {
          console.log(chalk.yellow('Too high! Try a lower number.'));
          makeGuess();
        }
      });
    }
  
    console.log('Welcome to the Number Guessing Game!');
    console.log('Guess a number between 1 and 100.');
  
    makeGuess();
  }
  
  // 메뉴 선택
  function selectGame() {
    //console.log('=== Game Menu ===');
   // console.log(figlet.textSync("G A M E   M E N U !!"));
    console.log(
        figlet.textSync("Game Menu", {
          font: "Dancing Font",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
      );
    console.log(figlet.textSync('1. Rock, Paper, Scissors'));
    console.log(figlet.textSync('2. Number Guessing'));
    console.log(figlet.textSync('3. Quit'));
  
    rl.question('Select a game (enter the number): ', (choice) => {
      if (choice === '1') {
        console.log('\n=== Rock, Paper, Scissors ===');
        playRockPaperScissors();
      } else if (choice === '2') {
        console.log(figlet.textSync('\n Number Guessing Game'));
        playNumberGuessingGame();
      } else if (choice === '3') {
        //console.log('Goodbye!');
        console.log(
            figlet.textSync("Good Bye!", {
              font: "Slant",
              horizontalLayout: "default",
              verticalLayout: "default",
              width: 80,
              whitespaceBreak: true,
            })
          );
        rl.close();
      } else {
        console.log('Invalid choice. Please select a valid option.');
        selectGame();
      }
    });
  }
  
  // 게임 시작
  console.log('Welcome to the CLI Games!');
  selectGame();