import {Container} from "inversify";
import {ILogger} from "../Services/Logger/interface/ILogger";
import {Types} from "./Types";
import {Logger} from "../Services/Logger/classes/Logger";
import {ICarOnSaleClient} from "../Services/CarOnSaleClient/interface/ICarOnSaleClient";
import {CarOnSaleClient} from "../Services/CarOnSaleClient/classes/CarOnSaleClient";
import {ICarOnSaleApi} from "../Services/CarOnSaleApi/interface/ICarOnSaleApi";
import {CarOnSaleApi} from "../Services/CarOnSaleApi/classes/CarOnSaleApi";
import {AxiosModule} from "./AxiosConfig";

const container = new Container({
    defaultScope: "Singleton",
});

container.bind<ILogger>(Types.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(Types.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<ICarOnSaleApi>(Types.CAR_ON_SALE_API).to(CarOnSaleApi);
container.load(AxiosModule);

export  {container};