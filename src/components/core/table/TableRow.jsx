export default function TableRow(props) {
    return (
        <div className="grid grid-cols-12 items-center w-full h-19 px-2 border-b hover:border-0 hover:shadow-[1px_17px_44px_rgba(0,22,42,0.06)] hover:rounded-2xl">
        {props.children}
        </div>
    );
};