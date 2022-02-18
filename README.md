# Whatsapp Bulk Message Bot

## Instructions

### Setting up the environment.

 - Make sure you have node installed on your system. To check if you have it installed, open your terminal and type in `node`. If no error shows up, you're good. Else, [Download Node](https://nodejs.org/en/download/)
 - Clone this git repository into your system using the clone command: `git clone <repository url>`
 - Open the cloned project folder in your terminal.
 - Run `npm install` to install the required packages and dependencies required to run the app. It may take some time. Be patient :)

 ### Setting up the code.

 - Edit the `contact.csv` file to add in the numbers and name of the recepients of your message. **(Do not change the titles of the csv file)**
 - If you want to send an image along with your messages, copy the image file into the project folder. Then open the file `app.js` in your favourite text editor (VS Code for noobs, Vim for Pros) and change the line `const  media  =  MessageMedia.fromFilePath("<your image file name.file_extension");`. Also make sure that the line `await client.sendMessage(num, media);` is not commented out. If you don't want to send an image, comment the above mentioned line.
 - Now change the message that you want to send by changing the variable `msg1` in `app.js`. Remember that the message should be in one line, and any line breaks should be mentioned explicitly using the new line escape sequence `\n`. Wherever in the message you need to print out the contact's name that you provided in the csv, insert `[name]`.
 - If you want to send two text messages at once, uncomment the line `await client.sendMessage(num, msg2);` and change the vairable `msg2` into the message that you want to send just like you did for msg1.
 - To start sending the bulk messages, you have to initiate the function. For that, you have to send a message: `!start` to the whatsapp number mentioned in the line: `if (msg.to === "91<number_here>@c.us")`. More on this later.

 ### Running the app.

 - Now run the app.js file by typing `node ./app.js` in your terminal in the project directory.
 - A Chromium window will pop up, opening web.whatsapp.com. Scan the qr code, login to whatsapp.
 - Now send `!start` to the number that you added into the code to initiate the send function.
 - Sit back and enjoy watching people get spammed :)

 ### Failed messages

 - If there was an error sending messages to any of the contacts in the csv, the numbers can be found in the file `failed.csv` in the project directory.