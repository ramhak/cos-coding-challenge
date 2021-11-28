import {ICarOnSaleApi, ISalesmanAllBiddingDataResult} from "../interface/ICarOnSaleApi";
import {inject, injectable} from "inversify";
import {Urls} from "../../../Configs/Urls";
import {Axios, AxiosResponse} from "axios";
import {Types} from "../../../Configs/Types";
import {ILogger} from "../../Logger/interface/ILogger";


@injectable()
export class CarOnSaleApi implements ICarOnSaleApi {

    constructor(@inject(Types.LOGGER) private logger: ILogger,
                @inject(Types.AXIOS) private axios:Axios) {
    }

    async getSalesmanAllBiddingData(userId: string): Promise<ISalesmanAllBiddingDataResult[]> {
        this.logger.log(`Start getSalesmanAllBiddingData(${userId})`);
        let {data} = (await this.axios.get<ISalesmanAllBiddingDataResult[], AxiosResponse<ISalesmanAllBiddingDataResult[]>>(Urls.getAllAuctions(userId)));
        return data;
    }
}

