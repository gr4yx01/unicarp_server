import Joi from "joi";

const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    facultyId: Joi.string().required(),
    departmentId: Joi.string().required(),
    academicLevel: Joi.string().required(),
    password: Joi.string().required()
})

export default userSchema