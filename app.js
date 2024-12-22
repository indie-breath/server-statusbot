import * as compose from "docker-compose";
import path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";
import { Client, Events, GatewayIntentBits} from "discord.js";
import * as dotenv from "dotenv";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);

fetch(process.env.DISCORD_CHANNEL, {
    body: JSON.stringify({
        content: "Testing message",
    }),
    headers: {
        "Content-Type": "application/json",
    },
    method: "POST",
})
    .then(function (res) {
        console.log(res);
    })
    .catch(function (res) {
        console.log(res);
    });

/*setInterval(async function() {
    const result = await compose.ps({ cwd: path.join(__dirname) });
    var output = "";
    var oldOutput;

    result.data.services.forEach((service) => {
        if (service.name == "web") {
            output = service.state;
        }
    });

    if (output.length == 0) {
        fs.writeFile("status.txt", "Server is down.", function (err) {
            if (err) throw err;
        });
        oldOutput = "Server is down.";
    }
    else if (output.length > 0) {
        fs.writeFile("status.txt", "Server is up.", function (err) {
            if (err) throw err;
        });
        oldOutput = "Server is down.";
    }

    console.log("Ran everything.");
}, 5 * 1000);*/
