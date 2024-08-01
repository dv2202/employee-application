import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
const TopContainer = ({ onSearchChange, toShow }) => {
  // const [inuput,setInput] = useState('');

  // const handelOnInput = (value) => {
  //   setInput(value);
  // }
  return (
    <div className="flex justify-between w-4/5 mx-auto mt-4 mb-4">
      {toShow ? (
        <input
          type="text"
          placeholder="Search ..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[25rem] border rounded-lg pl-2 pt-1 pb-1 text-gray-600 font-medium"
        />
      ) : (
        <div>Click on add button to add employee data</div>
      )}
    <div className="flex flex-row gap-2">
        <Link to="/create">
            <div className="h-8 w-8 bg-black flex items-center justify-between rounded-lg cursor-pointer">
                <FaCirclePlus className="mx-auto text-white" onClick/>
            </div>
        </Link>
        {/* <div
            className="h-8 w-8 bg-red-400 flex items-center justify-between rounded-lg cursor-pointer"
            onClick={onDelete}
        >
            <MdDeleteOutline className="mx-auto text-white" />
        </div> */}
    </div>
    </div>
  );
};

export default TopContainer;
