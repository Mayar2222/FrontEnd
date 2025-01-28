import { Menu, Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { HiOutlineBell, HiOutlineChat, HiOutlineSearch } from 'react-icons/hi';

export default function Header() {
  return (
      <div style={{
        backgroundColor: "#ECEBFF",
        height: '190px',  // Ajustement de la hauteur du header
      }} className='h-20 px-6 flex justify-between items-center border-b border-gray-200'>

        <div className="flex items-center w-full justify-center"> {/* Centrage de la barre de recherche */}
          {/* Barre de recherche avec icône de recherche */}
          <div className="relative w-full max-w-lg">
            <input
                type="text"
                placeholder="Rechercher..."
                className="w-full py-2 pl-10 pr-10 text-sm text-gray-700 bg-white rounded-full shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mx-4 h-16"
            />
            <span className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-500">
            <HiOutlineSearch fontSize={20} />
          </span>
          </div>
        </div>

        {/* Conteneur pour les icônes de notification, message, et profil */}
        <div style={{
          backgroundColor: "#4033FF",
        }} className="flex items-center gap-4 mr-2 bg-white rounded-full shadow-md px-4 py-2">
          <Popover className="relative">
            {({ open }) => (
                <>
                  <Popover.Button
                      className={`p-1.5 rounded-sm inline-flex items-center ${open ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'} focus:outline-none`}
                  >
                    <HiOutlineChat color='#ECEBFF' fontSize={24} />
                  </Popover.Button>
                  <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                      <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                        <strong className="text-gray-700 font-medium">Messages</strong>
                        <div className="mt-2">This is the messages panel!</div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
            )}
          </Popover>

          <Popover className="relative">
            {({ open }) => (
                <>
                  <Popover.Button
                      className={`p-1.5 rounded-sm inline-flex items-center ${open ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'} focus:outline-none`}
                  >
                    <HiOutlineBell color='#ECEBFF' fontSize={24} />
                  </Popover.Button>
                  <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                      <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                        <strong className="text-gray-700 font-medium">Notifications</strong>
                        <div className="mt-2">This is the notifications panel!</div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
            )}
          </Popover>

          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="ml-2 inline-flex">
                <span className='sr-only'>Open user menu</span>
                <div className='h-12 w-12 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center' style={{ backgroundImage: 'url("img.png")' }}>
                  <span className='sr-only'>Mayar</span>
                </div>
              </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                <div className="px-4 py-3">
                  <p className="text-sm">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">Mayar</p>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                        <a
                            href="/profile"
                            className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Your Profile
                        </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                        <a
                            href="/settings"
                            className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Settings
                        </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                        <a
                            href="/logout"
                            className={`${
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                            } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Sign out
                        </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
  );
}
