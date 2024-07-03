import { UserExists } from "../../../exceptions/badcredentials.exceptions";

// EmailInputA -> white balloon: NO email fetching
// EmailInputB -> white balloon: email fetching
// EmailInputC -> transparent balloon: NO email fetching
// EmailInputD -> transparent balloon: email fetching

export function EmailInputA({
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
            w-full rounded-xl p-4 text-slate-800 outline-none 
            focus:ring-0 placeholder:text-transparent peer 
            focus:placeholder:text-slate-400 active:placeholder:text-slate-400
          `}
        />
        <label
          htmlFor={id}
          className={`
            absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-emerald-600 text-lg duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-slate-800 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:text-emerald-600 peer-focus:-translate-y-[1.1rem] peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export function EmailInputB({
  id,
  label,
  placeholder,
  value,
  setValue,
  error,
  setError,
  getEmail,
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
  getEmail?: string | undefined;
}) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const verifyEmail = async (email: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/verify-credentials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      if (response.status === 400) throw new UserExists("E-mail já existe");
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  };

  const handleCredentials = async (email: string) => {
    try {
      if (email && getEmail !== email) {
        await verifyEmail(email);
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
            w-full rounded-xl p-4 text-slate-800 outline-none 
            focus:ring-0 placeholder:text-transparent peer 
            focus:placeholder:text-slate-400 active:placeholder:text-slate-400
          `}
        />
        <label
          htmlFor={id}
          className={`
            ${
              error
                ? "text-red-600 peer-placeholder-shown:text-red-600 peer-focus:text-red-600"
                : `text-emerald-600 peer-placeholder-shown:text-slate-800 peer-focus:text-emerald-600`
            } absolute start-[10px] top-[14px] z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform pointer-events-none px-2 text-lg duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
      {error ? (
        <div className="flex items-center ml-[13px]">
          <span className="text-red-500">{error.message}</span>
        </div>
      ) : null}
    </div>
  );
}

export function EmailInputC({
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
            ${
              value ? "border-emerald-600" : "border-slate-800"
            } text-slate-800 w-full pt-6 pb-2 border-b 
            focus:border-emerald-600 active:border-emerald-600 bg-transparent outline-none focus:ring-0 
            placeholder:text-transparent focus:placeholder:text-slate-400 active:placeholder:text-slate-400 peer 
          `}
        />
        <label
          htmlFor={id}
          className={`
            text-emerald-600 absolute start-0 top-[14px] z-10 origin-[0] 
            -translate-y-[1.1rem] scale-75 transform pointer-events-none text-lg duration-300 
            peer-placeholder-shown:top-[65%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-slate-800 
            peer-placeholder-shown:scale-100 peer-focus:top-[14px] peer-focus:-translate-y-[1.1rem] peer-focus:text-emerald-600 
            peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4
          `}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export function EmailInputD({
  id,
  label,
  placeholder,
  value,
  setValue,
  error,
  setError,
  getEmail,
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
  getEmail?: string | undefined;
}) {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const verifyEmail = async (email: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/user/verify-credentials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      if (response.status === 400) throw new UserExists("E-mail já existe");
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  };

  const handleCredentials = async (email: string) => {
    try {
      if (email && getEmail !== email) {
        await verifyEmail(email);
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
            peer w-full pt-6 pb-2 text-slate-800 border-b border-slate-800 bg-transparent 
            ${
              !error
                ? "active:border-green-600 focus:border-green-600"
                : "active:border-red-600 focus:border-red-600"
            }
            outline-none focus:ring-0 placeholder:text-transparent focus:placeholder:text-slate-400 active:placeholder:text-slate-400
          `}
          style={{
            borderBottomColor: error ? "#dc2626" : value ? "#16a34a" : "",
          }}
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
