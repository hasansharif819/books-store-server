import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AuthorService from "./author.service";

const createAuthor = catchAsync(async (req: Request, res: Response) => {
  const author = await AuthorService.createAuthor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Author created successfully",
    data: author,
  });
});

const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const { id, name, page, limit } = req.query;

    const filters = {
      id: id ? Number(id) : undefined,
      name: name as string | undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    };

    const result = await AuthorService.getAllAuthors(filters);

    res.status(200).json({
      success: true,
      message: "Authors fetched successfully",
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
};

const getAuthorByID = catchAsync(async (req: Request, res: Response) => {
  const author = await AuthorService.getAuthor(parseInt(req.params.id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author fetched successfully",
    data: author,
  });
});

const updateAuthor = catchAsync(async (req: Request, res: Response) => {
  const updatedAuthor = await AuthorService.updateAuthor(
    parseInt(req.params.id),
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author updated successfully",
    data: updatedAuthor,
  });
});

const deleteAuthor = catchAsync(async (req: Request, res: Response) => {
  await AuthorService.deleteAuthor(parseInt(req.params.id));
  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: "Author deleted successfully",
  });
});

const AuthorControllers = {
  createAuthor,
  getAllAuthors,
  getAuthorByID,
  updateAuthor,
  deleteAuthor,
};

export default AuthorControllers;
