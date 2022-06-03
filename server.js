import express, { json } from 'express'
import { config } from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import driverRoutes from './routes/driverRoutes.js'
import vehicleRoutes from './routes/vehiclesRoutes.js'
import {connectDB} from './config/db.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'
import http from 'http'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import process from 'process'
import cors from 'cors' 
import { Server, Socket } from 'socket.io'
import { socketConfig } from './socket/socket.rout.js'

const app = express()

const server = http.createServer(app)

socketConfig(server)

// const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(json({ limit: '50mb'}))

config()

connectDB() 
 
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Api is running')
})


app.use('/api/users',userRoutes)
app.use('/api/driver',driverRoutes) 
app.use('/api/vehicles',vehicleRoutes)


const PORT = process.env.PORT || 5000 

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(dirname, '/frontend/build')));
  
//     app.get('*', (req, res, next) =>
//       res.sendFile(
//         'index.html',
//         { root: path.join(dirname, '/frontend/build') },
//         (err) => {
//           if (err) {
//             console.log(err);
//             next(err);
//           }
//         }
//       )
//     );
//   } else {
//     app.get('/', (req, res) => {
//       res.send('API is running....');
//     });
//   }

app.use(notFound)

app.use(errorHandler)

server.listen(
    PORT, 
    console.log(`Server running on port ${PORT}`))  

export { app }

