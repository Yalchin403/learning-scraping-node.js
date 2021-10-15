const request = require("request");
const cheerio = require("cheerio");


/*
sorry I am lazy to look for a website where I can pick up some ids,
so I just loaded some dummy html and used it
 */
function byId() {
        const $ = cheerio.load('<p name="dummy name" id="one">Here is some text</p>');
        const element_name = $("#one").attr("name");
        const element_text = $("#one").text();
        console.log(element_name, element_text);
}


function byClass() {
    const $ = cheerio.load('<p name="dummy name" class="one">Here is some text</p>');
    const element_name = $(".one").attr("name");
    const element_text = $(".one").text();
    console.log(element_name, element_text);
}


byId()
byClass()