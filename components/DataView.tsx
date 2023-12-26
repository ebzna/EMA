import {
  MdMale,
  MdFemale,
  MdVerified,
  MdOutlineVerified,
} from "react-icons/md";
import EditForm from "@/components/EditForm";
import { useState } from "react";

const DataView = ({
  updateData,
  data,
  mode,
  editMode,
  disableEdit,
  deleteMode,
  disableDelete,
}: {
  editMode: Boolean;
  disableEdit: Function;
  deleteMode: Boolean;
  updateData: Function;
  data: Object[];
  mode: Boolean;
  disableDelete: Function;
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editData, setEditData] = useState({});

  const handleClick = async (e: any) => {
    const { _id } = e;

    if (deleteMode) {
      await fetch(`/api/employees?id=${_id}`, {
        method: "DELETE",
      });
      updateData(data.filter((i: any) => i._id != _id));
    } else if (editMode) {
      disableEdit(true);
      setEditData(e);
    }
    disableEdit(false);
    disableDelete();
  };

  return (
    <div>
      {showEditForm && (
        <EditForm
          dataSet={data}
          editData={editData}
          updateDataSet={updateData}
          setShowEditForm={setShowEditForm}
        />
      )}
      <div
        className={`absolute w-full h-screen select-none ${
          mode ? "" : "flex flex-wrap"
        }`}
      >
        {mode && (
          <div className="grid grid-cols-7 shadow ml-14 font-bold p-1">
            <div>Name</div>
            <div>Surname</div>
            <div>Age</div>
            <div>Sex</div>
            <div>Certified</div>
            <div>Expierence</div>
            <div>Occupation</div>
          </div>
        )}
        <div
          className={`ml-14 ${
            mode ? "flex flex-col" : "flex flex-wrap gap-4 h-max p-4"
          }`}
        >
          {data.length > 0 &&
            data.map((e: any) => (
              <div onClick={() => handleClick(e)} key={e._id}>
                {mode ? (
                  <div className="border hover:bg-gray-100 hover:border-2 p-1 cursor-pointer grid grid-cols-7 shadow">
                    <div>{e.name}</div>
                    <div>{e.surname}</div>
                    <div>{e.age}</div>
                    <div>{e.sex}</div>
                    <div>{e.certified ? "Yes" : "No"}</div>
                    <div>{e.expierence}</div>
                    <div>{e.occupation}</div>
                  </div>
                ) : (
                  <div className="w-max p-2 h-max shadow  rounded-md hover:border-2 flex flex-col hover:bg-gray-100">
                    <div className="flex gap-2 w-full justify-center items-center">
                      <div className="flex gap-1">
                        <div>{e.name}</div>
                        <div>{e.surname}</div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div>{e.sex == "Male" ? <MdMale /> : <MdFemale />}</div>
                        <div>{e.age}</div>
                      </div>
                    </div>

                    <div className="flex w-full justify-center items-center gap-1">
                      <div className="flex justify-center items-center gap-2">
                        {e.certified ? <MdVerified /> : <MdOutlineVerified />}
                      </div>
                      <div className="font-bold">{e.occupation}</div>
                      <div>for {e.expierence} years</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DataView;
