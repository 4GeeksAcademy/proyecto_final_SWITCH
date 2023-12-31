import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";


// Pages 
import { Home } from "./pages/home";
import { SignIn } from "./pages/SignIn";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import GroupPage from "./pages/GroupPage";
import GroupPageAdmin from "./pages/GroupPageAdmin";
import FormEditGroup from "./pages/FormEditGroup";
import UsersProfile from "./pages/UsersProfile";
import OrganizerProfile from "./pages/PageOrganizerProfile";
import { SearchResults } from "./pages/searchResults";
import { EventSearchJoin } from "./pages/EventSearchJoin";
import EventPagePay from "./pages/EventPagePay";
import { PaymentPage } from "./pages/PaymentPage";
import { CreateNewEvent } from "./pages/CreateNewEvent";

import { CreateNewUserProfile } from "./pages/CreateNewUserProfile";
import { EditUserProfile } from "./pages/EditUserProfile"


// Components
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
        return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SignIn />} path="/signin" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<GroupPage />} path="/GroupPage/:id" />
                        <Route element={<GroupPageAdmin />} path="/GroupPageAdmin/:id" />
                        <Route element={<FormEditGroup />} path="/FormEditGroup" />
                        <Route element={<UsersProfile />} path="/UsersProfile" />
                        <Route element={<OrganizerProfile />} path="/OrganizerProfile" />
                        <Route element={<CreateNewEvent />} path="/CreateNewEvent" />


                        <Route element={<UsersProfile />} path="/UsersProfile/:id" />
                        <Route element={<OrganizerProfile />} path="/OrganizerProfile/:id" />
                        <Route element={<SearchResults />} path="/searchResults" />

                        <Route element={<EventSearchJoin />} path="/EventSearchJoin" />
                        <Route element={<EventPagePay />} path="/EventPagePay/:id" />
                        <Route element={<PaymentPage />} path="/PaymentPage/:id" />


                        <Route element={<CreateNewUserProfile />} path="/CreateNewUserProfile" />
                        <Route element={<EditUserProfile />} path="/EditUserProfile" />

                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
