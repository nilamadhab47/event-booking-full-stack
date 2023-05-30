import ReturnBase from "./ReturnBase";

class Return404 extends ReturnBase {
    public constructor(msg: string) {
        super(404, "Not Found: " + msg)
    }
}

export default Return404;