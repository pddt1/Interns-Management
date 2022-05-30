import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Intern(props) {
  let navigate = useNavigate();
  function deleteIntern(e) {
    console.log(props.id);
    props.onDelete(props.id);
    e.stopPropagation();
  }
  function handleClick() {
    let path = "/intern/" + props.id;
    navigate(path);
  }
  return (
    <div className="col">
      <div className="card h-100 card-hover" onClick={handleClick}>
        <div className="row g-0">
          <div className="col-md-4">
            <div className="card-body">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="img-fluid rounded-circle"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>
              <p>Major: {props.major}</p>
              <p className="card-text">Study year: {props.year}</p>
              <p className="card-text">
                Status: {props.result === true ? "Passed" : "Failed"}
              </p>
              <div className="button-intern">
                <button onClick={deleteIntern} type="button" className="btn btn-danger btn-sm">
                  Delete
                </button>
                {/* <button type="button"> Edit</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intern;
