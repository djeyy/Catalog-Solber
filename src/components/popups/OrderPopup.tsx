import React, {useEffect, useState} from 'react';
import {SuccessPopup} from "@/components/popups/SuccessPopup";
import {InputText} from "@/components/ui/inputs/InputText";
import {MyPhoneInput} from "@/components/ui/inputs/MyPhoneInput";
import {Button} from "@/components/ui/buttons/Button";
import Link from "next/link";
import {SUBSERVER} from "@/common/sub-server.constant";

export const OrderPopup = ({setPopup}: {setPopup: React.Dispatch<boolean>}) => {
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [orderPopupData, setOrderPopupData] = useState(
    {
      material: {
        value: localStorage.getItem('product') || '',
        error: false
      },
      volume: {
        value: '20',
        error: false
      },
      type: {
        value: localStorage.getItem('productType') || 'м³',
        error: false
      },
      phone: {
        value: '',
        error: false
      }
    }
  )

  useEffect(() => {
    setOrderPopupData({...orderPopupData,
      material: {...orderPopupData.material, value: localStorage.getItem('product') || ''},
      type: {...orderPopupData.type, value: localStorage.getItem('productType') || 'м³'}
    })
  }, [localStorage.getItem('product')])

  useEffect(() => {
    setDisabled(orderPopupData.phone.value.length < 11 || !orderPopupData.phone || !orderPopupData.volume.value || error)
  }, [orderPopupData.phone, orderPopupData.volume.value, error])

  const sendData = async () => {
    setDisabled(true)
    setSending(true)

    if (Number(orderPopupData.volume.value) < 20) {
      setOrderPopupData({...orderPopupData, volume: {...orderPopupData.volume, value: '20'}})
    }

    try {
      const orderPopupPost = await fetch(`https://b24-bnchwk.bitrix24.ru/rest/725/h4zvqz0z2waa42wo/crm.lead.add.json?FIELDS[TITLE]=Заказать в ценах&FIELDS[UF_CRM_1650001126]=${orderPopupData.type.value}&FIELDS[UF_CRM_1650001126]=${orderPopupData.volume.value}&FIELDS[UF_CRM_1683296897]=${orderPopupData.material.value}&FIELDS[PHONE][0][VALUE]=${orderPopupData.phone.value}&FIELDS[PHONE][0][VALUE_TYPE]=WORK`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

      const response = await orderPopupPost.json()

      if (!response.result) {
        setSendError(true)
        setDisabled(false)
        setSending(false)
        return
      }

      setSuccess(true)
      setDisabled(false)
      setSending(false)
    } catch (e) {
      console.log(e)
    }
  }
  
  return (
    <div className={'orderPopup'}>
      {success
        ? <SuccessPopup
          setPopup={setPopup}
          sendError={sendError}
          successText={'Ваша заявка успешно отправлена'}
          errorText={'Упс! Что то пошло не так'}
          successSubText={'Наши менеджеры свяжутся с вами в ближайшее время для консультации'}
          errorSubText={'Проверти интернет соединение'}
        />
        : <div>
          <div className={'calculateTheCost__inputs calculateTheCost__inputs'}>
            <div>
              <InputText
                fill={false}
                isLabel={true}
                error={false}
                secondError={false}
                bgError={false}
                disabled={true}
                Important={true}
                type={'text'}
                value={orderPopupData.material.value}
                textError={''}
                placeholder={'Материал'}
                setValue={(material) => setOrderPopupData({...orderPopupData, material: {...orderPopupData.material, value: material}})}
              />
            </div>
            <div className={'calculateTheCost__inputs'}>
              <div>
                <InputText
                  fill={false}
                  isLabel={true}
                  error={false}
                  secondError={false}
                  bgError={false}
                  disabled={false}
                  type={'text'}
                  value={orderPopupData.volume.value}
                  textError={''} placeholder={'Объём'}
                  Important={true}
                  setValue={(volume) => setOrderPopupData({...orderPopupData, volume: {...orderPopupData.volume, value: volume}})}
                  onBlur={() => Number(orderPopupData.volume.value) < 20 && setOrderPopupData({...orderPopupData, volume: {...orderPopupData.volume, value: '20'}})}
                />
              </div>
              <div>
                <InputText
                  fill={false}
                  isLabel={true}
                  error={false}
                  secondError={false}
                  bgError={false}
                  disabled={true}
                  type={'text'}
                  value={orderPopupData.type.value}
                  textError={''}
                  placeholder={'Ед.измерения'}
                  Important={true}
                  setValue={(type) => setOrderPopupData({...orderPopupData, type: {...orderPopupData.type, value: type}})}
                />
              </div>
            </div>
          </div>
          <div className={'calculateTheCost__inputs calculateTheCost__inputs_single'}>
            <div>
              <MyPhoneInput
                value={orderPopupData.phone.value}
                onChange={(phone: string) => setOrderPopupData({...orderPopupData, phone: {...orderPopupData.phone, value: phone}})}
                disabled={false}
                isActive={false}
                btnHelp={null}
                setIsActive={null}
                isError={error}
                setIsError={setError}
                isFunction={null}
              />
            </div>
          </div>
          <div className={'calculateTheCost__button'}>
            <Button
              onClick={sendData}
              svg={null}
              disabled={disabled}
              sending={sending}
              modifier={''}
              color={''}
              colorSvg={''}>Отправить заявку</Button>
          </div>
          <div className={'calculateTheCost__private textMedium'}>
            Отправляя заявку, вы даете согласие на обработку
            <div>
              <Link href={SUBSERVER + '/uploads/POLITIKA_KONFIDEN_Cz_IALNOSTI_8c9311e372.pdf'} target={'_blank'}>персональных данных</Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
};