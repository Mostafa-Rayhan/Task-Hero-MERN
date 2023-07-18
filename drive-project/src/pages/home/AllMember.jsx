import React from 'react';
import testImage from "../../assets/CardImage/download.jpg";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AppContext } from "../../app.context";
import Avatar from "@mui/material/Avatar";
import base from "../../components/Database";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import ToastSuccess, { ToastError } from "../../components/Toast";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EastIcon from '@mui/icons-material/East';

const AllMember = () => {
    const [mem, setMem]=useState([])
    const [pRefresh, setPRefresh]=useState(false)
    const [po, setPo]=useState(null)

    useEffect(() => {
        axios
          .get(`${base}/member`)
          .then(function (response) {
            console.log("re", response.data);
            setMem(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [pRefresh]);
      const pointChange=(e)=>{
        setPo(e.target.value)

      }

      const increasepoint=(row)=>{

        const updateUser = {
            point: Number(row?.point) + Number(po),
          };
          axios
            .patch(`${base}/member/${row._id}`, updateUser)
            .then(function (response) {
              ToastSuccess("point added")
              setPRefresh(!pRefresh) 

              // console.log(response);
            })
            .catch(function (error) {
              ToastError(error?.message);
              console.log(error);
            });

      }

      const deleteDoc = (row) => {
        axios
          .delete(`${base}/member/${row._id}`)
          .then(function (response) {
            setPRefresh(!pRefresh);
            ToastSuccess("Successfully deleted member");

            // console.log(response);
          })
          .catch(function (error) {
            ToastError(error?.message);
            console.log(error);
          });
      }

    return (
        <div>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Remaining Points</TableCell>
                <TableCell align="right">Increase Points</TableCell>
                <TableCell align="right">Delete</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {mem?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                   {row?.name}
                  </TableCell>
                  <TableCell align="right">{row?.email}</TableCell>
                  <TableCell align="right">{row?.point}</TableCell>
                  <TableCell align="right">
                   <div className='flex justify-end items-center gap-3 '>
                    <input type="number" onChange={pointChange} placeholder='type' className='border-2 border-gray-400 py-1 rounded-md px-2 ' />
                   <button
                      onClick={() => increasepoint(row)}
                      className="bg-transparent border-0 "
                    >
                      <EastIcon style={{color:"#1E3A8A"}} />
                    </button>
                   </div>
                  </TableCell>
                  <TableCell align="right">
                  <button
                      onClick={() => deleteDoc(row)}
                      className="bg-transparent border-0 "
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </button>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        </div>
    );
};

export default AllMember;
