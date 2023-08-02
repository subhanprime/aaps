import { Outlet } from "react-router-dom";
import { userInfo } from "../api/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users?.userInfo);
  const handleAuth = async () => {
    if (Cookies.get("access-token-ref")) {
      if (!users?.email) {
        const response = await userInfo();
        if (response) {
          dispatch(setUserData(response?.data?.user));
        } else {
          Cookies.remove("access-token-ref");
          navigate("/login");
        }
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    handleAuth();
  }, []);
  return (
    <>{users?.email || show ? <Outlet /> : <Loading loading={loading} />}</>
  );
};

export default CheckAuth;
