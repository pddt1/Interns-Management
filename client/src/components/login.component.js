import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';


export default function Login() {
  const navigate=useNavigate();
  const [formState,setFormState]=useState({
    username: "",
    password: "",
    loading:false,
    message: ""
})
useEffect(() =>{
  const user=AuthService.getCurrentUser();
  if(user){
    return navigate("/");
  }
},[navigate]);
function handleInput(e){
  const {name,value}=e.target;
  setFormState(preState=>{
    return {
      ...preState,
      [name]:value
    }
  })
}
function handleSubmit(e){
  e.preventDefault();
  setFormState(preState=>{
    return {
      ...preState,
      message: "",
      loading: true
    }
  })
  AuthService.login(formState.username,formState.password).then(()=>{
    navigate("/");
  },err=>{
    console.log(err);
      setFormState(preState=>{
        return {
          ...preState,
          message: err.response.data.message,
          loading: false
        }
      })
  })
}
  return (
    <div className="col-md-12">
    <div className="card card-container center-card">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formState.username}
            onChange={handleInput}
         
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formState.password}
            onChange={handleInput}
          />
        </div>
        <div className="form-group text-center" >
          <button
            className="btn btn-primary btn-block"
            disabled={formState.loading}
          >
            {formState.loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Login</span>
          </button>
        </div>
        {formState.message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {formState.message}
            </div>
          </div>
        )} 
      </form>
    </div>
  </div>

  );
}