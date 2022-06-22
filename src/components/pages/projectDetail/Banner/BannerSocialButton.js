export default function BannerSocialButton(props) {
  return (
    <div className="w-10 h-10 hover:bg-indigo-500 bg-white/20 rounded-full px-3 py-3 flex items-center justify-center">
      {props.children}
    </div>
  );
}
