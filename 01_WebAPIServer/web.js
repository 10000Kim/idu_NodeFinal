const express = require('express');
const app = express();
const path = require('path');
const PORT = 5001;

app.use(express.static(path.join(__dirname, 'public')));

let players = [
  { id: 1, name: '메시', position: '공격수' },
  { id: 2, name: '홀란드', position: '공격수' },
  { id: 3, name: '음바페', position: '공격수' },
  { id: 4, name: '네이마르', position: '공격수' },
  { id: 5, name: '로드리', position: '미드필더' },
  { id: 6, name: '이강인', position: '미드필더' },
  { id: 7, name: '모드리치', position: '미드필더' },
  { id: 8, name: '김민재', position: '수비수' },
  { id: 9, name: '후벵 디아스', position: '수비수' },
  { id: 10, name: '존 스톤스', position: '수비수' },
];

// Get all players
app.get('/api/players', (req, res) => {
    res.json(players);
  });
  
  app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  });