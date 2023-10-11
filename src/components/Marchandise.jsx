import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Chip,
} from "@material-tailwind/react";
import { AiOutlineCar } from 'react-icons/ai';
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

import { Link } from 'react-router-dom';
import axios from 'axios';
import { path } from '../utils/Variables';

const Marchandise = ({ data, Update_data, deleteData }) => {
    const { _id, title, type, qte, mission } = data;

    const [missions, setMissions] = useState([]);
    const [selectedmission, setselectedmission] = useState(null);

    const fetchData = async () => {
        const allmissions = await axios.get(`${path}mission/marchandise`);


        setMissions(allmissions.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardBody>
                <div className=" w-full mb-3 flex items-center justify-center">
                    <Typography variant="h4" color="blue-gray" className="font-medium">
                        {title}
                    </Typography>
                </div>

                <Typography variant="h5" color="blue-gray" className="font-medium">
                    type de marchandise : {type}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="font-medium">
                    Quantite: {qte}
                </Typography>

                {mission ?

                    <Typography variant="h6" color="blue-gray" className="font-medium">
                        Mission: <Link className='text-blue-800' to='/'> {mission.title}</Link>
                    </Typography>
                    :
                    <div className="w-full flex flex-row items-center gap-4">

                        <div className="flex flex-row items-center gap-4">
                            <label
                                htmlFor="ChauffeurID"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Chauffeur:
                            </label>
                            <select
                                name="type"
                                id="ChauffeurID"
                                value={selectedmission}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setselectedmission(e.target.value)
                                }}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                            >
                                <option value="null" selected>
                                    None
                                </option>

                                {missions.slice(0)
                                    .reverse().map(({ _id, date_affectation, title, }) => {
                                        return (
                                            <option value={_id} >
                                                {title} ({date_affectation})
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            onClick={() => {
                                Update_data({
                                    _id, mission: selectedmission, intern: true
                                })
                                setselectedmission(null);
                            }}
                        >
                            <span className="relative px-2 py-1 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Choisir
                            </span>
                        </button>
                    </div>

                }
                {/* Add other car information fields here */}
            </CardBody>
            <CardFooter className="pt-3">
                <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg ">
                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
                        onClick={() =>
                            Update_data({ _id, title, type, qte, mission })
                        }
                    >
                        <span className="relative flex items-center gap-1  px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                            <BsPencilSquare />
                            Update
                        </span>
                    </button>

                    <button
                        type="button"
                        className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-500 group-hover:from-pink-500 group-hover:to-red-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 "
                        onClick={() => deleteData(_id)}
                    >
                        <span className="relative flex items-center gap-1 px-3 py-1.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                            <IoTrashOutline />
                            Delete
                        </span>
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default Marchandise