const puppeteer = require('puppeteer');

let scrape = async () => {
    // Actual Scraping goes Here...
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/');
    // click(selector) allow to perform action click on the element identify by selector
    // to get this selector, I inspect first image, right click, copy, copy selector
    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    //   document.querySelectorAll('.thumbnail')[0];
    // await page.waitFor(1000);

    // Return a value
    // evaluate method allow to use built in DOM selectors like querySelector()
    const result = await page.evaluate(() => {
        let data = [];
        // return array, each li has class product_pod
        let elements = document.querySelectorAll('.product_pod');

        for (var element of elements){
            // I think get text value of the element use innerText is correct
            // but in this case text are truncated, so I use its title attribute
            // let title = element.childNodes[5].innerText;
            let title = element.childNodes[5].children[0].title;
            let price = element.childNodes[7].children[0].innerText;
            data.push({title, price});
        }
        return data;
        // return something
        // let title = document.querySelector('h1').innerText;
        // let price = document.querySelector('.price_color').innerText;
        // return {
        //     title,
        //     price
        // }
    });

    browser.close();
    return result;
};


scrape().then((value) => {
    console.log(value); // Success!
});