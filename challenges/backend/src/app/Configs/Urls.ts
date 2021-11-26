const baseUrl = "https://api-core-dev.caronsale.de/api/v1";
export const Urls = {
    authentication: (userId:string) =>`${baseUrl}/authentication/${userId}`,
    getAllAuctions: (userId: string) => `${baseUrl}/auction/salesman/${userId}/_all/bidding-data`
}
