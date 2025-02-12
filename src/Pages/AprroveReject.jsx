// import React, { useEffect, useState } from 'react';
// import Navbar from '../Components/Navbar';
// import ProfileHome from './ProfileHome';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { bookingupdate, getHotelBooking } from '../api';

// function AprroveReject() {
//     const [notify, setNotify] = useState(null);
//     const [approval, setApproval] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const imgUrl = 'https://res.cloudinary.com/dm1dnfpng';


//     const [formData, setFormData] = useState({
//         state: '',
//         message: '',
//     });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         const formDataToSubmit = new FormData();
//         formDataToSubmit.append('state', formData.state);
//         formDataToSubmit.append('message', formData.message);

//         try {
//             const response = await bookingupdate(formDataToSubmit);
//             toast.success('Booking updated successfully!');
//             navigate('/Restprofile');
//         } catch (error) {
//             toast.error('Error updating booking: ' + (error.message || error));
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const response = await getHotelBooking();
//                 setNotify(response);
//                 setLoading(false);
//             } catch (error) {
//                 const errorMessage = error?.response?.data || error?.message || 'Unknown error';
//                 toast.error('Failed to fetch notifications: ' + errorMessage);
//                 setLoading(false);
//             }
//         };
//         fetchUserProfile();
//     }, [navigate]);

//     if (loading) {
//         return (
//             <div>
//                 <Navbar />
//                 <div className="flex">
//                     <div className="mt-[64px]">
//                         <ProfileHome />
//                     </div>
//                     <div className="flex items-center">
//                         <span className="text-3xl mr-4">Loading</span>
//                         <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (!notify) {
//         return (
//             <div>
//                 <Navbar />
//                 <div className="flex">
//                     <div className="mt-[64px]">
//                         <ProfileHome />
//                     </div>
//                     <div className="flex items-center">
//                         <span className="text-3xl mr-4">No bookings here</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     const notifyReversed = notify ? [...notify].reverse() : [];

//     return (
//         <div>
//             <Navbar />
//             <div className="fixed w-full z-50 top-[50px]">
//                 <div className="relative flex max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 text-orange-500 p-5">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
//                         <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
//                     </svg>
//                     <h1>Bookings</h1>
//                 </div>
//             </div>
//             <div className="mt-[250px]">
//                 <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
//                     <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
//                         <div>
//                             {
//                                 notifyReversed.length === 0 ? (
//                                     <div>No Bookings available</div>
//                                 ) : (
//                                     notifyReversed.map((notification) => (
//                                         <div key={notification.id} className="mr-4 grid place-items-center">
//                                             <div
//                                                 role="button"
//                                                 className="text-slate-800 flex justify-between w-full items-center rounded-md p-3 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300"
//                                             >
//                                                 <div
//                                                     className={`font-medium ${notification.state === 'pending' ? 'text-yellow-500' :
//                                                         notification.state === 'rejected' ? 'text-red-500' :
//                                                             notification.state === 'approved' ? 'text-green-500' :
//                                                                 'text-gray-500'
//                                                         }`}
//                                                 >
//                                                     Booking {notification.state}
//                                                 </div>

//                                                 <div className="p-2 px-3">
//                                                     {notification.type}: {notification.menu_item_name}
//                                                 </div>
//                                                 {notification.state === 'pending' ? (
//                                                     <div className='flex'>
//                                                         <div className="p-2 px-3">
//                                                             <button
//                                                             className='mx-2'
//                                                                 onClick={() => {
//                                                                     setApproval({ status: false, notification });
//                                                                     localStorage.setItem('currentAP', notification.id);
//                                                                 }}
//                                                             >Approve</button>

//                                                             <button
//                                                             className='mx-2'
//                                                                 onClick={() => {
//                                                                     setApproval({ status: true, notification });
//                                                                     localStorage.setItem('currentAP', notification.id);
//                                                                 }}
//                                                             >Reject</button>

//                                                         </div>
//                                                     </div>
//                                                 ) : (

//                                                     <div></div>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     ))
//                                 )
//                             }

//                         </div>
//                     </nav>
//                 </div>
//             </div>


//             {approval !== null && ( 
//                 <div>
//                 {approval.status ? (

//                     <div className='fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center' style={{
//                         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//                         zIndex: '99'
//                     }}>
//                         <div className='flex flex-col h-screen w-full items-center justify-center p-3 max-w-200'>
//                             <form onSubmit={handleSubmit} className="bg-white p-5 flex flex-col rounded-2xl w-full">
//                                 <div className='flex justify-between'>
//                                     <label htmlFor="" className='text-2xl text-orange-500'>
//                                         {approval.status ? 'Reason for Rejection' : 'Numbers Given'}
//                                     </label>
//                                     <p className='bg-orange-200 p-2 rounded-full hover:bg-orange-600 hover:text-white cursor-pointer' onClick={() => setApproval(null)}>Close</p>
//                                 </div>
    
//                                 {approval.notification && (
//                                     <div className="mt-2 text-lg font-medium">
//                                         {approval.notification.number} {approval.notification.type}(s)
//                                     </div>
//                                 )}
    
//                                 <textarea
//                                     value={formData.message}
//                                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                                     className='outline-1 rounded-2xl m-5 h-30'
//                                     placeholder={approval.status ? 'Reason for rejection' : 'Enter numbers given...'}
//                                 />
    
//                                 <div>
//                                     <button
//                                         type="submit"
//                                         onClick={() => setFormData({ ...formData, state: approval.status ? 'rejected' : 'approved', message: formData.message })}
//                                     >
//                                         Submit to Reject
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                 ):(
//                     //Only edit this side of the approval, ignore the other comments, this is the section i was asking about
//                     <div className='fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center' style={{
//                         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//                         zIndex: '99'
//                     }}>
//                         <div className='flex flex-col h-screen w-full items-center justify-center p-3 max-w-200'>
//                             <form onSubmit={handleSubmit} className="bg-white p-5 flex flex-col rounded-2xl w-full">
//                                 <div className='flex justify-between'>
//                                     <label htmlFor="" className='text-2xl text-orange-500'>
//                                         {approval.status ? 'Reason for Rejection' : 'Numbers Given'}
//                                     </label>
//                                     <p className='bg-orange-200 p-2 rounded-full hover:bg-orange-600 hover:text-white cursor-pointer' onClick={() => setApproval(null)}>Close</p>
//                                 </div>
//                                 {approval.notification && (
//                                     <div className="mt-2 text-lg font-medium">
//                                         {approval.notification.number} {approval.notification.type}(s)
//                                     </div>
//                                 )}
//                                 <input
//                                     value={formData.message}
//                                     onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                                     className='outline-1 rounded-2xl m-5'
//                                     placeholder={approval.status ? 'Reason for rejection' : 'Enter numbers given...'}
//                                 />
    
//                                 <div>
//                                     <button
//                                         type="submit"
//                                         onClick={() => setFormData({ ...formData, state: approval.status ? 'rejected' : 'approved', message: formData.message })}
//                                     >
//                                         Submit to Approve
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//             )}
//             </div>
//             )}

//         </div>
//     );
// }

// export default AprroveReject;


import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import ProfileHome from './ProfileHome';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { bookingupdate, getHotelBooking } from '../api';

function AprroveReject() {
    const [notify, setNotify] = useState(null);
    const [approval, setApproval] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        state: '',
        message: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('state', formData.state);
        formDataToSubmit.append('message', formData.message);

        try {
            const response = await bookingupdate(formDataToSubmit);
            toast.success('Booking updated successfully!');
            navigate('/Restprofile');
        } catch (error) {
            toast.error('Error updating booking: ' + (error.message || error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getHotelBooking();
                setNotify(response);
                setLoading(false);
            } catch (error) {
                const errorMessage = error?.response?.data || error?.message || 'Unknown error';
                toast.error('Failed to fetch notifications: ' + errorMessage);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="flex">
                    <div className="mt-[64px]">
                        <ProfileHome />
                    </div>
                    <div className="flex items-center">
                        <span className="text-3xl mr-4">Loading</span>
                        <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        );
    }

    if (!notify) {
        return (
            <div>
                <Navbar />
                <div className="flex">
                    <div className="mt-[64px]">
                        <ProfileHome />
                    </div>
                    <div className="flex items-center">
                        <span className="text-3xl mr-4">No bookings here</span>
                    </div>
                </div>
            </div>
        );
    }

    const notifyReversed = notify ? [...notify].reverse() : [];

    return (
        <div>
            <Navbar />
            <div className="fixed w-full z-50 top-[50px]">
                <div className="relative flex max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16 text-orange-500 p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg>
                    <h1>Bookings</h1>
                </div>
            </div>
            <div className="mt-[250px]">
                <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                    <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                        <div>
                            {
                                notifyReversed.length === 0 ? (
                                    <div>No Bookings available</div>
                                ) : (
                                    notifyReversed.map((notification) => (
                                        <div key={notification.id} className="mr-4 grid place-items-center">
                                            <div
                                                role="button"
                                                className="text-slate-800 flex justify-between w-full items-center rounded-md p-3 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 border-b-3 border-gray-200 hover:border-orange-400 transition-colors duration-300"
                                            >
                                                <div
                                                    className={`font-medium ${notification.state === 'pending' ? 'text-yellow-500' :
                                                        notification.state === 'rejected' ? 'text-red-500' :
                                                            notification.state === 'approved' ? 'text-green-500' :
                                                                'text-gray-500'
                                                        }`}
                                                >
                                                    Booking {notification.state}
                                                </div>

                                                <div className="p-2 px-3">
                                                    {notification.type}: {notification.menu_item_name}
                                                </div>
                                                {notification.state === 'pending' ? (
                                                    <div className='flex'>
                                                        <div className="p-2 px-3">
                                                            <button
                                                            className='mx-2'
                                                                onClick={() => {
                                                                    setApproval({ status: false, notification });
                                                                    localStorage.setItem('currentAP', notification.id);
                                                                }}
                                                            >Approve</button>

                                                            <button
                                                            className='mx-2'
                                                                onClick={() => {
                                                                    setApproval({ status: true, notification });
                                                                    localStorage.setItem('currentAP', notification.id);
                                                                }}
                                                            >Reject</button>

                                                        </div>
                                                    </div>
                                                ) : (

                                                    <div></div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )
                            }

                        </div>
                    </nav>
                </div>
            </div>


            {approval !== null && ( 
                <div>
                {approval.status ? (

                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center' style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        zIndex: '99'
                    }}>
                        <div className='flex flex-col h-screen w-full items-center justify-center p-3 max-w-200'>
                            <form onSubmit={handleSubmit} className="bg-white p-5 flex flex-col rounded-2xl w-full">
                                <div className='flex justify-between'>
                                    <label htmlFor="" className='text-2xl text-orange-500'>
                                        {approval.status ? 'Reason for Rejection' : 'Numbers Given'}
                                    </label>
                                    <p className='bg-orange-200 p-2 rounded-full hover:bg-orange-600 hover:text-white cursor-pointer' onClick={() => setApproval(null)}>Close</p>
                                </div>
    
                                {approval.notification && (
                                    <div className="mt-2 text-lg font-medium">
                                        {approval.notification.number} {approval.notification.type}(s)
                                    </div>
                                )}
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className='outline-1 rounded-2xl m-5 p-3'
                                    placeholder={approval.status ? 'Reason for rejection' : 'Enter numbers given...'}
                                />
    
                                <div>
                                    <button
                                        type="submit"
                                        onClick={() => setFormData({ ...formData, state: approval.status ? 'rejected' : 'approved', message: formData.message })}
                                    >
                                        Submit to Reject
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                ):(
                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-50 flex flex-col justify-center items-center' style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        zIndex: '99'
                    }}>
                        <div className='flex flex-col h-screen w-full items-center justify-center p-3 max-w-200'>
                            <form onSubmit={handleSubmit} className="bg-white p-5 flex flex-col rounded-2xl w-full">
                                <div className='flex justify-between'>
                                    <label htmlFor="" className='text-2xl text-orange-500'>
                                        {approval.status ? 'Reason for Rejection' : 'Numbers Given'}
                                    </label>
                                    <p className='bg-orange-200 p-2 rounded-full hover:bg-orange-600 hover:text-white cursor-pointer' onClick={() => setApproval(null)}>Close</p>
                                </div>
                                {approval.notification && (
                                    <div>
                                    <div className="mt-2 text-lg font-medium">
                                        {approval.notification.number} {approval.notification.type}(s)
                                    </div>
                                    <div> {approval.notification.type} Slots For customer</div>
                                    </div>
                                )}

                                <div className='flex flex-col w-70 overflow-y-auto'>
                                    {Array.from({ length: approval.notification.number }).map((_, index) => (
                                        <input
                                            key={index}
                                            value={formData.message.split(',')[index] || ''}
                                            onChange={(e) => {
                                                const newMessage = formData.message.split(',');
                                                newMessage[index] = e.target.value;
                                                setFormData({ ...formData, message: newMessage.join(',') });
                                            }}
                                            className="outline-1 rounded-2xl m-2 p-2 outline-green-400"
                                            placeholder={`Vacancy ${index + 1}`}
                                        />
                                    ))}
                                </div>
    
                                <div>
                                    <button
                                        type="submit"
                                        onClick={() => setFormData({ ...formData, state: approval.status ? 'rejected' : 'approved', message: formData.message })}
                                    >
                                        Submit to Approve
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

            )}
            </div>
            )}

        </div>
    );
}

export default AprroveReject;
