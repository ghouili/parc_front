import React, { Fragment, useEffect, useRef, useState } from 'react'

import { InputField, Navbar, SecNavbar, User } from '../components';

import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import axios from "axios";
import swal from "sweetalert";

import { FiUpload } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

// import Avatar from '../assets/vector/male-avatar.png';
import { path } from '../utils/Variables';

const Users = () => {

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [formValues, setFormValues] = useState({
    date_embouche: "",
    niveau: "",
    mission: false,
    competence: "",
    role: "chauffeur",
    nom: "",
    prenom: "",
    avatar: null,
    cin: "",
    tel: "",
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
    const result = await axios.get(`${path}user`);

    setfilterData(result.data.data);
    setmasterData(result.data.data);
    // setData(result.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const ToggleDialog = () => {
    setOpen(!open);
    setPreviewUrl(null);
    setFile(null);
    setFormValues({
      avatar: null,
      nom: "",
      prenom: "",
      cin: "",
      tel: "",
      role: "chauffeur",
      niveau: "",
      competence: "",
      date_embouche: "",
      mission: false,
    });
  };

  const UpdateUser = (item) => {
    console.log(item);
    setFormValues(item);
    setOpen(true);
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
    const formData = new FormData();
    if (File) {
      //   // formData.append("image", previewUrl);
      formData.append("avatar", File);
    }
    formData.append("nom", formValues.nom);
    formData.append("prenom", formValues.prenom);
    formData.append("cin", formValues.cin);
    formData.append("niveau", formValues.niveau);
    formData.append("competence", formValues.competence);
    formData.append("date_embouche", formValues.date_embouche);
    formData.append("tel", formValues.tel);
    formData.append("role", formValues.role);
    try {
      let url, result;
      if (formValues._id) {
        url = `${path}user/${formValues._id}`;
        result = await axios.put(url, formData);
      } else {
        url = `${path}user/add`;
        result = await axios.post(url, formData);
      }
      console.log(result);
      if (result.data.success === true) {
        fetchData();
        swal("Scces!", result.data.message, "success");
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

  const deleteUser = async (id) => {
    const willDelete = await swal({
      title: "Alert!!",
      text: "Êtes-vous sûr de vouloir supprimer cet employé?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      const result = await axios.delete(`${path}user/${id}`);

      if (result.data.success) {
        swal("SUCCES!", result.data.message, "success");
        fetchData();
      } else {
        return swal("Erreur!", result.adta.message, "error");
      }
    }
  };

  return (

    <>
      <SecNavbar
        data={{
          page: "Employees",
          searchLabel: "chercher Employee..",
          buttonLabel: "Ajouter Employee",
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
            ({ _id, avatar, cin, nom, prenom, tel, role, niveau, competence, date_embouche, mission }) => {
              return (

                <User
                  key={_id}
                  data={{
                    _id,
                    avatar,
                    nom,
                    prenom,
                    cin,
                    tel,
                    date_embouche,
                    niveau,
                    mission,
                    competence
                  }}
                  deleteUser={deleteUser}
                  UpdateUser={UpdateUser}
                  handleSubmit={handleSubmit}
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
              ) : formValues.avatar ? (
                <div className=" relative w-40 h-hidden rounded-md shadow-inner mx-auto ">
                  <img
                    src={`${path}src/uploads/images/${formValues.avatar}`}
                    // src={formValues.avatar}
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
                  label="Nom d'employee:"
                  name="nom"
                  placeholder="Nom d'employee..."
                  value={formValues.nom}
                  onChange={handleInputChange}
                />
                <InputField
                  type="text"
                  label="Prenom d'employee:"
                  name="prenom"
                  placeholder="Prenom d'employee..."
                  value={formValues.prenom}
                  onChange={handleInputChange}
                />
                <InputField
                  type="number"
                  label="CIN d'employee:"
                  name="cin"
                  placeholder="CIN d'employee.."
                  value={formValues.cin}
                  disabled={formValues._id ? true: false}
                  onChange={handleInputChange}
                />
                <InputField
                  type="number"
                  label="Telephone d'employee:"
                  name="tel"
                  placeholder="Telphone d'employee.."
                  value={formValues.tel}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Niveau Educatif d'employee:"
                  name="niveau"
                  placeholder="Niveau Educatif d'employee..."
                  value={formValues.niveau}
                  onChange={handleInputChange}
                />

                <InputField
                  type="text"
                  label="Competence d'employee:"
                  name="competence"
                  placeholder="Competence d'employee..."
                  value={formValues.competence}
                  onChange={handleInputChange}
                />

                <InputField
                  type="date"
                  label="Date d'embouchement:"
                  name="date_embouche"
                  placeholder="Date d'embouchement..."
                  value={formValues.date_embouche}
                  onChange={handleInputChange}
                />

                {/* Role */}
                <div className="">
                  <label
                    htmlFor="RoleID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role:
                  </label>
                  <select
                    name="role"
                    id="RoleID"
                    value={formValues.role}
                    onChange={handleInputChange}
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                    sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                  >
                    <option value="chauffeur" selected>
                      Chouffeur
                    </option>
                    <option value="maintenance">Maintenance</option>
                    <option value="agent">Agent</option>
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

export default Users