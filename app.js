import * as compose from "docker-compose";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = await compose.ps({ cwd: path.join(__dirname) });
var output = "";
result.data.services.forEach((service) => {
    if (service.name == "web") {
        output = service.state;
    }
});

if (output.length == 0) {
    console.log("Server is down.");
}
else if (output.length > 0) {
    console.log("Server is up.");
}
