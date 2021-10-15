const request = require("request");
const cheerio = require("cheerio");


function main(url) {

    request(url, function (error, response, body) {
        // console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        const $ = cheerio.load(body);
        const text = $("a").text();
        console.log(text);
    });

}


main("https://yalchin.info/blog");