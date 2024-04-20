import Axios from 'axios'

let path =  "http://localhost:3001/"

const url = `${path}api/projects`

const postProjects = async (content) => {
    try{
    const response = await Axios.post(url, content)
    return response
    }catch(e){
        return e
    }
}   

export default {postProjects}