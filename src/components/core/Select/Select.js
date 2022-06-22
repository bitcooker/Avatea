import SelectIcon from "./SelectIcon";

export default function Select(props) {
    return (
        <div className="flex items-center shadow-sm h-12.5 block w-full bg-gray-100 rounded-0.5xl pl-5 pr-3.75 py-2.5 hover:cursor-pointer">
            <select
                className="block w-full bg-gray-100 hover:cursor-pointer"
                placeholder={props.placeholder}
                onChange={e => props.setValue(e.target.value)}
                readOnly>
                {props.options?.map((option, index) =>
                    <option key={index} value={index}>{option.name}</option>
                )};
            </select>
            <SelectIcon/>
        </div>
    );
}
