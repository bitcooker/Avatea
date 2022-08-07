export default function Card(props) {
  return (
    <div className={`w-full rounded-2.5xl p-5 md-lg:p-7.5 bg-white hover:shadow-md transition-all ease-in-out duration-300 ${props.className}`}>{props.children}</div>
  );
}
