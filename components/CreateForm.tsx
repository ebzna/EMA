"use client";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";

import ErrorBox from "@/components/ErrorBox";

const Page = ({
  closeForm,
  updateDataSet,
}: {
  closeForm: Function;
  updateDataSet: Function;
}) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState("");
  const [certified, setCertified] = useState(false);
  const [expierence, setExpierence] = useState(0);
  const [occupation, setOccupation] = useState("");
  
  const [errorMessage, setErrorMessage] = useState('')

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
    setErrorMessage('')
      await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ name, surname, age, sex, certified, expierence, occupation }),
      });
      updateDataSet([{ name, surname, age, sex, certified, expierence, occupation } ]);
    closeForm();
  };

  return (
    <div className="absolute w-full h-full select-none flex justify-center items-center backdrop-blur z-20"> 
      <div className="flex flex-col shadow p-4 gap-2 bg-white rounded-md">

      { errorMessage && <ErrorBox title={errorMessage} /> }
        <button
          className="flex justify-end w-full"
          onClick={closeForm}
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
                placeholder="John"
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <div className="font-bold">Surname:</div>
              <input
                className="indent-4 border rounded p-2 shadow outline-none hover:bg-gray-100"
                type="text"
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Smith"
              />
            </div>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 justify-start">
                <div className="font-bold">Age:</div>
                <input
                  value={age}
                  className="w-14 outline-none"
                  type="number"
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-2 justify-start">
                <div className="font-bold">Sex:</div>
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <input type="radio" name="sex" value="Male" onChange={(e) => setSex(e.target.value)} />
                    Male
                  </div>
                  <div className="flex gap-2">
                    <input type="radio" name="sex" value="Female" onChange={(e) => setSex(e.target.value)}/>
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
                placeholder="Software Engineer"
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
