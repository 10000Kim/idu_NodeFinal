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
    const choices = ['바위', '보', '가위'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
    rl.question('선택해주세요! (가위, 바위, 보): ', (userChoice) => {
      userChoice = userChoice.toLowerCase();
  
      if (!choices.includes(userChoice)) {
        console.log(chalk.red.bold('다시 선택해주세요!! (가위, 바위, 보)'));
        playRockPaperScissors();
        return;
      }
  
      console.log(`컴퓨터: ${computerChoice}`);
  
      if (userChoice === computerChoice) {
        console.log(chalk.yellow.bold('비겼습니다. 다시 도전해보세요!'));
      } else if (
        (userChoice === '바위' && computerChoice === '가위') ||
        (userChoice === '보' && computerChoice === '바위') ||
        (userChoice === '가위' && computerChoice === '보')
      ) {
        console.log(chalk.green.bold('승리했습니다! 축하합니다! '));
      } else {
        console.log(chalk.red.bold('패배했습니다. 다시 도전해보세요! '));
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
      rl.question('생각한 숫자를 입력해보세요! (1~100사이): ', (input) => {
        const guess = parseInt(input, 10);
  
        if (isNaN(guess) || guess < 1 || guess > 100) {
          console.log(chalk.bold.green('유효한 숫자를 입력해주세요!(1~100사이)'));
          makeGuess();
          return;
        }
  
        attempts++;
  
        if (guess === secretNumber) {
          console.log(chalk.bold.yellow(`정답 !! 축하합니다. 정답숫자인 ${secretNumber} 를 ${attempts}번 시도해서 맞췄습니다! `));
          rl.close();
        } else if (guess < secretNumber) {
          console.log(chalk.bold.blue('너무 낮아요 더 큰 숫자를 입력해주세요!'));
          makeGuess();
        } else {
          console.log(chalk.bold.red('너무 높아요 낮은 숫자를 입력해주세요!'));
          makeGuess();
        }
      });
    }
  
    console.log(chalk.bold.blue('숫자 맞추기 게임에 오신 것을 환영합니다 !! '));
    console.log(chalk.bold('1부터 100 사이의 숫자를 입력해주세요!'));
  
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
    console.log(figlet.textSync('1. Rock,Scissors, Paper'));
    console.log(figlet.textSync('2. Number Guessing'));
    console.log(figlet.textSync('3. Quit'));
  
    rl.question('게임을 선택해주세요(1~3 Enter눌러주세요) ', (choice) => {
      if (choice === '1') {
        // console.log('\n=== Rock, Paper, Scissors ===');
        console.log(
          figlet.textSync("Rock! Scissors! Paper!", {
            font: "Slant",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
          })
        );
        playRockPaperScissors();
      } else if (choice === '2') {
        // console.log(figlet.textSync('\n Number Guessing Game'));
        console.log(
          figlet.textSync("Number Guessing Game", {
            font: "Slant",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
          })
        );
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
        console.log(chalk.bold.yellow('유효하지 않은 선택입니다. (1,2,3 중 선택해주세요)'));
        selectGame();
      }
    });
  }
  
  // 게임 시작
  // console.log('Welcome to the CLI Games!');
  console.log(
    figlet.textSync("Welcome to the CLI Games!", {
      font: "Slant",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  selectGame();