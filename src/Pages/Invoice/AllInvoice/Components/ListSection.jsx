import { format } from "date-fns";
import { LoadingScreenSpinner } from "../../../../Component/loadingScreen/loadingScreen";
import { Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { t } from "i18next";

import InvoiceGreen from "../../../../assets/icon/ic-invoice-green.png";
import InvoiceRed from "../../../../assets/icon/ic-invoice-red.png";
import { EmptyData } from "../../../../Component/emptyData/EmptyData";
import { numberFormat } from "../../../../Component/numberFormat/numberFormat";

const ListSection = ({ data: invoiceData, placeholder }) => {
  return (
    <div className="list-container">
      {
        invoiceData.length !== 0 ?
          invoiceData.map((data) => {
            const dateFormat = format(Date.parse(data.date), 'dd MMM yyy')
            return (
              <Link
                key={data.orderId}
                to={{
                  pathname: `/invoice/detail-invoice/${data.orderId}`
                }}
                className="link-detail-invoice"
              >
                <div className="list">
                  <div className="detail">
                    {data.invoiceStatus === 'PAID' ?
                      <img src={InvoiceGreen} alt='' className='icon' />
                      :
                      <img src={InvoiceRed} alt='' className='icon' />
                    }
                    <div className="list-detail">
                      <p className="numb-inv">{data.invoiceNumber}</p>
                      <p className="detail-order">
                        {data.serviceName} | {data.vehicleType}
                      </p>
                    </div>
                    <div className="date-invoice">{dateFormat}</div>
                  </div>
                  <div className="invoice-payment">
                    <div className="price">Rp. {numberFormat(data.amount)}</div>
                    <Badge className={`status-invoice ${data.invoiceStatus === 'PAID' ? 'paid' : 'unpaid'}`}>{data.invoiceStatus === 'PAID' ? t('paid') : data.invoiceStatus === 'CANCELED' ? t('canceled') : t('unpaid')}</Badge>
                    {/* <Badge className="status-invoice unpaid">{data.status}</Badge> */}
                  </div>
                </div>
              </Link>
            )
          })
          :
          <EmptyData />
      }
    </div>
  )
}

export default ListSection;