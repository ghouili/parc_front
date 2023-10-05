import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';

import axios from 'axios';
import swal from 'sweetalert';
import { InputField, SecNavbar, Mission } from '../components';
import { path } from '../utils/Variables';

const Missions = () => {

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [chauffeur, setChauffeur] = useState([]);
    const [marchandise, setMarchandise] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [masterData, setmasterData] = useState([]);
    const [formValues, setFormValues] = useState({
        title: "",
        date_done: "",
        date_affectation: "",
        duration: "",
        destination: "",
        chauffeur: null,
        marchandise: null,
    });

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
        const result = await axios.get(`${path}mission`);
        const allChauffeurs = await axios.get(`${path}user/chauffeur`);
        // const allMarchandises = await axios.get(`${path}marchandise/mission`);

        setfilterData(result.data.data);
        setmasterData(result.data.data);
        setChauffeur(allChauffeurs.data.data);
        // setMarchandise(allMarchandises.data.data);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const ToggleDialog = () => {
        setOpen(!open);
        setFormValues({
            title: "",
            date_done: "",
            date_affectation: "",
            duration: "",
            destination: "",
            chauffeur: null,
            marchandise: null,
        });
    };

    const Update_data = async (item) => {
        console.log("item --------------");
        console.log(item);

        if (item.intern) {
            try {

                let url = `${path}mission/${item._id}`;
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

        console.log(formValues);

        try {
            let url, result;
            if (formValues._id) {
                url = `${path}mission/${formValues._id}`;
                result = await axios.put(url, formValues);
            } else {
                url = `${path}mission/add`;
                result = await axios.post(url, formValues);
            }
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
    };

    const deleteData = async (id) => {
        const willDelete = await swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this Admin?",
            icon: "warning",
            dangerMode: true,
        });

        if (willDelete) {
            const result = await axios.delete(`${path}mission/${id}`);

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
                    page: "Missions",
                    searchLabel: "Chercher Mission..",
                    buttonLabel: "Ajouter Mission",
                    serach: search
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
                            title,
                            date_affectation,
                            date_done,
                            duration,
                            destination,
                            chauffeur,
                            marchandise }) => {
                            return (

                                <Mission
                                    data={{
                                        _id,
                                        title,
                                        date_affectation,
                                        date_done,
                                        duration,
                                        destination,
                                        marchandise,
                                        chauffeur,
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4  pb-4">
                                <InputField
                                    type="text"
                                    label="Mission Title:"
                                    name="title"
                                    placeholder="Mission Title..."
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                />
                                <InputField
                                    type="text"
                                    label="Destination de mission:"
                                    name="destination"
                                    placeholder="Destination de mission..."
                                    value={formValues.destination}
                                    onChange={handleInputChange}
                                />

                                <InputField
                                    type="number"
                                    label="Duree par Jour:"
                                    name="duration"
                                    placeholder="Duree par Jour..."
                                    value={formValues.duration}
                                    onChange={handleInputChange}
                                />

                                {/* chauffeur */}
                                <div className="">
                                    <label
                                        htmlFor="ChauffeurID"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Chauffeur:
                                    </label>
                                    <select
                                        name="chauffeur"
                                        id="ChauffeurID"
                                        value={formValues.chauffeur}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    >
                                        <option value="null" selected>
                                            None
                                        </option>

                                        {chauffeur.slice(0)
                                            .reverse().map(({ _id, cin, nom, prenom, }) => {
                                                return (
                                                    <option value={_id} >
                                                        {nom} {prenom} ({cin})
                                                    </option>
                                                );
                                            })}


                                    </select>
                                </div>

                                {/* marchandise */}
                                {/* <div className="">
                                    <label
                                        htmlFor="marchandiseID"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Marchandise:
                                    </label>
                                    <select
                                        name="marchandise"
                                        id="marchandiseID"
                                        value={formValues.marchandise}
                                        onChange={handleInputChange}
                                        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                                    >
                                        {marchandise.slice(0)
                                            .reverse().map(() => {
                                                return (
                                                    <option value="bureaux" selected>
                                                        bureaux
                                                    </option>
                                                );
                                            })}

                                    </select>
                                </div> */}

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

export default Missions