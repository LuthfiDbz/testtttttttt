import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { Footer } from "../Component/footer/Footer";
import { Header } from "../Component/header/Header";
import "../styles/requestCoorporate/request.scss";
import RequestIcon from "../assets/img/img-state-waiting.png"
import ConfirmIcon from '../assets/img/img-state-confirmation.png'
import CorporateIcon from '../assets/img/img-request-corporate.png'
import BgBanner from '../assets/img/bg-banner-4.png'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { errorPopup, networkErrorPopup } from "../Component/UI/modal/PopUp/ErrorPopUp";
import { LoadingScreen } from "../Component/loadingScreen/loadingScreen";
import { InputImage } from "../Component/input/input-image";
import { sendGetRequest } from "../services/request-adapter";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

export const RequestCoorporate = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [monthly, setMonthly] = useState("");
  const [organization, setOrganization] = useState("");
  const [loadingScreen, setLoadingScreen] = useState(false)
  const [provinceData, setProvinceData] = useState([])
  const [cityData, setCityData] = useState([])
  const [districtdata, setDistrictdata] = useState([])
  const [subdistrictData, setSubdistrictData] = useState([])
  const [provinceId, setProvinceId] = useState("")
  const [cityId, setCityId] = useState("")
  const [districtId, setDistrictId] = useState("")
  const [subdistrictId, setSubdistrictId] = useState("")

  // States htmlFor checking the errors
  const [error, setError] = useState(false);
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm();

  const [ libraries ] = useState(['places']);
  const [autocomplete, setAutocomplete] = useState(null)

  const district = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  const indonesiaField = [
    {
      name: 'province',
      label: 'province',
      error: errors?.province,
      options: provinceData,
      disabled: true,
      setId: setProvinceId
    },
    {
      name: 'city',
      label: 'city',
      error: errors?.city,
      options: cityData,
      disabled: provinceId,
      setId: setCityId
    },
    {
      name: 'district',
      label: 'district',
      error: errors?.district,
      options: districtdata,
      disabled: cityId,
      setId: setDistrictId
    },
    {
      name: 'subdistrict',
      label: 'subdistrict',
      error: errors?.subdistrict,
      options: subdistrictData,
      disabled: districtId,
      setId: setSubdistrictId
    },
  ]

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      // setIsLoading(true);
      try {
        const { data } = await sendGetRequest("/indonesia/provinces?limit=0", {
          signal: controller.signal,
        });
        let newData = []
        data.data.map((e) => {
          newData.push({value: e.name, label: e.name, id: e.id})
        })
        setProvinceData(newData)
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);


  useEffect(() => {
    const controller = new AbortController();

    if (provinceId) {
      (async () => {
        // setIsLoading(true);
        try {
          const { data } = await sendGetRequest(
            `/indonesia/provinces/${provinceId}/cities?limit=0`,
            {
              signal: controller.signal,
            }
          );
          let newData = []
          data.data.map((e) => {
            newData.push({value: e.name, label: e.name, id: e.id})
          })
          setCityData(newData)
        } catch (error) {
          console.error(error);
        } finally {
          // setIsLoading(false);
        }

        return () => {
          controller.abort();
        };
      })();
    }

    if (cityId) {
      (async () => {
        // setIsLoading(true);
        try {
          const { data } = await sendGetRequest(
            `/indonesia/cities/${cityId}/districts?limit=0`,
            {
              signal: controller.signal,
            }
          );
          let newData = []
          data.data.map((e) => {
            newData.push({value: e.name, label: e.name, id: e.id})
          })
          setDistrictdata(newData)
        } catch (error) {
          console.error(error);
        } finally {
          // setIsLoading(false);
        }

        return () => {
          controller.abort();
        };
      })();
    }

    if (districtId) {
      (async () => {
        // setIsLoading(true);
        try {
          const { data } = await sendGetRequest(
            `/indonesia/districts/${districtId}/villages?limit=0`,
            {
              signal: controller.signal,
            }
          );
          let newData = []
          data.data.map((e) => {
            newData.push({value: e.name, label: e.name, id: e.id})
          })
          setSubdistrictData(newData)
        } catch (error) {
          console.error(error);
        } finally {
          // setIsLoading(false);
        }

        return () => {
          controller.abort();
        };
      })();
    }

    return () => {
      controller.abort();
    };
  }, [provinceId, cityId, districtId]);

  const url = process.env.REACT_APP_URL_CUST
  const access_token = sessionStorage.getItem('token')
  const headers = {
    'Authorization': `${access_token}`,
    "Content-Type": "multipart/form-data"
  }
 

  const onSubmit = (formData) => {
    if(!image) return errorPopup(t('error'), t('uploadImageFirst'), t('gotit'))

    const data = {
      // customer_id: id,
      img: image,
      min_order: formData.monthly,
      corporate_name: formData.organization,
      address: formData.address,
      village_id: subdistrictId,
      postal_code: formData.postal
    }

    Swal.fire({
      title: t('confirmation'),
      text: t('requestConfirm'),
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: `${t('confirm')}!`,
      cancelButtonText: t('cancel'),
      reverseButtons: true,
      imageUrl: ConfirmIcon,
      customClass: {
        popup: 'popup-swal',
        title: 'title-swal',
        htmlContainer: 'text-swal',
        confirmButton:'confirm-swal',
        cancelButton: 'cancel-swal'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingScreen(true)
        try {
          const response = await axios.post(`${url}/api/req-corporate`, data, {headers})
          
          setLoadingScreen(false)
          Swal.fire({
            title: t('requestSuccessTitle'),
            text: t('requestSuccessText'),
            imageUrl: RequestIcon,
            showConfirmButton: true,
            confirmButtonColor: "#3085d6",
            confirmButtonText: t('backHome'),
            customClass: {
              popup: 'popup-swal',
              title: 'title-swal',
              htmlContainer: 'text-swal',
              confirmButton:'confirm-swal'
            }
          }).then((result) => {
            if(result.isConfirmed) {
              navigate('/')
            }
          })
        } catch(error) {
          console.log(error.message)
          setLoadingScreen(false)
          if(error.message === 'Network Error') {
            // setLoadingScreen(false)
            networkErrorPopup(t('networkErrorTitle'),t('networkErrorText'), t('reload'), t('cancel'))
          } else {
            errorPopup(t('error'),t('somethingError'), t('close'))
          }
        }
      }
    });
  }

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

  return (
    <>
      {/* <Header /> */}
      {loadingScreen && <LoadingScreen />}
      <div className="container-request-corporate">
        <div className="request-bg" style={{backgroundImage: `url(${BgBanner})`}}>
          <div className="text-container">
            <h3>{t('requestCorporate')}</h3>
            <span>
              <a href="/">{t('home')}</a> /
              <a href="#">{t('requestCorporate')}</a>
            </span>
          </div>
        </div>
        <form action="" className="container-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-header">
            <div>
              {/* <img src={CorporateIcon} alt="" /> */}
              <div>
                <h5>{t('requestCorporate')}</h5>
                <p>{t('requestCorporateText')}</p>
              </div>
            </div>
          </div>
          <div className="form-body">
            <h5>{t('requestCorporateInformation')}</h5>
            <div
              className="form-personal-info"
            >
              <h6>Photo Profile <span style={{color: 'red'}}>*</span></h6>
              <InputImage 
                className="request-image"
                setImage={setImage}
              /> 
              <div className="input-wrapper">
                <label className="label-input" htmlFor="monthly">
                {t('requestCorporateMiniminal')}
                </label>
                <input
                  className={`input-text ${errors.monthly ? 'error': ''}`}
                  type="text"
                  name="monthly"
                  {...register("monthly", {
                    required: true,
                    pattern: /^\d+$/
                  })}
                />
                {errors?.monthly?.type === "required" && <p>{t('fieldRequired')}</p>}
                {errors?.monthly?.type === "pattern" && (
                  <p>{t('numbersOnly')}</p>
                )}
              </div>
              <div className="input-wrapper">
                <label className="label-input" htmlFor="organization">
                {t('requestCorporateOrganization')}
                </label>
                <input
                  className={`input-text ${errors.organization ? 'error': ''}`}
                  type="text"
                  name="organization"
                  {...register("organization", {
                    required: true
                  })}
                />
                {errors?.organization?.type === "required" && <p>{t('fieldRequired')}</p>}
              </div>
            </div>
            <h5>{t('requestCorporateLocation')}</h5>
            <div
              className="form-personal-info"
            >
              <div className="input-wrapper address">
                <label className="label-input" htmlFor="postal">
                {t('address')}
                </label>
                {/* <input
                  className={`input-text ${errors?.address ? 'error': ''}`}
                  type="text"
                  name="address"
                  {...register(`address`, {
                    required: true,
                  })}
                /> */}
                <Autocomplete
                  // className="input-address"
                  onLoad={loadAutocomplete}
                  restrictions={{country: 'id'}}
                >
                  <input
                  className={`input-text ${errors?.address ? 'error': ''}`}
                  type="text"
                  name="address"
                  placeholder=''
                  {...register(`address`, {
                    required: true,
                  })}
                />
                </Autocomplete>
                {errors?.address?.type === "required" && <p>{t('fieldRequired')}</p>}
              </div>
              {indonesiaField.map((indo) => {
                return (
                  <div className="input-wrapper">
                    <label className="label-input" htmlFor="monthly">
                    {t(`${indo.label}`)}
                    </label>
                    <div className="mt-5 m-auto w-100">
                      <Controller
                        name={indo.label}
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange }, value, name, ref }) => (
                          <Select
                            inputRef={ref}
                            classNamePrefix="addl-class"
                            className={`${indo.error ? 'select-data-error': 'select-data'}`}
                            options={indo.options}
                            value={indo.options.find(c => c.value === value)}
                            onChange={val => {onChange(val.value);indo.setId(val.id)}}
                            isDisabled={!indo.disabled}
                            placeholder={`${t('select')} ${t(`${indo.label}`)}`}
                          />
                        )}
                      />
                      {indo.error && <p>{t('fieldRequired')}</p>}
                    </div>
                  </div>
                )
              })}
              <div className="input-wrapper">
                <label className="label-input" htmlFor="postal">
                {t('postalCode')}
                </label>
                <input
                  className={`input-text ${errors?.postal ? 'error': ''}`}
                  type="text"
                  name="postal"
                  {...register("postal", {
                    required: true,
                    pattern: /^\d+$/
                  })}
                />
                {errors?.postal?.type === "required" && <p>{t('fieldRequired')}</p>}
                {errors?.postal?.type === "pattern" && (
                  <p>{t('numbersOnly')}</p>
                )}
              </div>
            </div>
          </div>
          <div className="form-footer">
            <Button className="btn-submit-request" type="submit">
              {t('request')}
            </Button>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};
