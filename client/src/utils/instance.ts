import axios from 'axios';
import Cookie from 'js-cookie';

/* The code is creating an instance of the Axios library with a specific configuration. */
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const token = Cookie.get('tkn') || null;

/* The code is checking if a token exists. If a token exists, it sets the `Authorization` header of the
Axios instance to include the token using the Bearer token authentication scheme. This means that
the token will be sent with every request made using this Axios instance. */
if (token) {
  // Apply To Every Request
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default instance;
