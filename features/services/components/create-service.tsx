import { useCreateServices } from "@/components/hooks/use-api";
import { useBaseContext } from "@/context/base-context";
import { ChangeEvent, useEffect, useState } from "react";
import { isAxiosError, errorToString } from "@/components/helper/helper";

function CreateService({ onClose }: { onClose: () => void }) {
  const { mutate: handleSubmit } = useCreateServices();
  const { setAlert } = useBaseContext();
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
    isPaid: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="w-[380px] h-full relative flex flex-col items-center justify-center px-[.5rem] gap-[.5rem] text-[#261d4e]">
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

      <div className=" w-full flex items-center gap-[2rem] mt-[.2rem]  ">
        <div className=" flex gap-[.5rem]">
          <label className="block mb-1 text-sm font-medium">
            Ready to list.
          </label>
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
        <div className=" flex gap-[.5rem]">
          <label className="block mb-1 text-sm font-medium">Paid Service</label>
          <input
            type="checkbox"
            checked={formData.isPaid}
            onChange={() =>
              setFormData((prev) => {
                return { ...prev, isPaid: !prev.isPaid };
              })
            }
            className="checkbox checkbox-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        onClick={() =>
          handleSubmit(formData, {
            onError: (error) => {
              onClose();
              const message = isAxiosError(error)
                ? errorToString(error)
                : String(error);
              setAlert(message);
            },
          })
        }
        disabled={formData.name.length < 3 || formData.description.length < 3}
        className={`w-full   text-white py-2 mt-[2rem] rounded-lg  transition ${formData.name.length < 3 || formData.description.length < 3 ? "bg-[#1c1d4e]/60" : "hover:bg-[#1c1d4e]/90 bg-[#1c1d4e] cursor-pointer"}`}
      >
        Create Service
      </button>
    </div>
  );
}

export default CreateService;
