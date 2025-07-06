import React, { useEffect, useState } from "react";
import { CiLocationOn  } from "react-icons/ci";
import axios from "axios";
import { useCookies } from "react-cookie";

const AlamatPage = () => {

  const [dataAlamat, setDataAlamat] = useState();
  const [loading, setLoading] = useState(false);
  const [cookie, setCokie, removeCookie] = useCookies();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {

    const fetchProduk = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/alamat/` + cookie["user_id"], 
          {}
        );
        console.log(response.data.data);

        if (response.data.success) {
          setDataAlamat(response.data.data);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduk();
  }, [])


  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 mb-20 md:mt-0">
        <h1 className="text-sm text-gray-600 cursor-pointer">Alamat Saya</h1>
        <div className="bg-white px-4 py-6 mt-4 max-w-5xl mx-auto">
          {
            loading ? (
              <>
              </>
            ) : (
              <>
                {
                  dataAlamat && (
                    <>
                      {
                        dataAlamat.map((alamat) => {
                          return (
                            <div className="alamat bg-white mx-2 p-2 mb-4 rounded-lg border-2 border-gray-200 md:flex md:justify-between justify-center items-center">
                              <div className="">
                                <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                                <div className="flex items-center flex-row gap-2 mt-1">
                                  <CiLocationOn />
                                  <p>Pondok Arrayyan - Ryan Ardiansyah</p>
                                </div>
                                <div className="font-light text-xs text-gray-500 truncate">
                                  {alamat.detail}
                                </div>
                                <div className="font-light text-xs text-gray-500">91411</div>
                                <div className="font-light text-xs text-gray-500">
                                  082246657077
                                </div>
                              </div>
                              <div className="flex justify-center items-center mt-2 md:mt-0">
                                <div
                                  className="bg-orange-500 text-center min-w-36 max-w-96 text-white text-xs px-4 py-2 rounded-lg cursor-pointer"
                                  // onClick={showAlamatModalHandler}
                                >
                                  Ganti Alamat
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </>
                  )
                }
              </>
            )
          }
          
        </div>
      </div>
    </>
  );
};

export default AlamatPage;
