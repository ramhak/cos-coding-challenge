import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {container} from "./Configs/InversifyConfig";
import {Types} from "./Configs/Types";
import {ILogger} from "./services/Logger/interface/ILogger";

const app = container.resolve(AuctionMonitorApp);
const logger: ILogger = container.get(Types.LOGGER);

(async () => {
    try {
        await app.start();
    } catch (e) {
        logger.error(e);
        process.exit(1);
    }
})();
