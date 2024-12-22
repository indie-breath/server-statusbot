import * as compose from "docker-compose";
import path from "node:path";
import * as fs from "node:fs";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setInterval(async function() {
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
}, 5 * 1000);
