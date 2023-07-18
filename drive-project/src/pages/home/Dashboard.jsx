import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import LogoutIcon from '@mui/icons-material/Logout';
import Person3Icon from '@mui/icons-material/Person3';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const Dashboard = () => {
  const [user, setUser]=useState()
  const navigate=useNavigate()
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("driveUser"));
    if (getUser) {
      setUser(getUser)
    }
  }, []);
  console.log("user", user );

  const logout =()=>{
    localStorage.removeItem('driveUser');
    navigate("/login")

  }

  return (
    <div>
      {/* dashboard  */}
      <div className="bg-blue-900 h-[50px] md:h-[80px] w-full fixed top-0 left-0 z-50 flex items-center justify-start  ">
        <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden ml-2">
          <MenuIcon style={{ color: "white" }} />
        </label>
       {/* <div className="flex justify-start items-start gap-2 ml-4 ">
       <Avatar sx={{bgcolor: "#F000B8"}}>{user?user.name?.substring(0, 2).toUpperCase():"NO"}</Avatar>
       <div>
        <h6 className="text-white font-bold mb-0 ">{user?.name}</h6>
        <p className="text-white ">{user?.email}</p>
       </div>
       </div> */}
       <h1 className="text-3xl font-bold text-[#F000B8] ml-6 ">TASK HERO</h1>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col  ">
          <div className=" h-[50px] md:h-[80px] w-full "></div>

          <div className="p-8 mt-6     ">
            {/* filter section  */}



            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side  ">
          <div className="relative ">
            <div className="h-[50px] md:h-[80px] w-full "></div>
          </div>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80  h-full bg-[#E8EAED]  text-black pt-[100px] lg:pt-6 ">
            {/* Sidebar content here */}
            <div className="flex justify-start items-start gap-2 ml-4 ">
       <Avatar sx={{bgcolor: "#F000B8"}}>{user?user.name?.substring(0, 2).toUpperCase():"NO"}</Avatar>
       <div className="mb-3">
        <h6 className="text-[#1976D2] font-bold mb-0 text-[1.3em]">{user?.name}</h6>
        <p className="text-[#1976D2] ">{user?.email}</p>
       </div>
       </div>

            <li  className="mb-2 ">
              <Link to="/" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><HomeIcon/> Home</Link>
            </li>
            <li  className="mb-2 ">
              <Link to="/most-downloaded" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><CloudDownloadIcon/> Most Downloads</Link> 
            </li>
            <li  className="mb-2 ">
              <Link to="/upload" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><DriveFolderUploadIcon/> Upload Document</Link>
            </li >

            {
              user?.role == "user" &&
              <li className="mb-2 ">
              <Link to="/mydoc" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><AudioFileIcon/> My Documents</Link>
            </li >
            }
            {
              user?.role == "admin" &&
              <li className="mb-2 ">
              <Link to="/allfiles" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><FileCopyIcon/> All Files</Link>
            </li>
            }
            {
              user?.role == "admin" &&
              <li className="mb-2 ">
              <Link to="/alluser" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}> <BeenhereIcon/> All Member</Link>
            </li>
            }
             {
              user?.role == "user" &&
              <li className="mb-2 ">
              <Link to="/profile" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><Person3Icon/> My Profile</Link>
            </li >
            }
             {
              user?.role == "admin" &&
              <li className="mb-2 ">
              <Link to="/admin-profile" style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}><Person3Icon/> Statistics</Link>
            </li >
            }

            <li className="mb-2 " style={{color:"#1976D2", fontWeight:700, fontSize:"1.1em "}}>
              <button onClick={logout}><LogoutIcon/> Log out</button>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
