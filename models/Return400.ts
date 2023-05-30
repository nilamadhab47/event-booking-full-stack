import ReturnBase from "./ReturnBase";

class Return400 extends ReturnBase {
    public constructor(msg: string) {
        super(400, "Bad Request: " + msg)
    }
}

export default Return400;