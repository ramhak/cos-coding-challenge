export interface ISalesmanAllBiddingDataResult {
    uuid: string
    numBids: number
    minimumRequiredAsk: number,
    currentHighestBidValue: number
}

export interface ICarOnSaleApi {
    getSalesmanAllBiddingData(userId: string): Promise<ISalesmanAllBiddingDataResult[]>
}