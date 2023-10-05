import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  Chip,
  IconButton,
  Badge
} from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/solid";
import { AiOutlineCar } from 'react-icons/ai';
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";

// import Avatar from '../assets/vector/male-avatar.png';
import { path } from '../utils/Variables';

const User = ({ data, deleteUser, UpdateUser }) => {
  const { _id, avatar, nom, prenom, cin, tel, date_embouche, niveau, mission, competence } = data;
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="transparent">
        <div class="aspect-w-16 aspect-h-14">

          <img
            src={`${path}src/uploads/images/${avatar}`}
            alt={`${avatar} profile `}
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/40 " />
        </div>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h4" color="blue-gray" className="font-medium">
            {nom} {prenom}
          </Typography>

        </div>
        <Typography variant="h5" color="blue-gray" className="font-medium">
          CIN: {cin}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="font-medium">
          N° Telephone: {tel}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="font-medium">
          date D'embouchement: {date_embouche}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="font-medium">
          Niveau: {niveau}
        </Typography>

        <div className="py-2 flex gap-2">
          {mission ?

            <Chip
              variant="ghost"
              color="red"
              size="sm"
              value="indisponible"
              icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-red-900 content-['']" />
              }
            />
            :
            <Chip
              variant="ghost"
              color="green"
              size="sm"
              value="Disponible"
              icon={
                <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
              }
            />
          }
        </div>

        <div className=' w-fit rounded-md flex flex-row items-center px-2 gap-2 border border-gray-2' >
          <AiOutlineCar className="h-4 w-4" />
          <p>car number</p>
        </div>
        <Typography color="gray">
          <u>Competence:</u> {competence}
        </Typography>


      </CardBody>
      <CardFooter className="pt-3">
        {/* <Button size="lg" fullWidth={true}>
          Reserve
        </Button> */}
        {/* <div className="w-full border my-2 "></div> */}
        <div className="flex justify-between w-full text-gray-700 items-center font-medium text-lg ">


          <button
            type="button"
            className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-200 "
            onClick={() =>
              UpdateUser({
                _id, avatar, nom, prenom, cin, tel, date_embouche, niveau, mission, competence
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
            onClick={() => deleteUser(_id)}
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

export default User