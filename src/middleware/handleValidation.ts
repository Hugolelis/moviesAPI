import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

export const validate = (req: Request, res: any, next: NextFunction) => {
    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }

    const extractedErrors: { [key: string]: string }[] = [];
    errors.array().map((err: ValidationError) => 
        extractedErrors.push({ [err.type]: err.msg })
    );

    return res.status(422).json({
        errors: extractedErrors
    })
}