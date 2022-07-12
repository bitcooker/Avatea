export default function TabItem(props) {
  return (
    <div
      className={
        props.selected
          ? "rounded-[20px] whitespace-nowrap px-5 py-1 bg-indigo-500 text-white hover:cursor-pointer transition"
          : "rounded-[20px] whitespace-nowrap px-5 py-1 bg-gray-100 hover:cursor-pointer transition"
      }
      onClick={() => props.handleSetTab(props.value)}
    >
      {props.label}
    </div>
  );
}
