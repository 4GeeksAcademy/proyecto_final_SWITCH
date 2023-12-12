import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/eventsearchjoin.css";
import { HomeSearchBar } from "../component/HomeSearchBar";

export const EventSearchJoin = () => {
    const { store, actions } = useContext(Context);

    return (
        < div className="container bigHeightSearch">
            {/* SEARCH BAR */}
            <div className=" py-5"> <HomeSearchBar />
            </div>

            {/* RESULTS OF EVENTS */}
            {store.events && store.events.map((event) => (
                <div className="rounded " key={event.name}>

                    {/* YELLOW BAR*/}
                    <div className="mt-4 bg-warning fs-5 " >

                        <div className=" p-3 d-flex justify-content-between align-items-center gap-5 ">
                            <span className="px-3 fw-bold">
                                {event.name}
                            </span>
                            <div>
                                <span className="me-1"> <span className="me-1"> Location: </span> <span className="fw-bold">{event.location} </span></span>
                                <span className=" event-search-date bg-white py-2 px-4 rounded-3 ms-2 text-center fw-bold"> {new Date(event.start_time).toLocaleDateString()}</span>
                            </div>
                        </div>

                    </div>

                    {/* BLUE BUTTON*/}
                    <div className="bg-extralight-blue py-3 px-4 extradark-grey fs-5 d-flex flex-column justify-content-between align-items-center">

                        {event.description}


                        <Link
                            to={`/EventPagePay/${event.id}`}
                            className="py-2 px-4 me-2 rounded-3 searchLink text-center bg-dark-blue fw-bolder fs-5 text-light"
                        >
                            Únete
                        </Link>

                    </div>

                </div>
            ))}

            {!store.events && <p>Sorry</p>}
        </div>
    );
};
