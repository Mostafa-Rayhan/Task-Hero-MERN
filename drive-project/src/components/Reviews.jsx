import { Rating } from "@mui/material";
import testImage from "../assets/CardImage/download.jpg";
import { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import base from "./Database";
import { AppContext } from "../app.context";
import ToastSuccess, { ToastError } from "./Toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Reviews = ({ p }) => {
  const [value, setValue] = useState(4);
  const [beforeRating, setbeForeRating] = useState(5);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value2, setValue2] = useState(5);
  const [user, setUser]=useState()
  const { sRefresh, setSRefresh} = useContext(AppContext);
  const [allRating, setAllRating]=useState([])
  const [av, setAv]=useState(5)

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("driveUser"));
    if (getUser) {
      setUser(getUser)
    }
  }, []);

  useEffect(() => {
    setAllRating(p?.reviews)
     }, [p]);
  useEffect(() => {
    if(allRating){
     getAv(allRating)
    }
     }, [allRating]);


  const addRAting=(e)=>{
e.preventDefault();
const t=e.target
const body={
  name:t.name.value,
  email:t.email.value,
  desc:t.desc.value,
  rating:value2
}

axios
.put(`${base}/files/rating/${p._id}`, body)
.then(function (response) {
  setSRefresh(!sRefresh);
  ToastSuccess("Successfully review added");

  // console.log(response);
})
.catch(function (error) {
  ToastError(error?.message);
  console.log(error);
});
  }

  const getAv=(r)=>{
    let all=0
    if (!(Array.isArray(r))) {
      setAv(0)
      return ;
    }
    r.map(a=>{
      return all += Number(a.rating)
    })
    setAv(all /r.length)

  }
  console.log("av", av);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center ", marginBottom: "20px " }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Give review
          </Typography>
          <form action="" onSubmit={addRAting}>
            <div className="flex justify-between items-center gap-3 mb-6 ">
              <label className="w-1/3" htmlFor="">
                Name
              </label>
              <input
                className="w-[70%] border-2 border-gray-400   rounded-md py-1 px-2"
                type="text"
                name="name"
                id=""
                defaultValue={user?.name}
              />
            </div>
            <div className="flex justify-between items-center gap-3 mb-6 ">
              <label className="w-1/3" htmlFor="">
                Email
              </label>
              <input
                className="w-[70%] border-2 border-gray-400   rounded-md py-1 px-2"
                type="email"
                name="email"
                id=""
                defaultValue={user?.email}
              />
            </div>
            <div className="flex justify-between items-center gap-3 mb-6 ">
              <label className="w-1/3" htmlFor="">
                Review
              </label>
              <textarea
              required
                className="w-[70%] border-2 border-gray-400   rounded-md py-1 px-2"
                type="text"
                name="desc"
                id=""
              />
            </div>
            <div className="flex justify-between items-center gap-3 mb-6 ">
              <label className="w-1/3" htmlFor="">
                Rating
              </label>
              <Rating
                name="simple-controlled"
                value={value2}
                onChange={(event, newValue) => {
                  setValue2(newValue);
                }}
              />
            </div>
            <button type="submit" className="w-full rounded-md bg-[#1976D2] text-white py-2">Submit</button>
          </form>
        </Box>
      </Modal>
      <div className=" mt-4 border-2 border-black-700  p-4">
        <div className="">
          <h2 className="text-xl font-semibold">
            Reviews:{" "}
            <Rating
              name="read-only"
              value={Math.ceil(av)}
              style={{
                fontSize: "1em ",
                color: "#1976D2 ",
                marginBottom: "-20px ",
              }}
              readOnly
            />{" "}
            ({p?.reviews?.length || 0})
          </h2>
          <p>
            Get specific details about this product from customers who own it.
          </p>
          {/* <div className="flex">
            <Rating
              name="read-only"
              value={value}
              readOnly
              // onChange={(event, newValue) => {
              //     setValue(newValue);
              // }}
            />
            <h3 className="font-semibold">Out of</h3>
            <Rating
              name="read-only"
              value={beforeRating}
              readOnly
              // onChange={(event, newValue) => {
              //     setValue(newValue);
              // }}
            />
          </div> */}
          <div className="mt-3 mb-8">
            <Button onClick={handleOpen} variant="contained">
              Write a Review
            </Button>
          </div>

          {
            p?.reviews?.map((re,index)=>{
              return(
                <div className="pb-6" key={index}>
                <hr className="border-yellow-400 h-4 " />
                <div className="flex gap-4 items-start ">
                  <div>
                    <Avatar sx={{ bgcolor: "#1976D2" }}>{re.name.substring(0, 2)}</Avatar>
                  </div>
                  <div>
                    <h6 className="font-bold">{re?.name}</h6>
                    <Rating
                      name="read-only"
                      value={re.rating}
                      style={{ fontSize: "1.1em ", color: "#1976D2 " }}
                      readOnly
                    />
                    <p>{re?.desc}</p>
                    <div className="flex">
                      {/* <p className="text-gray-500">{data.time}</p> */}
                    </div>
                  </div>
                </div>
              </div>
              )
            })
          }

        </div>
      </div>
    </div>
  );
};

export default Reviews;
