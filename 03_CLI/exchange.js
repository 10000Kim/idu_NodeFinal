const axios = require('axios');       // HTTP 요청을 보내기 위한 패키지
const readline = require('readline'); // 사용자 입력을 받기 위한 패키지
const chalk = require('chalk')        // 콘솔 출력 스타일링을 위한 패키지
const fs = require('fs');             // 파일 시스템 접근을 위한 패키지
const figlet = require("figlet");     // 콘솔 출력 스타일링을 위한 패키지

const API_URL = 'https://api.exchangerate-api.com/v4/latest/KRW';

function getExchangeRates() {
  return axios.get(API_URL)
    .then(response => response.data.rates)
    .catch(error => {
      console.error(chalk.red('환율 정보를 가져올 수 없습니다.'));
      process.exit(1);
    });
}

console.log(
  figlet.textSync("KRW Exchange", {
    font: "Dancing Font",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  }))

async function convertCurrency(amount, rates) {
  const result = [];
  result.push(chalk.yellow.bold(`${amount} KRW을 환전한 결과:`));
  result.push(chalk.magenta.bold(`일본 엔화 (JPY): ${amount * rates.JPY}￥`));
  result.push(chalk.red.bold(`중국 위안화 (CNY): ${amount * rates.CNY}¥`));
  result.push(chalk.blue.bold(`미국 달러 (USD): ${amount * rates.USD}$`));

  return result;
}

async function saveToFile(data) {
  fs.writeFile('exchange_result.txt', data.join('\n'), (err) => {
    if (err) {
      console.error(chalk.bold('파일 저장 중 오류가 발생했습니다.'));
    } else {
      console.log(chalk.bgBlue.bold('결과가 exchange_result.txt 파일에 저장되었습니다.'));
    }
  });
}

async function runProgram() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const rates = await getExchangeRates();

  rl.question(chalk.green.bold('환전할 한국 돈(KRW) 금액을 입력하세요: '), async (input) => {
    const amount = parseFloat(input);
    if (isNaN(amount) || amount <= 0) {
      console.error('유효하지 않은 금액입니다.');
      rl.close();
      process.exit(1);
    }

    const result = await convertCurrency(amount, rates);
    console.log(result.join('\n'));
    saveToFile(result);

    rl.close();
  });
}

runProgram();
