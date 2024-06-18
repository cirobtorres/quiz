export default function Loading() {
  return (
    <div className="w-24 h-20 relative">
      <div className="w-12 absolute top-0 left-1/2 -translate-x-1/2">
        <svg
          className="absolute origin-center animate-loading"
          viewBox="25 25 50 50"
        >
          <circle
            className="animate-loading-dashes [stroke-dasharray: 1, 200] [stroke-dashoffset: 0] [stroke-linecap: round]"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="7"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
      <h1
        className={`
            text-white 
            absolute bottom-0 left-1/2 -translate-x-1/2
            after:fixed after:overflow-hidden after:inline-block 
            after:animate-loading-dots after:content-["..."] after:w-0
        `}
      >
        Carregando
      </h1>
    </div>
  );
}
