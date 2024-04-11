/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


import inquirer from 'inquirer';
import { writeFile, createWriteStream } from 'fs';
import qr from 'qr-image'

inquirer
  .prompt([
    { name: 'url', message: "Enter a URL to turn into a qrcode" } 
  ])
  .then((answers) => {
    const url = answers.url;
    var qr_png = qr.image(url, { type: 'png' });
    qr_png.pipe(createWriteStream("generated_qr_code.png"));

    writeFile("user_url_input.txt", url, (err) => {
        if (err) throw err;
        console.log("User URL input has been saved");
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong", error);
    }
  });

