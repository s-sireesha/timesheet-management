import React from "react";
import { useEffect, useState } from "react";
import "./AdminPro.css";
import Nav2 from "../adminnav/nav2";
import axios from "axios";

const AdminPro = () => {
  //search filter
  const [search, setSearch] = useState("");

  // state for getting the data
  const [details, setDetails] = useState(null);
  // get req function
  const getprofile = async () => {
    const response = await axios.get("http://localhost:4000/api/admin/allemployees");
    const data = response.data;
    setDetails(data);
  };
  useEffect(() => {
    getprofile();
  }, []);

  const [idss,setid]=useState("")
  const [image,setimage]=useState("")

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setimage({slip:reader.result,
      month:"march"})
    };
  };


  const uploadpayslip = (e) => {
    previewFile(e.target.files[0])
    console.log(idss)
  };


  const onSubmit=async()=>{
   
    console.log(idss)
    await axios.post(`http://localhost:4000/api/admin/payslip/upload/${idss}`,image)
    .then(res=>console.log(res.data.message))
  }
  //-----------------------------------------------------------------------------------------------

  // Delete Request
  const deleteprofile = async (id) => {
    await axios.delete(`http://localhost:4000/api/admin/delete/${id}`)
    .then(res=>alert(res.data.message))
    getprofile();
  };

  return (
    <div className="section">
      <Nav2/>
      
      <div className="getting-data">
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="searchprofile"
            placeholder="search employee email"
          />

          {details &&
            details.filter((item) => item.email.includes(search)).map((item,i) => {
              return (
                <div className="cards">
                  <div className="card">
                    <p>{item.email}</p>
                    <p>{item.employeeid}</p>
                    <p>{item.name}</p>
                    <div className="buttons">
                      <button onClick={() => deleteprofile(item._id)} className="delete">Delete</button>

                      <div className="payslipuploading">
                        <form onSubmit={(e)=>{
                          e.preventDefault();
                          setid(item._id)
                          return(
                            onSubmit()
                          )
                        }} className="form">
                          <input type="file" required onChange={uploadpayslip} ></input>
                      <button className="upload">Upload</button>
                      </form>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
        </div>
    </div>
  );
};

export default AdminPro;