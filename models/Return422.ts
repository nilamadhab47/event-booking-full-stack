import ValidationError from "./ValidationError";
import ReturnBase from "./ReturnBase";

class Return422 extends ReturnBase {
    public errors: Array<ValidationError>;

    public constructor(errors: any) {
        super(422, "Unprocessable Entity")
        let errorsTemp: ValidationError[] = [];
        if(errors != undefined){
            errors.forEach(
                (error: { msg: string; param: string; location: string; }) => {
                    errorsTemp.push(new ValidationError(error.msg, error.param, error.location))
                }
            )}
        this.errors = errorsTemp;
    }
}

export default Return422;