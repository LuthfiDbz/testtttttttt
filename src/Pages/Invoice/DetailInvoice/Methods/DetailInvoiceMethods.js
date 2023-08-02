import {useState} from "react";
import {sendGetRequestMobile} from "../../../../services/request-adapter";

const DetailInvoiceMethods = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [detailData, setDetailData] = useState([]);

  async function getDetailInvoiceData(id) {
    setIsLoading(true)
    try {
      const {data} = await sendGetRequestMobile(`api/order/${id}`);
      setDetailData(data?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return {
    isLoading,
    detailData,
    getDetailInvoiceData,
  };
};

export default DetailInvoiceMethods;
