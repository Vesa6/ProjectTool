import Axios from "axios";

let path = "http://localhost:3001/";

const url = `${path}api/projects`;

const postProjects = async (content) => {
  try {
    const response = await Axios.post(url, content);
    return response;
  } catch (e) {
    return e;
  }
};
const updateProject = async (content, id) => {
  try {
    const response = await Axios.put(url+"/"+id, content);
    return response;
  } catch (e) {
    return e;
  }
};

const getProject = async (id) => {
  try {
    const response = await Axios.get(url+"/"+id);
    return response;
  } catch (e) {
    return e;
  }
}
export default { postProjects, updateProject, getProject};
