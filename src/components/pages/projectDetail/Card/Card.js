export default function Card(props) {
  return (
    <div className="w-full rounded-2.5xl p-7.5 bg-white divide-y">
      {props.children}
    </div>
  );
}
