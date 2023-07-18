import { Button, Rating } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import image from "../../assets/CardImage/download.jpg";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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

const MyDoc = () => {
  const [value, setValue] = useState("1");
  const { allFiles, setAllFiles, refresh, setRefresh } = useContext(AppContext);
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [myDocs, setMyDocs]=useState([])
  const [myown, setMyown]=useState([])
  const [user, setUser]=useState()
  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("driveUser"));
    if (getUser) {
      setUser(getUser)
    }
  }, []);


  useEffect(() => {
   if(user){
    console.log("uer", user);
    axios
    .get(`${base}/files/${user.email}`)
    .then(function (response) {
      // console.log("re", response)
      setMyDocs(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
   }
  }, [user]);
  useEffect(() => {
   if(user){
    axios
    .get(`${base}/order/${user.email}`)
    .then(function (response) {
      // console.log("re", response)
      setMyown(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
   }
  }, [user]);

  console.log("own", myown );

  useEffect(() => {
    const pend = myDocs?.filter((f) => f.status == "pending");
    setPending(pend);
  }, [myDocs]);
  useEffect(() => {
    const approve = myDocs?.filter((f) => f.status == "approved");
    setApproved(approve);
  }, [myDocs]);
  useEffect(() => {
    const approve = myDocs?.filter((f) => f.status == "cancelled");
    setCancelled(approve);
  }, [myDocs]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // const approveDoc = (row) => {
  //   const body = {
  //     status: "approved",
  //   };

  //   axios
  //     .patch(`${base}/files/${row._id}`, body)
  //     .then(function (response) {
  //       setRefresh(!refresh);
  //       ToastSuccess("Successfully file cancelled");

  //       // console.log(response);
  //     })
  //     .catch(function (error) {
  //       ToastError(error?.message);
  //       console.log(error);
  //     });
  // };
  // const cancelDoc = (row) => {
  //   const body = {
  //     status: "cancelled",
  //   };

  //   axios
  //     .patch(`${base}/files/${row._id}`, body)
  //     .then(function (response) {
  //       setRefresh(!refresh);
  //       ToastSuccess("Successfully file cancelled");

  //       // console.log(response);
  //     })
  //     .catch(function (error) {
  //       ToastError(error?.message);
  //       console.log(error);
  //     });
  // };
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
  console.log("my", myDocs );

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

    // const fileUrl = 'https://example.com/path/to/file.pdf'; // Replace with your file URL
    // const link = document.createElement('a');
    // link.href = fileUrl;
    // link.download = row.files[0]; // Specify the desired file name
    // link.click();
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
  const tableData2 = (d) => {
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
                {/* <TableCell align="right">Manage</TableCell> */}
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
                  {/* <TableCell align="right">
                  <button
                      onClick={() => deleteDoc(row)}
                      className="bg-transparent border-0 "
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </button>
                  </TableCell> */}
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

  return (
    <div>
      {/* modal */}
      {/* Open the modal using ID.showModal() method */}
      {/* <button className="btn" onClick={() => window.my_modal_1.showModal()}>open modal</button> */}


      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Pending" value="1" />
              <Tab label="Approved" value="2" />
              <Tab label="Cancelled" value="3" />
              <Tab label="My owned" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">{tableData(pending)}</TabPanel>
          <TabPanel value="2">{approvedTable(approved)}</TabPanel>
          <TabPanel value="3">{approvedTable(cancelled)}</TabPanel>
          <TabPanel value="4">{tableData2(myown)}</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default MyDoc;
