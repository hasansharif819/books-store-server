import httpStatus from "http-status";
import prisma from "../../utils/prisma";
import ApiError from "../../utils/appError";
import { Author, IAuthorFilters } from "../../types";

const createAuthor = async (authorData: Author) => {
  const newAuthor = await prisma.authors.create({
    data: authorData,
  });
  return newAuthor;
};

const getAllAuthors = async (filters: IAuthorFilters) => {
  const { id, name, page = 1, limit = 10 } = filters;
  const skip = (page - 1) * limit;

  const whereCondition: any = {};

  if (id) {
    whereCondition.id = id;
  }

  if (name) {
    whereCondition.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  const [authors, total] = await Promise.all([
    prisma.authors.findMany({
      where: whereCondition,
      skip,
      take: limit,
      include: {
        books: true,
      },
    }),
    prisma.authors.count({
      where: whereCondition,
    }),
  ]);

  return {
    data: authors,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getAuthor = async (id: number) => {
  const author = await prisma.authors.findUnique({
    where: { id },
    include: {
      books: true,
    },
  });

  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found");
  }

  return author;
};

const updateAuthor = async (id: number, data: Partial<Author>) => {
  await prisma.authors.findUniqueOrThrow({ where: { id } });

  const updatedAuthor = await prisma.authors.update({
    where: { id },
    data,
  });

  return updatedAuthor;
};

const deleteAuthor = async (id: number) => {
  const author = await prisma.authors.findUnique({ where: { id } });

  if (!author) {
    throw new ApiError(httpStatus.NOT_FOUND, "Author not found");
  }

  const deletedAuthor = await prisma.authors.delete({
    where: { id },
  });

  return deletedAuthor;
};

const AuthorServices = {
  createAuthor,
  getAllAuthors,
  //   searchAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};

export default AuthorServices;
