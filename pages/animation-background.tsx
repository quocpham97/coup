export default function AnimationBackground() {
  return (
    <div
      className="w-full h-screen grid grid-flow-col grid-cols-[6] gap-4 overflow-hidden"
      style={{
        background:
          'linear-gradient(360deg, black 0%, black 42.5%, yellow 50%, black 57.5%, black 100%)',
        backgroundSize: '100% 400%',
        animation: 'gradient 7.5s ease infinite',
      }}
    >
      <div className="grid grid-flow-row-dense grid-cols-12 grid-rows-8 gap-1">
        {new Array(Math.floor(108)).fill(0).map(() => (
          <div className="col-span-1 bg-black hover:bg-yellow-300 hover:transition duration-[2500ms] ease-out cursor-pointer" />
        ))}
      </div>
    </div>
  );
}
