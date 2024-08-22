import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

interface PhoneInputFieldProps {
  value: string;
  onChange: (phone: string) => void;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  value,
  onChange,
}) => {
  return (
    <PhoneInput
      country={"co"}
      value={value}
      onChange={onChange}
      inputClass="phone-input"
      inputStyle={{ width: "100%", height: "20px" }}
      containerStyle={{ color: "black" }}
    />
  );
};

export default PhoneInputField;
