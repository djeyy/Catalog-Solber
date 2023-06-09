import React, {useEffect, useState} from 'react';
import {InputText} from "@/components/ui/inputs/InputText";
import {MyPhoneInput} from "@/components/ui/inputs/MyPhoneInput";
import {Button} from "@/components/ui/buttons/Button";
import Link from "next/link";
import {closePopUp} from "@/common/open-close-popup.function";
import {SUBSERVER} from "@/common/sub-server.constant";

export const CalculateTheCostPopup = ({pageData, setPopup}: {pageData: any; setPopup: React.Dispatch<boolean>}) => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [calculateTheCostData, setCalculateTheCostData] = useState(
    {
      material: pageData?.attributes?.title || '',
      volume: '20',
      type: pageData?.attributes?.price?.priceMeasure ? pageData?.attributes?.price?.priceMeasure.split('/')[1] : 'м³',
      name: '',
      phone: '',
      email: '',
      address: {
        value: '',
        error: false
      }
    }
  )

  useEffect(() => {
    setDisabled(calculateTheCostData.phone.length < 11 || !calculateTheCostData.phone || calculateTheCostData.address.error || error)
  }, [calculateTheCostData.phone, calculateTheCostData.address.error, error])

  useEffect(() => {
    setCalculateTheCostData({...calculateTheCostData, address: {...calculateTheCostData.address, error: false}})
  }, [calculateTheCostData.address.value])

  const sendData = async () => {
    setDisabled(true)
    setSending(true)

    if (Number(calculateTheCostData.volume) < 20) {
      setCalculateTheCostData({...calculateTheCostData, volume: '20'})
    }

    try {
      const calculateTheCost = await fetch(`https://b24-bnchwk.bitrix24.ru/rest/725/h4zvqz0z2waa42wo/crm.lead.add.json?FIELDS[NAME]=${calculateTheCostData.name}&FIELDS[TITLE]=Форма расчет стоимости&FIELDS[UF_CRM_1650001126]=${calculateTheCostData.type}&FIELDS[UF_CRM_1630057135925]=${calculateTheCostData.address.value}&FIELDS[UF_CRM_1650001126]=${calculateTheCostData.volume}&FIELDS[UF_CRM_1683296897]=${calculateTheCostData.material}&FIELDS[PHONE][0][VALUE]=${calculateTheCostData.phone}&FIELDS[PHONE][0][VALUE_TYPE]=WORK`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

      const response = await calculateTheCost.json()

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
      setDisabled(false)
      setSending(false)
    }
  }

  return (
    <div className={'calculateTheCost'}>
      {success
        ? <div className={'success'}>
          <div className={`success__icon ${sendError ? 'error' : ''}`}></div>
          <div className={'success__title textH3 textH3_medium'}>{sendError ? 'Упс! Что то пошло не так' : 'Ваша заявка успешно отправлена'}</div>
          <div className={'success__subTitle textH6'}>{sendError ? 'Проверти интернет соединение' : 'Наши менеджеры свяжутся с вами в ближайшее время для консультации'}</div>
          <div>
            <Button
              onClick={() => setPopup(closePopUp())}
              svg={null}
              disabled={false}
              sending={false}
              modifier={''}
              color={sendError ? 'red' : 'green'}
              colorSvg={''}>Хорошо</Button>
          </div>
        </div>
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
                Important={false}
                type={'text'} value={calculateTheCostData.material} textError={''} placeholder={'Материал'} setValue={(material) => setCalculateTheCostData({...calculateTheCostData, material})}
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
                  value={calculateTheCostData.volume}
                  textError={''} placeholder={'Объём'}
                  Important={false}
                  setValue={(volume) => setCalculateTheCostData({...calculateTheCostData, volume})}
                  onBlur={() => Number(calculateTheCostData.volume) < 20 && setCalculateTheCostData({...calculateTheCostData, volume: '20'})}
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
                  value={calculateTheCostData.type}
                  textError={''}
                  placeholder={'Ед.измерения'}
                  Important={false}
                  setValue={(type) => setCalculateTheCostData({...calculateTheCostData, type})}
                />
              </div>
            </div>
          </div>
          <div className={'calculateTheCost__inputs calculateTheCost__inputs'}>
            <div>
              <InputText
                fill={false}
                isLabel={true}
                error={false}
                secondError={false}
                bgError={false}
                disabled={false}
                type={'text'}
                value={calculateTheCostData.name}
                textError={''}
                placeholder={'Ваше имя'}
                Important={false}
                setValue={(name) => setCalculateTheCostData({...calculateTheCostData, name})}
              />
            </div>
            <div>
              <MyPhoneInput
                value={calculateTheCostData.phone}
                onChange={(phone: string) => setCalculateTheCostData({...calculateTheCostData, phone})}
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
          <div className={'calculateTheCost__inputs calculateTheCost__inputs_single'}>
            <div>
              <InputText
                fill={false}
                isLabel={true}
                error={false}
                secondError={false}
                bgError={false}
                disabled={false}
                type={'text'}
                value={calculateTheCostData.email}
                textError={''}
                placeholder={'Email'}
                Important={false}
                setValue={(email) => setCalculateTheCostData({...calculateTheCostData, email})}
              />
            </div>
          </div>
          <div className={'calculateTheCost__inputs calculateTheCost__inputs_single'}>
            <div>
              <InputText
                fill={false}
                isLabel={true}
                error={calculateTheCostData.address.error}
                secondError={false}
                bgError={false}
                disabled={false}
                type={'text'}
                value={calculateTheCostData.address.value}
                textError={''}
                placeholder={'Адрес доставки'}
                onBlur={() => setCalculateTheCostData({...calculateTheCostData, address: {...calculateTheCostData.address, error: Boolean(!calculateTheCostData.address.value)}})}
                Important={true}
                setValue={(address) => setCalculateTheCostData({...calculateTheCostData, address: {...calculateTheCostData.address, value: address}})}
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