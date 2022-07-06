import { Loading } from "../../SVG";

export default function Button(props) {
  return (
    <button
      className={`flex justify-center items-center w-full h-10 bg-indigo-500 text-white rounded-full hover:cursor-pointer hover:bg-indigo-500/80 transition  ${props.className ? props.className : ''}`}
      onClick={props.handleClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.isLoading && Loading}
      {props.name}
      {props.children}
    </button>
  );
}
