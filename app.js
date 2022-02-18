const qrcode = require("qrcode-terminal");
const { Client, MessageMedia } = require("whatsapp-web.js");
const { exit } = require("process");
const csv = require("csv-parser");
const fs = require("fs");
const converter = require("json-2-csv");

let results = [];
let failed = [];
parsed = false;

fs.createReadStream("contact.csv")
  .pipe(csv())
  .on("data", (data) => results.push(data))
  .on("end", () => {
    parsed = true;
  });

const media = MessageMedia.fromFilePath("img.png");

msg2 =
  "Exclusive benefits for you\n\n◇Internship vouchers on selected workshops\n◇Free exclusive NFTs on selected workshops\n◇Certificates for all participants\n\nFor further queries, please fill in: https://forms.gle/d3HJKNoUtPbS8myW7";

// Path where the session data will be stored
const SESSION_FILE_PATH = "./session.json";

// Load the session data if it has been previously saved
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionCfg = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
  puppeteer: { headless: false },
  session: sessionCfg,
});

// const client = new Client({
//   puppeteer: {
//     browserWSEndpoint: `ws://localhost:3000`,
//   },
//   session: sessionCfg,
// });

// Save session values to the file upon successful auth
client.on("authenticated", (session) => {
  console.log("youre in");
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", async () => {
  console.log("Client is ready!");
  Bulkmessage();
});

async function Bulkmessage() {
  for (let i = 0; i < results.length; i++) {
    try {
      num = "";
      msg1 =
        "Hey [name], greetings from Team Tathva . We bring forth an exciting opportunity for you to be a part of Tathva'21 by registering for the Workshop series covering 8 thrilling topics. We would love to have you as a part of Tathva. Also, let everybody get a glimpse of this golden opportunity, share it with your friends and acquaintances and all those who aspire for an academic extravaganza!\n\nRegister now at https://tathva.org/workshops";
      const name = results[i].Name.split(" ")[0]
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
        .join(" ");
      msg1 = msg1.replace("[name]", name);
      if (results[i].Phone_Number.trim().length === 10) {
        num = `91${results[i].Phone_Number.trim()}@c.us`;
      } else {
        num = `${results[i].Phone_Number.trim()}@c.us`;
      }
      console.log(num);
      await client.sendMessage(num, msg1);
      await client.sendMessage(num, msg2);
      await client.sendMessage(num, media);
      await timer(200);
    } catch (err) {
      failed.push(results[i]);
      console.log(`Message Not sent to ${results[i].Phone_Number}`);
      continue;
    }
  }

  console.log(failed);
  converter.json2csv(failed, (err, csv) => {
    if (err) {
      throw err;
    }
    // write CSV to a file
    fs.writeFileSync("failed.csv", csv);
  });
}

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

client.on("message_create", async (msg) => {
  if (msg.to === "91<number_here>@c.us") {
    if (msg.body === "!stop") {
      exit(0);
    }
    if (msg.body === "!start" && parsed) {
      Bulkmessage();
    }
  }
});

client.initialize();
