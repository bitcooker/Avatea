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
            {props.active &&
                <i className="fa-solid fa-circle fa-xs text-green-400 transition-all delay-300 pr-1"></i>
            }

            {props.label}
        </div>
    );
}
