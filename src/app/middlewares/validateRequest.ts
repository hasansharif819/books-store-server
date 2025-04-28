import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

const validateRequest =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(
        { body: req.body },
        { abortEarly: false, stripUnknown: true } // good practice options
      );
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.details.map((detail: any) => detail.message),
      });
    }
  };

export default validateRequest;
