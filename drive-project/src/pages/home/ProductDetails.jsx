// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LearningDetails from "../../components/LearningDetails";
import image from "../../assets/CardImage/download.jpg";
import { Button, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import testImage from "../../assets/CardImage/download.jpg";
import Reviews from "../../components/Reviews";
import pdfFile from "../../assets/testing.jpg";
import { useParams } from "react-router-dom";
import axios from "axios";
import base from "../../components/Database";
import { AppContext } from "../../app.context";
import ToastSuccess, { ToastError } from "../../components/Toast";



const ProductDetails = () => {
  const { id } = useParams();
  const [value, setValue] = useState(2);
  const [p, setP] = useState();
  const [allRating, setAllRating] = useState([]);
  const { sRefresh, setSRefresh } = useContext(AppContext);
  const [av, setAv] = useState(5);
  const [user, setUser] = useState();
  const [localRef, setLocalRef] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(localStorage.getItem("driveUser"));
    if (getUser) {
      setUser(getUser);
    }
  }, [localRef]);

  useEffect(() => {
    axios
      .get(`${base}/files/single/${id}`)
      .then(function (response) {
        console.log("re", response);
        setP(response.data);
        setAllRating(response.data.reviews);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, sRefresh, localRef ]);

  useEffect(() => {
    if (allRating) {
      getAv(allRating);
    }
  }, [allRating]);

  const getAv = (r) => {
    let all = 0;
    if (!Array.isArray(r)) {
      setAv(0);
      return;
    }
    r.map((a) => {
      return (all += Number(a.rating));
    });
    setAv(all / r.length);
  };

  if (!p) {
    return "Loading...";
  }

  const downloadFile = (row) => {
    if (user?.point < 1) {
      ToastError("You can not download more");
      return;
    }

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

       if(user.role=="user"){
        const updateUser = {
          point: Number(user?.point) - 1,
        };
        axios
          .patch(`${base}/member/${user._id}`, updateUser)
          .then(function (response) {
            // ToastSuccess("profile updated");
            reInstallUser();
            udpateProduct(row)

            // console.log(response);
          })
          .catch(function (error) {
            ToastError(error?.message);
            console.log(error);
          });
       }
      });
  };


  const buyBtn =(d)=>{
    console.log("payment clicked ", d );
    const body={
      ...d,
      buyer:user.email
    }
    axios
    .post(`${base}/order`, body)
    .then(function (response) {
      // setRefreshP(!refreshP);
      // ToastSuccess("Successfully updated"); 
      console.log("res url is ", response.data.url);
      window.location.replace(response.data.url);
    })
    .catch(function (error) {
      console.log(error?.message);
      // ToastError(error?.message);
    });
  }
  const udpateProduct=(da)=>{
    const body = {
      downloads: da.downloads? da.downloads +1 :1,
    };

    axios
      .put(`${base}/files/${da._id}`, body)
      .then(function (response) {
        // setRefresh(!refresh);
        // ToastSuccess("Successfully file cancelled");

        console.log("file updated downloads");
      })
      .catch(function (error) {
        ToastError(error?.message);
        console.log(error);
      });
  }

  const reInstallUser = () => {
    axios
      .get(`${base}/member/${user.email}`)
      .then(function (response) {
        localStorage.setItem("driveUser", JSON.stringify(response.data));
        setLocalRef(!localRef);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("user", user);
  return (
    <div>
      {/* <LearningDetails /> */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row  gap-8 w-full md:w-4/5 items-center  ">
          <div>
            <img
              className="w-[100%] md:w-[500px]  h-auto me-8 rounded-md"
              src={`${base}/${p.thumb}`}
              alt="Doc image"
            />
          </div>
          <div className="ms-3">
            <h2 className="text-4xl ">{p.doc_name}</h2>
            <div className="lg:flex mt-4">
              {/* <h3 className='bg-slate-200 rounded-full px-2 me-2 mt-2'>Price: <span className='text-black font-semibold'>{data.price} ৳</span></h3>
                            <h3 className='bg-slate-200 rounded-full px-2 me-2 mt-2'>Uploader: <span className='text-black font-semibold'>{data.uploader} ৳</span></h3>
                            <h3 className='bg-slate-200 rounded-full px-2 me-2 mt-2'>Status: <span className='text-black font-semibold'>{data.status}</span></h3> */}
              <h3 className="bg-slate-200 text-[#1976D2] rounded-full px-2 me-2 mt-2">
                Category:{" "}
                <span className="text-[#1976D2] font-semibold">
                  {p.category}
                </span>
              </h3>
              <h3 className="bg-slate-200 text-[#1976D2] rounded-full px-2 me-2 mt-2">
                Sub Category:{" "}
                <span className="text-[#1976D2] font-semibold">
                  {p.sub_category}
                </span>
              </h3>
            </div>
            <div className="mt-4">
              <p>{p.desc}</p>
              {/* <h2 className='text-xl font-semibold'>Details:</h2> */}

              {/* <h3>Uploader: <span className='font-semibold'>{data.uploader}</span></h3> */}
              <div className="flex  mt-4 items-center ">
                <h2 className="mr-4">Rating:</h2>
                {/* <Rating name="read-only" value={data.rating} readOnly /> */}
                <div className="mb-[-9px]">
                  {" "}
                  <Rating
                    name="read-only"
                    value={Math.ceil(av)}
                    style={{ fontSize: "1.1em ", color: "#1976D2 " }}
                    readOnly
                  />
                </div>
                <p>({allRating?.length || 0})</p>
              </div>
              <h2>
                Total Downloads:{" "}
                <span className="font-semibold">{p?.downloads || 0}</span>
              </h2>
              <p className='font-bold'>Price : {p?.price} TK</p>
            </div>
            {/* <div className='mt-6'>
                            <h2 className='text-xl font-semibold'>Payment options</h2>
                            <div className='flex border-2 border-orange-300 p-2 mt-4 items-center'>
                                <div>
                                    <input className='bg-gray-500 p-4' type="checkbox" name="payment" id="" />
                                </div>
                                <div className='ms-4'>
                                    <p className='font-bold'>{data.price}৳</p>
                                    <p>Cash Discount Price</p>
                                    <p>Online / Cash Payment</p>
                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 mt-8 p-0">
        <div className="max-w-xl mx-auto justify-center flex pt-8">
          <span className="me-2">
           {
            Number(user?.point )> 0 ?
            <button
            onClick={() => downloadFile(p)}
            className="bg-[#1976D2] text-white rounded-md py-2 font-bold text-lg  px-14 text-center  "
          >
            Download{" "}
          </button>

          :
          <div className="text-center ">
          <p className="text-red-500 mb-2">You can not download at this moment</p>
          <button
            onClick={() => buyBtn(p)}
            className="bg-[#1976D2] text-white rounded-md py-2 font-bold text-lg  px-14 "
          >
            Buy now {" "}
          </button>
         </div>

           }

          </span>

        </div>
        <div className="max-w-6xl mx-auto">
          <div className="pt-8">
            <LearningDetails learn={p.l_subject} />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-0">
        <div className="max-w-6xl mx-auto">
          <div className="pt-8 pb-10">
            <Reviews p={p} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
