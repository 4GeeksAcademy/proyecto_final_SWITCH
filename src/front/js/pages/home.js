import React from "react";
import "../../styles/home.css";

import { HomeHeadline } from "../component/HomeHeadline";
import { HomeSearchBar } from "../component/HomeSearchBar";
import { HomeExplanation } from "../component/HomeExplanation";

export const Home = () => {
  return (
    <>
      {/* SEARCH BAR*/}

      <div className=" bg-yellow">
        <section className=" d-flex flex-column container pt-5 ">
          <HomeSearchBar />
        </section>

        {/* HEADLINE*/}

        <section className=" container  ">
          <HomeHeadline />
        </section>
      </div>

      {/* EXPLANATION OF APP*/}

      <div className=" bg-light">
        <section className=" container  ">
          <HomeExplanation />
        </section>
      </div>
    </>
  );
};
