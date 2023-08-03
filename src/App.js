import {Routers} from "./routes/Routers";
import "./App.scss";
import {AuthContextProvider} from "./Component/authContext/AuthContext";
import { HelmetProvider } from 'react-helmet-async';
import Notification from "./Component/firebaseNotification/Notification";
import ReactGA from "react-ga4";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init();
  const helmetContext = {};

  const TRACKING_ID = "G-VH3NB2531H";
  ReactGA.initialize(TRACKING_ID);
  ReactGA.send({hitType: "pageview", page: document.location.pathname});
  ReactGA.send({hitType: "pageview", page: "/home", title: "Home Page"});

  return (
    <AuthContextProvider>
      {/* <HelmetProvider> */}
        <div className="App">
          <Routers />
          {/* <Notification /> */}
        </div>
      {/* </HelmetProvider> */}
    </AuthContextProvider>
  );
}

export default App;
