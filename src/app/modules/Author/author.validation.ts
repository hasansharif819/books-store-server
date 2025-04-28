import Joi from "joi";

// Create Author Validation
const CreateAuthorValidation = Joi.object({
  body: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Author name is required",
    }),
    bio: Joi.string().optional(),
    birthdate: Joi.date().required().messages({
      "any.required": "Birthdate is required",
    }),
  }),
});

// Update Author Validation
const UpdateAuthorValidation = Joi.object({
  body: Joi.object({
    name: Joi.string().optional(),
    bio: Joi.string().optional(),
    birthdate: Joi.date().optional(),
  }),
});

const AuthorValidations = {
  CreateAuthorValidation,
  UpdateAuthorValidation,
};

export default AuthorValidations;
