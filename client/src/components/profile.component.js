import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import EditButton from "./editbutton.component";
export default function InternInformation() {
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [backup, setBackup] = useState({});

  useEffect(() => {
    UserService.retriveUserInfor(id).then(
      (res) => {
        setUser(res.data.data);
      },
      (err) => {
        alert(err.message);
      }
    );
    setEditable(false);
  }, [id]);

  function handleEdit() {
    setEditable(true);
    setBackup(user);
  }
  function handleInput(e) {
    var { name, value } = e.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }
  function handleCancel() {
    setEditable(false);
    setUser(backup);
  }
  function handleUpdate() {
    setEditable(false);
    UserService.updateUser(id, user).then(
      () => {
        const currentUser = localStorage.getItem("user");
        currentUser["username"] = user.username;
        localStorage.setItem("user", currentUser);
      },
      (err) => {
        setUser(backup);
        alert(err.message);
      }
    );
  }
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">{user.username}</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                {/* <div className="row" >
                  <div className="col-sm-3 ">
                    <p className="mb-0">Username</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="text-muted mb-0 edit-field"
                      name="username"
                      onChange={handleInput}
                      value={user.username}
                      placeholder="your usename"
                      disabled={!editable}
                    />
                  </div>
                </div>
                <hr /> */}
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone Number</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="text-muted mb-0 edit-field"
                      name="phone"
                      onChange={handleInput}
                      value={user.phone}
                      placeholder="your phone number"
                      disabled={!editable}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className="text-muted mb-0 edit-field"
                      name="email"
                      onChange={handleInput}
                      value={user.email}
                      placeholder="your email"
                      disabled={!editable}
                    />
                  </div>
                </div>
                <hr />

                <div
                  className="row btnField d-flex justify-content-center"
                  style={{ display: editable && "inline-block" }}
                >
                  <EditButton
                    editable={editable}
                    handleUpdate={handleUpdate}
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
