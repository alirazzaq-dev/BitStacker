const Wrapper = (
  { children }:
    { children: React.ReactNode }
) => {
  return <div className="font-ubuntu bg-[#030303] text-white">{children}</div>;
};

export default Wrapper;
