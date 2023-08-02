import { t } from "i18next";
import { numberFormat } from "../../../../Component/numberFormat/numberFormat";
import PaidIcon from "../../../../assets/icon/ic-invoice-paid.png";
import UnpaidIcon from "../../../../assets/icon/ic-invoice-unpaid.png";

const TotalSection = ({ data }) => {
  return (
    <div className="paid-container">
      <div className="paid">
        <div className="icon-paid">
          <img src={PaidIcon} alt='' className="icon-check" />
        </div>
        <div className="desc-paid">
          <p className="desc">{t('paid')}</p>
          <p className="nominal">Rp. {numberFormat(data?.paid)}</p>
        </div>
      </div>
      <div className="unpaid">
        <div className="icon-unpaid">
          <img src={UnpaidIcon} alt='' className="exclamation" />
        </div>
        <div className="desc-unpaid">
          <p className="unpaid-desc">{t('unpaid')}</p>
          <p className="nominal-unpaid">Rp. {numberFormat(data?.unpaid)}</p>
        </div>
      </div>
    </div>
  )
}

export default TotalSection;