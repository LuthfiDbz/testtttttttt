import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export function SortableItemManage(props) {
  //props.id

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

  return (
    <div className="trip-point mb-3" ref={setNodeRef} style={style} {...attributes} {...listeners} draggable={false}>
      {/* <h1 className="loc-name">{props.tripsData.name}</h1>
      <h3 className="loc-address">{props.tripsData.addr}</h3> */}
      {props.service !== 'c768937b-6787-43d9-a3ad-bf9061459e18' ?
          props.tripsData.item.dropOff === undefined ? 
            <>
              <div className="trip-title mb-2">
                <h1 className="trip-name">Pickup Point</h1>
              </div>
              <h1 className="loc-name">{props.tripsData.item.pickLabel}</h1>
              <h3 className="loc-address">{props.tripsData.item.pickAddress}</h3>
            </>
            :
            <>
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
            <div className="trip-title mb-2">
              <h1 className="trip-name">Pickup Point</h1>
            </div>
            <h1 className="loc-name">{props.tripsData.item[0].pickLabel}</h1>
            <h3 className="loc-address">{props.tripsData.item[0].pickAddress}</h3>
          </>
          :
          <>
            <div className="trip-title mb-2">
              <h1 className="trip-name">Drop Point</h1>
              <h3>Move ==</h3>
            </div>
            <h1 className="loc-name">{props.tripsData.item.dropLabel}</h1>
            <h3 className="loc-address">{props.tripsData.item.dropAddress}</h3>
          </>
      } 
      {/* <Popover
        flip
        target="Popover1"
        toggle={function noRefCheck(){}}
      >
        <PopoverHeader>
          Popover Title
        </PopoverHeader>
        <PopoverBody>
          Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
        </PopoverBody>
      </Popover> */}
    </div>
  )
}