const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
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


scrape().then((movieList) => {
    console.log(movieList);
    let mList = document.getElementById('movie-list');
    var ul = document.createElement('ul');
    mList.appendChild(ul);
    movieList.forEach(function(movie){
        console.log(movie);
        // var li = document.createElement('li');
        // ul.appendChild(li);
		// li.innerHTML += movie;
    });
});