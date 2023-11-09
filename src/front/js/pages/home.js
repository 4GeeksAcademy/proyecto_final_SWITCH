import React from "react";
import "../../styles/home.css";

import { HomeHeadline } from "../component/HomeHeadline";
import { HomeSearchBar } from "../component/HomeSearchBar";

export const Home = () => {
  return (
    <main className=" bg-yellow">
      <HomeSearchBar />
      <HomeHeadline />
    </main>
  );
};
