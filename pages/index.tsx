/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from 'next-auth/react';
import { format, subHours } from 'date-fns';
import { createRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import JSBarcode from 'components/JSBarcode';

const CDN_URL_CMS = 'https://cdn.vnggames.com/cms';

export default function Home() {
  const { data: session, status } = useSession();
  const componentRef = createRef<HTMLDivElement>();

  const exportAsImage = async (element: HTMLElement, imageFileName: string) => {
    const canvas = await html2canvas(element, { allowTaint: true, logging: true, useCORS: true });

    // const image = canvas.toDataURL('image/png', 1.0);
    // const fakeLink = window.document.createElement('a');
    // fakeLink.download = `${imageFileName} - ${new Date().getTime()}`;

    // fakeLink.href = image;

    // fakeLink.click();

    canvas.toBlob((blob) => {
      blob && saveAs(blob, `${imageFileName} - ${new Date().getTime()}`);
    });
  };

  const handleCopy = async (value: string) => {
    navigator && (await navigator.clipboard.writeText(value));
  };

  if (status === 'authenticated') {
    return (
      <section className="grid h-screen place-items-center">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Hi {session?.user?.name}
          </h2>
          <br />
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            You are signed in as {session?.user?.email}.
          </p>
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Logout
          </button>
        </div>
      </section>
    );
  }
  return (
    <section className="grid h-screen place-items-center">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome To LogRocket
        </h2>
        <br />
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          You currently not authenticated. Click the login button to get started!
        </p>
        <button
          type="button"
          onClick={() => signIn()}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Login
        </button>
      </div>

      <button
        type="button"
        onClick={() =>
          componentRef &&
          componentRef.current &&
          exportAsImage(componentRef.current, `Trà Sữa -  ${new Date().getTime()}`)
        }
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Save voucher
      </button>

      <button
        type="button"
        onClick={() => handleCopy(format(new Date(), 'dd/MM/yyyy - HH:mm:ss'))}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Copy voucher
      </button>

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
    </section>
  );
}
