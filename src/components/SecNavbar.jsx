import React from 'react';
import { Breadcrumbs, Button, Input } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const SecNavbar = ({ data, handleOpen, searchFilter }) => {

    const { page, searchLabel, buttonLabel, search } = data;
    return (
        <header className="w-full flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Breadcrumbs>
                <Link to="/" className="opacity-60 text-[#7367F0]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </Link>
                {/* <Link to="#" className="opacity-60">
        <span>Users</span>
    </Link> */}
                <Link to="#">{page}</Link>
            </Breadcrumbs>
            <div className="w-full md:w-fit flex  md:gap-10 items-center justify-between md:justify-end">
                <div className="relative flex w-full max-w-[24rem]">
                    <Input
                        type="search"
                        label={searchLabel}
                        value={search}
                        onChange={(e) => searchFilter(e.target.value)}
                        className="pr-24 border-[#7367F0] outline-none"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <Button
                        size="sm"
                        className="!absolute right-1 top-1 rounded bg-[#7367F0]"
                    >
                        Search
                    </Button>
                </div>

                <button
                    type="button"
                    className="py-1.5 px-3 text-sm font-medium text-[#7367F0] focus:outline-none  
            rounded-lg border-2 border-[#7367F0] bg-gray-100 hover:bg-[#7367F0] hover:text-gray-100 focus:z-10 
            focus:ring-4 focus:ring-gray-200 "
                    onClick={handleOpen}
                >
                    <span className="flex w-16 justify-center">{buttonLabel}</span>
                </button>
            </div>
        </header>
    )
}

export default SecNavbar