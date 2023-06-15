const chalk = require('chalk');
const readline = require('readline');
const figlet = require("figlet");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let seconds = 6;
let check = 0;
let show = 0;
let Rule = 0;
let play = 1;
let Tot = 0;
let Cnt = 0;
const Rule_1 = "이겨주세요 (1) 보, (2) 가위, (3) 바위";
const Rule_2 = "비겨주세요 (1) 보, (2) 가위, (3) 바위";
const Rule_3 = "져주세요 (1) 보, (2) 가위, (3) 바위";

function main() {
  RandomPic();
  RandomWord();

  rl.on('line', (input) => {
    const choice = parseInt(input);

    play++;
    checkRule(choice);

    RandomPic();
    RandomWord();
    seconds = 6;

    if (play >= 11) {
     //console.log("Game Over!");
      console.log(
        figlet.textSync("Game Over!", {
          font: "Slant",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 80,
          whitespaceBreak: true,
        })
       );
      console.log("총 점수: " + Cnt);
      rl.close();
    } else {
      console.log("라운드: " + play);
      console.log("점수: " + Cnt);
    }
  });
}

function RandomWord() {
  const num = getRandomNumber(0, 90);

  if (0 <= num && num <= 29) {
    console.log(chalk.bold("조건: " + Rule_1));
  } else if (30 <= num && num <= 59) {
    console.log(chalk.bold("조건: " + Rule_2));
  } else {
    console.log(chalk.bold("조건: " + Rule_3));
  }
}

function RandomPic() {
  const num = getRandomNumber(0, 90);

  if (0 <= num && num <= 29) {
    check = 3;
    console.log(chalk.bold("바위"));
  } else if (30 <= num && num <= 59) {
    check = 2;
    console.log(chalk.bold("가위"));
  } else {
    check = 1;
    console.log(chalk.bold("보"));
  }
}

function checkRule(num) {
  if (num === 3) {
    if (Rule_1 === "이겨주세요") {
      if (check === 2) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    } else if (Rule_1 === "비겨주세요") {
      if (check === 3) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    } else {
      if (check === 1) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    }
  } else if (num === 2) {
    if (Rule_1 === "이겨주세요") {
      if (check === 1) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    } else if (Rule_1 === "비겨주세요") {
      if (check === 2) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    } else {
      if (check === 3) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    }
  } else {
    if (Rule_1 === "이겨주세요") {
      if (check === 3) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    } else if (Rule_1 === "비겨주세요") {
      if (check === 1) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    } else {
      if (check === 2) {
        Cnt += 5;
        console.log("You win!");
        console.log("점수: " + Cnt);
      }
    }
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//console.log("Game Start!");
console.log(
      figlet.textSync("Start!", {
        font: "Dancing Font",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
     );
console.log(chalk.bold.bgBlue("라운드: " + play));

console.log(chalk.bold.bgMagenta("점수: " + Cnt));


console.log(chalk.bold.bgYellow("선택해주세요!!: (1) 보, (2) 가위, (3) 바위"));

main();
