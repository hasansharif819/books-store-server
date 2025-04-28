import { NextFunction, Request, Response } from 'express';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library';
import prisma from '../utils/prisma';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.message || 'Something went wrong!';

  // Handle Prisma errors
  if (err instanceof PrismaClientValidationError) {
    message = 'Invalid input data!';
    statusCode = 400;
  } else if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      message = 'Record not found!';
      statusCode = 404;
    } else if (err.code === 'P2002') {
      message = `${err?.meta?.target} already exists!`;
      statusCode = 409;
    }
  }

  // Response object
  const response = {
    success: false,
    message,
    errorDetails: process.env.NODE_ENV === 'development' ? err : undefined
  };

  res.status(statusCode).json(response);
};

export default globalErrorHandler;