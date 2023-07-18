import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/home/Dashboard";
import ProductDetails from "./pages/home/ProductDetails";
import UploadProduct from "./pages/home/UploadProduct";
import "./styles/style.css";
import MyDoc from "./pages/home/MyDoc";
import AllProducts from "./pages/home/AllProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/home/Login";
import RequireAuth from "./components/RequireAuth";
import AllMember from "./pages/home/AllMember";
import Profile from "./pages/home/Profile";
import AdminProfile from "./pages/home/AdminProfile";
import MostDownloaded from "./pages/home/MostDownloaded";
import Success from "./pages/home/Success";
import Error from "./pages/home/Error";
import Cancel from "./pages/home/Cancel";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999999 }}
      />

      <Routes>
        <Route path="/" element={<RequireAuth><Home></Home></RequireAuth>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="payment/success/:id" element={<Success></Success>}></Route>
        {/* <Route path="payment/fail/:id" element={<Error></Error>}></Route> */}
        {/* <Route path="payment/cancel/:id" element={<Cancel></Cancel>}></Route>  */}

        <Route path="/" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<RequireAuth><Home></Home></RequireAuth>}></Route>
          <Route
            path="/:id"
            element={<RequireAuth><ProductDetails></ProductDetails></RequireAuth>}
          ></Route>

          <Route
            path="/upload"
            element={<RequireAuth><UploadProduct></UploadProduct></RequireAuth>}
          ></Route>
          <Route path="/most-downloaded" element={<RequireAuth><MostDownloaded></MostDownloaded></RequireAuth>}></Route>
          <Route path="/mydoc" element={<RequireAuth><MyDoc></MyDoc></RequireAuth>}></Route>
          <Route path="/alluser" element={<RequireAuth><AllMember></AllMember></RequireAuth>}></Route>
          <Route path="/profile" element={<RequireAuth><Profile></Profile></RequireAuth>}></Route>
          <Route path="/admin-profile" element={<RequireAuth><AdminProfile></AdminProfile></RequireAuth>}></Route>
          <Route path="/allfiles" element={<RequireAuth><AllProducts /></RequireAuth>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
