export interface ISalesmanAllBiddingDataResult {
    numBids:number
}

export interface ICarOnSaleApi {
    getSalesmanAllBiddingData(userId: string): Promise<ISalesmanAllBiddingDataResult[]>
}