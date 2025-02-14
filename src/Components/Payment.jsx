
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import domtoimage from 'dom-to-image';

// function Payment() {

//     // Screenshot
//     const captureScreenshot = () => {
//         const element = document.getElementById('check');

//         if (element) {
//             domtoimage.toPng(element)
//                 .then((dataUrl) => {
//                     const link = document.createElement('a');
//                     link.href = dataUrl;
//                     link.download = 'Nomads_table_Invoice.png';
//                     link.click();
//                     navigate('/notification')
//                 })
//                 .catch((error) => {
//                     console.error('Error capturing screenshot:', error);
//                 });
//         } else {
//             console.log('Element with id "check" not found');
//         }
//     };

//     const [phoneNumber, setPhoneNumber] = useState('');
//     const navigate = useNavigate()
//     const hotel = location.state?.hotelifo || [];

//     console.log(hotel)
//     const [showInvoice, setInvoice] = useState(false);
//     const imgUrl = 'https://res.cloudinary.com/dm1dnfpng/';

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = {
//             phone_number: phoneNumber,
//             amount: "1",
//             account_reference: "Nomad's Table account",
//             transaction_desc: "Commitment Fee"
//         };

//         try {
//             const response = await fetch('http://127.0.0.1:8000/mpesa/api/stk-push/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 toast.success('Payment notification sent successfully!');
//                 setInvoice(true)
//             } else {
//                 toast.error('Payment failed: ' + result.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error('Something went wrong!');
//         }
//     };

//     return (
//         <div>
//             <section className="bg-white py-8 antialiased md:py-16">
//                 <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//                     <div className="mx-auto max-w-5xl">
//                         <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Commitment Fee</h2>
//                         <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
//                             <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm border-orange-400 border-1 sm:p-6 lg:max-w-xl lg:p-8">
//                                 <div className="mb-6 grid grid-cols-2 gap-4">
//                                     <div className="col-span-2 sm:col-span-1">
//                                         <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900">
//                                             Mpesa Payment
//                                         </label>
//                                         <img className='max-h-30' src="https://www.safaricom.co.ke/images/MicrosoftTeams-image.jpg" alt="Mpesa logo" />
//                                     </div>
//                                     <div className="col-span-2 sm:col-span-1">
//                                         <label htmlFor="phone_number" className="mb-2 block text-sm font-medium text-gray-900">
//                                             Phone Number
//                                         </label>
//                                         <input
//                                             type="number"
//                                             id="phone_number"
//                                             value={phoneNumber}
//                                             onChange={(e) => setPhoneNumber(e.target.value)}
//                                             className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
//                                             placeholder="254_XXXXXX_"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="bg-gray-200 p-2 rounded-2xl">
//                                         <p className="mb-2 block text-lg font-medium text-gray-900"> Fee : </p>
//                                         <p className="mb-2 block text-sm font-medium text-gray-900"> Kes 1 </p>
//                                     </div>
//                                 </div>
//                                 <button type="submit" className="flex w-full items-center justify-center hover:text-green-500"

//                                     style={{
//                                         backgroundColor: 'white',
//                                         color: '#48bb78',
//                                         border: '2px solid #48bb78',
//                                         padding: '10px',
//                                         borderRadius: '10px',
//                                         transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
//                                     }}
//                                     onMouseEnter={(e) => {
//                                         e.target.style.backgroundColor = '#48bb78';
//                                         e.target.style.color = 'white';
//                                         e.target.style.borderColor = '#48bb78';
//                                     }}
//                                     onMouseLeave={(e) => {
//                                         e.target.style.backgroundColor = 'white';
//                                         e.target.style.color = '#48bb78';
//                                         e.target.style.borderColor = '#48bb78';
//                                     }}
//                                 >
//                                     Pay now
//                                 </button>
//                             </form>
//                         </div>
//                         <button
//                             onClick={() => { setInvoice(true) }}
//                         >Invoice</button>
//                     </div>
//                 </div>
//             </section>
//             <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
//             <div>
//                 {showInvoice && (
//                     <div className=" fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center " style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
//                         <div className="flex flex-col h-screen w-full items-center justify-center p-3">
//                             <p>Invoice</p>
//                             <div id='check' className="w-80 rounded bg-gray-50 px-6 pt-8 shadow-lg">
//                                 <img src={`${imgUrl}${hotel.hotel_cover}`} alt="hotel pic" className="mx-auto max-h-30 w-16 py-4 object-cover rounded-full" />
//                                 <div className="flex flex-col justify-center items-center gap-2">
//                                     <h4 className="font-semibold">Nomad's Table Invoice</h4>
//                                 </div>
//                                 <div className="flex flex-col gap-3 border-b py-6 text-xs">
//                                     <p className="flex justify-between">
//                                     </p>
//                                     <p className="flex justify-between">
//                                         <span className="text-gray-400">Order Type:</span>
//                                         <span>{hotel.type}</span>
//                                     </p>
//                                     <p className="flex justify-between">
//                                         <span className="text-gray-400">Host:</span>
//                                         <span>{hotel.full_hotel_name}</span>
//                                     </p>
//                                     <p className="flex justify-between">
//                                         <span className="text-gray-400">Customer:</span>
//                                         {/* <span>{user.user.username}</span> */}
//                                     </p>
//                                 </div>

//                             </div>

//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Payment;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import domtoimage from 'dom-to-image';

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const headbutton = 'm-0 p-3 text-gray-800 no-underline hover:bg-black hover:text-white border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300 w-auto flex justify-center items-center cursor-pointer';

    const hotel = location.state?.hotelifo || [];
    const user = location.state?.user || [];
    const selectedItemDetails = location.state?.selectedItemDetails || [];

    console.log("Hotel received:", hotel);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [showInvoice, setInvoice] = useState(false);
    const imgUrl = 'https://res.cloudinary.com/dm1dnfpng/';

    const captureScreenshot = () => {
        const element = document.getElementById('check');
        if (element) {
            domtoimage.toPng(element)
                .then((dataUrl) => {
                    const link = document.createElement('a');
                    link.href = dataUrl;
                    link.download = 'Nomads_table_Invoice.png';
                    link.click();
                    navigate('/notification');
                })
                .catch((error) => {
                    console.error('Error capturing screenshot:', error);
                });
        } else {
            console.log('Element with id "check" not found');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            phone_number: phoneNumber,
            amount: "1",
            account_reference: "Nomad's Table account",
            transaction_desc: "Commitment Fee"
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/mpesa/api/stk-push/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Payment notification sent successfully!');
                setInvoice(true);
            } else {
                toast.error('Payment failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <div>
            <section className="bg-white py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Commitment Fee</h2>
                        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                            <form onSubmit={handleSubmit} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm border-orange-400 border-1 sm:p-6 lg:max-w-xl lg:p-8">
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900">
                                            Mpesa Payment
                                        </label>
                                        <img className='max-h-30' src="https://www.safaricom.co.ke/images/MicrosoftTeams-image.jpg" alt="Mpesa logo" />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="phone_number" className="mb-2 block text-sm font-medium text-gray-900">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            id="phone_number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                            placeholder="254_XXXXXX_"
                                            required
                                        />
                                    </div>
                                    <div className="bg-gray-200 p-2 rounded-2xl">
                                        <p className="mb-2 block text-lg font-medium text-gray-900"> Fee : </p>
                                        <p className="mb-2 block text-sm font-medium text-gray-900"> Kes 1 </p>
                                    </div>
                                </div>
                                <button type="submit" className="flex w-full items-center justify-center hover:text-green-500"
                                    style={{
                                        backgroundColor: 'white',
                                        color: '#48bb78',
                                        border: '2px solid #48bb78',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = '#48bb78';
                                        e.target.style.color = 'white';
                                        e.target.style.borderColor = '#48bb78';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.color = '#48bb78';
                                        e.target.style.borderColor = '#48bb78';
                                    }}
                                >
                                    Pay now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                {showInvoice && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center" style={{ background: 'rgba(0, 0, 0, 0.4)' }}>
                        <div className="flex flex-col h-screen w-full items-center justify-center p-1">
                            <p>Invoice</p>
                            <div id='check' className="w-80 rounded bg-gray-50 px-6 pt-2 shadow-lg">
                                <img src={`${imgUrl}${hotel.hotel_cover}`} alt="hotel pic" className="mx-auto max-h-30 w-16 py-4 object-cover rounded-full" />
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <h4 className="font-semibold">Nomad's Table Invoice</h4>
                                </div>
                                <div className="flex flex-col gap-3 border-b py-3 text-xs">
                                    <p className="flex justify-between">
                                        <span className="text-gray-400">Order Type:</span>
                                        <span>{hotel.type}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-400">Host:</span>
                                        <span>{hotel.full_hotel_name}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-400">Customer:</span>
                                        <span>{user.user.username}</span>
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 pb-6 pt-2 text-xs">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="flex">
                                                <th className="w-full py-2">Order</th>
                                                {/* <th className="min-w-[44px] py-2">QTY</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="flex py-1">
                                                <td className="flex-1">Payment: </td>
                                                <td className=" w-15"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5zIvPQUcmQNa_-Y7Ak_nFSQezhmgt3oS3Bw&s" alt="" /></td>
                                            </tr>
                                            <tr className="flex py-1">
                                                <td className="flex-1"> Fee: </td>
                                                <td className="min-w-[44px]"> Ksh 1</td>
                                            </tr>
                                            <tr className="flex">
                                                <td className="flex-1 py-1">{selectedItemDetails}</td>
                                                {/* <td className="min-w-[44px]"></td> */}
                                            </tr>
                                            <tr className="flex py-1">
                                                <td className="flex-1">Booking Pending...</td>
                                                <td className="min-w-[44px]">##</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="border-b border border-dashed"></div>
                                    <div className="py-2 justify-center items-center flex flex-col gap-2">
                                        _ _Hotel Contacts_ _
                                        <p className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M21.3 12.23h-3.48c-.98 0-1.85.54-2.29 1.42l-.84 1.66c-.2.4-.6.65-1.04.65h-3.28c-.31 0-.75-.07-1.04-.65l-.84-1.65a2.567 2.567 0 0 0-2.29-1.42H2.7c-.39 0-.7.31-.7.7v3.26C2 19.83 4.18 22 7.82 22h8.38c3.43 0 5.54-1.88 5.8-5.22v-3.85c0-.38-.31-.7-.7-.7ZM12.75 2c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2h1.5V2Z" fill="#000"></path>
                                                <path d="M22 9.81v1.04a2.06 2.06 0 0 0-.7-.12h-3.48c-1.55 0-2.94.86-3.63 2.24l-.75 1.48h-2.86l-.75-1.47a4.026 4.026 0 0 0-3.63-2.25H2.7c-.24 0-.48.04-.7.12V9.81C2 6.17 4.17 4 7.81 4h3.44v3.19l-.72-.72a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l2 2c.01.01.02.01.02.02a.753.753 0 0 0 .51.2c.1 0 .19-.02.28-.06.09-.03.18-.09.25-.16l2-2c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0l-.72.72V4h3.44C19.83 4 22 6.17 22 9.81Z" fill="#000"></path>
                                            </svg>
                                            {hotel.email}
                                        </p>
                                        <p className="flex gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path fill="#000" d="M11.05 14.95L9.2 16.8c-.39.39-1.01.39-1.41.01-.11-.11-.22-.21-.33-.32a28.414 28.414 0 01-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41C2.24 8.67 2 7.58 2 6.54c0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C4.15 2.31 4.85 2 5.59 2c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.1.1.21.2.31.3.4.39.41 1.03.01 1.43zM21.97 18.33a2.54 2.54 0 01-.25 1.09c-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.01 0-.02.01-.03.01-.59.24-1.23.37-1.92.37-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98c-.39-.29-.78-.58-1.15-.89l3.27-3.27c.28.21.53.37.74.48.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78z"></path>
                                            </svg>
                                            {hotel.phone_number}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`${headbutton} linked bg-white m-2`} onClick={captureScreenshot}>
                            <p className='text-lg'>Save invoice</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payment;
