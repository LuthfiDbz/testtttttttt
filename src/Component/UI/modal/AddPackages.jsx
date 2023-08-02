import Slider from "rc-slider";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { sendGetRequest, sendGetRequestMobile, sendPostRequestMobile } from "../../../services/request-adapter";
import "../../../styles/addPackages/addPackages.scss"
import { AuthContext } from "../../authContext/AuthContext";

export const AddPackagesModal = ({isOpen, toggle, data, reload}) => {
  const { t } = useTranslation()
  const auth = useContext(AuthContext)
  const [packagesList, setPackagesList] = useState([])
  const [packageCategory, setPackageCategory] = useState('')
  const [temperature, setTemperature] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    clearErrors,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    getPackagesData()
  }, [])

  const getPackagesData = async () => {
    try {
      const response = await sendGetRequestMobile('/api/item-category')
      setPackagesList(response.data.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitPackages = async (submitData) => {
    const packData = {
      user_id: auth.id,
      label: submitData.label,
      item_category: packageCategory === 'Lainnya' ? submitData.itemDesc : packageCategory,
      weight: submitData.weight,
      lenght: submitData.lenght,
      width: submitData.width,
      height: submitData.height,
      item_tmp: temperature,
    }

    // console.log(packData)
    try {
      const { data } = await sendPostRequestMobile(`/api/template-package`, packData)
      toggle()
      setValue('label', '')
      setValue('weight', '')
      setValue('lenght', '')
      setValue('width', '')
      setValue('height', '')
      setPackageCategory('')
      setTemperature(0)
      reload()
    } catch (error) {
      console.log(error.message)
    }
  }
  

  return (
    <Modal isOpen={isOpen} toggle={toggle} className="add-saved-packages-modal">
      <form onSubmit={handleSubmit(submitPackages)}>
        <ModalHeader className="add-saved-packages-modal-header" >
          <div className="packages-title">
            <h1>{t('pickupPackages')}</h1>
          </div>
        </ModalHeader>
        <ModalBody className="add-saved-packages-modal-body">
          <div className="add-packages-body">
            <label htmlFor="package-label">{t('label')}</label>
            <input 
              type="text" 
              id="package-label" 
              name="package-label" 
              className={errors.label ? 'error': ''} 
              placeholder={t('labelPlaceholder')}
              // value={itemDesc} 
              // onInput={(e) => {setItemDesc(e.target.value)}}
              {...register("label", {
                required: true,
              })}
            />
            <br />
            {errors?.label?.type === "required" && <p>{t('fieldRequired')}</p>}  
            <br />

            <label for="package-category">{t('packagesCategory')}</label>
            <ButtonGroup className="package-category">
              {packagesList.map((pack, index) => {
                return (
                  <Button
                    color="primary"
                    outline
                    className="package-choices"
                    onClick={() => {
                      // setIsOtherPackages(false); 
                      setPackageCategory(pack.name);
                      // setItemDesc('')
                      }
                    }
                    active={packageCategory === pack.name}
                  >
                    {pack.name}
                  </Button>
                )
              })}
                      
            </ButtonGroup>
            <br />

            {packageCategory === 'Lainnya' && 
              <>
                <label htmlFor="package-description">{t('otherDescription')}</label>
                <input 
                  type="text" 
                  id="package-description" 
                  name="package-description" 
                  className={errors.itemDesc ? 'error': ''} 
                  placeholder={t('otherDescription')}
                  // value={itemDesc} 
                  // onInput={(e) => {setItemDesc(e.target.value)}}
                  {...register("itemDesc", {
                    required: true,
                  })}
                />
                <br />
                {errors?.itemDesc?.type === "required" && <p>{t('fieldRequired')}</p>}
              </>
            }

            <label htmlFor="weight-package">{t('weight')}</label>
            <input 
              type="text" 
              id="weight-package" 
              name="weight-package" 
              className={errors.weight ? 'error': ''} 
              placeholder={t('weightPlaceholder')}
              // value={weight} 
              // onInput={(e) => {setWeight(e.target.value)}}
              {...register("weight", {
                required: true,
                pattern: /^[0-9]/,
                validate: value => value <= 30 || t('weightPlaceholder')
              })}
            />
            <br />
            {errors?.weight?.type === "required" && <p>{t('fieldRequired')}</p>}
            {errors?.weight?.type === "pattern" && 
              <p>{t('numbersOnly')}</p>
            }
            {errors?.weight?.type === "validate" && 
              <p>{errors.weight.message}</p>
            }
                    

            <label htmlFor="lenght">{t('length')}</label>
            {errors?.lenght?.type === "required" && 
              <label htmlFor="length" className="label-error">{t('fieldRequired')}</label>
            }
            {errors?.lenght?.type === "pattern" && 
              <label htmlFor="length" className="label-error">{t('numbersOnly')}</label>
            }
            {errors?.lenght?.type === "validate" && 
              <label htmlFor="length" className="label-error">{t('lengthPlaceholder')}</label>
            }
            <input 
              type="text" 
              id="lenght" 
              name="lenght" 
              className={errors.lenght ? 'error': ''} 
              placeholder={t('lengthPlaceholder')} 
              // value={lenght} 
              // onInput={(e) => {setLenght(e.target.value)}}
              {...register("lenght", {
                required: true,
                pattern: /^[0-9]/,
                validate: value => value <= 58 || t('lengthPlaceholder')
              })}
            />
                    

            <label htmlFor="width">{t('width')}</label>
            {errors?.width?.type === "required" && 
              <label htmlFor="width" className="label-error">{t('fieldRequired')}</label>
            }
            {errors?.width?.type === "pattern" && 
              <label htmlFor="width" className="label-error">{t('numbersOnly')}</label>
            }
            {errors?.width?.type === "validate" && 
              <label htmlFor="width" className="label-error">{t('widthPlaceholder')}</label>
            }
            <input 
              type="text" 
              id="width" 
              name="width" 
              className={errors.width ? 'error': ''} 
              placeholder={t('widthPlaceholder')}
              // value={width} 
              // onInput={(e) => {setWidth(e.target.value)}}
              {...register("width", {
                required: true,
                pattern: /^[0-9]/,
                validate: value => value <= 32 || t('widthPlaceholder')
              })}
            />

            <label htmlFor="height">{t('height')}</label>
            {errors?.height?.type === "required" && 
              <label htmlFor="height" className="label-error">{t('fieldRequired')}</label>
            }
            {errors?.height?.type === "pattern" && 
              <label htmlFor="height" className="label-error">{t('numbersOnly')}</label>
            }
            {errors?.height?.type === "validate" && 
              <label htmlFor="height" className="label-error">{t('heightPlaceholder')}</label>
            }
            <input 
              type="text" 
              id="height" 
              name="height" 
              className={errors.height ? 'error': ''} 
              placeholder={t('heightPlaceholder')}
              // value={height} 
              // onInput={(e) => {setHeight(e.target.value)}}
              {...register("height", {
                required: true,
                pattern: /^[0-9]/,
                validate: value => value <= 42 || t('heightPlaceholder')
              })}
            />
            <br />

            <label htmlFor="temperature" id="temperature-label">{t('temperature')}</label>
            <div className="range">
              <Slider 
                min={-22} 
                max={10} 
                marks={{
                  '-22': '-22°C',
                  '-14' : '-14°C',
                  '-6' : '-6°C',
                  2: '2°C',
                  10: '10°C'
                }}
                defaultValue={temperature} 
                value={temperature} 
                trackStyle={{ 
                  backgroundColor: '#6EB9E3',
                  height: '0.5rem'
                }}
                railStyle={{ 
                  backgroundColor: '#E1EAF6',
                  height: '0.5rem',
                }}
                handleStyle={{
                  borderColor: '#1F83BB',
                  height: '1.1rem',
                  width: '1.1rem',
                  // height: 28,
                  // width: 28,
                  opacity: 1,
                  backgroundColor: '#1F83BB',
                }}
                onChange={(e) => setTemperature(e)}
              />
              <h6>{temperature}&deg; C</h6>
            </div>
            <br />
          </div>
          
        </ModalBody>
        <ModalFooter className="add-saved-packages-modal-footer">
          <Button className="close" onClick={() => toggle()}>
            {t('close')}
          </Button>
          <Button className="save" >
            {t('add')}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}