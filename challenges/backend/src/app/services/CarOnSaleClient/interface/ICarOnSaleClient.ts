export interface IRunningAuctionsResult {
    numberOfRunningAuctions:number
}

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {

    getRunningAuctions(userId: string = ""): Promise<IRunningAuctionsResult>

}
