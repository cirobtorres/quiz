export default function Input({
  id,
  label,
  placeholder,
  value,
  setValue,
  options,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  options?: {
    alternateDesign: boolean;
  };
}) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const designA = [
    `peer w-full rounded-xl p-4 text-slate-900 outline-none focus:ring-0 placeholder:text-transparent focus:placeholder:text-slate-400 active:placeholder:text-slate-400`,
    `absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-900 outline-none`,
    `text-amber-500 absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-lg duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-black peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] peer-focus:text-amber-500 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`,
  ];

  const designB = [
    `peer w-full pt-6 pb-2 text-pink-500 border-b border-white focus:border-amber-500 active:border-amber-500 bg-transparent outline-none focus:ring-0 placeholder:text-transparent focus:placeholder:text-pink-500 active:placeholder:text-pink-500`,
    `absolute right-3 top-1/2 -translate-y-1/2 text-xl text-white outline-none`,
    `text-amber-500 absolute start-0 top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none text-lg duration-300 peer-placeholder-shown:top-[65%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-white peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] peer-focus:text-amber-500 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`,
  ];

  return (
    <div className={`flex h-full w-full flex-col`}>
      <div className={"relative"}>
        <input
          id={id}
          name={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          className={!options ? designA[0] : designB[0]}
          style={{ borderBottom: value ? "1px solid #f59e0b" : "" }}
        />
        <label htmlFor={id} className={!options ? designA[2] : designB[2]}>
          {label}
        </label>
      </div>
    </div>
  );
}
