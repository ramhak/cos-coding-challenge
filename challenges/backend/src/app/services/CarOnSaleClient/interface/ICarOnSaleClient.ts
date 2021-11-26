export interface IAuctionSummary {
    id: string;
    numberOfBids: number;
    auctionProgress: string;
}

export interface IRunningAuctionsResult {
    auctions: IAuctionSummary[],
    numberOfRunningAuctions: number
}

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(userId: string = ""): Promise<IRunningAuctionsResult>

}
