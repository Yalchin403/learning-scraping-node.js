const request = require("request");
const cheerio = require("cheerio");


function main(url) {
    request(url, (error, response, body) => {
        const $ = cheerio.load(body);
        const text = $("a").text();   // here are multiple a elements
        $("a").each((index, element) => {
            console.log($(element).text().trim());
        });
    })
}


main("https://yalchin.info/blog");