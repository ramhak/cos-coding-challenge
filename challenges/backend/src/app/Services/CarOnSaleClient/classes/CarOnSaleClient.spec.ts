import {expect} from "chai";
import 'reflect-metadata';
import {CarOnSaleClientBuilder} from "./TestHelper";
import {container} from "../../../Configs/InversifyConfig";

describe("get running auctions", () => {

    describe("number of auctions", () => {
        it("should be 0 when there are no auctions", async () => {
            const client = new CarOnSaleClientBuilder(container)
                .build();
            expect((await client.getRunningAuctions("")).numberOfRunningAuctions).eq(0);
        });
        it("should return the number of running auctions", async () => {
            const client =new CarOnSaleClientBuilder(container)
                .anAuction()
                .buildAuction()
                .anAuction()
                .buildAuction()
                .build();
            expect((await client.getRunningAuctions("")).numberOfRunningAuctions).eq(2);

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
            let runningAuctions = await client.getRunningAuctions("");
            expect(runningAuctions.auctions[0].numberOfBids).eq(1);
            expect(runningAuctions.auctions[1].numberOfBids).eq(2);
        })
        it("should return the id of each auctions",async ()=>{
            let expectedId = "6612fcfd-6d1b-4492-a4d9-5dac3a296039";
            let client = new CarOnSaleClientBuilder(container)
                .anAuction()
                .withId(expectedId)
                .buildAuction()
                .build();
            expect((await client.getRunningAuctions("")).auctions[0].id).eq(expectedId);
        })
        it("should return the progress of each auction",async ()=>{
            let client = new CarOnSaleClientBuilder(container)
                .anAuction()
                .withMinimumRequiredAsk(2000)
                .withCurrentHighestBidValue(1600)
                .buildAuction()
                .build();
            expect((await client.getRunningAuctions("")).auctions[0].auctionProgress).eq('80%');
        })

    })

});
