import { Server } from 'socket.io'


export const socketConfig = (server) => {

    const io = new Server(server, {

        cors: {
            origin: "*",
            methods: "*",
        }
        
    })


    let location;



    io.on("connection", socket => {

        // const nsp = io.of("/driver")
        
        // nsp.on("connection", (socket) => {
            
            socket.on("message", (data) => {
    
                console.log("received data****************************************************** : ", data)

                io.emit("data", data)
    
                location = data
    
            })


            console.log("connected to namespace", socket.id)

            socket.on("cancel_trip", data => {

                console.log("cancel trip successfull", data)

                io.emit("driver_rejected", data)


            })

            socket.on("confirmation",data => {

                console.log("data received when confirm driver : ", data)
                // console.log("socket id: ",socket.id)
                
                // io.to(socket.id).emit('driver_info', data.driverId)

                io.emit('driver_info',data.driverId)
               
                // io.to(socket.id).emit('driver_info',Id)

            })

            socket.on('pin_verified',data => {

                console.log("data after driver verify the pin ",data)

                io.emit('start_trip',"start")

            })

            socket.on('reached_destination',data => {

                io.emit('reached_location',data)

            })

            console.log("socket :", socket.id)

            socket.on("driver_reached", (data) => {

                io.emit("reached_pickup", data)

            })

            socket.on("connect_error", (err) => {

                console.log(`connect_error due to ${err.message}`);

            });


        // })



    })


}