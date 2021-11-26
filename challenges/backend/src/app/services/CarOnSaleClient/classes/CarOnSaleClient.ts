import {ICarOnSaleClient, IRunningAuctionsResult} from "../interface/ICarOnSaleClient";
import {inject, injectable} from "inversify";
import "reflect-metadata"
import {Types} from "../../../Configs/Types";
import {ICarOnSaleApi} from "../../CarOnSaleApi/interface/ICarOnSaleApi";
import {ILogger} from "../../Logger/interface/ILogger";

const formatter = Intl.NumberFormat("en-US",{style: "percent"})
@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    constructor(
        @inject(Types.CAR_ON_SALE_API) private api: ICarOnSaleApi,
        @inject(Types.LOGGER) private logger:ILogger
        ) {}

    async getRunningAuctions(userId: string = ""): Promise<IRunningAuctionsResult> {
        this.logger.log(`Start getRunningAuctions(${userId})`);
        let allBiddingData = await this.api.getSalesmanAllBiddingData(userId);
        return {
            numberOfRunningAuctions: allBiddingData.length,
            auctions: allBiddingData.map(d => ({
                id: d.uuid,
                numberOfBids: d.numBids,
                auctionProgress: formatter.format((d.currentHighestBidValue / d.minimumRequiredAsk))

            }))
        }
    }

}
