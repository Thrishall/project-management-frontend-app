import styles from "./Input.module.css";
import CustomIcon from "../Customicon";

function InputField({type, placeholder, name, value, onChange, icon, classes ,endIcon, onClick, endIconWidth }) {
    return (
        
            <div className={`d-flex align-center ${styles['input-field']} ${classes || ""}`}>
                {
                    icon ? (
                        <CustomIcon src={icon}/>
                    ) : null
                }
                <input
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {
                    endIcon 
                    ? (
                        <CustomIcon src={endIcon} width={endIconWidth || "15px"} onClick={onClick}/>
                    )
                    : null
                }
            </div> 
    );
}

export default InputField;