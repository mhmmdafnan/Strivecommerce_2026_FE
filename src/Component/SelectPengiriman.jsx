import { useState } from "react";

const SelectPengiriman = (props) => {
  const { pengiriman, handleChange } = props;
  // Jika ingin state lokal:
  // const [pengiriman, setPengiriman] = useState("");


  return (
    <div className="relative group rounded-lg w-48 overflow-hidden">
      <svg
        y="0"
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        width="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        height="100"
        className="w-8 h-8 absolute right-0 -rotate-45 stroke-black top-1.5 group-hover:rotate-0 duration-300"
      >
        <path
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
          d="M60.7,53.6,50,64.3m0,0L39.3,53.6M50,64.3V35.7m0,46.4A32.1,32.1,0,1,1,82.1,50,32.1,32.1,0,0,1,50,82.1Z"
          className="svg-stroke-primary"
        ></path>
      </svg>
      <select
        className="appearance-none hover:placeholder-shown:bg-emerald-500 relative  bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900  text-sm font-bold rounded-lg block w-full p-2.5"
        value={pengiriman}
        onChange={handleChange}
      >
        {/* <option value="">Pilih Pengiriman</option> */}
        <option value="0">JNT</option>
        <option value="1">JNE</option>
        <option value="2">Ninja Express</option>
        <option value="3">Sicepat</option>
        <option value="4">TIKI</option>
      </select>
    </div>
  );
};

export default SelectPengiriman;