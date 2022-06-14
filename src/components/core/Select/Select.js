import SelectIcon from "./SelectIcon";

export default function Select(props) {
  return (
    <div className="flex items-center shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 hover:cursor-pointer">
      <input
        className="block w-full bg-gray-100 hover:cursor-pointer"
        placeholder={props.placeholder}
        readOnly
      />
      <SelectIcon />
    </div>
  );
}
