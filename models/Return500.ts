import ReturnBase from "./ReturnBase";
import { IncomingWebhook } from '@slack/webhook'


class Return500 extends ReturnBase{

    public constructor(msg: string) {
        super(500, "Internal Server Error: " + msg)
        const url = "https://hooks.slack.com/services/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";
        const webhook = new IncomingWebhook(url);
        webhook.send({text: `Hello from Candleriggs,We are encountering error from \n`,}).then(r => {});
    }

}

export default Return500;