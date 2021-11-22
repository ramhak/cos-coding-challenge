import {ICarOnSaleClient, IRunningAuctionsResult} from "../interface/ICarOnSaleClient";
import {inject, injectable} from "inversify";
import "reflect-metadata"
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {ICarOnSaleApi} from "../../CarOnSaleApi/interface/ICarOnSaleApi";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    constructor(@inject(DependencyIdentifier.CAR_ON_SALE_API) private api: ICarOnSaleApi) {
    }

    async getRunningAuctions(userId: string = ""): Promise<IRunningAuctionsResult> {
        let allBiddingData = await this.api.getSalesmanAllBiddingData(userId);
        return Promise.resolve({
            numberOfRunningAuctions: allBiddingData.length,
            auctions: [
                {
                    numberOfBids: 1
                }
            ]

        });
    }

}