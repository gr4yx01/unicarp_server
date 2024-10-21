import express, { json, urlencoded } from 'express'
import groupRouter from './routes/group'
import userRouter from './routes/user'
import messageRouter from './routes/message'
import facultyRouter from './routes/faculty'
import departmentRouter from './routes/department'

const app = express()

app.use(json())

app.use('/groups', groupRouter)
app.use('/users', userRouter)
app.use('/messages', messageRouter)
app.use('/faculties', facultyRouter)
app.use('/departments', departmentRouter)

app.listen(3000, () => {
    console.log('Server started')
})