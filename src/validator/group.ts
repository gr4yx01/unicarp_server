import Joi from "joi";

const groupSchema = Joi.object().keys({
    name: Joi.string().required(),
    visibility: Joi.string().required(),
    description: Joi.string().required(),
    departmentId: Joi.string(),
    facultyId: Joi.string(),
    level: Joi.string()
})

export default groupSchema