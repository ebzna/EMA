"use client";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";

import ErrorBox from "./ErrorBox";

const Page = ({
  setShowEditForm,
  updateDataSet,
  editData,
  dataSet
}: {
  editData: any,
  dataSet: any,
  setShowEditForm: Function;
  updateDataSet: Function;
}) => {
  const [name, setName] = useState(editData.name);
  const [surname, setSurname] = useState(editData.surname);
  const [age, setAge] = useState(editData.age);
  const [sex, setSex] = useState(editData.sex);
  const [certified, setCertified] = useState(editData.certified);
  const [expierence, setExpierence] = useState(editData.expierence);
  const [occupation, setOccupation] = useState(editData.occupation);

  const [errorMessage, setErrorMessage] = useState('')

  const handleUpdate = (id: string) => {
    const oldState = dataSet
    const index = oldState.findIndex((element:any) => element._id == id) 
    oldState[index].name = name
    oldState[index].surname = surname
    oldState[index].age = age
    oldState[index].sex = sex
    oldState[index].certified = certified
    oldState[index].expierence = expierence
    oldState[index].occupation = occupation
    updateDataSet(oldState)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !surname || !age || !sex || !occupation) {
      setErrorMessage("Fill all data fields")
      return
    }
    if (age < 0) {
      setErrorMessage("Age can't be negative")
      return 
    }
    if (age < 18) {
      setErrorMessage("You can't hire underage")
      return
    }
    if (age >= 100) {
      setErrorMessage("Enter proper age")
      return
    }
    if (expierence < 0) {
      setErrorMessage("Expierence can't be negative")
      return
    } 
    await fetch(`/api/employees/${editData._id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name, surname, age, sex, certified, expierence, occupation }),
    });
    handleUpdate(editData._id)
    setShowEditForm(false);
  };

  return (
    <div className="absolute w-full h-full flex justify-center items-center backdrop-blur z-20">
      <div className="flex flex-col shadow p-4 gap-2 bg-white rounded-md">
      { errorMessage && <ErrorBox title={errorMessage} /> }
        <button
          className="flex justify-end w-full"
          onClick={() => setShowEditForm(false)}
          title="Close form"
        >
          <span className="shadow-md rounded-full border hover:bg-gray-100">
            <MdClose />
          </span>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-start gap-2">
              <div className="font-bold">Name:</div>
              <input
                className="indent-4 border rounded p-2 shadow outline-none hover:bg-gray-100"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="font-bold">Surname:</div>
              <input
                className="indent-4 border rounded p-2 shadow outline-none hover:bg-gray-100"
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
              />
            </div>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-start">
                <div className="font-bold">Age:</div>
                <input
                  value={age}
                  className="w-10 outline-none"
                  type="number"
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2 justify-start">
                <div className="font-bold">Sex:</div>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <input type="radio" value="Male" checked={sex == 'Male'} onChange={(e) => setSex(e.target.value)} />
                    Male
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" value="Female" checked={sex == 'Female'} onChange={(e) => setSex(e.target.value)} />
                    Female
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-start">
                <div className="font-bold">Certified:</div>
                <input
                  type="checkbox"
                  checked={certified}
                  onChange={() => setCertified(!certified)}
                />
              </div>
              <div className="flex gap-2 justify-start">
                <div className="font-bold">Expierence:</div>
                <input
                  className="w-10 outline-none"
                  type="number"
                  value={expierence}
                  onChange={(e) => setExpierence(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <div className="font-bold">Occupation:</div>
              <input
                className="indent-4 border w-full rounded p-2 shadow outline-none hover:bg-gray-100"
                type="text"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation} 
              />
            </div>

          <div className="w-full justify-center items-center flex">
            <button
              type="submit"
              className="border text-xl flex justify-center items-center hover:bg-blue-500 shadow rounded-full text-white bg-blue-600  w-20 p-2"
            >
              <TiUserAdd />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

