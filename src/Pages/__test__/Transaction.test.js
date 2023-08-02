import {render, screen, waitFor} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'
import { DriverPage } from "../DriverPage/DriverPage";
import { DeliveryService } from "../DeliveryService";
import { AuthContext, AuthContextProvider } from "../../Component/authContext/AuthContext";
import { Transaction } from "../Transaction";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '22c84a4b-7b55-471a-a09b-c4eb2343e9ef',
  }),
  useRouteMatch: () => ({ url: '/transaction/id' }),
}));

jest.mock('../../Component/firebaseNotification/firebase', () => {
  const app = { messaging: () => messaging };

  const messaging = {
    fetchToken: jest.fn(() => Promise.resolve('aaa')),
    onMessageListener: jest.fn(),
  };

return { app: () => app };
});

describe('History Pages', () => {
  test("Loading data", () => {
    render(<Transaction />, {wrapper: MemoryRouter});
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  test("Render data", async () => {
    render(<Transaction />, {wrapper: MemoryRouter});
    await waitFor(() => expect(screen.getAllByText("viewDetail")[0]).toBeInTheDocument())
  });
  // test("Not empty data", async () => {
  //   render(<Transaction />, {wrapper: MemoryRouter});
  //   await waitFor(() => expect(screen.queryByText(/emptyText/i)).not.toBeInTheDocument())
  // });
});


// test("Delivery Pages", async () => {
//   render(
//     <AuthContextProvider
//       value={{
//         id: '22c84a4b-7b55-471a-a09b-c4eb2343e9ef',
//         status: true,
//         userType: 2,
//         allProfile: [],
//         tokenFcm: 'aasdw',
//         isPassEmpty: true,
//         apiKey: 'asdawded',
//         // storeApiKey,
//         // storePass,
//         // setAllProfile,
//         // storeUserType,
//         // storeId,
//         // storeProfileData,
//         // storeTokenFcm,
//         // setAllProfile,
//         // login,
//         // logout,
//       }}
//     >
//       <DeliveryService />
//     </AuthContextProvider>
//     , {wrapper: MemoryRouter}
//   );

//   screen.debug()
//   await waitFor(() => expect(screen.getByText("Sameday")))
//   screen.debug()
    
//   // const home = screen.getAllByAltText("sameday");
//   // expect(home[0]).toBeInTheDocument();
// });