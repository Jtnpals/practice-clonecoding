import type { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  required?: boolean;
}

export default function TextArea({
  label,
  name,
  register,
  required,
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        required={required}
        {...register}
        id={name}
        className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 "
        rows={4}
      />
    </div>
  );
}
