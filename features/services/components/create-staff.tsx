import { useCreateStaff } from "@/components/hooks/use-api";
import { useBaseContext } from "@/context/base-context";
import React, { useState } from "react";

/* ✅ Reusable Input Component */
type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error: string;
  onFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onFocus,
  onChange,
}: InputFieldProps) => {
  return (
    <div>
      <label className="block mb-[2px] text-sm font-medium text-[#261d4e]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        className="w-full border border-[#261d4e] placeholder:text-[#1c1d4e]/80 text-[#1c1d4e]  text-sm px-3 py-2 rounded-lg outline-none"
        required
      />
      <p className="text-red-600 text-[14px] ">{error}</p>
    </div>
  );
};

/* ✅ Main Component */
function CreateStaff({ onClose }: { onClose: () => void }) {
  const { mutate, isPending } = useCreateStaff();
  const { setAlert } = useBaseContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    isAvailable: true,
    isActive: false,
  });

  const [renderState, setRenderState] = useState<"default" | "success">(
    "success",
  );

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
      mobileNo: "",
      password: "",
    };

    let isValid = true;

    // Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // Mobile
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = "Mobile number is required";
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = "Invalid mobile number";
      isValid = false;
    }

    // Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    if (!validate()) return;

    mutate(formData, {
      onSuccess: () => {
        setRenderState("success");
      },
      onError: () => {
        setAlert(
          "This email already exist in our database for diffferent role",
        );
      },
    });
    // setTimeout(() => {
    //   onClose();
    // }, 2000);
  };

  const isDisabled = Object.values(formData).some((value) => value === "");

  return (
    <>
      {" "}
      {renderState === "default" ? (
        <form
          onSubmit={handleSubmit}
          className="w-[380px] flex flex-col gap-2 px-4 py-4"
        >
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            placeholder="Enter name"
            onChange={handleChange}
            error={errors.name}
            onFocus={handleFocus}
          />

          <InputField
            label="Email"
            name="email"
            type="text"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
            error={errors.email}
            onFocus={handleFocus}
          />

          <InputField
            label="Mobile No"
            name="mobileNo"
            type="text"
            value={formData.mobileNo}
            placeholder="Enter mobile number"
            onChange={handleChange}
            error={errors.mobileNo}
            onFocus={handleFocus}
          />

          <InputField
            label="Password"
            name="password"
            type="text"
            value={formData.password}
            placeholder="Enter password"
            onChange={handleChange}
            error={errors.password}
            onFocus={handleFocus}
          />

          <button
            type="submit"
            disabled={isDisabled || isPending}
            className={` ${isDisabled || isPending ? "bg-[#261d4e]/50" : "bg-[#261d4e]"}  text-white py-2 mt-4 cursor-pointer rounded-lg`}
          >
            Create
          </button>
        </form>
      ) : (
        <div className="w-full flex flex-col gap-4 ">
          {/* Success Title */}
          <div className="text-center">
            <h2 className="text-green-600 text-lg font-semibold">
              ✅ Staff Created Successfully
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Provide this details to your staff to access the dashboard
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Credentials Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
            <p className="flex justify-between">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-900">{formData.email}</span>
            </p>

            <p className="flex justify-between mt-2">
              <span className="font-medium text-gray-700">Password:</span>
              <span className="text-gray-900">{formData.password}</span>
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="bg-[#261d4e] hover:bg-[#1e163d] text-white py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}

export default CreateStaff;
