import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {container} from "./Configs/InversifyConfig";
import {Types} from "./Configs/Types";
import {ILogger} from "./services/Logger/interface/ILogger";
import {password, prompt} from "promptly";

const app = container.resolve(AuctionMonitorApp);
const logger: ILogger = container.get(Types.LOGGER);

(async () => {
    try {
        if (process.env.NODE_ENV === "production") {
            process.env.USER_EMAIL = await prompt("Enter User Email : ")
            process.env.PASSWORD = await password("Enter Password : ",{replace:"*"})
        }
        await app.start();
    } catch (e: any) {
        logger.error(e.message as string);
        process.exit(1);
    }
})();
