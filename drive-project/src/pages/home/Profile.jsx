import React, { useContext, useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from '@mui/material/Avatar';
import { AppContext } from "../../app.context";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

const Profile = () => {
    const [user, setUser]=useState()
    const [myUpload, setMyUpload]=useState([])
    const [a, setA]=useState([])
    const [r, setR]=useState([])
    const { sRefresh, setSRefresh, allFiles, setAllFiles} = useContext(AppContext);

    useEffect(() => {
      const getUser = JSON.parse(localStorage.getItem("driveUser"));
      if (getUser) {
        setUser(getUser)
      }
    }, []);
    useEffect(() => {
        if(user){
            const total =allFiles.filter(f=>f.uploader_email==user.email)
            setMyUpload(total)
        }

    }, [allFiles, user]);
    useEffect(() => {

            const ap =myUpload.filter(f=>f.status=="approved")
            setA(ap)


    }, [myUpload]);
    useEffect(() => {

            const ap =myUpload.filter(f=>f.status=="cancelled")
            setR(ap)


    }, [myUpload]);
  return (
    <div>
        <div className="w-fit mx-auto mt-6 mb-16 profileSciton">
        <Avatar sx={{bgcolor: "#F000B8", height:"3em", width:"3em "}}>{user?user.name?.substring(0, 2).toUpperCase():"NO"}</Avatar>
            <h1 className="text-3xl mt-2 font-bold ">{user?.name}</h1>
            <p className="text-base mt-2 font-bold ">{user?.email}</p>
        </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
        <div className="profileBox flex justify-center items-center text-center rounded-md  ">
          <div>
            <CloudUploadIcon style={{ fontSize: "6em", color: "#1E3A8A" }} />
            <h4 className="text-lg">My Upload</h4>
            <h4 className="text-2xl font-bold pb-2 text-[#1E3A8A] ">{myUpload?.length}</h4>
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
            <PointOfSaleIcon style={{ fontSize: "6em", color: "#1E3A8A" }} /> 
            <h4 className="text-lg">Points</h4>
            <h4 className="text-2xl font-bold pb-2 text-[#1E3A8A] ">{user?.point}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
