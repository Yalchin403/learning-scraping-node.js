/** @type {typeof import('telegraf').Telegraf} */
const Telebot = require('telebot');
const dotenv = require('dotenv');
const { download_and_convert } = require("./youtube_scraper")


dotenv.config();
const TOKEN = process.env.BOT_TOKEN;
const bot = new Telebot(TOKEN);


// bot.on('text', (msg) => msg.reply.text(msg.text));

// bot.on(/(show\s)?kitty*/, (msg) => {
//     return msg.reply.photo('http://thecatapi.com/api/images/get');
// });

bot.on("text", (msg) => {
    try {
        download_and_convert(msg.text, "./music/music.mp3", "./video/video.mp4");
        return bot.sendAudio('./music/music.mp3');
    }
    catch (err) {
        console.log(err);
    }
});


bot.start();