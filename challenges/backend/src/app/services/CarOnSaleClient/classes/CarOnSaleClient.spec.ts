import {expect} from "chai";
import {ICarOnSaleClient} from "../interface/ICarOnSaleClient";
import {Container} from "inversify";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {CarOnSaleClient} from "./CarOnSaleClient";
import 'reflect-metadata';
import {ICarOnSaleApi, ISalesmanAllBiddingDataResult} from "../../CarOnSaleApi/interface/ICarOnSaleApi";

describe("get running auctions", () => {
    let container: Container;
    let api: ICarOnSaleApi;
    beforeEach(() => {
        container = new Container();
        container.bind(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient)
    });

    describe("number of auctions", () => {
        it("should be 0 when there are no auctions", async () => {
            api = new CarOnSaleApiStub([]);
            container.bind(DependencyIdentifier.CAR_ON_SALE_API).toConstantValue(api);
            const client = container.get<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT);
            expect((await client.getRunningAuctions()).numberOfRunningAuctions).eq(0);
        });
        it("should return the number of running auctions", async () => {
            api = new CarOnSaleApiStub([{numBids:0}, {numBids:0}]);
            container.bind(DependencyIdentifier.CAR_ON_SALE_API).toConstantValue(api);
            const client = container.get<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT);
            expect((await client.getRunningAuctions()).numberOfRunningAuctions).eq(2);

        });
    });
    describe("the auctions",()=>{
        it("should return number of bids for each auction",async ()=>{
            api = new CarOnSaleApiStub([{numBids:1},{numBids:2}]);
            container.bind(DependencyIdentifier.CAR_ON_SALE_API).toConstantValue(api);
            const client = container.get<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT);
            let runningAuctions = await client.getRunningAuctions();
            expect(runningAuctions.auctions[0].numberOfBids).eq(1)
            expect(runningAuctions.auctions[1].numberOfBids).eq(2)
        })
    })

});

class CarOnSaleApiStub implements ICarOnSaleApi {

    constructor(private data: ISalesmanAllBiddingDataResult[]) {
    }

    getSalesmanAllBiddingData(_userId: string): Promise<ISalesmanAllBiddingDataResult[]> {
        return Promise.resolve(this.data);
    }
}