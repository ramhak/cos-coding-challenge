import {Container} from "inversify";
import {ILogger} from "../services/Logger/interface/ILogger";
import {Types} from "./Types";
import {Logger} from "../services/Logger/classes/Logger";
import {ICarOnSaleClient} from "../services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CarOnSaleClient} from "../services/CarOnSaleClient/classes/CarOnSaleClient";
import {ICarOnSaleApi} from "../services/CarOnSaleApi/interface/ICarOnSaleApi";
import {CarOnSaleApi} from "../services/CarOnSaleApi/classes/CarOnSaleApi";
import {AxiosModule} from "./AxiosConfig";

const container = new Container({
    defaultScope: "Singleton",
});

container.bind<ILogger>(Types.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(Types.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<ICarOnSaleApi>(Types.CAR_ON_SALE_API).to(CarOnSaleApi);
container.load(AxiosModule);

export  {container};