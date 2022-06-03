import React, { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import Header from '../components/Header'
import { axiosInstance } from '../config'
import { getUser } from '../actions/userActions'


const TripsScreen = () => {

    const { userInfo } = useSelector(state => state.userInfo)

    const dispatch = useDispatch()


    const getAllTrips =async () => {

        if(userInfo){

            const user = JSON.parse(userInfo.user)

            const id = user._id

            console.log("id:",id)

            const { data } = await axiosInstance.get(
                `/api/users/trips${id}`
            )

            console.log(data,"11111111122222222222222333333333333")
            
        }

    }

    const getUsers = () => {
        
        dispatch(getUser())

    }


    useEffect(() => {

        getUsers()

        getAllTrips()

    },[])



    return (
        <>
        <Header/>
        <Container className='py-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
        </>
    )
}

export default TripsScreen