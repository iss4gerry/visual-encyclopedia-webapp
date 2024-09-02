import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import router from './routes/index'

const app = express()
const publicPath = path.join(__dirname, 'public')
const port: number = 3000
app.use(express.static(publicPath))
app.set('view engine', 'ejs') 
app.set('views', path.join(__dirname, 'views'))
 
app.use(express.urlencoded({ limit:'10mb', extended: true }))
app.use(express.json({ limit:'10mb' }))

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

app.use(router)

app.get('/', (req: Request, res: Response) => {
    res.render('index.ejs')
})
