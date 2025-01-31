"use client"
import Signin from "@/components/signin";
import { Suspense } from "react";

const SigninPage = () => {
  return <Suspense> <Signin /> </Suspense>;
};

export default SigninPage;