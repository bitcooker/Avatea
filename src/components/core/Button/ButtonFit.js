import { Loading } from "../../SVG";

export default function ButtonFit(props) {
  return (
    <div
      className={`flex justify-center items-center py-4 px-7.5 bg-indigo-500 text-white rounded-full ${props.disabled ? "hover:cursor-not-allowed bg-gray-100 !text-gray-500" : "hover:cursor-pointer hover:bg-indigo-500/80"} transition`}
      onClick={props.handleClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.isLoading && Loading}
      {props.icon && <i className={props.icon + " mr-2.5"} />}
      {props.name}
      {props.children}
    </div>
  );
}
