import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <main className="text-center mt-5">
      <section className="bg-yellow">
        <nav className="navbar navbar-light bg-light">
          <form className="form-inline d-flex">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </nav>

        {/*Headline*/}

        <div className="d-flex">
          {/*TEXT LEFT*/}
          <div> </div>
          {/* FOTO RIGHT */}
          <div> </div>
        </div>
      </section>
    </main>
  );
};
