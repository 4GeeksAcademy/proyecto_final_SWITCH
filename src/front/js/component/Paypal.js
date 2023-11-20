import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { loadScript } from "@paypal/paypal-js";



export const Paypal = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    let paypal;
    useEffect(() => {
        async function fetchpayPal() {
            try {
                paypal = await loadScript(
                    {
                        clientId: "ARHiWIlW5nhelwukQxyix1ZoDISLdMJzAQe0XHkT-DlkXUJ22IQfFNI06ueIcYgotIMuzGBxbID1TL3A",
                        currency: "EUR",
                    }
                );
            } catch (error) {
                console.error("failed to load the PayPal JS SDK script", error);
            }
            console.log(paypal)
            if (paypal) {
                try {
                    await paypal.Buttons().render("#paypal");
                } catch (error) {
                    console.error("failed to render the PayPal Buttons", error);
                }
            }

        }
        fetchpayPal();


    }, [])
    return (
        <>
            <h1 className=" my-5 text-center">Solo te queda un paso más...</h1>
            <div id="paypal" className="col-5 mt-3 mx-auto"></div>
        </>
    );
}




