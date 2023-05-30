class ReturnBase {
    public code: number;
    public msg: string;

    public constructor(code: number, msg: string) {
        this.code = code;
        this.msg = msg;
    }
}

export default ReturnBase;