const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');
const chalk = require('chalk')
const fs = require('fs');

// 사용자 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 웹 페이지 스크래핑 함수
function scrapeWebPage(url) {
  axios.get(url)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html);

      // 스크래핑할 요소 선택 및 처리
      const title = $('h1').text();
      const description = $('p').text();

      // 결과 출력
      console.log(chalk.bold.blue('Title:', title));
      console.log(chalk.bold.red('Description:', description));

      // 데이터 저장
      const scrapedData = {
        title,
        description
      };
      const jsonData = JSON.stringify(scrapedData, null, 2);
      const filename = 'scraped_data.json';
      fs.writeFile(filename, jsonData, 'utf8', err => {
        if (err) {
          console.log('Error:', err);
        } else {
          console.log(chalk.bold.yellow(`스크랩한 데이터를 저장했습니다! ${filename}`));
        }
      });
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// 사용자로부터 웹 페이지 URL 입력 받기
rl.question('스크랩할 웹 페이지의 URL을 입력해주세요! ', url => {
  scrapeWebPage(url);
  rl.close();
});
