import 'dotenv/config'
import { App } from './app'

const PORT = Number(process.env.PORT) || 5331
const app = new App()
app.start(PORT)
