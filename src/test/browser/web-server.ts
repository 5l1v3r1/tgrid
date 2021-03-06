import { WebServer } from "../../protocols/web/module";
import { Calculator } from "../providers/Calculator";

async function main(): Promise<void>
{
    let server: WebServer<{}, Calculator> = new WebServer();
    let index: number = 0;

    await server.open(10489, async acceptor =>
    {
        await acceptor.accept(new Calculator());
        
        await acceptor.join();
        if (++index === 5)
            await server.close();
    });
}
main();