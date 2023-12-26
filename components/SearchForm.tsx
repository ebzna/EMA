import { MouseEventHandler } from "react";
import { MdClose } from "react-icons/md";

const SearchForm = ({ closeForm }: { closeForm: MouseEventHandler }) => {

    const handleSubmit = () => {

    }

  return (
    <div className="absolute w-full h-full flex justify-center items-center backdrop-blur z-10">
      <form onSubmit={handleSubmit}>
        <button
          className="flex justify-end w-full"
          onClick={closeForm}
          title="Close form"
        >
          <span className="shadow-md rounded-full border">
            <MdClose />
          </span>
        </button>

        <input
          type="text"
          placeholder="Type here to search..."
          className="shadow h-10 p-2 outline-none indent-4"
          autoFocus
        />
      </form>
    </div>
  );
};

export default SearchForm;
