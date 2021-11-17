const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const puppeteer = require("puppeteer");
const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg");
const shortId = require("shortid");

let playListUrl = "https://www.youtube.com/playlist?list=PLaq1Za1A2ZfuHg8ihMWxoVlO_N2ITbgMR";
// let url = "https://www.youtube.com/watch?v=wQ3uStFEOcs"
let video_path;
let mp3_path;
let id;
// main(playListUrl).then(a_tags => {

//     console.log(a_tags);
//     a_tags.forEach((item) => {
//         id = shortId.generate();
//         video_path = `./videos/${id}.mp4`;
//         mp3_path = `./mp3s/${id}.mp3`;
//         download_and_convert(item);

//     });
// });

// let video_path = "./videos/video.mp4";
// let mp3_path = "./mp3s/music.mp3"



async function main(url) {

    try {
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();

        await page.goto(playListUrl, { waitUntil: 'networkidle0' });
        const data = await page.evaluate(() => document.querySelector('*').outerHTML);

        // getting first 100 videos of the playlist
        const $ = await cheerio.load(data);
        const a_tags = $("#video-title").map((i, x) => $(x).attr('href')).toArray(); // array
        // make them https link
        a_tags.forEach((item, index) => {
            a_tags[index] = "https://youtube.com/" + item;
        })
        // console.log(a_tags);
        await browser.close();
        return a_tags
    } catch (err) {
        console.error(err);
    }

}

function download_and_convert(url, mp3_path, video_path){
     ytdl(url, { filter: format => format.container === 'mp4' })


         .on('end', () => {

             try {
                 convert_into_mp3(video_path, mp3_path, (err) => {
                     if (err) {
                         console.log("Following error occured:", err);
                     } else {
                         console.log("Conversion completed");
                     }
                 })
             }   catch (err) {
                 console.log("Error occurred while converting into mp3")
             }

         })
        .pipe(fs.createWriteStream(video_path));


}


function convert_into_mp3(video_path, mp3_path){
    try {
        let process = new ffmpeg(video_path);
        process.then(function (video) {
            // Callback mode
            video.fnExtractSoundToMP3(mp3_path, function (error, file) {
                if (!error){
                    console.log('Audio file: ' + file);
                    //  delete the video after conversion done

                    
                    try {
                        fs.unlinkSync(video_path)
                        //file removed
                        console.log(`${video_path} removed successfully`)
                    } catch(err) {
                        console.error(err)
                    }
                }
                else {
                    console.log(error.message);
                }
            });
        }, function (err) {
            console.log('Error: ' + err);
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
}


// let url = "https://www.youtube.com/watch?v=CeN5pYX77vA";
// video_path = "./video/video.mp4";
// mp3_path = "./music/music.mp3";

// download_and_convert(url);
exports.download_and_convert = download_and_convert;