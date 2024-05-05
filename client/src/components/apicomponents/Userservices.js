import Axios from 'axios'

let path =  "http://localhost:3001"

const url = `${path}/api/users`

const getUsers = async () => {
    try{
    const response = await Axios.get(url)
    return response
    }catch(e){
        return e
    }
}   

export default {getUsers}