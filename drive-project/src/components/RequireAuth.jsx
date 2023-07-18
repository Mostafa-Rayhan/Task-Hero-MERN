
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth=({children})=>{
    // const [user, loading]=useAuthState(auth);

    const data = JSON.parse(localStorage.getItem("driveUser"));
    console.log("data", data);
    const location=useLocation()
    // if(loading){
    //   return <Loading></Loading>
    // }
    if(!data){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
}
export default RequireAuth; 
