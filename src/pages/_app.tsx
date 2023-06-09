import type { AppProps } from 'next/app'
import '@/styles/global.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from "react";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <Script id={'script-1'} src="https://dmp.one/sync" async charSet="UTF-8"/>
      <Script id={'script-2'} type="text/javascript" >
        {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        
                ym(74342080, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
              });
            `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}
