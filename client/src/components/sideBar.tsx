/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { SetStateAction, useEffect, useState } from 'react';
import {
  FiHome,
  FiInfo,
  FiSettings,
  FiPower,
  FiPhone,
  FiMenu,
  FiChevronLeft,
} from 'react-icons/fi';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import instance from '@/utils/instance';
const Sidebar = ({ children }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const router = useRouter();
  const menuItems = [
    { id: 'home', icon: FiHome, text: 'Home' },
    { id: 'about', icon: FiInfo, text: 'About' },
    { id: 'services', icon: FiSettings, text: 'Services' },
    { id: 'contact', icon: FiPhone, text: 'Contact' },
    { id: 'logout', icon: FiPower, text: 'Log out ' },
  ];
  const [user, setUser] = useState<any>(null);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  const fetchUser = async () => {
    try {
      const response = await instance.get('user');
      if (response?.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => {
    deleteCookie('tkn');
    toast.success('You Have successsfully logged out ');
    return router.push('/login');
  };

  const handleLinkClick = (id: SetStateAction<string>) => {
    setActiveLink(id);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="relative h-64">
      
      <div className={`absolute inset-0 ${isExpanded ? 'md:left-[10%] ' : ' left-[0%] md:left-[4%]'} -z-1`}>
        <div className="mb-2 flex md:h-14 bg-white"></div>
        <div className="flex  w-full p-2 rounded-md md:hidden flex item-center justify-center ">
        <div className={`overflow-hidden   transition-all duration-300  w-32'}`}>
                  <p className="font-medium capitalize">{user?.name}</p>
                  <p className="text-sm lowercase text-center text-gray-400">{user?.role}</p>
                  <div className="flex border items-center justify-center rounded-md">
                  <p className="text-sm lowercase text-center text-gray-500">Logout</p>
                  </div>
                 
                </div>
        </div>
        <main>
          
          <div className="flex w-full flex-col gap-y-12 px-3">{children}</div>{' '}
        </main>
      </div>
      <div className="absolute left-0 z-20  hidden md:flex items-center justify-center text-white">
      
        <div
          className={`h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isExpanded ? 'w-16 md:w-44' : 'w-16'} relative`}
        >
          <button
            onClick={handleToggle}
            className="absolute -right-3 top-4 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? <FiChevronLeft className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>

          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-center border-b border-gray-700">
              <span
                className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-0 md:w-32' : 'w-0'}`}
              >
                <h1 className="text-xl font-bold text-blue-400">Dashboard</h1>
              </span>
            </div>

            <nav className="flex-1 space-y-2 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'logout') {
                        logout();
                      } else {
                        handleLinkClick(item.id);
                      }
                    }}
                    className={`flex w-full items-center gap-x-2 rounded-lg p-2 transition-colors duration-200 ${
                      activeLink === item.id
                        ? 'bg-blue-300 text-black'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    } focus:outline-none focus:ring-2 focus:ring-gray-600`}
                    aria-label={item.text}
                  >
                    <Icon className="h-5 w-5" />
                    <span
                      className={` overflow-hidden transition-all duration-300 ${isExpanded ? 'w-32 flex' : 'w-0 hidden'}`}
                    >
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-gray-700 p-4">
              <div className={`flex items-center space-x-4 ${!isExpanded && 'justify-center'}`}>
                <div className="h-8 w-8 rounded-full bg-gray-600"></div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'w-32' : 'w-0'}`}
                >
                  <p className="font-medium capitalize">{user?.name}</p>
                  <p className="text-sm lowercase text-gray-400">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex h-screen w-screen ">

    //     <div className="flex w-full">
    //         <main>{children}</main>
    //     </div>

    // </div>
  );
};

export default Sidebar;
