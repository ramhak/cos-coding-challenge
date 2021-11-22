export interface ISalesmanAllBiddingDataResult {
}

export interface ICarOnSaleApi {
    getSalesmanAllBiddingData(userId: string): Promise<ISalesmanAllBiddingDataResult[]>
}