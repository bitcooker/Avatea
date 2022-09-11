import { Loading } from "../../SVG";

export default function Button(props) {
  return (
    <button
      className={`disabled:bg-indigo-500/50 flex justify-center items-center w-full py-2.5 bg-gradient-to-r from-avatea-blue-dark-500 to-avatea-yellow-dark-500 text-white font-bold rounded-full hover:shadow-2xl transition duration-300  ${props.className ? props.className : ''}`}
      onClick={props.handleClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.isLoading && Loading}
      {props.name}
      {props.children}
    </button>
  );
}
