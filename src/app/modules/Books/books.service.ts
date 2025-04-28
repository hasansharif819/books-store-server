import httpStatus from "http-status";
import prisma from "../../utils/prisma";
import ApiError from "../../utils/appError";
import { IBookFilters } from "../../types";

const createBook = async (bookData: any) => {
  // const isExist = await prisma.books.findUnique({
  //   where: {
  //     title: bookData.title,
  //   },
  // });
  // if (isExist) {
  //   throw new Error("Book already exist!");
  // }
  const newBook = await prisma.books.create({
    data: bookData,
  });
  return newBook;
};

const getBooks = async (filters: IBookFilters) => {
  const { title, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const whereCondition: any = {};

  if (title) {
    whereCondition.title = {
      contains: title,
      mode: "insensitive",
    };
  }

  const [books, total] = await Promise.all([
    prisma.books.findMany({
      where: whereCondition,
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            birthdate: true,
            bio: true,
          },
        },
      },
    }),
    prisma.books.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: books,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBookByID = async (id: number) => {
  const book = await prisma.books.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          bio: true,
          birthdate: true,
        },
      },
    },
  });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found!");
  }

  return book;
};

const updateBook = async (bookId: number, bookData: any) => {
  await prisma.books.findUniqueOrThrow({
    where: {
      id: bookId,
    },
  });

  const updatedBook = await prisma.books.update({
    where: {
      id: bookId,
    },
    data: bookData,
  });
  return updateBook;
};

const deleteBook = async (bookId: number) => {
  const book = await prisma.books.findUnique({ where: { id: bookId } });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book is not found");
  }
  const deletedBook = await prisma.books.delete({
    where: {
      id: bookId,
    },
  });
  return deletedBook;
};

const BookServices = {
  createBook,
  getBooks,
  getBookByID,
  updateBook,
  deleteBook,
};

export default BookServices;
