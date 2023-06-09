import React, {useEffect, useState} from 'react';
import Container from "@/components/Container";
import {useMediaQuery} from "react-responsive";
import Image from "next/image";
import {YMaps, Map, Placemark, ZoomControl} from "@pbe/react-yandex-maps";
import {ThirdTitle} from "@/components/titles/ThirdTitle";
import {SUBSERVER} from "@/common/sub-server.constant";
import {InputText} from "@/components/ui/inputs/InputText";
import {MyPhoneInput} from "@/components/ui/inputs/MyPhoneInput";
import {Button} from "@/components/ui/buttons/Button";
import Link from "next/link";

type Props = {
  theme: string;
  isMap: boolean;
  Map: any;
  hTitle: {
    h2Title: string | null;
    h3Title: string | null;
  }
  img: {
    data: {
      attributes: {
        name: string;
        url: string | null;
        alternativeText: string;
        width: number;
        height: number;
      }
    }
  };
}

const Index = ({
                 theme,
                 isMap,
                 Map,
                 hTitle,
                 img: {data}}: Props) => {
  const isMobile = useMediaQuery({maxWidth: 887});
  const [responsive, setResponsive] = useState(<div className={'callBackSection__img'}></div>)
  const [sizeMap, setSizeMap] = useState('718')
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [sending, setSending] = useState(false);
  const [callBackData, setCallBackData] = useState(
    {
      name: {
        value: '',
        error: false
      },
      phone: ''
    }
  )

  useEffect(() => {
    setResponsive(isMobile ? <></> : <div className={'callBackSection__img'}>
      {data && <Image className={'callBackSection__image'} src={SUBSERVER + data.attributes.url} width={data.attributes.width}
              height={data.attributes.height}
              alt={data.attributes.alternativeText ? data.attributes.alternativeText : data.attributes.name || 'image'}/>}
    </div>)

    setSizeMap(isMobile ? '320px' : '718px')
  }, [isMobile, data])

  useEffect(() => {
    setSuccess(null)
    setDisabled(callBackData.phone.length < 11 || !callBackData.phone || !callBackData.name.value ||  error)
  }, [callBackData.name.value, callBackData.phone])

  const sendData = async () => {
    setDisabled(true)
    setSending(true)

    try {
      const consultationPost = await fetch(`https://b24-bnchwk.bitrix24.ru/rest/725/h4zvqz0z2waa42wo/crm.lead.add.json?FIELDS[TITLE]=ОБРАТНАЯ СВЯЗЬ&FIELDS[PHONE][0][VALUE]=${callBackData.phone}&FIELDS[PHONE][0][VALUE_TYPE]=WORK&FIELDS[NAME]=${callBackData.name.value}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        })

      const response = await consultationPost.json()

      if (!response.result) {
        setSending(false)
        setSuccess(false)
        return
      }

      setSuccess(true)
      setSending(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={`callBackSection ${theme}`}>
      <Container>
        <div className={'callBackSection__content'}>
          <div className={'callBackSection__titles'}>
            {hTitle?.h3Title && <ThirdTitle nameSection={hTitle.h3Title}/>}
            {/*{hTitle?.h2Title && <SecondTitle title={hTitle.h2Title}/>}*/}
          </div>
          <form className={'form'}>
            <div className={'form__title textH2 textH2_medium'}>Напишите нам и мы свяжемся с вами в ближайшее время</div>
            <div className={'form__inputs form__inputs_single'}>
              <div>
                <InputText
                  fill={false}
                  isLabel={true}
                  error={callBackData.name.error}
                  secondError={false}
                  bgError={false}
                  disabled={false}
                  type={'text'}
                  value={callBackData.name.value}
                  textError={''}
                  placeholder={'Ваше имя'}
                  Important={true}
                  setValue={(name) => setCallBackData({...callBackData, name: {...callBackData.name, value: name}})}
                  onBlur={() => setCallBackData({...callBackData, name: {...callBackData.name, error: !callBackData.name.value}})}
                />
              </div>
              <div>
                <MyPhoneInput
                  value={callBackData.phone}
                  onChange={(phone: string) => setCallBackData({...callBackData, phone})}
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
            <div className={'form__button'}>
              <Button
                onClick={sendData}
                svg={null}
                disabled={disabled}
                sending={sending}
                modifier={''}
                color={success === null ? '' : success ? 'green' : 'red'}
                colorSvg={''}>Отправить</Button>
            </div>
            <div className={'form__private textMedium'}>
              Отправляя заявку, вы даете согласие на обработку
              <div>
                <Link href={SUBSERVER + '/uploads/POLITIKA_KONFIDEN_Cz_IALNOSTI_8c9311e372.pdf'} target={'_blank'}>персональных данных</Link>
              </div>
            </div>
          </form>
        </div>
      </Container>
      {isMap && Map?.latitude && Map?.longitude
        ? <div className={'callBackSection__map'}>
          <YMaps>
            <div>
              <Map width={'100%'} height={sizeMap} defaultState={{ center: [Number(Map?.latitude), Number(Map?.longitude)], zoom: Number(Map?.zoom), controls: [] }} >
                <Placemark
                  geometry={[Map?.latitude, Map?.longitude]} />
                <ZoomControl options={{ }} />
              </Map>
            </div>
          </YMaps>
        </div>
        : responsive
      }
    </div>
  );
};

Index.defaultProps = {};

export default Index;
