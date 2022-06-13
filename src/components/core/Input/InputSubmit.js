export default function InputSubmit(props) {
  return (
    <div
      onClick={props.submitFunction}
      className="flex flex-row items-center justify-center h-7.5 text-white bg-indigo-500 rounded-2xl px-3.75 py-1.25 hover:cursor-pointer hover:bg-indigo-500/80 transition"
    >
      <i className={props.icon + " mt-[2px] mr-1"}></i>
      {props.name}
    </div>
  );
}
