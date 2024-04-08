const Joi = require("joi");

const listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
});

let reviewSchema = Joi.object({
  reviews: Joi.object({
    rating: Joi.number().integer().min(0).max(5),
    description: Joi.string().required(),
  }).required(),
});

module.exports = { listingSchema, reviewSchema };
