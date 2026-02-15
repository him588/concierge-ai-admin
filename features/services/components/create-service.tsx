import React, { ChangeEvent, useEffect, useState } from "react";

function CreateService() {
  const colors = [
    "#dbc8f7",
    "#b2c6f2",
    "#9cf7c2",
    "#f6cc99",
    "#f69ece",
    "#a3f8e5",
  ];
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    color: colors[0],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center px-[.5rem] gap-[.5rem] text-[#261d4e]">
      {/* Name */}
      <div className="w-full">
        <label className="block mb-1 text-sm font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter service name"
          className="w-full border border-[#261d4e] text-sm px-3 py-2 rounded-lg outline-none "
          required
        />
      </div>

      {/* Description */}
      <div className=" w-full">
        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="w-full border border-[#261d4e] text-sm px-3 py-2 rounded-lg outline-none min-h-[80px] max-h-[100px]"
          rows={3}
          required
        />
      </div>

      {/* Description */}
      <div className=" w-full">
        <label className="block mb-1 text-sm font-medium">Choose color</label>
        <div className="flex gap-[.5rem]">
          {colors.map((color, index) => (
            <div
              style={{ background: color }}
              onClick={() =>
                setFormData((prev) => {
                  return { ...prev, color };
                })
              }
              className={`bg-[${color}] h-[20px] cursor-pointer transition-all duration-250 hover:scale-[1.1] w-[20px] rounded-full ${color === formData.color && "border-[2px] border-solid border-[#261d4e]"}`}
              key={index}
            ></div>
          ))}
        </div>
      </div>
      <div className=" w-full flex  gap-[.5rem] mt-[.2rem]  ">
        <label className="block mb-1 text-sm font-medium">Ready to list.</label>
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={() =>
            setFormData((prev) => {
              return { ...prev, isActive: !prev.isActive };
            })
          }
          className="checkbox checkbox-sm"
        />
      </div>

      <button
        type="submit"
        disabled={formData.name.length < 3 || formData.description.length < 3}
        className={`w-full   text-white py-2 mt-[2rem] rounded-lg  transition ${formData.name.length < 3 || formData.description.length < 3 ? "bg-blue-300" : "hover:bg-blue-700 bg-blue-600 cursor-pointer"}`}
      >
        Create Service
      </button>
    </div>
  );
}

export default CreateService;
