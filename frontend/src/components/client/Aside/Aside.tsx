'use client';
import React,{memo} from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Aside: React.FC = () => {
  return (
    <div className="w-full md:w-64 order-2 md:order-2 mb-4 md:mb-0">
      {[
        "https://study4.com/media/home/HomeBanner/files/2022/07/06/Learning_English_with.jpg",
        "https://study4.com/media/home/HomeBanner/files/2023/03/31/Learning_English_with_1.png",
        "https://study4.com/media/home/HomeBanner/files/2021/12/01/download_extension.png",
      ].map((src, index) => (
        <Link href="#" key={index}>
          <Image src={src} alt={`Banner ${index}`} width={400} height={100} className="mb-4" />
        </Link>
      ))}
    </div>
  );
};

export default React.memo(Aside);
