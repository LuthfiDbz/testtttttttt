import {useState} from "react";
import {sendGetRequestMobile} from "../../../../services/request-adapter";
import { t } from "i18next";
import { errorMessage } from "../../../../utils/errorMessage";

const AllInvoiceMethods = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allInvoice, setAllInvoice] = useState([]);
  const [allAmount, setAllAmount] = useState([])

  async function getInvoiceData(id) {
    setIsLoading(true)
    try {
      const {data} = await sendGetRequestMobile(`api/invoice-list/${id}`);
      setAllInvoice(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      errorMessage(error, t('error'), t('somethingError'), t('close'))
    }
  }

  const getTotalAmount = async (id) => {
    try {
      const {data} = await sendGetRequestMobile(`api/invoice-amount/${id}`);
      setIsLoading(false);
      setAllAmount(data?.data)
    } catch (error) {
      console.log(error.message)
      errorMessage(error, t('error'), t('somethingError'), t('close'))
    }
  }

  return {
    isLoading,
    allInvoice,
    allAmount,
    getInvoiceData,
    getTotalAmount
  };
};

export default AllInvoiceMethods;
