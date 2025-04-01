import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  label,
  placeholder,
  value,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="text-sm font-semibold text-primary">{label}</label>
      <Input
        type={showPassword ? "text" : "password"}
        className="w-full py-5 pr-12 mt-2" // Increased padding-right for the icon
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <FaEyeSlash className="text-gray-500" />
        ) : (
          <FaEye className="text-gray-500" />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
