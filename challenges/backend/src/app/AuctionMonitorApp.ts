import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Types} from "./Configs/Types";
import "reflect-metadata";
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(Types.LOGGER) private logger: ILogger,
        @inject(Types.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);
        let runningAuctions = await this.carOnSaleClient.getRunningAuctions(process.env.USER_EMAIL);
        console.log(runningAuctions);
    }

}
