import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Component/Loading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const AlamatPage = () => {
  const [prov, setProv] = useState();
  const [selectProv, setSelectProv] = useState();
  const [kab, setKab] = useState();
  const [selectKab, setSelectKab] = useState();
  const [kec, setKec] = useState();
  const [selectKec, setSelectKec] = useState();
  const [desa, setDesa] = useState();
  const [selectDesa, setSelectDesa] = useState();
  const [loadingProv, setLoadingProv] = useState(true);
  const [loadingKab, setLoadingKab] = useState(false);
  const [loadingKec, setLoadingKec] = useState();
  const [loadingDesa, setLoadingDesa] = useState();
  const [kodePos, setKodePos] = useState("");
  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [detail, setDetail] = useState("");
  const [alamatDefault, setAlamatDefault] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["isLoggedIn"]);
  const [namaBangunan, setNamaBangunan] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleCheckboxChange = (event) => {
    setAlamatDefault(event.target.checked);
  };


  const handleChangeDesa = (event) => {
    setSelectDesa(event.target.value);
  };
  const handleChangeKec = (event) => {
    setSelectKec(event.target.value);
  };
  const handleChangeProv = (event) => {
    setSelectProv(event.target.value);
  };

  const handleChangeKab = (event) => {
    setSelectKab(event.target.value);
  };

  const onAlamatSubmit = async () => {
    console.log(selectProv, selectKab, selectKec, selectDesa, kodePos, detail);

    if (!selectProv || !selectKab || !selectKec || !selectDesa || !kodePos) {
      alert("Silahkan Lengkapi isi Form");
      return;
    }

    const def = alamatDefault ? 1 : 0;

    try {
      const response = await axios.post(`${apiUrl}/api/v1/alamat`, {
        userId: cookies["user_id"],
        kodeProv: selectProv,
        kodeKab: selectKab,
        kodeKec: selectKec,
        kodeDesa: selectDesa,
        detail: detail,
        nama : nama,
        notelp : noTelp,
        bangunan : namaBangunan,
        // catatan,
        kode_pos: kodePos,
        // is_toko,
        is_default: def,
      });
      console.log(response);

      if (response.data.success) {
        navigate("/alamat")
      } else {
        // setShowLoginError(true);
      }
    } catch (error) {
      // setShowLoginError(true);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduk = async () => {
      setLoadingProv(true);
      try {
        const response = await axios.get(`${apiUrl}/api/v1/prov`, {});
        console.log(response.data.data);

        if (response.data.success) {
          setProv(response.data.data);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
      } finally {
        setLoadingProv(false);
      }
    };

    fetchProduk();
  }, []);

  useEffect(() => {
    setSelectKab();
    const fetchProduk = async () => {
      setLoadingKab(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/kab/` + selectProv,
          {}
        );
        console.log(response.data.data);

        if (response.data.success) {
          setKab(response.data.data);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
      } finally {
        setLoadingKab(false);
      }
    };

    fetchProduk();
  }, [selectProv]);

  useEffect(() => {
    setSelectKec();
    const fetchProduk = async () => {
      setLoadingKec(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/kec/` + selectProv + `/` + selectKab,
          {}
        );
        console.log(response.data.data);

        if (response.data.success) {
          setKec(response.data.data);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
      } finally {
        setLoadingKec(false);
      }
    };

    fetchProduk();
  }, [selectKab, selectProv]);

  useEffect(() => {
    setSelectDesa();
    const fetchProduk = async () => {
      setLoadingDesa(true);
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/desa/` +
            selectProv +
            `/` +
            selectKab +
            `/` +
            selectKec,
          {}
        );
        console.log(response.data.data);

        if (response.data.success) {
          setDesa(response.data.data);
        } else {
          setShowLoginError(true);
        }
      } catch (error) {
        // setShowLoginError(true);
        console.log(error);
      } finally {
        setLoadingDesa(false);
      }
    };
    fetchProduk();
  }, [selectKec, selectKab, selectProv]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 mb-20 md:mt-0">
        <h1 className="text-sm text-gray-600 cursor-pointer">Tambah Alamat</h1>
        <div className="bg-[#E9E9E9] shadow-lg border-[1px] rounded-lg px-4 py-6 mt-4 max-w-5xl mx-auto">
          <div className="form">
            <h2 className="w-full text-center text-2xl mb-10 ">
              Masukan Alamat Anda
            </h2>
            <form action={onAlamatSubmit} className="flex flex-col">
              <div className="mb-4 flex items-center">
                <label htmlFor="pos" className="w-24">
                  Bangunan
                </label>
                <div className="w-8">:</div>
                <input
                  type="text"
                  className="bg-white w-60 rounded-md px-2 py-1"
                  name="bangunan"
                  id="bangunan"
                  value={namaBangunan}
                  onChange={(e) => setNamaBangunan(e.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="pos" className="w-24">
                  Nama
                </label>
                <div className="w-8">:</div>
                <input
                  type="text"
                  className="bg-white w-60 rounded-md px-2 py-1"
                  name="nama"
                  id="nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="pos" className="w-24">
                  Nomor Telp
                </label>
                <div className="w-8">:</div>
                <input
                  type="text"
                  className="bg-white rounded-md px-2 py-1"
                  name="noTelp"
                  id="noTelp"
                  value={noTelp}
                  onChange={(e) => setNoTelp(e.target.value)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="prov" className="w-24">
                  Provinsi
                </label>
                <div className="w-8">:</div>
                {loadingProv ? (
                  <Loading w={6} h={6} />
                ) : (
                  <select
                    name="prov"
                    id="prov"
                    value={selectProv}
                    onChange={handleChangeProv}
                    className="flex-1 bg-white text-center rounded px-2 py-1"
                  >
                    <option value="">-- PILIH PROVINSI --</option>
                    {prov?.map((prov) => (
                      <option key={prov.kode} value={prov.kode}>
                        {prov.nama}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-24" htmlFor="kab">
                  Kabupaten
                </label>
                <div className="w-8">:</div>
                {loadingKab ? (
                  <div className="ml-4">
                    <Loading w={6} h={6} />
                  </div>
                ) : (
                  <select
                    name="kab"
                    id="kab"
                    value={selectKab}
                    onChange={handleChangeKab}
                    className="flex-1 text-center bg-white rounded px-2 py-1"
                  >
                    <option value="">-- PILIH KABUPATEN --</option>
                    {kab
                      ? kab.map((kab) => {
                          return <option value={kab.kode}>{kab.nama}</option>;
                        })
                      : ""}
                    {/* <option value=""></option> */}
                  </select>
                )}
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-24" htmlFor="kec">
                  Kecamatan
                </label>
                <div className="w-8">:</div>
                {loadingKec ? (
                  <div className="ml-4">
                    <Loading w={6} h={6} />
                  </div>
                ) : (
                  <>
                    <select
                      name="kec"
                      id="kec"
                      value={selectKec}
                      onChange={handleChangeKec}
                      className="bg-white text-center rounded px-2 py-1 flex-1"
                    >
                      <option value="">-- PILIH KECAMATAN --</option>
                      {kec
                        ? kec.map((kec) => {
                            return <option value={kec.kode}>{kec.nama}</option>;
                          })
                        : ""}
                      {/* <option value=""></option> */}
                    </select>
                  </>
                )}
              </div>
              <div className="mb-4 flex items-center">
                <label className="w-24" htmlFor="desa">
                  Desa :
                </label>
                <div className="w-8">:</div>
                {loadingDesa ? (
                  <div className="ml-4">
                    <Loading w={6} h={6} />
                  </div>
                ) : (
                  <>
                    <select
                      name="kec"
                      id="kec"
                      value={selectDesa}
                      onChange={handleChangeDesa}
                      className="bg-white text-center flex-1 rounded px-2 py-1"
                    >
                      <option value="">-- PILIH DESA --</option>
                      {desa
                        ? desa.map((desa) => {
                            return (
                              <option value={desa.kode}>{desa.nama}</option>
                            );
                          })
                        : ""}
                      {/* <option value=""></option> */}
                    </select>
                  </>
                )}
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="pos" className="w-24">
                  Kode Pos
                </label>
                <div className="w-8">:</div>
                <input
                  type="text"
                  className="bg-white rounded-md px-2 py-1"
                  name="pos"
                  id="pos"
                  value={kodePos}
                  onChange={(e) => setKodePos(e.target.value)}
                />
              </div>

              <label htmlFor="detail" className="mb-4">
                Detail :
                <textarea
                  className="bg-white mt-2 items-start rounded-md px-2 py-1 w-full h-24 resize-y"
                  name="detail"
                  id="detail"
                  rows={4}
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                />
              </label>

              <div className="flex items-center mb-10 space-x-2">
                <label htmlFor="setuju" className="text-sm">
                  Jadikan Alamat Utama
                </label>
                <input
                  type="checkbox"
                  id="alamatDefault"
                  checked={alamatDefault}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-500 text-white px-2 py-1 rounded-md hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlamatPage;
