"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

import FormInput from "@/app/components/formInput";
import Button from "@/app/components/button";
import { displayError } from "@helpers/errorHandlers";

const FormLogin = () => {
  const Roles = {
    ADMIN: {
      email: "admin@gmail.com",
      accessToken: "1",
      userName: "admin",
      redirectUrl: "/admin",
    },
    USER: {
      accessToken: "2",
      userName: "user",
      redirectUrl: "/user",
    },
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken !== undefined) {
      if (typeof window !== "undefined") {
        window.location.assign("/attendance/create");
      }
    }
  }, []);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateLoginForm = () => {
    // Regular expression for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regular expression for password format validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email || !password) {
      toast.error("Email and password are required.");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain both letters and numbers and special characters."
      );
      return false;
    }

    return true;
  };
  const redirectTo = (url: string) => {
    if (typeof window !== "undefined") {
      window.location.assign(url);
    }
  };

  const setLoginCookies = (accessToken: string, userName: string) => {
    Cookies.set("accessToken", accessToken);
    Cookies.set("userName", userName);
  };

  const Login = async () => {
    if (!validateLoginForm()) {
      return;
    }
    try {
      if (email === "admin@gmail.com") {
        setLoginCookies(Roles.ADMIN.accessToken, Roles.ADMIN.userName);
        redirectTo(Roles.ADMIN.redirectUrl);
      }
      setLoginCookies(Roles.USER.accessToken, Roles.USER.userName);
      redirectTo(Roles.USER.redirectUrl);
    } catch (error: any) {
      displayError(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      Login();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div>
        <FormInput
          label="Email:"
          type="email"
          value={email}
          onChange={handleUsernameChange}
        />
        <FormInput
          label="Password:"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onKeyDown={handleKeyDown}
        />
        <div className="flex items-center pt-6">
          <input
            type="checkbox"
            className="w-4 h-4 border border-black"
            id="checkbox"
          />
          <label htmlFor="checkbox" className="pl-4">
            Remember password
          </label>
        </div>
        <div className="flex items-center pt-6">
          <label
            htmlFor="forgot-password"
            className="hover:text-blue-600 cursor-pointer"
          >
            Forgot password
          </label>
          <div className="pl-28">
            <Button label="Login" onClick={Login} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
