export const Loader = () => (
  <div className="fixed inset-0 bg-black flex items-center h-screen w-screen bg-white justify-center z-[9999]">
    <img src="/loader.gif" alt="" className="h-full  object-cover" />
    {/* <video
      autoPlay
      loop
      muted
      playsInline
      className=" h-full w-full object-contain"
    >
      <source src="/loader.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}
  </div>
);
