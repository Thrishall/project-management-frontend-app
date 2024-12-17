import userIcon from "../Assets/Profile.png";
import emailIcon from "../Assets/Email_icon.png";
import lock from "../Assets/Lock.png";
import eyeOpen from "../Assets/Eye.png";
import eyeHide from "../Assets/Eye-hide.png";

export const inputTextField = (screen, viewPassword) => [
    {
        id:"1",
        type:"text",
        placeholder:"Name",
        name:"userName",
        icon: userIcon,
        hidden: screen === 'Login',
    },
    {
        id:"2",
        type:"email",
        placeholder:"Email",
        name:"email",
        icon: emailIcon
    },
    {
        id:"3",
        type:"password",
        placeholder:"Password",
        name:"password",
        icon: lock,
        endIcon: viewPassword ? eyeHide : eyeOpen,
        view: true,
    },
    {
        id:"4",
        type:"password",
        placeholder:"Confirm Password",
        name:"confirmPassword",
        icon: lock,
        endIcon: viewPassword ? eyeHide : eyeOpen,
        view: true,
        hidden: screen === 'Login',
    },
].filter((item) => !item?.hidden);


export const InputTextField = (screen) =>  [
    {
        id:"1",
        type:"text",
        placeholder:"Name",
        name:"userName",
        icon: userIcon,
    },
    {
        id:"2",
        type:"email",
        placeholder:"Email",
        name:"email",
        icon: emailIcon
    },
    {
        id:"3",
        type:"password",
        placeholder: screen ? "Old Password" : "Confirm Password",
        name: screen ? "oldPassword" : "confirmPassword",
        icon: lock,
    },
    {
        id:"4",
        type:"password",
        placeholder: screen ? "New Password" : "Password",
        name: screen ? "newPassword" : "password",
        icon: lock,
    },
];

