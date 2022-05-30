import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/user.service";
import EditButton from "./editbutton.component";
export default function InternInformation() {
  const { id } = useParams();
  const [editableField,setEditableField] = useState([false,false,false,false,false,false,false,false,false]);
  const [intern, setIntern] = useState({
    fullName: "",
    phoneNumber: "",
    major: "",
    result: Boolean,
    startDay: "",
    endDay: "",
    year: Number,
    cv: "",
  });
  const [backup, setBackup] = useState({});

  useEffect(() => {
    UserService.retriveAIntern(id).then(
      (res) => {
        console.log("there");
        console.log(res.data.data);
        setIntern(res.data.data);
    
      },
      (err) => {
        alert(err.message);
      }
    );
 
    setEditableField([false,false,false,false,false,false,false,false,false]);

  }, [id]);

  function handleEdit(e) {
    const id=parseInt(e.target.id);

    // setIntern(backup);
    setBackup({});
    setEditableField((preValue)=>{
      return preValue.map((item,index)=>{
         return id===index?true:false;
      })
    });
    console.log(editableField);
  }
  function handleInput(e) {
    var { name, value } = e.target;
    if(name==="cv") value=e.target.files[0];
    console.log(name,value);
    setBackup((preValue) => {
      return {
        [name]: name === "result" ? !preValue.result : value,
      };
    });
  }
  function handleCancel(e) {
    setBackup({});
    setEditableField(()=>{
      return editableField.map((item)=>{
         return false;
      })
    });
    // setIntern(backup);

  }
  function handleUpdate(){
    //add object backup to intern chua xong
    const formData = new FormData();
      for (var key in backup) {
        formData.append(key, backup[key]);
      }
      for (var value of formData.values()) {
        console.log(value);
     }
    UserService.updateIntern(id,formData).then((res)=>{
      const data=res.data.data;
      console.log(data);
      const name=Object.keys(data)[0];
      var value= data[Object.keys(data)[0]];
      if(name==="result") value='true'?true:false;
      setIntern(preValue=>{
        return {
          ...preValue,
          [name]: value
        }
      });
      setBackup({});
      setEditableField(()=>{
        return editableField.map((item)=>{
           return false;
        })
      });
    },err=>{
      alert(err.message);
    });
    
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
                <h5 className="my-3">{intern.fullName}</h5>
                {/* <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row" id="row-1" >
                  <div className="col-sm-3 ">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="text-muted mb-0 edit-field"
                      name="fullName"
                      onChange={handleInput}
                      value={!editableField[1]?intern.fullName:backup.fullName}
                      placeholder="your fullname"
                      disabled={!editableField[1]}
                    />
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[1] && 'inline-block'}}>
                    <EditButton
                      id={'1'}
                      editable={editableField[1]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-2">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone Number</p>
                  </div>
                  <div className="col-sm-6">
                    {/* <p class="text-muted mb-0">{intern.phoneNumber}</p> */}
                    <input
                      type="text"
                      className="text-muted mb-0 edit-field"
                      name="phoneNumber"
                      onChange={handleInput}
                      // onClick={}
                      value={!editableField[2]?intern.phoneNumber:backup.phoneNumber}
                      placeholder="your phone number"
                      disabled={!editableField[2]}
                    />
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[2] && 'inline-block'}}>
                    <EditButton
                      id={'2'}
                      editable={editableField[2]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-3">
                  <div className="col-sm-3">
                    <p className="mb-0">Major</p>
                  </div>
                  <div className="col-sm-6">
                    {/* <p class="text-muted mb-0">{intern.major}</p> */}
                    <input
                      type="text"
                      className="text-muted mb-0 edit-field"
                      name="major"
                      onChange={handleInput}
                      value={!editableField[3]?intern.major:backup.major}
                      placeholder="your major"
                      disabled={!editableField[3]}
                    />
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[3] && 'inline-block'}}>
                    <EditButton
                      id={'3'}
                      editable={editableField[3]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-4">
                  <div className="col-sm-3">
                    <p className="mb-0">Year Study</p>
                  </div>
                  <div className="col-sm-6">
                    <select
                      className="text-muted mb-0 edit-field"
                      name="year"
                      onChange={handleInput}
                      disabled={!editableField[4]}
                    >
                      <option value="1" selected={intern.year === 1}>
                        1st year
                      </option>
                      <option value="2" selected={intern.year === 2}>
                        2nd year
                      </option>
                      <option value="3" selected={intern.year === 3}>
                        3rd year
                      </option>
                      <option value="4" selected={intern.year === 4}>
                        4nd year
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[4] && 'inline-block'}}>
                    <EditButton
                      id={'4'}
                      editable={editableField[4]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-5">
                  <div className="col-sm-3">
                    <p className="mb-0">Start Day</p>
                  </div>
                  <div className="col-sm-6" >
                    {/* <p class="text-muted mb-0">{intern.startDay}</p> */}
                    <input
                      type="date"
                      className="text-muted mb-0 edit-field"
                      onChange={handleInput}
                      name="startDay"
                      value={!editableField[5]?intern.startDay:backup.startDay}
                      disabled={!editableField[5]}
                    />
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[5] && 'inline-block'}}>
                    <EditButton
                      id={'5'}
                      editable={editableField[5]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-6">
                  <div className="col-sm-3">
                    <p className="mb-0">End Day</p>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="date"
                      className="text-muted mb-0 edit-field"
                      onChange={handleInput}
                      name="endDay"
                      value={!editableField[6]?intern.endDay:backup.endDay}
                      disabled={!editableField[6]}
                    />
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[6] && 'inline-block'}}>
                    <EditButton
                      id={"6"}
                      editable={editableField[6]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-7">
                  <div className="col-sm-3">
                    <p className="mb-0">Result</p>
                  </div>
                  <div className="col-sm-6">
                    {!editableField[7] ? (
                      <p className="text-muted mb-0">
                        {intern.result ? "Passed" : "Failed"}
                      </p>
                    ) : (
                      <>
                        <input
                          hidden={!editableField[7]}
                          className="text-muted mb-0 edit-field"
                          type="checkbox"
                          onChange={handleInput}
                          value={!editableField[7]?intern.result:backup.result}
                          name="result"
                          // checked={backup.result}
                        />
                        <label
                          hidden={!editableField[7]}
                          className="text-muted mb-0 edit-field"
                        >
                          Passed ?
                        </label>
                      </>
                    )}
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[7] && 'inline-block'}}>
                    <EditButton
                      id={'7'}
                      editable={editableField[7]}
                      handleUpdate={handleUpdate}
                      handleEdit={handleEdit}
                      handleCancel={handleCancel}
                    />
                  </div>
                </div>
                <hr />
                <div className="row" id="row-8">
                  <div className="col-sm-3">
                    <p className="mb-0">CV</p>
                  </div>
                  <div className="col-sm-6">
                    {!editableField[8] ? (
                      <a
                        className="text-muted mb-0"
                        href={intern.cv}
                        target="_blank"
                        rel="noreferrer"
                      >
                        CV
                      </a>
                    ) : (
                      <>
                        <input
                          className="text-muted mb-0 edit-field"
                          type="file"
                          size="sm"
                          name="cv"
                          onChange={handleInput}
                        />
                      </>
                    )}
                  </div>
                  <div className="col-sm-3 btnField" style={{display: editableField[8] && 'inline-block'}}>
                    <EditButton
                      id={'8'}
                      editable={editableField[8]}
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
    </div>
  );
}
