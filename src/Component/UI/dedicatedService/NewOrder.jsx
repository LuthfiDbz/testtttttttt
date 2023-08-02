import React, { useEffect, useState } from "react";
import { RiBus2Fill, RiEBikeFill } from "react-icons/ri";
import { FaBus, FaCross, FaDotCircle } from "react-icons/fa";
import { MdDirectionsBus } from "react-icons/md";
import { BsCardHeading, BsFillArrowRightCircleFill, BsCircle, BsRecordCircleFill, BsX } from "react-icons/bs";
import { CiImport } from "react-icons/ci";
import { BiSearch, BiTimer } from "react-icons/bi";
import { IoIosAddCircle } from "react-icons/io";
import EmptyIcon from '../../../assets/img/img-state-no-package@2x.png'
import RemoveIcon from '../../../assets/icon/ic-remove.png' 
import '../../../styles/dedicatedService/newOrder/newOrder.scss'
import { Button, ButtonGroup } from "reactstrap";
import CheckIcon from '../../../assets/icon/ic-invoice-paid.png'
import MinusIcon from '../../../assets/icon/ic-minus.png'
import PlusIcon from '../../../assets/icon/ic-plus.png'
import CalendarIcon from '../../../assets/icon/ic-calendar.png'
import BikeIconActive from '../../../assets/icon/ic-vehicle-bike-active.png'
import BikeIcon from '../../../assets/icon/ic-vehicle-bike-inactive.png'
import ConfirmIcon from '../../../assets/img/img-state-confirmation.png'
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { errorPopup, networkErrorPopup } from "../modal/PopUp/ErrorPopUp";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useForm } from "react-hook-form";

const listVehicles = [
  [
    {
      id: 1,
      icon: <img src={BikeIconActive} alt='' className="icon-vehicles" />,
      name: "Bike",
    }
  ]
];

const NewOrder = ({dataFromChild}) => {
  let createDataOrder = {}
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();
  const [menuSelected, setMenuSelected] = useState(1)
  const [showhide, setShowhide] = useState("instant");
  const [vehicles, setVehicles] = useState(listVehicles[0])
  // const [detailOpen, setDetailOpen] = useState(true)
  

  const [show, setShow] = useState(true);
  const [showAdd, setShowAdd] = useState("");

  const [corporateService, setCorporateService] = useState([])
  const [corporateServiceId, setCorporateServiceId] = useState('')
  const [corporateServiceName, setCorporateServiceName] = useState('')
  const [selectedService, setSelectedService] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [rentStart, setRentStart] = useState(new Date())
  const [rentEnd, setRentEnd] = useState(new Date(new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000))
  const [minDate, setMinDate] = useState('')
  const [minDateEnd, setMinDateEnd] = useState(new Date(new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000))
  const [poolAddress, setPoolAddress] = useState('')
  const [notes, setNotes] = useState('')


  const [loadingScreen, setLoadingScreen] = useState(false)
  const [ libraries ] = useState(['places']);
  const [autocomplete, setAutocomplete] = useState(null)

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`
  }

  useEffect(() => {
    getCorporateService()
    const currentdate = new Date
    // setMinDate(format())
    setMinDate(currentdate)
  }, [])

  useEffect(() => {
    const dataTransfer = {
      corporateServiceId,
      corporateServiceName,
      quantity,
      rentStart: format(rentStart, 'yyyy-MM-dd'),
      rentEnd: format(rentEnd, 'yyyy-MM-dd'),
      notes,
      poolAddress
    }
    dataFromChild(dataTransfer)
  }, [corporateServiceId,selectedService, quantity, notes, poolAddress,rentEnd, rentStart])
  

  const getCorporateService = async () => {
    setLoadingScreen(true)
    try {
      const response = await axios.get(`${url}/api/general-service-dedicated`, {headers})
      const data = response.data.data
      setCorporateService(data)
      setLoadingScreen(false)
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Network Error') {
        networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
      } else {
        errorPopup(t('error'),t('somethingError'), t('close'))
      }
    }
  }

  const handleDelivery = (e, serviceId, serviceName) => {
    const getshow = e.target.value;
    setShowhide(getshow);
    setCorporateServiceId(serviceId)
    setSelectedService(e.target.value)
    setCorporateServiceName(serviceName)
  };

  const handleshowAdd = (e) => {
    const getshow = e.target.value;
    setShowAdd(getshow);
    setSelectedVehicle(e.target.value)
  }; 


  // Maps Config
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDfdR5Et5GQSGbLqWjFbXB7JNjLIA3Q9Vw',
    libraries
  }) 

  if(!isLoaded) {
    return (
      <h1>Please wait...</h1>
    )
  }

  const loadAutocomplete = (e) => {
    setAutocomplete(e)
  }

  const placeChanged = (e) => {
    if (autocomplete !== null) {
      const address = autocomplete.getPlace().formatted_address
      const name = autocomplete.getPlace().name
      const lat = autocomplete.getPlace().geometry.location.lat()
      const lng = autocomplete.getPlace().geometry.location.lng()
      setPoolAddress(`${name}, ${address}`)
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }


  return (
    <form action="" className="new-order">
      <div className="select-service">
        <div className="header-select-service">
          <p className="text-title">{t('dedicatedService')}</p>
        </div>
        <div className="form-service">
          <div className="rent-date rent-start">
            <label className="label-input" htmlFor="start">
            {t('rentStart')}
            </label>
            <DatePicker 
              selected={rentStart}
              dateFormat="dd MMM yyyy"
              className='input-text'
              placeholderText="dd MMM yyyy"
              minDate={minDate}
              onChange={(date) => {
                setRentStart(date === null ? new Date() : date); 
                setRentEnd(date === null ? 
                  new Date(new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000) 
                  : 
                  new Date(new Date(date).getTime() + 3 * 30 * 24 * 60 * 60 * 1000)
                );
                setMinDateEnd(date === null ? 
                  new Date(new Date().getTime() + 3 * 30 * 24 * 60 * 60 * 1000) 
                  : 
                  new Date(new Date(date).getTime() + 3 * 30 * 24 * 60 * 60 * 1000)
                )
              }}
            />
            <img src={CalendarIcon} alt="calendar" />
          </div>
          <div className="rent-date rent-end">
            <label className="label-input" htmlFor="start">
            {t('rentEnd')}
            </label>
            <DatePicker 
              selected={rentEnd}
              dateFormat="dd MMM yyyy"
              className='input-text'
              placeholderText="dd MMM yyyy"
              minDate={minDateEnd}
              onChange={(date) => {setRentEnd(date === null ? minDateEnd : date)}
              }
            />
            <img src={CalendarIcon} alt="calendar" />
          </div>
          {corporateService.map((service, i) => {
            const label = service.name.name.split(' ')
            const name = service.name.name.toLowerCase().split(' ').join('-')
            
            return (
              <div className={`${name}`}>
                <input
                  type="radio"
                  id={name}
                  name={name}
                  value={name}
                  onClick={(e) => handleDelivery(e,service.id, service.name.name)}
                />
                <label className={`label-radio ${selectedService === name ? 'active' : ''}`} htmlFor={name}>
                  {showhide === name ? <img src={CheckIcon} className="icon" /> : <BsCircle className="icon" />}
                  {label[2]} {label[3]}
                </label>
              </div>
            )
          })}
        </div>
      </div>
      <div className="vehicle-address">
        <div className="select-vehicles">
          <div className="header-vehicles">
            <p className="text-title">{t('selectVehicles')}</p>
          </div>
          <div className="body-vehicles">
            <div className="vehicles-checkbox">
              {vehicles.map((vehicle) => {
                return (
                    <label className="custom-vehicles" key={vehicle.id}>
                      <input
                        type="radio"
                        name="check"
                        className="check-vehicles"
                        value={vehicle.name}
                        onClick={(e) => handleshowAdd(e, vehicle.id)}
                      />
                      <div className="content">
                        <img src={selectedVehicle === vehicle.name ? BikeIconActive : BikeIcon} alt="" className="icon-vehicles"/>
                        <img src={CheckIcon} alt="" className="check-icon"/>
                      </div>
                      <h5 className="vehicle-name">{vehicle.name}</h5>
                    </label>
                  )
                }) 
              }
            </div>
            <div className="vehicle-quantity">
              <h1>{t('quantity')}</h1>
              <div className="quantity">
                <img src={MinusIcon} alt="minus" onClick={() => setQuantity(quantity - 1)}/>
                <h1>{quantity < 1 ? setQuantity(1) : quantity}</h1>
                <img src={PlusIcon} alt="plus" onClick={() => setQuantity(quantity + 1)}/>
              </div>
            </div>
            {showAdd.toLowerCase() === "bike" && (
              <div className="additional-service">
                {show && (
                  <div>
                    <div className="max-capacity">{t('maxCapacityBike')}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="pool-address">
          <h1 className="pool-title">{t('poolAddress')}</h1>
          <div className="pool-maps">

          </div>
          <div className="rent-date rent-start">
            <label className="label-input" htmlFor="start">
            {t('address')}
            </label>
            <Autocomplete
              // className="input-address"
              onLoad={loadAutocomplete}
              onPlaceChanged={placeChanged}
            >
              <input 
                className="input-text"  
                type="text" 
                placeholder={t('enterLocation')}
              />
            </Autocomplete>
          </div>       
          <div className="rent-date rent-start">
            <label className="label-input" htmlFor="start">
            {t('notes')}
            </label>
            <input 
              className="input-text"
              type="text" 
              placeholder={t('poolNotesPlaceholder')}
              value={notes}  
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>       
        </div>
      </div>
    </form>
  )
}
export default NewOrder