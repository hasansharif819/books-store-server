import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import BookServices from "./books.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookServices.createBook(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: book,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  try {
    const { title, author, page, limit } = req.query;

    const filters = {
      title: title as string | undefined,
      author: author as number | undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    };

    const result = await BookServices.getBooks(filters);

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: result.data,
      meta: result.meta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: (error as Error).message,
    });
  }
});

const getBookByID = catchAsync(async (req: Request, res: Response) => {
  const book = await BookServices.getBookByID(parseInt(req.params.id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book is fetched successfully",
    data: book,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const book = await BookServices.updateBook(Number(req.params.id), req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "You have successfully updated Book",
    data: book,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  await BookServices.deleteBook(Number(req.params.id));
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Book is deleted successfully",
  });
});

const BookControllers = {
  createBook,
  getBooks,
  getBookByID,
  updateBook,
  deleteBook,
};

export default BookControllers;
