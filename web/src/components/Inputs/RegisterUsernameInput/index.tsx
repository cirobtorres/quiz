import { UserExists } from "../../../exceptions/badcredentials.exceptions";

export default function RegisterUsernameInput({
  id,
  label,
  placeholder,
  value,
  setValue,
  error,
  setError,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  error: { message: string; type: string; status: number } | null;
  setError: (
    error: { message: string; type: string; status: number } | null
  ) => void;
}) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const verifyUsername = async (username: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/verify-credentials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );
    if (!response.ok) {
      if (response.status === 400) throw new UserExists("Apelido já existe");
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  };

  const handleCredentials = async (username: string) => {
    try {
      if (username) {
        await verifyUsername(username);
        setError(null);
      }
    } catch (error) {
      if (error instanceof UserExists) {
        setError({
          message: error.message,
          type: error.type,
          status: error.status,
        });
        return;
      }
      throw error;
    } finally {
    }
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
          onBlur={() => handleCredentials(value)}
          className={`
            peer w-full pt-6 pb-2 text-slate-800 border-b bg-transparent 
            border-slate-800 
            ${value ? "border-green-600" : ""} 
            ${error ? "border-red-600" : "focus:border-green-600"} 
            outline-none focus:ring-0 placeholder:text-transparent focus:placeholder:text-slate-400 active:placeholder:text-slate-400
          `}
        />
        <label
          htmlFor={id}
          className={`absolute start-0 top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none text-lg duration-300 peer-placeholder-shown:top-[65%] peer-placeholder-shown:-translate-y-1/2 ${
            error
              ? "text-red-600 peer-placeholder-shown:text-red-600 peer-focus:text-red-600"
              : `text-emerald-600 peer-placeholder-shown:text-slate-800 peer-focus:text-emerald-600`
          } peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
        >
          {label}
        </label>
      </div>
      <div className="h-4">
        {error ? <span className="text-red-500">{error.message}</span> : null}
      </div>
    </div>
  );
}
