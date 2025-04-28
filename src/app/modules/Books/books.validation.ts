import Joi from "joi";

// Create Book Validation
const CreateBookValidation = Joi.object({
  body: Joi.object({
    title: Joi.string().required().messages({
      "string.empty": "Book title is required",
    }),
    description: Joi.string().optional().allow(null),
    publishedDate: Joi.date().required().messages({
      "any.required": "Published date is required",
    }),
    author_id: Joi.number().integer().required().messages({
      "any.required": "Author ID is required",
    }),
  }),
});

// Update Book Validation
const UpdateBookValidation = Joi.object({
  body: Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional().allow(null),
    publishedDate: Joi.date().optional(),
    author_id: Joi.number().integer().optional(),
  }),
});

const BookValidations = {
  CreateBookValidation,
  UpdateBookValidation,
};

export default BookValidations;
