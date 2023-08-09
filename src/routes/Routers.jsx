import React, { useEffect, useState } from "react";
import {
  Routes,
  Navigate,
  Route,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import { AuthContext } from "../Component/authContext/AuthContext";
import { Header } from "../Component/header/Header";
import { Home } from "../Pages/Home";
import { PromoDetail } from "../Pages/PromoDetail";
import { useContext } from "react";
import { PrivacyPolicy } from "../Pages/PrivacyPolicy";
import { fetchToken } from "../Component/firebaseNotification/firebase";
import { NotFoundPage } from "../Pages/ErrorPage/ErrorPage";
import { ChangeLanguage } from "../Component/UI/profile/ChangeLanguage";
import { AboutUs } from "../Pages/AboutUs";
import { TermsAndConditions } from "../Pages/TermsAndConditions";
import { FaqPage } from "../Pages/Faq";
import { DriverPage } from "../Pages/DriverPage/DriverPage";
import { MitraPage } from "../Pages/MitraPage/MitraPage";
import { TermConditionsDriver } from "../Pages/TermConditionsDriver";
import { ComingSoon } from "../Pages/ComingSoon";
import { EmailVerification } from "../Pages/EmailVerification";
import { UpdatePassword } from "../Pages/UpdatePassword";
// import { ProtectedRoute } from './ProtectedRoute'

export const Routers = () => {
  const auth = useContext(AuthContext);

  const ProtectedRoute = () => {
    if (auth.status === false) {
      return <Navigate to={"/home"} replace />;
    }
    return <Outlet />;
  };

  // const [isTokenFound, setTokenFound] = useState("");
  // if (auth.status === false) {
  //   fetchToken(setTokenFound);
  // }

  // useEffect(() => {
  //   auth.storeTokenFcm(isTokenFound)
  // }, [isTokenFound])

  const LoggingEnv = () => {
    const env = {
      DEV_URL: process.env.REACT_APP_DEV_URL,
      URL_CUST: process.env.REACT_APP_URL_CUST,
      WEB_URL: process.env.REACT_APP_WEB_URL,
      IMG_URL: process.env.REACT_APP_IMG_URL,
    }
    console.table(env)
    return (
      <div></div>
    )
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="driver" element={<DriverPage />} />
        <Route path="mitra" element={<MitraPage />} />
        {/* <Route path="login" element={<LoginPage />} />
        <Route path="login/profile-data" element={<LoginPageDataProfile />} /> */}
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="terms-conditions" element={<TermsAndConditions />} />
        <Route path="terms-conditions/driver" element={<TermConditionsDriver />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="promo/:id" element={<PromoDetail />} />
        <Route path="4nv1t3st" element={<LoggingEnv />} />
        {/* <Route path="contact-us" element={<ContactUs />} /> */}
        <Route path="email/verify" element={<EmailVerification />} />
        <Route path="update-password" element={<UpdatePassword />} />
        <Route path="coming-soon" element={<ComingSoon />} />
        {/* <Route element={<ProtectedRoute />}>
          <Route path="delivery" element={<DeliveryService idx={1} />} />
          <Route
            path="delivery/trip-planning/:orderid"
            element={<DeliveryTripPlanning />}
          />
          <Route
            path="delivery/order-confirm/:orderid"
            element={<DeliveryOrderConfirm />}
          />
          <Route path="manage-dedicated" element={<ManageDedicated />} />
          <Route
            path="manage-dedicated/trip-planning/:orderid"
            element={<ManageTripPlanning />}
          />
          <Route
            path="manage-dedicated/order-confirm/:orderid"
            element={<ManageOrderConfirm />}
          />
          <Route path="draft-detail/:orderid" element={<DraftDetail />} />
          <Route path="transaction/:id" element={<Transaction />} />
          <Route path="transaction-clone/:id" element={<TransactionClone />} />
          <Route
            path="transaction/detail-transaction/:id"
            element={<TransactionDetail />}
          />
          <Route
            path="transaction/detail-transaction-dedicated/:id"
            element={<TransactionDetailDedicated />}
          />
          <Route
            path="transaction/detail-transaction/:orderid/detail-trip/:tripnumber"
            element={<TransactionViewTrip />}
          />
          <Route path="invoice" element={<AllInvoiceIndex />} />
          <Route
            path="invoice/detail-invoice/:id"
            element={<DetailInvoiceIndex />}
          />
          <Route
            path="request-coorporate/:id"
            element={<RequestCoorporate />}
          />
          <Route path="profile/" element={<Profile />}>
            <Route path="/profile/edit-profile" element={<EditProfile />} />
            <Route path="/profile/edit-password" element={<EditPassword />} />
            <Route
              path="/profile/:id/saved-address"
              element={<SavedAddress />}
            />
            <Route
              path="/profile/saved-packages"
              element={<SavedPackages />}
            />
            <Route path="/profile/contact" element={<Contact />} />
            <Route path="/profile/api-key" element={<ApiKey />} />
            <Route
              path="/profile/:id/ticket-complain"
              element={<TicketComplain />}
            />
            <Route
              path="/profile/change-language"
              element={<ChangeLanguage />}
            />
          </Route>
        </Route> */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};
