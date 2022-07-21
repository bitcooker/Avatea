import { Loading2 } from "../../SVG";

export default function ButtonOutlineFit(props) {
  return (
    <div
      className={`group flex justify-center py-2.5 px-10 items-center border border-indigo-500 text-indigo-500 rounded-full hover:cursor-pointer hover:bg-indigo-500 hover:text-white transition ${props.classNames}`}
      onClick={props.handleClick}
    >
      {props.isLoading && Loading2}
      {props.icon && <i className={props.icon + " mr-2.5"} />}
      {props.name}
      {props.children}
    </div>
  );
}
