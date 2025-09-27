import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/store/api/auth/authApiSlice";
import { setCredentials } from "@/store/slice/authSlice";
import { LAYOUT_DASHBOARD, urls } from "@/utils/routes/route-paths";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthLogic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [
    loginUser,
    { isLoading: isLoginLoading, error: loginError, isSuccess: isLoginSuccess },
  ] = useLoginUserMutation();
  const [
    registerUser,
    {
      isLoading: isRegisterLoading,
      error: registerError,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterUserMutation();
  const isSuccess = isRegisterSuccess || isLoginSuccess;

  const handleLogin = async (payload) => {
    try {
      const res = await loginUser({ payload }).unwrap();
      dispatch(setCredentials({ user: res, token: res.token }));
      navigate(`${LAYOUT_DASHBOARD}/${urls.Home}`);
      return res;
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleRegister = async (payload) => {
    try {
      const res = await registerUser({ payload }).unwrap();
      dispatch(setCredentials({ user: res, token: res.token }));
      navigate(`${LAYOUT_DASHBOARD}/${urls.Home}`);
      return res;
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  return {
    handleLogin,
    handleRegister,
    isLoginLoading,
    loginError,
    isRegisterLoading,
    registerError,
  };
};
