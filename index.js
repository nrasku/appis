const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000

express().use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/space_invaders', (req, res) => res.render('pages/spaceInvaders'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  showTimes = () => {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
      result += i + ' ';
    }
    return result;
  }