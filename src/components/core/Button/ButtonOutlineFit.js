export default function ButtonOutlineFit(props) {
  return (
    <button
      className="flex justify-center py-2.5 px-10 items-center border border-indigo-500 text-indigo-500 rounded-full hover:cursor-pointer hover:bg-indigo-500 hover:text-white transition"
      onClick={props.handleClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.icon && <i className={props.icon + " mr-2.5"} />}
      {props.name}
      {props.children}
    </button>
  );
}
