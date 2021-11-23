import {expect} from "chai";
import {Container} from "inversify";
import {DependencyIdentifier} from "../../../DependencyIdentifiers";
import {CarOnSaleClient} from "./CarOnSaleClient";
import 'reflect-metadata';
import {CarOnSaleClientBuilder} from "./TestDSL";

describe("get running auctions", () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
        container.bind(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient)
    });

    describe("number of auctions", () => {
        it("should be 0 when there are no auctions", async () => {
            const client = new CarOnSaleClientBuilder(container)
                .build()
            expect((await client.getRunningAuctions()).numberOfRunningAuctions).eq(0);
        });
        it("should return the number of running auctions", async () => {
            const client =new CarOnSaleClientBuilder(container)
                .anAuction()
                .buildAuction()
                .anAuction()
                .buildAuction()
                .build()
            expect((await client.getRunningAuctions()).numberOfRunningAuctions).eq(2);

        });
    });
    describe("the auctions", () => {
        it("should return number of bids for each auction", async () => {
            const client = new CarOnSaleClientBuilder(container)
                .anAuction()
                .withNumBids(1)
                .buildAuction()
                .anAuction()
                .withNumBids(2)
                .buildAuction()
                .build();
            let runningAuctions = await client.getRunningAuctions();
            expect(runningAuctions.auctions[0].numberOfBids).eq(1)
            expect(runningAuctions.auctions[1].numberOfBids).eq(2)
        })

    })

});
