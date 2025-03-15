import axios from 'axios';


const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/',
  baseURL: 'https://restaurant-booking-system-p6dd.onrender.com/api/'
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('register/', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateUserProfile = async (id, profileData) => {
  try {
    const response = await api.put(`update-profile-byId/${id}/`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong.');
    }
  }
};


export const makeBooking = async (bookData) => {
  try {
    const response = await api.post(`create-booking/`, bookData);
    return response.data;
  } catch (error) {
    console.error('Error booking items:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong.');
    }
  }
};



export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      throw new Error("Missing token or userId");
    }
    const response = await api.get( `get-profile-byId/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : error.message;
  }
};



export const getHotelProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      throw new Error("Missing token or userId");
    }
    const response = await api.get( `get-hotel/${userId}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : error.message;
  }
};




export const getOtherProfile = async (hotelId) => {
  try {
    const token = localStorage.getItem('token');

    if (!token || !hotelId) {
      throw new Error("Missing token or hotelId");
    }

    const response = await api.get(`get-hotel/${hotelId}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response ? error.response.data : error.message;
  }
};


// export const getHotelProfile = async () => {
//   try {
//     const response = await api.get('get-hotel/');
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

export const updateHotelProfile = async (id, profileData) => {
  try {
    const response = await api.put(`hotel/update/${id}/`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating hotel profile:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong.');
    }
  }
};


export const bookingupdate = async (bookdata) => {
  const id = localStorage.getItem('currentAP')
  try {
    const response = await api.put(`update-booking-byId/${id}/`, bookdata);
    return response.data;
  } catch (error) {
    console.error('Error updating Booking Data:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong.');
    }
  }
};


export const getHotelProfiles = async () => {
  try {
    const response = await api.get('get-hotels/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getUserProfiles = async () => {
  try {
    const response = await api.get('get-profiles/');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getUserNotification = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await api.get(`get-Booking-byId/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const getHotelBooking = async () => {
  const hotel = localStorage.getItem('hotID');
  try {
    const response = await api.get(`get-Booking-byHotel/${hotel}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


// export const getOtherProfile = async (hotelId) => {
//   try {
//     const token = localStorage.getItem('token');

//     if (!token || !hotelId) {
//       throw new Error("Missing token or hotelId");
//     }

//     const response = await api.get(`get-hotel/${hotelId}/`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error.response ? error.response.data : error.message;
//   }
// };

export const logout = async () => {
  try {
    const response = await api.get('logout/');
    return response.data; 
  } catch (error) {
    throw error.response?.data || "Logout failed";
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('login/', userData, { withCredentials: true });
    console.log(response.data);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      const userId = response.data.id || response.data.userId;
      const role = response.data.role || response.data.role;
      console.log('userId:', userId);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);
    }
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const create_MenuItem = async ( menuData) => {
  try {
    const response = await api.post(`create_menu/`, menuData);
    return response.data;
  } catch (error) {
    console.error('Error creating menu item:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong.');
    }
  }
};


export const create_Pic = async ( picData) => {
  try {
    const response = await api.post(`add_picture/`, picData);
    return response.data;
  } catch (error) {
    console.error('Error creating picture item:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong.');
    }
  }
};

export const deleteMenuItem = async (menuItemId) => {
  try {
    const response = await api.delete(`delete_menu/${menuItemId}/`);
    console.log('Menu item deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong while deleting the menu item');
    }
  }
};


export const deletePicItem = async (picitemId) => {
  try {
    const response = await api.delete(`delete_picture/${picitemId}/`);
    console.log('Menu item deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error('Something went wrong while deleting the menu item');
    }
  }
};
