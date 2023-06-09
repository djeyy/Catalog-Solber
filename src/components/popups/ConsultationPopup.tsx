import React, {useEffect, useState} from 'react';
import {InputText} from "@/components/ui/inputs/InputText";
import {MyPhoneInput} from "@/components/ui/inputs/MyPhoneInput";
import {Button} from "@/components/ui/buttons/Button";
import {SuccessPopup} from "@/components/popups/SuccessPopup";
import Link from "next/link";
import {SUBSERVER} from "@/common/sub-server.constant";

export const ConsultationPopup = ({setPopup}: any) => {
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [consultation, setConsultation] = useState(
    {
      name: '',
      phone: '',
      comment: ''
    }
  )

  useEffect(() => {
    setDisabled(consultation.phone.length < 11 || !consultation.phone ||  error)
  }, [consultation.phone, error])

  const sendData = async () => {
    setDisabled(true)
    setSending(true)

    try {
      const consultationPost = await fetch(`https://b24-bnchwk.bitrix24.ru/rest/725/h4zvqz0z2waa42wo/crm.lead.add.json?FIELDS[TITLE]=Тест123&FIELDS[PHONE][0][VALUE]=${consultation.phone}&FIELDS[PHONE][0][VALUE_TYPE]=WORK&FIELDS[NAME]=${consultation.name}&FIELDS[COMMENTS]=${consultation.comment}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

      const response = await consultationPost.json()

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
    <div className={'consultation'}>
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
          <div className={'consultation__inputs consultation__inputs_single'}>
            <div>
              <InputText
                fill={false}
                isLabel={true}
                error={false}
                secondError={false}
                bgError={false}
                disabled={false}
                type={'text'}
                value={consultation.name}
                textError={''}
                placeholder={'Ваше имя'}
                Important={false}
                setValue={(name) => setConsultation({...consultation, name})}
              />
            </div>
            <div>
              <MyPhoneInput
                value={consultation.phone}
                onChange={(phone: string) => setConsultation({...consultation, phone})}
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
          <div className={'consultation__inputs consultation__inputs_single comment'}>
            <textarea onChange={(event) => setConsultation({...consultation, comment: event.target.value})} placeholder={'Ваш комментарий...'}></textarea>
          </div>
          <div className={'consultation__button'}>
            <Button onClick={sendData} svg={null} disabled={disabled} sending={sending} modifier={''} color={''} colorSvg={''}>Отправить</Button>
          </div>
          <div className={'consultation__private textMedium'}>
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