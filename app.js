import { ps } from "docker-compose";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = await ps({ cwd: path.join(__dirname) });
result.data.services.forEach((service) => {
    console.log(service.state);    
});
