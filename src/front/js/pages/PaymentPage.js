import React, { useEffect, useState, useContext } from "react";
import { Paypal } from "../component/Paypal"
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const PaymentPage = () => {

  const { id } = useParams();

  const { store, actions } = useContext(Context);


  ////////////////// EVENT ID /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log("event id to save in attendee database", id)



  ///////////////////USER EMAIL //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // let userEmail = store.userEmail

  // console.log("user email to get the id from", userEmail) //////////////////// DOESNT WORK!!!!!!!!!!!


  // PROVISIONAL: 
  //const userEmail = "another@test.com"


  //////////////// GET ID FROM EMAIL /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  // const token = sessionStorage.getItem('token'); // Get the token from sessionStorage
  // const email = getEmailFromToken(token);

  // if (email) {
  //   console.log('Email:', email);
  //   // Do something with the email
  // } else {
  //   console.log('Token does not contain email');
  // }

  // PROVISIONAL: 
  //const userId = 3



  ////////////////////////////////////////////////////////////////////////////////


  const userID = actions.getIdFromUserEmail(userEmail);

  if (userID) {
    console.log(`The user ID for email '${userEmail}' is: ${userID}`);
  } else {
    console.log(`No user found with email '${userEmail}'`); //////////////////////////////////////// NO FUNCIONA
  }


  ////////////////// SAVE EVENT IN MEMBER'S PROFILE //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // function createMemberAttendee() {
  //   actions.saveEventInMemberEventsList(userId, id)
  // }

  return (
    <>
      <Paypal />
    </>
  );
};