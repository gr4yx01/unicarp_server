import Joi from "joi";

const groupSchema = Joi.object().keys({
    name: Joi.string().required(),
    visibility: Joi.string().required(),
    description: Joi.string().required(),
    userId: Joi.string().required()
})

export default groupSchema