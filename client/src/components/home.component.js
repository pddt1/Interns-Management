import React, { useState, useEffect } from "react";
import Intern from "./intern.component";
import "bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@mui/icons-material/Add";
import CreateIntern from "./createIntern.component";
import UserService from "../services/user.service";

function Home() {
  const [interns, setInterns] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    UserService.retriveAllIntern().then(
      (res) => {
        console.log(res.data.data);
        setInterns(res.data.data);
      },
      (err) => {
        alert(err.message);
      }
    );
  }, []);

  function adding() {
    setIsOpen(true);
  }
  function hideModal() {
    setIsOpen(false);
  }
  function addIntern(newIntern) {
    console.log("newIntern");
    console.log(newIntern);
    setInterns((preInterns) => [...preInterns, newIntern]);
  }
  function deleteIntern(id) {
    UserService.deleteIntern(id).then(res=>{
        setInterns((preInterns) => {
            return preInterns.filter((intern) => {
              // console.log(noteItem._id+ ' '+id);
              return intern._id !== id;
            });
          })
    },err=>{
        alert(err.message);
    })
    
  }
  // function internPage(){
  //     let path='/intern/'
  // }
  return (
    <>
      <CreateIntern isOpen={isOpen} hideModal={hideModal} onAdd={addIntern} />
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col" onClick={adding}>
          <div className="card h-100 add-component">
            <div className="row g-0 ">
              <h1 className="d-flex justify-content-center">Adding</h1>
            </div>
          </div>
        </div>

        {interns.map((intern, index) => {
          return (
            <Intern
              key={index}
              id={intern._id}
              name={intern.fullName}
              major={intern.major}
              year={intern.year}
              result={intern.result}
              onDelete={deleteIntern}
              // onClick={internPage}
            />
          );
        })}
      </div>
    </>
  );
}
export default Home;
