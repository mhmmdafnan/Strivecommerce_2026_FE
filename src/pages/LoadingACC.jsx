import React from "react";
import Navbar from "../Component/Navbar";

import Loading from "../Component/Loading";

const LoadingAcc = () => {


    return (
        <>
            <Navbar/>
            <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="relative flex flex-col items-center justify-center">
                    <div className="rounded-full w-[400px] h-[400px] bg-blend-color-burn blur-2xl bg-orange-500 opacity-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 text-center font-semibold">
                        Pembukaan Toko UMKM anda sedang menunggu persetujuan admin, mohon tunggu sebentar
                    </div>
                    <div className="mt-10">
                        <Loading/>
                    </div>
                    <div className="mt-20 text-center text-[10px] relative bottom-0">
                        Jika anda telah menunggu terlalu lama, silahkan hubungi admin STRIVE
                    </div>
                </div>
            </div>
        </>
    )


}

export default LoadingAcc;