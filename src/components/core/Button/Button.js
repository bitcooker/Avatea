export default function Button(props) {
  return (
    <div
      className="flex justify-center items-center w-full h-10 bg-indigo-500 text-white rounded-full hover:cursor-pointer hover:bg-indigo-500/80 transition"
      onClick={props.handleClick}
    >
      {props.name}
    </div>
  );
}
