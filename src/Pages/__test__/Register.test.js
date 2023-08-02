import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Register } from "../Register";
import { MemoryRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { act } from "react-dom/test-utils";

jest.mock('../../Component/firebaseNotification/firebase', () => {
  const app = { messaging: () => messaging };

  const messaging = {
    fetchToken: jest.fn(() => Promise.resolve('aaa')),
    onMessageListener: jest.fn(),
  };

return { app: () => app };
});

describe.only("Register", () => {
 
  const mockOnSubmit = jest.fn()
  let scrn = []
  const setup = () => {
    const {getByTestId, container} = render(
      <GoogleOAuthProvider
        clientId="408897613208-ibptk0obfhhjikv33ulf7ditdm46jqel.apps.googleusercontent.com"
      >
        <Register onSubmit={mockOnSubmit}/>
      </GoogleOAuthProvider>
      , {wrapper: MemoryRouter}
    );
    scrn = {
      getByTestId,
      container
    }
  }

  test.skip("Input Data", async () => {
    setup()
    await act(async () => {
      fireEvent.change(scrn.getByTestId("first-name"), {target: {value: "Dizzi"}})
      fireEvent.change(scrn.getByTestId("last-name"), {target: {value: "Light"}})
      fireEvent.change(scrn.getByTestId("email"), {target: {value: "dizzie@gmail.com"}})
      fireEvent.change(scrn.getByTestId("phone-number"), {target: {value: "89955468895"}})
      fireEvent.change(scrn.getByTestId("new-pass"), {target: {value: "Kebersamaan@1"}})
      fireEvent.change(scrn.getByTestId("retype-pass"), {target: {value: "Kebersamaan@1"}})
      
    })

    await act(async () => {
      fireEvent.click(scrn.getByTestId("privacy"))
      fireEvent.click(scrn.getByTestId("submit-btn"))
    })

    expect(mockOnSubmit).toHaveBeenCalled()
  });

  test("Invalid first name alphabetical", async () => {
    setup()

    await act(async () => {
      fireEvent.change(scrn.getByTestId("first-name"), {target: {value: 222}})
    })

    await act(async () => {
      fireEvent.click(scrn.getByTestId("submit-btn"))
    })

    expect(scrn.container.innerHTML).toMatch("alphabetical")
  });

  test("Invalid last name alphabetical", async () => {
    setup()

    await act(async () => {
      fireEvent.change(scrn.getByTestId("last-name"), {target: {value: 222}})
    })

    await act(async () => {
      fireEvent.click(scrn.getByTestId("submit-btn"))
    })

    expect(scrn.container.innerHTML).toMatch("alphabetical")
  });

  test("Invalid email", async () => {
    setup()

    await act(async () => {
      fireEvent.change(scrn.getByTestId("email"), {target: {value: "Invalid"}})
    })

    await act(async () => {
      fireEvent.click(scrn.getByTestId("submit-btn"))
    })

    expect(scrn.container.innerHTML).toMatch("validEmail")
  });

  describe("Invalid phone number", () => {
    test("Required", async () => {
      setup()
  
      await act(async () => {
        fireEvent.change(scrn.getByTestId("phone-number"), {target: {value: ""}})
      })
  
      await act(async () => {
        fireEvent.click(scrn.getByTestId("submit-btn"))
      })
  
      expect(scrn.container.innerHTML).toMatch("fieldRequired")
    })

    test("Numbers Only", async () => {
      setup()
  
      await act(async () => {
        fireEvent.change(scrn.getByTestId("phone-number"), {target: {value: "1invalidasi"}})
      })
  
      await act(async () => {
        fireEvent.click(scrn.getByTestId("submit-btn"))
      })
  
      expect(scrn.container.innerHTML).toMatch("numbersOnly")
    })

    test("Min Number", async () => {
      setup()
  
      await act(async () => {
        fireEvent.change(scrn.getByTestId("phone-number"), {target: {value: "a"}})
      })
  
      await act(async () => {
        fireEvent.click(scrn.getByTestId("submit-btn"))
      })
  
      expect(scrn.container.innerHTML).toMatch("minPhoneNum")
    })

    test("Max Number", async () => {
      setup()
  
      await act(async () => {
        fireEvent.change(scrn.getByTestId("phone-number"), {target: {value: "1invalidasiaaaaaaaaaaaaaaaa"}})
      })
  
      await act(async () => {
        fireEvent.click(scrn.getByTestId("submit-btn"))
      })
  
      expect(scrn.container.innerHTML).toMatch("maxPhoneNum")
    })

    test("First Number not 0", async () => {
      setup()
  
      await act(async () => {
        fireEvent.change(scrn.getByTestId("phone-number"), {target: {value: "089556645556"}})
      })
  
      await act(async () => {
        fireEvent.click(scrn.getByTestId("submit-btn"))
      })
  
      expect(scrn.container.innerHTML).toMatch("firstNumber0")
    })
  });
});
