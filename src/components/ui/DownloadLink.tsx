import React from 'react';
import {SUBSERVER} from "@/common/sub-server.constant";
import Image from "next/image";
import useDownloader from "react-use-downloader";

type Props = {
  file: any;
  svg: any;
  text: string;
  [key: string]: any
}

export default function DownloadLink({file, svg, text, ...props}: Props) {
  const {download} = useDownloader();

  return (
    <div {...props} className={'downloadLink'}>
      <div className={'downloadLink__svg'}>
        {svg?.icon?.data?.length && <Image src={SUBSERVER + svg.icon?.data[0].attributes?.url} className={'downloadLink__img'}
                width={svg.icon?.data[0].attributes.width} height={svg.icon?.data[0].attributes.height}
                alt={svg.icon?.data[0].attributes?.alternativeText ? svg.icon?.data[0].attributes.alternativeText : svg.icon?.data[0].attributes.name}/>}
      </div>
      <p onClick={() => download(SUBSERVER + file?.file?.data?.attributes?.url, file?.file?.data?.attributes?.name)} className={'downloadLink__text'}>
        {text}
      </p>
    </div>
  );
};