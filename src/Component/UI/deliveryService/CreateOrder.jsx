import React, { useState } from "react";
import { RiBus2Fill, RiEBikeFill } from "react-icons/ri";
import { FaBus, FaCross, FaDotCircle } from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";
import { BsCardHeading, BsFillArrowRightCircleFill, BsCircle, BsRecordCircleFill, BsX } from "react-icons/bs";
import { CiImport } from "react-icons/ci";
import { BiSearch, BiTimer } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import EmptyIcon from '../../../assets/img/img-state-no-package@2x.png'
import RemoveIcon from '../../../assets/icon/ic-remove.png' 
import ToggleIcon from '../../../assets/icon/ic-chevron-right.png' 
import '../../../styles/deliveryService/createOrder/createOrder.css'
import { Badge, Button, ButtonGroup } from "reactstrap";
import { useJsApiLoader, Autocomplete} from '@react-google-maps/api'

const listVehicles = [
  [
    {
      id: 1,
      icon: <RiEBikeFill className="icon-vehicles" />,
      name: "Bike",
    },
    {
      id: 2,
      icon: <FaBus className="icon-vehicles" />,
      name: "3 Wheeler",
    },
    {
      id: 3,
      icon: <MdDirectionsBus className="icon-vehicles" />,
      name: "Pickup/L300",
    },
    {
      id: 4,
      icon: <RiBus2Fill className="icon-vehicles" />,
      name: "CDE/CDC",
    },
  ],
  [
    {
      id: 1,
      icon: <RiEBikeFill className="icon-vehicles" />,
      name: "Bike",
    }
  ]
];

const additionalService = [
  {
    name: "satu",
    text: "Waiting Time >30 Menit",
    price: 5000,
  },
  {
    name: "dua",
    text: "Waiting Time >60 Menit",
    price: 10000,
  },
  {
    name: "tiga",
    text: "Waiting Time >90 Menit",
    price: 15000,
  },
  {
    name: "empat",
    text: "Additional Carrier",
    price: 5000,
  },
  {
    name: "lima",
    text: "Door to door Delivery",
    price: 5000,
  },
];

let dummyData = {
  serviceNameId: "c5836865-deef-4f2a-8b7e-2918bb0e8d75",
  datePick: "2022-11-22",
  timePick: "01:49",
  vehicleTypeId: "a0ae65d6-ad1f-4df4-a483-d49323cb32ac",
  additionalService: [{
    id: "aa722679-cf34-4604-8043-78a4d03fc7f9"
  }],
  extraService: [],
  pickUp: [{
    notes: "Warna Hijau",
    senderName: "Gagah",
    pickPhoneName: "Gagah",
    pickPhoneNumber: "081316009497",
    pickAddress: "Gilang Seluler, Jalan Kampung Kelapa, Pabuaran, Bogor Regency, West Java, Indonesia",
    pickLabel: "Gilang Seluler",
    pickLocation: [106.8043952, -6.4610789],
    item: [
    {
      itemCategory: "Daging",
      weight: 10,
      height: 10,
      width: 10,
      lenght: 10,
      itemTmp: 0,
      itemQty: 10,
      dropOff: {
        dropNotes: "Superkul ",
        receiverName: "Gagah",
        dropPhoneName: "Gagah",
        dropPhoneNumber: "081316009496",
        dropAddress: "PT Superkul Amerta Indonesia, Jalan Panjang Arteri Kelapa Dua Raya, North Kedoya, West Jakarta City, Jakarta, Indonesia",
        dropLabel: "PT Superkul Amerta Indonesia",
        dropLocation: [106.7657932, -6.1722143]
      }
    }, 
    {
      itemCategory: "Buah",
      weight: 10,
      height: 10,
      width: 10,
      lenght: 10,
      itemTmp: 0,
      itemQty: 10,
      dropOff: {
        dropNotes: "Crct",
        receiverName: "Cahwati",
        dropPhoneName: "Cahwati",
        dropPhoneNumber: "08124536975546",
        dropAddress: "Corocot Digital Creative, RW.2, South Pasir Gunung, Depok City, West Java, Indonesia",
        dropLabel: "Corocot Digital Creative",
        dropLocation: [106.8417907, -6.3460515]
      }
    },
    {
      itemCategory: "Buah",
      weight: 10,
      height: 10,
      width: 10,
      lenght: 10,
      itemTmp: 0,
      itemQty: 10,
      dropOff: {
        dropNotes: "Crct",
        receiverName: "Cahwati",
        dropPhoneName: "Cahwati",
        dropPhoneNumber: "08124536975546",
        dropAddress: "Corocot Digital Creative, RW.2, South Pasir Gunung, Depok City, West Java, Indonesia",
        dropLabel: "Corocot Digital Creative",
        dropLocation: [106.79792332814353, -6.234412743308641]
      }
    }]
  }]
}

const CreateOrder = ({dataFromChild, latlng, addressFromChild}) => {
  const [autocomplete, setAutocomplete] = useState(null)
  const [id, setId] = useState(1)
  const [location, setLocation] = useState([])
  const [point, setPoint] = useState(1)
  const [service, setService] = useState("instant");
  const [vehicles, setVehicles] = useState(listVehicles[0])
  const [detailOpen, setDetailOpen] = useState(false)
  const [listPackages, setListPackages] = useState(".")
  const [additional, setAdditional] = useState(true);
  const [isBike, setIsBike] = useState("");

  const handleDelivery = (e) => {
    const getshow = e.target.value;
    setService(getshow);
    dataFromChild(getshow)
    getshow === "instant" ? setVehicles(listVehicles[1]) : setVehicles(listVehicles[0])
  };

  const showDetail = () => {
    setDetailOpen(!detailOpen)
  }

  const handleIsBike = (e) => {
    const getshow = e.target.value;
    setIsBike(getshow);
  }; 

  const handleAddLocation = () => {
    setId(id + 1)
    const add = {
      id: id,
      addressLabel: '',
      addressName: '',
      lat: '',
      lng: '',
      set: ''
    }
  
    // setData((data) => ({
    //   ...data,
    //   timePick: '19:00'
    // }))

    setLocation(loc => [...loc, add])
  }

  const handleRemoveLocation = (id) => {
    const newLocation = location.filter((e) => {
      return e.id !== id
    })
    setLocation(newLocation)
    // addressFromChild('remove',lat, lng)
  }

  const handleSearchLocation = () => {
    setDetailOpen(true)
  }

  // Maps Config
  const [ libraries ] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  const loadAutocomplete = (e) => {
    setAutocomplete(e)
  }

  const placeChanged = (e) => {
    if (autocomplete !== null) {
      const lat = autocomplete.getPlace().geometry.location.lat()
      const lng = autocomplete.getPlace().geometry.location.lng()
      
      addressFromChild('add',lat, lng)
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  return (
    <div className="create-order">
      <div className="select-service">
        <div className="header-select-service">
          <p className="text-title">Select Service</p>
          <button className="import-btn">
            <CiImport className="import-btn-icon" /> Import
          </button>
        </div>
        <div className="form-service">
          <div className="sameday-option">
            <input
              type="radio"
              id="sameday"
              name="service"
              value="sameday"
              onClick={handleDelivery}
            />
            <label className="label-radio" htmlFor="sameday">
              <BsCardHeading className="icon-sameday" /> Sameday Delivery
            </label>
          </div>
          <div className="instant-option">
            <input
              type="radio"
              id="instant"
              name="service"
              value="instant"
              onClick={handleDelivery}
            />
            <label className="label-radio" htmlFor="instant">
              <BiTimer className="icon-instant" /> Instant Delivery
            </label>
          </div>
          {service === "sameday" && (
            <div className="d-flex justify-content-around w-100">
              <div className="input-wrapper">
                <label className="label-input" htmlFor="start">
                  Date Pickup
                </label>
                <input className="input-text" type="date" />
              </div>
              <div className="input-wrapper">
                <label className="label-input" htmlFor="end">
                  Time Pickup
                </label>
                <input className="input-text" type="time" value="09:00" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="select-vehicles">
        <div className="header-vehicles">
          <p className="text-title">Select Vehicles</p>
        </div>
        <div className="body-vehicles">
          <div className="vehicles-checkbox">
            {vehicles.map((vehicles, index) => (
              <label className="custom-vehicles" key={index}>
                <input
                  type="radio"
                  name="check"
                  className="check-vehicles"
                  key={vehicles.id}
                  value="motor"
                  onClick={handleIsBike}
                />
                <div className="check-btn">
                  <div className="content">
                    <div className="icon-img">{vehicles.icon}</div>
                    <span className="check-icon">
                      <span className="icon"></span>
                    </span>
                  </div>
                  {vehicles.name}
                </div>
              </label>
            ))}
          </div>
          {isBike === "motor" && (
            <div className="additional-service">
              {additional && (
                <div>
                  <div className="max-capacity">Maximum capacity 30kg</div>
                  <p className="additional-title">
                    Select Additional Service
                  </p>
                  {additionalService.map((list, index) => (
                    <div className="mt-2" key={index}>
                      <input
                        type="checkbox"
                        id={index}
                        name={index}
                        className='additional-input'
                      />
                      <label
                        className="label-additional-list"
                        htmlFor={index}
                      >
                        <div className="additional-list">
                          <p>{list.text}</p>
                          <p>Rp. {list.price}</p>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <p
                className="hiden-addservice"
                onClick={() => setAdditional(!additional)}
              >
                {additional
                  ? "hide additional service"
                  : "show additional service"}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="input-location">
        {/* COnditional InstantDelivery */}
        <div className="header-input-location">
          <p className="text-title">Input Location</p>
          <button className="add-btn" onClick={handleAddLocation}>
            <IoIosAddCircle className="add-btn-icon"/> Add Location
          </button>
        </div>
        <div className="input-field">
          {/* LOOPING */}
          
            {location.map((input) => {
              return (
                <div className="input-area">
                  {input.set === '' ? null : <Badge className={`set-as-${input.set.toLowerCase()}`}>{input.set}</Badge>}
                  <Autocomplete 
                    className="input-address"
                    onLoad={loadAutocomplete}
                    onPlaceChanged={placeChanged}
                  >
                    <input type="text"/>
                  </Autocomplete>
                  <div className="icon">
                    <BiSearch className="search-icon" onClick={handleSearchLocation}/> 
                    <BsX className="delete-icon" onClick={() => handleRemoveLocation(input.id)}/>
                  </div>
                </div>
              )
            })}
          
          {/* <div className="input-area">
            <div className="status">DROP</div>
            <Autocomplete className="input-address">
              <input type="text" value={'Crocodic'}/>
            </Autocomplete>
            <div className="icon">
              <BiSearch className="search-icon"/> 
              <BsX className="delete-icon"/>
            </div>
          </div>
          <div className="input-area">
            <div className="status">PICK</div>
            <Autocomplete className="input-address">
              <input type="text"/>
            </Autocomplete>
            <div className="icon">
              <BiSearch className="search-icon"/> 
              <BsX className="delete-icon"/>
            </div>
          </div> */}
        </div>
      </div>
      <img src={ToggleIcon} alt="" className={`toggle-icon ${detailOpen ? '' : 'close'}`} onClick={() => setDetailOpen(!detailOpen)}/>
      <div className={`detail-create-order ${detailOpen ? 'show-detail' : ''}`}>
        <div className="detail-header">
          <h1>Crocodic Studio</h1>
          <ButtonGroup className="set-as-location">
            <Button 
              className="pickup-point"
              outline
              onClick={() => setPoint(1)}
              active={point === 1}
            >Set As Pickup Point {point === 1 ? <BsRecordCircleFill /> : <BsCircle />}</Button>
            <Button 
              className="drop-point"
              outline
              onClick={() => setPoint(2)}
              active={point === 2}
            >Set As Drop Point {point === 2 ? <BsRecordCircleFill /> : <BsCircle />}</Button>
          </ButtonGroup>
        </div>
        <div className="detail-content">
            <div className="detail-form">
              <div className="detail-data">
                <label htmlFor="notes">Notes</label>
                <input type="text" id="notes" name="notes" placeholder="Input notes" /> <br />
                <label htmlFor="sender-name">Sender Name</label>
                <input type="text" id="sender-name" name="sender-name" placeholder="Input sender name"/><br />
                <label htmlFor="phone-number">Phone Number</label>
                <input type="text" id="phone-number" name="phone-number" placeholder="Input phone number" /><br />
                <input type="checkbox" name="bookmark-address" id="bookmark-address" />
                <label htmlFor="bookmark-address">Save to Bookmark Address</label>
              </div>
              {point === 1 ? (
                <div className="pickup-packages">
                  <div className="packages-title">
                    <h1>List Package Pickup</h1>
                    <button><IoIosAddCircle /> Add Package</button>
                  </div>
                  <div className="packages-list">
                    {listPackages === "" ? (
                      <div className="empty-package">
                        <img src={EmptyIcon} alt="empty-packages" className="empty-icon"/>
                        <h1>Belum Ada Barang</h1>
                        <h3>Silahkan tambah barang untuk 1 trip sesuai keinginan Anda</h3>
                      </div>
                    ) :
                      <>
                        <div className="package">
                          <div className="package-type">
                            <h1 className="package-name">Buah</h1>
                            <h2 className="package-quantity">Quantity 1, 30kg, 10&deg; C</h2>
                          </div>
                          <div className="package-button">
                            <img src={RemoveIcon} alt="" />
                            <img src={RemoveIcon} alt="" />
                          </div>
                        </div>
                        <div className="package">
                          <div className="package-type">
                            <h1 className="package-name">Buah</h1>
                            <h2 className="package-quantity">Quantity 1, 30kg, 10&deg; C</h2>
                          </div>
                          <div className="package-button">
                            <img src={RemoveIcon} alt="" />
                            <img src={RemoveIcon} alt="" />
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </div>
              ) :
                <div className="drop-packages">
                  <div className="packages-title">
                    <h1>List Package Pickup</h1>
                  </div>
                  <div className="packages-list">
                    {listPackages === "" ? (
                      <div className="empty-package">
                        <IoIosAddCircle className="empty-icon"/>
                        <h1>Belum Ada Barang</h1>
                        <h3>Silahkan tambah barang untuk 1 trip sesuai keinginan Anda</h3>
                      </div>
                    ) :
                      <>
                        <div className="pickup-for-drop">
                          <h1>Pickup Point</h1>
                          <h2>Crocodic Studio</h2>
                          <h3>Jl. Bina Remaja No. 6, Srondol Wetan, Kec. Banyumas</h3>
                        </div>
                        <div className="package">
                          <div className="package-type">
                            <h1 className="package-name">1 Buah</h1>
                            <h2 className="package-quantity">30kg, 10&deg; C</h2>
                          </div>
                          <div className="package-button">
                            <img src={RemoveIcon} alt="" />
                          </div>
                        </div>
                        <div className="package">
                          <div className="package-type">
                            <h1 className="package-name">1 Buah</h1>
                            <h2 className="package-quantity">30kg 10&deg; C</h2>
                          </div>
                          <div className="package-button">
                            <img src={RemoveIcon} alt="" />
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </div>
              }
            </div>
        </div>
        <div className="detail-footer">
          <button className="back btn">BACK</button>
          <button className="save btn btn-primary" onClick={showDetail}>SAVE</button>
        </div>
      </div>
    </div>
  )
}
export default CreateOrder