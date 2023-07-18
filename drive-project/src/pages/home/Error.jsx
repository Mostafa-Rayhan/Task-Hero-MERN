import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate=useNavigate()
    return (
        <div>
             <div className='flex justify-center items-center mt-20'>
                <div className='text-center '>
                    <h3 className='text-3xl font-bold mb-6 '>Something error </h3> 
                    {/* <button onClick={()=>{navigate("/")}}>Back to home</button>  */}
                    <button
               onClick={()=>{navigate("/")}}
              className="bg-[#1976D2] text-white rounded-md py-2 font-bold text-lg  px-14 "
            >
              Back to home {" "}
            </button>
                </div>
            </div>

        </div>
    );
};

export default Error;
