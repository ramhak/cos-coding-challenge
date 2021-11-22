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
            //container.unbind(DependencyIdentifier.CAR_ON_SALE_API);
            api = new StubCarOnSaleApi();
            container.bind(DependencyIdentifier.CAR_ON_SALE_API).toConstantValue(api);
            let client = container.get<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT);
            expect((await client.getRunningAuctions()).numberOfRunningAuctions).eq(0);
        })
    })

});

class StubCarOnSaleApi implements ICarOnSaleApi {
    getSalesmanAllBiddingData(_userId: string): Promise<ISalesmanAllBiddingDataResult[]> {
        return Promise.resolve([]);
    }
}