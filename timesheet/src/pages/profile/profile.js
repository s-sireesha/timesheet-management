import React from "react";
import { useState, useEffect } from "react";
import Nav2 from "../../component/navbars/nav2";
import "./profile.css";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

const Profile = () => {
  //calendar function
  const [value, onChange] = useState(new Date());

  // getting data from local storage
  let gettinguser = JSON.parse(localStorage.getItem("MyUser"));
  let userid = gettinguser._id;
  let profilepic=gettinguser.profile

  // updating user extra and basic detail
  const [basicdetail, setbasicdetail] = useState({});
  const collectdata = (e) => {
    const { name, value } = e.target;
    setbasicdetail({
      ...basicdetail,
      [name]: value,
    });
    setvalue(e.target.value);
  };
  const updatedetail = async (e) => {
    e.preventDefault();

    if(basicdetail.pnumber.length<10 || basicdetail.pnumber.length>=11 || isNaN(basicdetail.pnumber)){
      alert("please enter the valid mobile number")
    }
 else{
  await axios
  .patch(`https://timesheets-project.herokuapp.com/api/signinup/${userid}`, basicdetail)
  .then((res) => {
    alert(res.data.message);
  });
getuserdata();
 }
  };

  // ------------------------------------------------------------------------------------------------
  // getting data from data base
  // fetching data from data base for this user
  const [fetchdata, setvalue] = useState({});
  const getuserdata = async () => {
    const response = await axios.get(
      `https://timesheets-project.herokuapp.com/api/signinup/singleuser/${userid}`
    );
    const userdetail = response.data;
    setvalue(userdetail);
    // updating the local storage
    localStorage.setItem("MyUser", JSON.stringify(userdetail));
  };

  useEffect(() => {
    getuserdata();
  }, []);

  // ------------------------------------------------------------------------------------------------
  // for not editind and readonly
  const [require, readonl] = useState(true);
  const change = () => {
    if (require === true) {
      readonl(false);
    } else {
      readonl(true);
    }
  };

  // ------------------------------------------------------------------------------------------------
  // getting leaves for count

  const leave={
    email: gettinguser.email,
  }
  const [leaves, setleaves] = useState([]);

  const countleaves = async () => {
    await axios
      .post("https://timesheets-project.herokuapp.com/api/signinup/leaves", leave)
      .then((res) => {
        setleaves(res.data.user);
      })
    getuserdata();
  };

  useEffect(() => {
    countleaves();
  }, []);

  // ------------------------------------------------------------------------------------------------
  // image uploading
  const [image,setimage]=useState("")

  const previewFile = (file) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setimage(
      {  profile:reader.result})
    };
  };


  const uploadImage = (e) => {
    let selectedfile=e.target.files[0]
    previewFile(selectedfile)
  };




  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios.patch(
      `https://timesheets-project.herokuapp.com/api/signinup/updateimage/${userid}`,image
    );
    getuserdata();
  };



  // ------------------------------------------------------------------------------------------------

  return (
    <div>
      <Nav2 />
      <div className="profile">
        {/* left-side */}
        <div className="profile-left">
          <div className="profile-left-box1">
            <div className="profile-image">
              <img src={profilepic} alt="profile"></img>

              <form  onSubmit={handlesubmit} encType="">
                <input
                  type="file"
                  name="photo"
                  onChange={uploadImage}
                  className="profile-image-upload"
                ></input>
                <input type="submit" className="image-uploading-button"></input>
              </form>
             
            </div>
            <div className="profile-box1-details">
              <form onSubmit={updatedetail}>
                <pre>Full Name : </pre>{" "}
                <input
                  type="text"
                  required
                  readOnly={require}
                  name="fullname"
                  onChange={collectdata}
                  value={fetchdata.fullname}
                />
                <pre>Email :</pre>{" "}
                <input
                  type="email"
                  required
                  readOnly={require}
                  name="email"
                  onChange={collectdata}
                  value={fetchdata.email}
                />
                <pre>Student ID : </pre>{" "}
                <input
                  type="text"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata._id}
                />
                <pre>Contact No : </pre>{" "}
                <input
                  type="number"
                  required
                  readOnly={require}
                  name="pnumber"
                  onChange={collectdata}
                  value={fetchdata.pnumber}
                />
                <pre>Department : </pre>{" "}
                <input
                  type="text"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.department}
                />
                <pre>DOB : </pre>{" "}
                <input
                  type="text"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.DOB}
                />
              </form>
            </div>
          </div>

          <div className="profile-left-box2">
            <div className="leaves-counter">
              <h2>{leaves.length}/10</h2>
            </div>

            <div className="leaves-token">
              <h2 className="leaves-tokkrn-heading">Leaves Taken</h2>

              <div className="leaves-token-list">
                {leaves.map((date,i) => {
                  return <h6 key={i}>Leave taken on {date.date}</h6>;
                })}
              </div>
            </div>
          </div>
        </div>
        {/* left-side end */}

        {/* right-side */}
        <div className="profile-right">
          <div className="profile-right-box1">
            <div className="profile-right-box1-top">
              <h2>BASIC INFORMATION</h2>
              <button onClick={change}>
                Edit <img src="./images/pencil.png" alt=""></img>
              </button>
            </div>

            <div className="profile-right-box1-details">
              <form onSubmit={updatedetail}>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.role}
                ></input>

                <input
                  type="date"
                  name="DOB"
                  placeholder="Date of Birth"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.DOB}
                />

                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.department}
                />

                <input
                  type="text"
                  name="preaddress"
                  placeholder="Present Address"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.preaddress}
                />

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.location}
                />

                <input
                  type="tel"
                  name="pnumber"
                  placeholder="Number"
                  required
                  readOnly={require}
                  onChange={collectdata}
                  value={fetchdata.pnumber}
                />

                <button type="submit">Save</button>
              </form>
            </div>
          </div>

          <div className="profile-right-box2">
            <div className="calendar">
              <Calendar onChange={onChange} value={value} />
            </div>

            <div className="timesheet-action">
              <div>timesheet 1</div>
              <div>timesheet 2</div>
              <div>timesheet 3</div>
              <div>timesheet 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
