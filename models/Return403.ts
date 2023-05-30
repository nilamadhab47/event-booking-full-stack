import ReturnBase from "./ReturnBase";

class Return403 extends ReturnBase {
    public constructor(msg: string) {
        super(403, "Forbidden: " + msg)
    }
}

export default Return403;