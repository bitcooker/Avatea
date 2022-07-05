export default function Button(props) {
  return (
    <button
      className="flex justify-center items-center w-full h-10 bg-indigo-500 text-white rounded-full hover:cursor-pointer hover:bg-indigo-500/80 transition"
      onClick={props.handleClick}
      disabled={props.disabled ? props.disabled : false}
    >
      {props.name}
      {props.children}
    </button>
  );
}
