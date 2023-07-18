import React, { useContext, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from '@mui/material/Avatar';
import { AppContext } from "../../app.context";
import axios from "axios";
import base from "../../components/Database";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import PeopleIcon from '@mui/icons-material/People';

const AdminProfile = () => {
    const [user, setUser]=useState()
    const [myUpload, setMyUpload]=useState([])
    const [a, setA]=useState([])
    const [r, setR]=useState([])
    const { sRefresh, setSRefresh, allFiles, setAllFiles} = useContext(AppContext);
    const [members, setMembers] = useState([]);



    useEffect(() => {
      const getUser = JSON.parse(localStorage.getItem("driveUser"));
      if (getUser) {
        setUser(getUser)
      }
    }, []);
    useEffect(() => {
        axios
          .get(`${base}/member`)
          .then(function (response) {
            console.log("re", response.data);
            setMembers(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);

    useEffect(() => {

            const ap =allFiles.filter(f=>f.status=="approved")
            setA(ap)


    }, [allFiles]);
    useEffect(() => {

            const ap =allFiles.filter(f=>f.status=="cancelled")
            setR(ap)


    }, [allFiles]);
  return (
    <div>
        <div className="w-fit mx-auto mt-6 mb-16 profileSciton text-center ">
        <Avatar sx={{bgcolor: "#F000B8", height:"3em", width:"3em "}}>{user?user.name?.substring(0, 2).toUpperCase():"NO"}</Avatar>
            <h1 className="text-3xl mt-2 font-bold text-center ">{user?.name}</h1>
            <p className="text-base mt-2 font-bold ">{user?.email}</p>
        </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        <div className="profileBox flex justify-center items-center text-center rounded-md  ">
          <div>
            <CloudUploadIcon style={{ fontSize: "6em", color: "#1E3A8A" }} />
            <h4 className="text-lg">Total Files</h4>
            <h4 className="text-2xl font-bold pb-2 text-[#1E3A8A] ">{allFiles?.length}</h4>
          </div>
        </div>
        <div className="profileBox flex justify-center items-center text-center rounded-md  ">
          <div>
            <ThumbUpAltIcon style={{ fontSize: "6em", color: "#1E3A8A" }} />
            <h4 className="text-lg">Accepted</h4>
            <h4 className="text-2xl font-bold pb-2 text-[#1E3A8A] ">{a?.length}</h4>
          </div>
        </div>
        <div className="profileBox flex justify-center items-center text-center rounded-md  ">
          <div>
            <ThumbDownAltIcon style={{ fontSize: "6em", color: "#1E3A8A" }} />
            <h4 className="text-lg">Rejected</h4>
            <h4 className="text-2xl font-bold pb-2 text-[#1E3A8A] ">{r?.length}</h4>
          </div>
        </div>
        <div className="profileBox flex justify-center items-center text-center rounded-md  ">
          <div>
            <PeopleIcon style={{ fontSize: "6em", color: "#1E3A8A" }} />
            <h4 className="text-lg">Total Members</h4>
            <h4 className="text-2xl font-bold pb-2 text-[#1E3A8A] ">{members?.length}</h4> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
