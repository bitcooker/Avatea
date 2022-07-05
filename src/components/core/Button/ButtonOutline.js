export default function ButtonOutline(props) {
  return (
    <button
      className="flex justify-center items-center w-full h-10 border border-indigo-500 text-indigo-500 rounded-full hover:cursor-pointer hover:bg-indigo-500 hover:text-white transition"
      onClick={props.handleClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.name}
      {props.children}
    </button>
  );
}
