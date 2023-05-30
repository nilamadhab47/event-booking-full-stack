import ReturnBase from "./ReturnBase";

class Return405 extends ReturnBase {
    public constructor(msg: string) {
        super(405, "Method Not Allowed: " + msg)
    }
}

export default Return405;