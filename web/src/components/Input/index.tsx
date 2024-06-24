export default function Input({
  id,
  label,
  placeholder,
  value,
  setValue,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

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
          className={`
            peer w-full rounded-xl p-4 text-slate-900 
            outline-none focus:ring-0 focus:placeholder:text-slate-400 
            placeholder:text-transparent active:placeholder:text-slate-400
          `}
        />
        <label
          htmlFor={id}
          className={`
            text-amber-500 absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-lg duration-300
            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-black peer-placeholder-shown:scale-100 
            peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] peer-focus:text-amber-500 peer-focus:scale-75 peer-focus:px-2 
            rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
}
