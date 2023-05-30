class ValidationError {
    public msg: string;
    public param: string;
    public location: string;

    public constructor(msg: string, param: string, location: string) {
        this.msg = msg;
        this.param = param;
        this.location = location;
    }
}

export default ValidationError;