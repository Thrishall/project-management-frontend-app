import styles from './dropdown.module.css';

const DropdownBox = ({optionsList=[], onClick, showDropdownBox}) => {
    return (
        <div className={`${styles['dropdown-box']} ${showDropdownBox ? styles['height-auto'] : styles['height-0']}`}>
            {
                optionsList?.map((option) => {
                    return (
                        <div
                            className={`cursor-pointer ${option?.classes || ''}`}
                            key={option?.id}
                            onClick={ () => {
                                onClick(option?.title, option?.slug);
                            }}
                            style={{color : option?.title === "Delete" ? "#CF3636" : "#000000"}}
                        >
                            {option?.title}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default DropdownBox;