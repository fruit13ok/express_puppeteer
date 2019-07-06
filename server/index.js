// REQUIREMENTS
// native
const path = require('path')
// 3rd party
const express = require('express')
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser')
// const fetch = require("node-fetch");

// local
const app = express()
const port = process.env.PORT || 8000

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// allow cors to access this backend
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// INIT SERVER
app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// helper functions
let scrape = async () => {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.imdb.com/list/ls000671664/');
    // await page.waitFor(1000);
    const result = await page.evaluate(() => {
        let movieList = [];
        let elements = document.querySelectorAll('.lister-item');
        for (var element of elements){
            let title = element.childNodes[3].children[0].children[1].innerText
            let year = element.childNodes[3].children[0].children[2].innerText
            let rate = element.childNodes[3].children[2].children[0].children[1].innerText
            movieList.push({title, year, rate});
        }
        return movieList;
    });
    browser.close();
    return result;
};

// ROUTES
// root
app.get('/', function (req, res) {
    res.send('hello world');
})

app.get('/api', async function (req, res) {
    // res.json(data);
    // res.send(data);
    scrape().then((movieList) => {
        console.log(movieList);
        // res.status(200).json(movieList);
        res.status(200).send(movieList);
    });
})
