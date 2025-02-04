import {ICarOnSaleApi, ISalesmanAllBiddingDataResult} from "../../CarOnSaleApi/interface/ICarOnSaleApi";
import {Container} from "inversify";
import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {Types} from "../../../Configs/Types";
import {CarOnSaleClient} from "./CarOnSaleClient";

export class CarOnSaleApiStub implements ICarOnSaleApi {
    constructor(private data: ISalesmanAllBiddingDataResult[]) {
    }

    getSalesmanAllBiddingData(_userId: string): Promise<ISalesmanAllBiddingDataResult[]> {
        return Promise.resolve(this.data);
    }
}

export class CarOnSaleClientBuilder {

    constructor(private container: Container, private auctions: ISalesmanAllBiddingDataResult[] = []) {
        this.auctions = auctions;
        this.container = container;
    }

    anAuction() {
        return new AuctionBuilder(this);
    };

    addAuction(auction: ISalesmanAllBiddingDataResult) {
        this.auctions.push(auction);
    }

    build(): ICarOnSaleClient {
        let carOnSaleApiStub = new CarOnSaleApiStub(this.auctions);
        this.container.rebind(Types.CAR_ON_SALE_API).toConstantValue(carOnSaleApiStub)
         this.container.rebind(Types.CAR_ON_SALE_CLIENT).to(CarOnSaleClient)
        return this.container.get(Types.CAR_ON_SALE_CLIENT);
    }
}

export class AuctionBuilder {
    private auction: ISalesmanAllBiddingDataResult;

    constructor(private p: CarOnSaleClientBuilder) {
        this.auction = {
            uuid: "",
            numBids: 0,
            minimumRequiredAsk:1,
            currentHighestBidValue:0
        };
    }

    withNumBids(numBids: number): AuctionBuilder {
        this.auction.numBids = numBids;
        return this;
    }

    buildAuction(): CarOnSaleClientBuilder {
        this.p.addAuction(this.auction)
        return this.p;
    }

    withId(id: string): AuctionBuilder {
        this.auction.uuid = id;
        return this;
    }

    withMinimumRequiredAsk(minimumRequiredAsk: number) {
        this.auction.minimumRequiredAsk = minimumRequiredAsk;
        return this;
    }

    withCurrentHighestBidValue(currentHighestBidValue: number) {
       this.auction.currentHighestBidValue = currentHighestBidValue;
       return this;
    }
}