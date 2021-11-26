const baseUrl = process.env.BASE_URL;
export const Urls = {
    authentication: (userId:string) =>`${baseUrl}/authentication/${userId}`,
    getAllAuctions: (userId: string) => `${baseUrl}/auction/salesman/${userId}/_all/bidding-data`
}
