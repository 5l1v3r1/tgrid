import { WebConnector } from "../../protocols/web/module";
import { Driver } from "../../components/module";
import { InvalidArgument } from "tstl/exception/InvalidArgument";

import { ICalculator } from "../controllers/ICalculator";
import { complete } from "./internal";

window.onload = async () =>
{
    for (let i: number = 0; i < 5; ++i)
    {
        let connector: WebConnector<null, null> = new WebConnector(null, null);
        await connector.connect("ws://127.0.0.1:10489");
        
        let driver: Driver<ICalculator> = connector.getDriver();
        if (driver instanceof Driver === false)
            throw new InvalidArgument("Error on Driver type checking");

        await ICalculator.main(driver);
        await connector.close();
    }
    complete();
};