export const TableActionEditButton = (props) => {
    return (
        <div onClick={props.handleClick} className="flex items-center justify-center w-[100px] h-9 rounded-full bg-red-100/50 hover:ring-2 hover:ring-red-200/50 hover:cursor-pointer transition">
            <i className="fa-solid fa-pen-line text-red-500" /> View
        </div>
    );
};

export const TableActionDeleteButton = (props) => {
    return (
        <div onClick={props.handleClick} className="flex items-center justify-center w-9 h-9 rounded-full bg-red-100/50 hover:ring-2 hover:ring-red-200/50 hover:cursor-pointer transition">
            <i className="fa-solid fa-trash text-red-500" />
        </div>
    );
};

export const TableActionMoreButton = (props) => {
    return (
        <div onClick={props.handleClick} className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 hover:ring-2 hover:ring-gray-200/50 hover:cursor-pointer transition">
            <i className="fa-solid fa-ellipsis-vertical text-gray-500" />
        </div>
    );
};