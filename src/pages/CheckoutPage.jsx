import react, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Navbar from "../Component/Navbar";
import { CiLocationOn  } from "react-icons/ci";
import { MdDelete  } from "react-icons/md";
import SelectPengiriman from "../Component/SelectPengiriman";

const CheckoutPage = () => {

    const location = useLocation();
    const keranjang = location.state?.keranjang || [];

    const [pengiriman, setPengiriman] = useState(0);
    const [ongkir, setOngkir] = useState(12000);
    const [metodePembayaran, setMetodePembayaran] = useState("");
    const ongkirSementara = [12000,15000,45000,60000,23000]

    const handlePengirimanChange = (e) => {
        setPengiriman(e.target.value);
        setOngkir(ongkirSementara[e.target.value]);
    };


    const totalPayment = () => {
        const totalBarang = keranjang.reduce((total, toko) => {
            return total + toko.product.reduce((subTotal, produk) => {
                return subTotal + (produk.isChecked ? produk.harga * produk.total : 0);
            }, 0);
        }, 0);

        return totalBarang + ongkir + 212000;
    }
    

    return (
        <>
            <Navbar />

            <div className="judul p-4">
                <h1 className="">Checkout</h1>
            </div>

            <div className="flex justify-center bg-gray-100 lg:h-[calc(100vh-72px)] ">
                <div className="pembungkus-utama mt-4 lg:mt-10 w-full md:max-w-[800px] lg:max-w-[1000px]">
                    
                    <div className="lg:flex w-ful ">
                        <div className="lg:min-w-[650px] ">
                            <div className="alamat bg-white mx-2 p-2 rounded-lg shadow-md flex justify-between items-center">
                                <div className="max-w-72 ">
                                    <p className="text-xs text-gray-600">Alamat Pengiriman</p>
                                    <div className="flex items-center flex-row gap-2 mt-1">
                                        <CiLocationOn />
                                        <p>Pondok Arrayyan - Ryan Ardiansyah</p>
                                    </div>
                                    <div className="font-light text-xs text-gray-500 truncate">
                                        Jalan Raya Pakkola, no 5A, Pakkola, Banggae, Majene, Sulawesi Barat
                                    </div>
                                    <div className="font-light text-xs text-gray-500">
                                        91411

                                    </div>
                                    <div className="font-light text-xs text-gray-500">
                                        082246657077
                                    </div>
                                </div>
                                <div className="bg-orange-500  text-white text-xs px-4 py-2 rounded-lg cursor-pointer">
                                    Ganti Alamat
                                </div>

                            </div>

                            <div className="product-checkout mt-2 mx-2 p-2 bg-white rounded-lg shadow-md">
                                {
                                    keranjang.map((toko) => {
                                        // Filter produk yang isChecked = true
                                        const checkedProducts = toko.product.filter((produk) => produk.isChecked);
                                        if (checkedProducts.length === 0) return null; // Skip toko jika tidak ada produk terpilih

                                        return (
                                        <div className=" lg:bg-white mb-4 py-1 w-full md:mx-auto mlg:max-w-[700px] rounded-xl" key={toko.id}>
                                            <div className="nama-toko p-2" key={toko.id}>
                                            <h2 className="ml-2 font-semibold">
                                                {toko.toko}
                                            </h2>
                                            </div>
                                            {
                                            checkedProducts.map((produk) => (
                                                <div className="produk-list p-2 flex items-center" key={produk.id}>
                                                    <label htmlFor="produk" className="ml-2 flex  justify-between w-full">
                                                        <div className="flex items-center">
                                                            <img src={produk.gambar} className="w-16 rounded-xl h-16 object-cover" alt="" />
                                                            <div className="ml-2">
                                                                <h3 className="text-sm ">{produk.nama}</h3>
                                                            </div>
                                                            {/* <div className="justify-end items-center flex flex-1 ml-4">
                                                                <div className={`bg-gray-200 mr-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${produk.isChecked ? "opacity-100" : "opacity-40"}`} onClick={() => subtractTotal(toko.id, produk.id)}>
                                                                    -
                                                                </div>
                                                                <p className="text-xs text-gray-500">
                                                                    {produk.total}
                                                                </p>
                                                                <div className={`bg-gray-200 mx-2 rounded-full px-2 py-1 text-xs text-gray-700 transition-all duration-500 ${produk.isChecked ? "opacity-100" : "opacity-40"}`} onClick={() => addTotal(toko.id, produk.id)}>
                                                                    +
                                                                </div>
                                                                <div className="ml-4">
                                                                    <MdDelete className="text-md flex"/>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                        <div className={`encounter justify-end items-center flex flex-1 `}>
                                                            <p className="text-xs text-gray-500">Rp. {produk.harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                                                        </div>
                                                    </label>
                                                </div>
                                            ))
                                            }
                                        </div>
                                        );
                                    })
                                }



                                <div className="total-checkout p-2 border-t border-gray-200">
                                    <div className="flex text-sm justify-between items-center">
                                        <h2 className="font-semibold">Total Barang</h2>
                                        <p className="font-semibold">
                                            Rp. {keranjang.reduce((total, toko) => {
                                                return total + toko.product.reduce((subTotal, produk) => {
                                                    return subTotal + (produk.isChecked ? produk.harga * produk.total : 0);
                                                }, 0);
                                            }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </p>
                                    </div>
                                </div>

                                <div className="total-checkout p-2 border-t border-gray-200">
                                    <div className="pilih-pengiriman">
                                        <h2 className="text-sm font-semibold mb-1">Pilih Metode Pengiriman</h2>
                                        <div className="flex items-center">
                                            <SelectPengiriman handleChange={handlePengirimanChange} pengiriman={pengiriman}/>
                                            <p className="ml-4 text-sm text-gray-500">3-7 Hari</p>
                                        </div>
                                    </div>
                                    <div className="flex mt-4 text-sm text-gray-500 justify-between items-center">
                                        <h2 className="">Ongkos Kirim</h2>
                                        <p className="">
                                            Rp. {ongkir.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </p>
                                    </div>
                                    <div className="flex mt-4 text-sm text-gray-500 justify-between items-center">
                                        <h2 className="">PPN</h2>
                                        <p className="">
                                            Rp. 212.000
                                        </p>
                                    </div>
                                </div>
                                <div className="total-checkout p-2 border-t border-gray-200">
                                    <div className="flex text-lg justify-between items-center">
                                        <h2 className="font-semibold">Total</h2>
                                        <p className="font-semibold">
                                            Rp. {totalPayment().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <div className="w-full mb-10 lg:mb-0">
                            <div className="pembayaran p-2 mx-2 mt-2 lg:mt-0 bg-white rounded-lg shadow-md">
                                <div className="title">
                                    <h4>Piilh Metode Pembayaran</h4>
                                </div>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="metodePembayaran"
                                        value="BRIVA"
                                        checked={metodePembayaran === "BRIVA"}
                                        onChange={(e) => setMetodePembayaran(e.target.value)}
                                    />
                                    BRI Virtual Account
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="metodePembayaran"
                                        value="MANDVA"
                                        checked={metodePembayaran === "MANDVA"}
                                        onChange={(e) => setMetodePembayaran(e.target.value)}
                                    />
                                    Mandiri Virtual Account
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="metodePembayaran"
                                        value="BCAVA"
                                        checked={metodePembayaran === "BCAVA"}
                                        onChange={(e) => setMetodePembayaran(e.target.value)}
                                    />
                                    BCA Virtual Account
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="metodePembayaran"
                                        value="GOPAY"
                                        checked={metodePembayaran === "GOPAY"}
                                        onChange={(e) => setMetodePembayaran(e.target.value)}
                                    />
                                    Gopay
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="metodePembayaran"
                                        value="DANA"
                                        checked={metodePembayaran === "DANA"}
                                        onChange={(e) => setMetodePembayaran(e.target.value)}
                                    />
                                    Dana
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="metodePembayaran"
                                        value="OVO"
                                        checked={metodePembayaran === "OVO"}
                                        onChange={(e) => setMetodePembayaran(e.target.value)}
                                    />
                                    OVO
                                </label>
                            </div>

                            <div className="button-bayar text-white py-2 mt-2 mx-2 bg-orange-500 text-center rounded-lg shadow-md">
                                Bayar Sekarang
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )

}

export default CheckoutPage;