import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

enum PictureType {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

interface Picture {
  src: string;
  type: PictureType.PORTRAIT | PictureType.LANDSCAPE;
}

export default function ResponsiveNextImage({ images }: { images: Picture[] }) {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto">
      <div className="grid grid-flow-row-dense grid-cols-3 gap-2 md:gap-4 xl:gap-5 px-2 md:px-4 xl:px-0">
        <div className="flex flex-col gap-2 md:gap-4 xl:gap-5">
          {images
            .filter((_, index) => index % 3 === 0)
            .map((item) => (
              <div key={uuidv4()} className="w-full relative">
                <Image
                  src={`/assets/images/christmas/${item.src}.jpg`}
                  alt=""
                  priority
                  sizes="640px"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  width={480}
                  height={item.type === PictureType.PORTRAIT ? 720 : 360}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2 md:gap-4 xl:gap-5">
          {images
            .filter((_, index) => index % 3 === 1)
            .map((item) => (
              <div key={uuidv4()} className="w-full relative">
                <Image
                  src={`/assets/images/christmas/${item.src}.jpg`}
                  alt=""
                  priority
                  sizes="640px"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  width={480}
                  height={item.type === PictureType.PORTRAIT ? 720 : 360}
                />
              </div>
            ))}
        </div>
        <div className="flex flex-col gap-2 md:gap-4 xl:gap-5">
          {images
            .filter((_, index) => index % 3 === 2)
            .map((item) => (
              <div key={uuidv4()} className="w-full relative">
                <Image
                  src={`/assets/images/christmas/${item.src}.jpg`}
                  alt=""
                  priority
                  sizes="640px"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  width={480}
                  height={item.type === PictureType.PORTRAIT ? 720 : 360}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps() {
  const listImage = [
    { src: 'christmas-shock', type: PictureType.PORTRAIT },
    { src: 'pine', type: PictureType.PORTRAIT },
    { src: 'snowman', type: PictureType.PORTRAIT },
    { src: 'handheld-firework', type: PictureType.LANDSCAPE },
    { src: 'snow', type: PictureType.LANDSCAPE },
    { src: 'christmas-decoration', type: PictureType.LANDSCAPE },
  ];
  const images: Picture[] = new Array(30)
    .fill(0)
    .map(() => listImage[Math.floor(Math.random() * 6)]);

  return { props: { images } };
}
