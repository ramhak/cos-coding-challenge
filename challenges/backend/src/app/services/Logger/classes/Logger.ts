import {ILogger} from "../interface/ILogger";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class Logger implements ILogger {

    public constructor() {
    }

    error(message: string): void {
        console.log(`[ERROR]: ${message}`);
    }

    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }

}