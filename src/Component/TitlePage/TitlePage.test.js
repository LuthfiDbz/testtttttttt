import {render, screen} from "@testing-library/react";
import TitlePages from "./TitlePage";
import { t } from "i18next";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom'


test("Title Pages", () => {
  render(<TitlePages title={'Detail'} breadcumbs={[
    {
      text: "Home",
      link: '/'
    },
    {
      text: t('invoice'),
      link: '/invoice'
    },
    {
      text: t('invoiceDetails'),
      link: '#'
    }
  ]} />, {wrapper: MemoryRouter});
  const home = screen.getByText("Home");
  const linkElement = screen.getByText("Detail");
  expect(home).toBeInTheDocument();
  expect(linkElement).toBeInTheDocument();
});
