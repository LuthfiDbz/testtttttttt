import { t } from "i18next";
import { DateRanged } from "../../../../Component/UI/DateRange";
import { ServiceFiltering } from "../../../../Component/UI/serviceFiltering";

const FilterSection = (props) => {
  const {
    data,
    statusFilter,
    setStatusFilter,
    dateRangeData,
    defaultDate,
    onReset,
  } = props
  return (
    <div className="filtering">
      <ServiceFiltering selected={statusFilter} setSelected={setStatusFilter} />
      <DateRanged dataFromChild={dateRangeData} defaultValue={defaultDate} />
      <div className="reset-container">
        <button className="reset-filter" onClick={onReset}>{t('reset')}</button>
      </div>
    </div>
  )
}

export default FilterSection;