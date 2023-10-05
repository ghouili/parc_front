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

const Mission = ({ data, Update_data, deleteData }) => {

    const { _id, mission, date_affectation, date_done, duration, destination, chauffeur, marchandise } = data;

    const [chauffeurs, setChauffeurs] = useState([]);
    const [selectedChauffeur, setselectedChauffeur] = useState(null);

    const fetchData = async () => {
        const allChauffeurs = await axios.get(`${path}user/chauffeur`);


        setChauffeurs(allChauffeurs.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card className="w-full max-w-[26rem] shadow-lg">
            <CardBody>
                <div className=" w-full mb-3 flex items-center justify-center">
                    <Typography variant="h4" color="blue-gray" className="font-medium">
                        {mission}
                    </Typography>
                </div>

                <Typography variant="h5" color="blue-gray" className="font-medium">
                    date d'affectation de mission : {date_affectation}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="font-medium">
                    Duree: {duration}
                </Typography>
                <Typography variant="h6" color="blue-gray" className="font-medium">
                    Destination: {destination}
                </Typography>
                {chauffeur ?

                    <Typography variant="h6" color="blue-gray" className="font-medium">
                        Chaufffeur: <Link className='text-blue-800' to='/'> Ahmed manai</Link>
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
                                value={selectedChauffeur}
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setselectedChauffeur(e.target.value)
                                }}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                            >
                                <option value="null" selected>
                                    None
                                </option>

                                {chauffeurs.slice(0)
                                    .reverse().map(({ _id, cin, nom, prenom, }) => {
                                        return (
                                            <option value={_id} >
                                                {nom} {prenom} ({cin})
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            onClick={() => {
                                Update_data({
                                    _id, chauffeur: selectedChauffeur, intern: true
                                })
                                setselectedChauffeur(null);
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
                            Update_data({
                                _id, mission, date_affectation, date_done, duration, destination, chauffeur, intern: false
                            })
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

export default Mission