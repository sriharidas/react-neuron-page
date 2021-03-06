import React, { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import "./../../css/form.css";
export default function Input({
  type,
  name,
  id,
  label,
  placeholder,
  onChange,
  setVerification,
  isVerified,
  ...others
}) {
  // const [verified, setVerified] = useState(false);
  console.log(name, type === "password" && isVerified);
  return (
    <>
      <div className="form-groups">
        <label htmlFor={id}>
          <span>{label} </span>
          {type === "email" &&
            (isVerified ? (
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.8rem",
                  background: "#ddd",
                  padding: "3px 10px",
                }}
              >
                verified <AiOutlineCheck />
              </span>
            ) : (
              <button
                type="button"
                onClick={() => {
                  let element = document.getElementById(id),
                    element_err = document.getElementById(`${id}-error`);
                  if (
                    element.value.length > 0 &&
                    element.value.includes("@") &&
                    element.value.includes(".")
                  ) {
                    // setVerified(true);
                    setVerification((prevState) => ({
                      ...prevState,
                      form: true,
                    }));
                    element_err.innerHTML = "";
                  } else element_err.innerHTML = "Enter a valid email address";
                }}
              >
                {" "}
                verify{" "}
              </button>
            ))}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          required
          disabled={
            type === "password" && isVerified !== undefined && !isVerified
          }
        />
        {others.others !== undefined && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: "10px",
            }}
          >
            <input
              type={others.others.props.type}
              onChange={onChange}
              name={name}
              onClick={(e) => {
                if (e.target.checked) {
                  e.target.value = "individual";
                  document.getElementById(id).value = "individual";
                } else {
                  e.target.value = "";
                  document.getElementById(id).value = "";
                }
                document.getElementById(id).disabled = e.target.checked;
              }}
              style={{
                width: "30px",
              }}
            />
            <label
              style={{
                width: "calc(100% - 30px)",
                fontWeight: "100",
                fontSize: "0.8rem",
              }}
            >
              I don't have a campany
            </label>
          </div>
        )}
        {type === "text" ? (
          <p id={id + "-error"} style={errorMsg}>
            {/* Password doesn't match */}
          </p>
        ) : null}
        {type === "password" ? (
          <p className={id + "-error"} style={errorMsg}>
            {/* Password doesn't match */}
          </p>
        ) : null}
        {type === "email" ? (
          <p className="email-error" id={id + "-error"} style={errorMsg}>
            {/* invalid */}
          </p>
        ) : null}
      </div>
    </>
  );
}
const errorMsg = {
  // margin: "10px 0",
  paddingTop: "5px",
  fontSize: "0.8rem",
  color: "red",
};
