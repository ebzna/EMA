"use client";
import { useState, useEffect } from "react";

import Sidebar from "@/components/Sidebar";
import CreateForm from "@/components/CreateForm";
import DataView from "@/components/DataView";
import SearchForm from "@/components/SearchForm";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [displayCreate, setDisplayCreate] = useState(false);
  const [dataViewTableMode, setDataViewTableMode] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    fetch("/api/employees/")
      .then((res) => res.json())
      .then((promise) => {
        setDataSet(promise.data);
      });
  }, []);

  return (
    <div className="flex">
      {displayCreate && (
        <CreateForm
          closeForm={() => setDisplayCreate(false)}
          updateDataSet={(value: any) => setDataSet(dataSet.concat(value))}
        />
      )}    
      


      <Sidebar 
       deleteMode={deleteMode}
       toggleDelete={() => setDeleteMode(!deleteMode)}
       editMode={editMode}
       toggleEdit={() => setEditMode(!editMode)}
       toggleCreate={() => setDisplayCreate(!displayCreate)} 
       viewMode={dataViewTableMode}
       switchView={() => setDataViewTableMode(!dataViewTableMode)}
      />

      <DataView 
        editMode={editMode}
        disableEdit={() => setEditMode(false)}
        deleteMode={deleteMode}
        disableDelete={() => setDeleteMode(false)}
        data={dataSet} 
        mode={dataViewTableMode} 
        updateData={setDataSet}
        />

      {children}
    </div>
  );
};

export default Layout;
