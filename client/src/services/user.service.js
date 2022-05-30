import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/';
class UserService {
  addIntern(intern) {
        return axios.post(API_URL + 'post',intern,{ headers: Object.assign({'Content-Type': 'multipart/form-data'},authHeader())});
  }
  retriveAllIntern(){
    return axios.get(API_URL +"retrive", { headers: authHeader()});
  }
  retriveAIntern(id){
    return axios.get(API_URL +"intern/"+id, { headers: authHeader()});
  }
  deleteIntern(id){
    return axios.delete(API_URL+"intern/" + id, { headers: authHeader()});
  }
  updateIntern(id,newValue){
    return axios.patch(API_URL+"intern/"+id,newValue,{headers: Object.assign({'Content-Type': 'multipart/form-data'},authHeader())});
  }
  retriveUserInfor(id){
    return axios.get(API_URL+"user/"+id,{ headers: authHeader()});
  }
  updateUser(id,newValue){
    return axios.put(API_URL+"user/"+id,newValue,{ headers: authHeader()});
  }
}
export default new UserService();