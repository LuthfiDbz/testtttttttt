import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEffect } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Badge, UncontrolledPopover } from "reactstrap"

export function SortableItem(props) {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState('')
  

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({id: props.tripsData})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  useEffect(() => {
    
    setSelectedIndex(props.popoverIndex)
  }, [props.popoverIndex])

  return (
    <>
      <div className="trip-point mb-3" ref={setNodeRef} style={style} {...attributes} {...listeners} draggable={false} >
        {/* <h1 className="loc-name">{props.tripsData.name}</h1>
        <h3 className="loc-address">{props.tripsData.addr}</h3> */}
        {props.service.toLowerCase() !== 'superkul truck'?
            props.tripsData.item.dropOff === undefined ? 
              <>
                <div className={`popover ${selectedIndex === props.tripsData.defaultOrder ? 'active' : ''}`}>
                  <h4>Detail {t('Pickup')}</h4>
                  <h6>{t('notes')} <strong>{props.tripsData.item.pickNotes}</strong></h6>
                  <h6>{t('senderName')} <strong>{props.tripsData.item.senderName}</strong></h6>
                  <h6>{t('phoneNumber')} <strong>{props.tripsData.item.pickPhoneName}</strong></h6>
                </div>
                <div className="trip-title mb-2">
                  <h1 className="trip-name">Pickup Point</h1>
                </div>
                <h1 className="loc-name">{props.tripsData.item.pickLabel}</h1>
                <h3 className="loc-address">{props.tripsData.item.pickAddress}</h3>
              </>
              :
              <>
                <div className={`popover drop ${selectedIndex === props.tripsData.defaultOrder ? 'active' : ''}`}>
                  <h4>Detail {t('Drop')}</h4>
                  <h6>{t('notes')} <strong>{props.tripsData.item.dropOff.dropNotes}</strong></h6>
                  <h6>{t('receiverName')} <strong>{props.tripsData.item.dropOff.receiverName}</strong></h6>
                  <h6>{t('phoneNumber')} <strong>{props.tripsData.item.dropOff.dropPhoneName}</strong></h6>
                  <h6>{t('packages')} <span><Badge className="">{props.tripsData.item.itemCategory}, {props.tripsData.item.weight}kg, {props.tripsData.item.itemTmp}&deg;C</Badge></span></h6>
                </div>
                <div className="trip-title mb-2">
                  <h1 className="trip-name">Drop Point</h1>
                  <h3>Move ==</h3>
                </div>
                <h1 className="loc-name">{props.tripsData.item.dropOff.dropLabel}</h1>
                <h3 className="loc-address">{props.tripsData.item.dropOff.dropAddress}</h3>
              </>
          :
            props.tripsData.item.dropNotes === undefined ? 
            <>
              <div className={`popover ${selectedIndex === props.tripsData.defaultOrder ? 'active' : ''}`}>{props.tripsData.item.senderName}</div>
              <div className="trip-title mb-2">
                <h1 className="trip-name">Pickup Point</h1>
              </div>
              <h1 className="loc-name">{props.tripsData.item.pickLabel}</h1>
              <h3 className="loc-address">{props.tripsData.item.pickAddress}</h3>
            </>
            :
            <>
              <div className={`popover ${selectedIndex === props.tripsData.defaultOrder ? 'active' : ''}`}>{props.tripsData.item.receiverName}</div>
              <div className="trip-title mb-2">
                <h1 className="trip-name">Drop Point</h1>
                <h3>Move ==</h3>
              </div>
              <h1 className="loc-name">{props.tripsData.item.dropLabel}</h1>
              <h3 className="loc-address">{props.tripsData.item.dropAddress}</h3>
            </>
        } 
      </div>
      
    </>
  )
}