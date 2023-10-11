import React, { Fragment, useEffect, useRef, useState } from 'react'

import axios from "axios";
import swal from "sweetalert";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';

import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

import { InputField, Navbar, SecNavbar, Car } from '../components';

import Picture from '../assets/images/VW_ID7.png';
import { path } from '../utils/Variables';

const Cars = () => {

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [formValues, setFormValues] = useState({
        picture: null,
        number: "",
        brand: "",
        type: "small car",
        fuelType: "Essence",
        chauffeur: null,
        panne: null,
    });
    //image related
    const [File, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();
    let subtitle;

    useEffect(() => {
        if (!File) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(File);
    }, [File]);

    // handelie uploading image:::
    const pickedHandler = (event) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        /* props.onInput(props.id, pickedFile, fileIsValid); */
    };

    const searchFilter = (text) => {
        // text from the search input
        // use filterdata to display data at all times
        if (text) {
            // masterdata have alla the data in our table that we gonna serch in
            const newData = masterData.filter((item) => {
                // conctinate each object to be 1 big uppercase string::
                const itemData = Object.values(item).join(" ").toUpperCase();
                // the text from the search input become uppercase
                const textData = text.toUpperCase();
                // check if the text from the search input exist in the string of the object it means we search in ll the object :
                return itemData.indexOf(textData) > -1;
            });
            // filterdata have the filter result
            setfilterData(newData);
            setSearch(text);
        } else {
            // if text is empty we display all the data in filter
            setfilterData(masterData);
            setSearch(text);
        }
    };

    const handleOpen = () => setOpen(!open);

    const fetchData = async () => {
        const result = await axios.get(`${path}car`);

        setfilterData(result.data.data);
        setmasterData(result.data.data);
        setData(result.data.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const ToggleDialog = () => {
        setOpen(!open);
        setPreviewUrl(null);
        setFile(null);
        setFormValues({
            picture: null,
            number: "",
            brand: "",
            type: "small car",
            fuelType: "Essence",
            chauffeur: null,
            panne: null,
        });
    };

    const Update_data = async (item) => {
        console.log(item);

        if (item.intern) {
            try {

                let url = `${path}car/${item._id}`;
                let result = await axios.put(url, { chauffeur: item.chauffeur });
                console.log(result);
                if (result.data.success === true) {
                    fetchData();
                    swal("Success!", result.data.message, "success");
                } else {
                    return swal("Error!", result.data.message, "error");
                }
            } catch (error) {
                console.error(error);
                return swal(
                    "Error!",
                    "Something went wrong. Please try again later.",
                    "error"
                );
            }
        } else {

            setFormValues(item);
            setOpen(true);
        }
    };

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // // Handle form submission

        console.log(formValues);
        const formData = new FormData();
        if (File) {
            //   // formData.append("image", previewUrl);
            formData.append("picture", File);
        }
        formData.append("number", formValues.number);
        formData.append("fuelType", formValues.fuelType);
        formData.append("brand", formValues.brand);
        formData.append("type", formValues.type);
        formData.append("chauffeur", formValues.chauffeur);
        formData.append("panne", formValues.panne);

        try {
            let url, result;
            if (formValues._id) {
                url = `${path}car/${formValues._id}`;
                result = await axios.put(url, formData);
            } else {
                url = `${path}car/add`;
                result = await axios.post(url, formData);
            }
            console.log(result);
            if (result.data.success === true) {
                fetchData();
                swal("Success!", result.data.message, "success");
            } else {
                return swal("Erreur!", result.data.message, "error");
            }
        } catch (error) {
            console.error(error);
            return swal(
                "Erreur!",
                "Quelque chose s'est mal passé. Veuillez réessayer plus tard.",
                "error"
            );
        }
    };

    const deleteData = async (id) => {
        const willDelete = await swal({
            title: "Alert!!",
            text: "Êtes-vous sûr de vouloir supprimer cet employé?",
            icon: "warning",
            dangerMode: true,
        });

        if (willDelete) {
            const result = await axios.delete(`${path}car/${id}`);

            if (result.data.success) {
                swal("Success!", result.data.message, "success");
                fetchData();
            } else {
                return swal("Error!", result.adta.message, "error");
            }
        }
    };


    return (
        <>
            <SecNavbar
                data={{
                    page: "Vehicules",
                    searchLabel: "Chercher vehicule..",
                    buttonLabel: "Ajouter Vehicule",
                    search: search
                }}
                handleOpen={handleOpen}
                searchFilter={searchFilter}
            />

            {/* <main> */}
            <main className="mt-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
                {filterData
                    .slice(0)
                    .reverse()
                    .map(
                        ({ _id,
                            number,
                            brand,
                            type,
                            fuelType,
                            chauffeur,
                            panne,
                            picture,
                            ispanne
                        }) => {
                            return (

                                <Car
                                    data={{
                                        _id,
                                        picture,
                                        number,
                                        brand,
                                        type,
                                        fuelType,
                                        chauffeur,
                                        panne,
                                        ispanne
                                    }}
                                    Update_data={Update_data}
                                    deleteData={deleteData}
                                />
                            );
                        })}
            </main>

            <Fragment>
                <Dialog open={open} size="lg" handler={ToggleDialog}>
                    <DialogHeader>Add a User..</DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <DialogBody divider className='overflow-auto'>
                            {previewUrl ? (
                                <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                                    <img
                                        src={previewUrl}
                                        alt="product_pic"
                                        className="h-full w-full object-cover object-center rounded-md"
                                    />
                                    <label
                                        htmlFor="pictureID"
                                        className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                                    >
                                        <BiEdit size={20} />
                                        <input
                                            type="file"
                                            name="picture"
                                            id="pictureID"
                                            className="hidden"
                                            accept=".jpg,.png,.jpeg"
                                            ref={filePickerRef}
                                            onChange={pickedHandler}
                                        />
                                    </label>
                                </div>
                            ) : formValues.picture ? (
                                <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                                    <img
                                        src={`${path}src/uploads/images/${formValues.picture}`}
                                        // src={formValues.picture}
                                        alt={`${formValues.picture} pic`}
                                        className="h-full w-full object-cover object-center rounded-md"
                                    />
                                    <label
                                        htmlFor="pictureID"
                                        className="absolute p-1 rounded-full bg-purple-50 border border-white -bottom-3 -left-3 text-gray-700 cursor-pointer"
                                    >
                                        <BiEdit size={20} />
                                        <input
                                            type="file"
                                            name="picture"
                                            id="pictureID"
                                            className="hidden"
                                            accept=".jpg,.png,.jpeg"
                                            ref={filePickerRef}
                                            onChange={pickedHandler}
                                        />
                                    </label>
                                </div>
                            ) : (
                                <div className="w-full flex justify-center items-center pb-6 ">
                                    <label
                                        htmlFor="pictureID"
                                        className="mx-auto w-fit flex flex-col items-center justify-center rounded-lg border-2 border-gray-700 p-4 text-gray-700 cursor-pointer"
                                    >
                                        <FiUpload size={30} />
                                        <input
                                            type="file"
                                            name="picture"
                                            id="pictureID"
                                            className="hidden"
                                            accept=".jpg,.png,.jpeg"
                                            ref={filePickerRef}
                                            onChange={pickedHandler}
                                        />
                                        <span className="text-gray-700">Select a picture</span>
                                    </label>
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  pb-4">
                                <InputField
                                    type="text"
                                    label="Vehicule Marque:"
                                    name="brand"
                                    placeholder="Vehicule Marque..."
                                    value={formValues.brand}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    type="text"
                                    label="Vehicule Matricule:"
                                    name="number"
                                    placeholder="Vehicule Matricule..."
                                    disabled={formValues._id ? true : false}
                                    value={formValues.number}
                                    onChange={handleInputChange}
                                />


                                {/* Type */}
                                <div className="">
                                    <label
                                        htmlFor="CarburantID"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Carburant:
                                    </label>
                                    <select
                                        name="type"
                                        id="CarburantID"
                                        value={formValues.fuelType}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    >
                                        <option value="Essence" selected>
                                            Essence
                                        </option>
                                        <option value="Mazout">Mazout</option>
                                    </select>
                                </div>
                                {/* Type */}
                                <div className="">
                                    <label
                                        htmlFor="TypeID"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Type:
                                    </label>
                                    <select
                                        name="type"
                                        id="TypeID"
                                        value={formValues.type}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    >
                                        <option value="small car" selected>
                                            Small car
                                        </option>
                                        <option value="4 X 4">4 X 4</option>
                                    </select>
                                </div>

                            </div>
                        </DialogBody>
                        <DialogFooter>
                            <Button
                                variant="text"
                                color="red"
                                onClick={ToggleDialog}
                                className="mr-1"
                            >
                                <span>Cancel</span>
                            </Button>
                            <Button variant="gradient" color="green" type="submit">
                                <span>Confirm</span>
                            </Button>
                        </DialogFooter>
                    </form>
                </Dialog>
            </Fragment>

        </>
    )
}

export default Cars