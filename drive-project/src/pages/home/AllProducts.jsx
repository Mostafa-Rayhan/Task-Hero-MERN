
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



// data for modal
const data = {
  id: 1,
  name: "product 1",
  category: "cat 1",
  sub_category: "sub cat-10",
  sub_sub_category: "sub sub cat-1",
  price: 300,
  uploader: "Miras",
  description: "this is a test product",
  // review: [], // nise korsi nite ta delete kore diyo
  image: testImage,
  learning_subject: [],
  total_view: 10,

  // ami add korlam
  regular_price: 500,
  status: "In Stock",
  rating: 4,

  // reviews
  descriptions:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae animi commodi hic nam placeat voluptates cupiditate nostrum eius rem rerum.",
  author: "Jakir",
  time: "on Feb 2023",
};

const AllProducts = () => {
  const [value, setValue] = useState("1");
  const { allFiles, setAllFiles, refresh, setRefresh } = useContext(AppContext);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [cancelled, setCancelled] = useState([]);

  useEffect(() => {
    const pend = allFiles?.filter((f) => f.status == "pending");
    setPending(pend);
  }, [allFiles]);
  useEffect(() => {
    const approve = allFiles?.filter((f) => f.status == "approved");
    setApproved(approve);
  }, [allFiles]);
  useEffect(() => {
    const approve = allFiles?.filter((f) => f.status == "cancelled");
    setCancelled(approve);
  }, [allFiles]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleApproved = () => {
    Swal.fire({
      title: "Do You Want to Approve?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Approved Successfully!",
          "Your file has been Approved.",
          "success"
        );
      }
    });
  };

  const approveDoc = (row) => {
    const body = {
      status: "approved",
    };

    axios
      .patch(`${base}/files/${row._id}`, body)
      .then(function (response) {
        setRefresh(!refresh);
        ToastSuccess("Successfully file cancelled");

        // console.log(response);
      })
      .catch(function (error) {
        ToastError(error?.message);
        console.log(error);
      });
  };
  const cancelDoc = (row) => {
    const body = {
      status: "cancelled",
    };

    axios
      .patch(`${base}/files/${row._id}`, body)
      .then(function (response) {
        setRefresh(!refresh);
        ToastSuccess("Successfully file cancelled");

        // console.log(response);
      })
      .catch(function (error) {
        ToastError(error?.message);
        console.log(error);
      });
  };
  const deleteDoc = (row) => {
    axios
      .delete(`${base}/files/${row._id}`)
      .then(function (response) {
        setRefresh(!refresh);
        ToastSuccess("Successfully file cancelled");

        // console.log(response);
      })
      .catch(function (error) {
        ToastError(error?.message);
        console.log(error);
      });
  };
  console.log("all", allFiles);

  const downloadFile = (row) => {
    const fileUrl = `${base}/${row.files[0]}`;

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = row.files[0];
        link.click();
        URL.revokeObjectURL(url);
      });

  };

  const tableData = (d) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Document</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Download</TableCell>
                <TableCell align="right">Manage</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {d?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex items-center gap-2">
                      <Avatar
                        alt="Travis Howard"
                        src={`${base}/${row.thumb}`}
                      />
                      <p className="text-[1em]">{row.uploader_name} </p>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.doc_name}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">
                    <button
                      onClick={() => downloadFile(row)}
                      className="bg-transparent border-0 "
                    >
                      <ArrowDownwardIcon />
                    </button>
                  </TableCell>
                  <TableCell align="right">
                    <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => approveDoc(row)}
                        className="bg-transparent border-0 "
                      >
                        <AddTaskIcon style={{ color: "#1E3A8A" }} />
                      </button>
                      <button
                        onClick={() => cancelDoc(row)}
                        className="bg-transparent border-0 "
                      >
                        <CancelIcon style={{ color: "red" }} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };
  const approvedTable = (d) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Document</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Download</TableCell>
                <TableCell align="right">Manage</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {d?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex items-center gap-2">
                      <Avatar
                        alt="Travis Howard"
                        src={`${base}/${row.thumb}`}
                      />
                      <p className="text-[1em]">{row.uploader_name} </p>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.doc_name}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">
                  <button
                      onClick={() => downloadFile(row)}
                      className="bg-transparent border-0 "
                    >
                      <ArrowDownwardIcon />
                    </button>
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
      </>
    );
  };
  const others = (d) => {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Document</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Download</TableCell>
                <TableCell align="right">Manage</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {d?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className="flex items-center gap-2">
                      <Avatar
                        alt="Travis Howard"
                        src={`${base}/${row.thumb}`}
                      />
                      <p className="text-[1em]">{row.uploader_name} </p>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.doc_name}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">
                  <button
                      onClick={() => downloadFile(row)}
                      className="bg-transparent border-0 "
                    >
                      <ArrowDownwardIcon />
                    </button>
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
      </>
    );
  };

  return (
    <div>
      {/* modal */}
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_1.showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box ">
          <h3 className="font-bold text-lg mb-4">Item Name: {data.name}</h3>
          <img className="mb-4" src={data.image} alt="" />
          <input type="file" name="file" id="" />
          <br />
          <input
            className="btn btn-outline btn-success mt-2"
            type="submit"
            value="Submit"
          />
          {/* <h2 className="font-semibold">Click For Decline:  <button><CancelIcon className="text-blue-600 me-4" /></button></h2> */}
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pending" value="1" />
              <Tab label="Approved" value="2" />
              <Tab label="Cancelled" value="3" />
              {/* <Tab label="others" value="4" /> */}
            </TabList>
          </Box>
          <TabPanel value="1">{tableData(pending)}</TabPanel>
          <TabPanel value="2">{approvedTable(approved)}</TabPanel>
          <TabPanel value="3">{approvedTable(cancelled)}</TabPanel>
          {/* <TabPanel value="4">{others(allFiles)}</TabPanel> */}
        </TabContext>
      </Box>
    </div>
  );
};

export default AllProducts;
