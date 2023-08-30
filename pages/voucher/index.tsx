/* eslint-disable @next/next/no-img-element */
import { format, subHours } from 'date-fns';
import React, { createRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import JSBarcode from 'components/JSBarcode';

const CDN_URL_CMS = 'https://cdn.vnggames.com/cms';

function Voucher() {
  const componentRef = createRef<HTMLDivElement>();
  const [dataImage, setDataImage] = useState('');

  useEffect(() => {
    if (componentRef.current) {
      html2canvas(componentRef.current, {
        allowTaint: true,
        logging: true,
        useCORS: true,
      }).then((canvas) => {
        setDataImage(canvas.toDataURL('image/png', 1.0));
      });
    }
  }, [componentRef]);

  return (
    <div>
      {dataImage && <img src={dataImage} alt="logo" crossOrigin="anonymous" />}
      <div ref={componentRef} className="w-[488px] h-[1000px] absolute top-[-200%] left-[-200%]">
        <div
          style={{
            width: 488,
            height: 1000,
            backgroundColor: 'white',
            borderRadius: '16px',
          }}
        >
          <div className="flex flex-col gap-3 rounded-2xl bg-white pt-6 pb-10 px-8">
            <div
              className="flex justify-center"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src={`${CDN_URL_CMS}/logo_670c258f6f.webp`}
                alt="logo"
                style={{ width: 102, height: 16 }}
                crossOrigin="anonymous"
              />
            </div>
            <div
              className="flex justify-center"
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <img
                src="https://img-stg.gotit.vn/compress/590x590/2015/12/1449654965_1UhgK.png"
                alt="voucher"
                className="w-[280px] object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <div
              className="flex flex-col gap-4"
              style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div
                className="flex flex-col mb-2"
                style={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}
              >
                <div
                  className="flex flex-row gap-3 items-center"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="flex justify-center"
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <img
                      alt="Avatar Vendor"
                      src="https://img-stg.gotit.vn/compress/brand/1448707019_AZeJo.png"
                      className="w-16 h-16 rounded-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div
                    className="flex flex-col gap-1"
                    style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
                  >
                    <p className="text-sm font-bold text-black">Phúc Long</p>
                    <p className="text-sm font-bold text-black">Trà Sữa</p>
                    <p className="text-sm font-medium text-gray-500 leading-5">55000 VND</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-center text-gray-500 mt-[10px]">
                    Đưa mã voucher cho nhân viên tại quầy thanh toán
                  </p>
                  <div>
                    <JSBarcode value="5361104261" />
                    <div className="flex items-center justify-center">
                      <p className="text-2xl font-bold text-center text-black tracking-[4px]">
                        5361104261
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold text-black">Ngày nhận:</p>
                  <p className="text-base text-gray-500">
                    {format(new Date(), 'dd/MM/yyyy - HH:mm')}
                  </p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <p className="text-base font-bold text-black">Hạn sử dụng:</p>
                  <p className="text-base text-gray-500">
                    {format(subHours(new Date(), 7), 'dd/MM/yyyy - HH:mm')}
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-gray-300 border-dashed" />

            <p className="text-sm text-gray-500">
              Phiếu quà tặng điện tử được cung cấp bởi Got It từ chương trình VNGGames Rewards.
            </p>

            <div>
              <p className="text-base text-black font-bold">Cung cấp bởi</p>
              <div className="p-0 flex items-center gap-1">
                <p className="text-sm font-bold text-orange-600">Got It</p>
              </div>
            </div>

            <hr className="border-gray-300 border-dashed" />
            <div>
              <p className="text-sm text-gray-500 italic">
                Vui lòng không làm mất mã code hoặc tiết lộ cho người khác.
              </p>
              <p className="text-sm text-gray-500 italic">
                Vui lòng đọc điều kiện sử dụng voucher trước khi sử dụng.
              </p>
              <p className="text-sm text-gray-500 italic">
                Vui lòng xuất trình mã code cho thu ngân tại cửa hàng đổi quà.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voucher;
