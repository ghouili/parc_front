import React from 'react';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Breadcrumbs, Button, Input } from "@material-tailwind/react";


import { Car, Navbar, SecNavbar, User } from '../components';

import Picture from '../assets/images/VW_ID7.png';

const Dashboard = () => {
    return (
        <>


            <SecNavbar data={{ page: "users", searchLabel: "Search user..", buttonLabel: "Add User" }} />

            {/* <main> */}
            <main className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
                {[0, 1, 2, 3, 4]
                    .slice(0)
                    .reverse()
                    .map(
                        () => {
                            return (

                                <Car data={{ picture: Picture, number: "199 tun 1546", brand: "BMW", type: "small car", fuelType: "fuel" }} />
                            );
                        })}


            </main>
        </>
    )
}

export default Dashboard
