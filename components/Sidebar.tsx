"use client";
import {
  FaTable,
  FaEdit,
  FaAddressCard,
  FaPlus,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { DiMongodb } from "react-icons/di";
import { MdDelete } from "react-icons/md";

const Sidebar = ({
  editMode,
  toggleEdit,
  toggleCreate,
  viewMode,
  switchView,
  deleteMode,
  toggleDelete
}: {
  deleteMode: Boolean
  toggleDelete: Function,
  editMode: Boolean
  toggleEdit: Function,
  toggleCreate: MouseEventHandler;
  viewMode: Boolean;
  switchView: MouseEventHandler;
}) => {
  const defaultCSS =
    "border cursor-pointer flex justify-center items-center h-10 w-10 text-md shadow rounded hover:bg-gray-100";

  const handleEditSwitch = () => {
    if (deleteMode) { 
      toggleDelete()
    }
    toggleEdit()
  }

  const handleDeleteSwitch = () => {
    if (editMode) { 
      toggleEdit()
    }
    toggleDelete()
  }

  const Logo = () => <div className="text-white bg-black w-8 h-8 rounded-full flex justify-center items-center text-xl shadow"><DiMongodb /></div>

  const HomeButton = () => <Link className={defaultCSS} title="Go to home page" href="/"><FaHome /></Link>

  const ViewButton = () => <button onClick={switchView} className={defaultCSS}  title="Switch view mode">  {viewMode ? <FaTable /> : <FaAddressCard />}</button>

  const CreateButton = () => <button className={defaultCSS} onClick={toggleCreate} title="Add new employee"><FaPlus /></button>

  const EditButton = () => <button onClick={ handleEditSwitch } className={defaultCSS + (editMode ? ' bg-gray-200' : '') } title="Select and edit"><FaEdit/></button>

  const DeleteButton = () => <button onClick={handleDeleteSwitch} className={defaultCSS + (deleteMode ? ' bg-gray-200' : '') } title="Select and delete"><MdDelete/></button>

  return (
    <>
      <div className="h-screen select-none shadow border w-14 flex flex-col p-2 items-center gap-2 absolute z-10">
        <Logo />
        <HomeButton />
        <CreateButton />
        <EditButton />
        <DeleteButton />
        <div className="mb-auto"></div>
        <ViewButton />
      </div>
    </>
  );
};

export default Sidebar;
