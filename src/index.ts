import express, { json, urlencoded } from 'express'
import groupRouter from './routes/group'
import userRouter from './routes/user'
import messageRouter from './routes/message'
import facultyRouter from './routes/faculty'
import departmentRouter from './routes/department'
import authRouter from './routes/auth'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(json())
app.use(cors())

app.use('/auths', authRouter)
app.use('/groups', groupRouter)
app.use('/users', userRouter)
app.use('/messages', messageRouter)
app.use('/faculties', facultyRouter)
app.use('/departments', departmentRouter)

app.listen(3000, () => {
    console.log('Server started')
})