import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";

export default function Register() {
    const [validated, setValidated] = useState(false);
  const [formState,setFormState]=useState({
      username: "",
      password: "",
      phone:"",
      email:"",
      successful:false,
      message: ""
  });
  const navigate=useNavigate();

  useEffect(() =>{
    const user=AuthService.getCurrentUser();
    if(user){
      return navigate("/");
    }
    setValidated(false);
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
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
        e.stopPropagation();
    }
    else{
        setFormState(preState=>{
            return {
              ...preState,
              message: "",
              successful: false
            }
          })
          AuthService.register(formState.username,formState.password,formState.email,formState.password).then(res=>{
            setFormState(preState=>{
              return {
                ...preState,
                message: res.data.message,
                successful: true
              }
            })
          },err=>{
            setFormState(preState=>{
              return {
                ...preState,
                message: err.response.data.message,
                successful: false
              }
            })
          });
         
    }
    setValidated(true);

  }
  return (
    <div className="col-md-12">
    <div className="card card-container center-card">
      <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
      />
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      { !formState.successful &&
         ( <>
            <FloatingLabel
            className="mb-2"
            controlId="formUserName"
            label="Username"
          >
            <Form.Control
              required
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleInput}
              value={formState.username}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-2"
            controlId="formPhone"
            label="Phone Number"
          >
            <Form.Control
              required
              type="tel"
              placeholder="Phone Number"
              name="phone"
              onChange={handleInput}
              value={formState.phone}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="formEmail" label="Email">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleInput}
              value={formState.email}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="formPassword" label="Password">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              value={formState.password}
            />
          </FloatingLabel>
          <div className="form-group text-center">
            <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
            </div>
         </>)
            }
            {formState.message && (
          <div className="form-group">
            <div
              className={
                formState.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {formState.message}
            </div>
          </div>
        )}
      </Form>
      {/* <form noValidate validated={validated} onSubmit={handleSubmit}>
      {!formState.successful && ( 
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                required
                type="text"
                className="form-control"
                name="username"
                value={formState.username}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                required
                type="tel"
                className="form-control"
                name="phone"
                value={formState.phone}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                required
                type="email"
                className="form-control"
                name="email"
                value={formState.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                required
                type="password"
                className="form-control"
                name="password"
                value={formState.password}
                    onChange={handleInput}
              />
            </div>
            <div className="form-group text-center">
    
            <button className="btn btn-primary btn-block">Sign Up</button>
    
           
            </div>
          </div>
        )}
       {formState.message && (
          <div className="form-group">
            <div
              className={
                formState.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {formState.message}
            </div>
          </div>
        )}
      </form> */}
    </div>
  </div>

  );
}