export default function KPIWrapper(props) {
    console.log(props);
    return(
        <div className={`grid grid-cols-1 gap-7.5
         ${props.cols === 2 ? 'md-lg:grid-cols-2' : "md-lg:grid-cols-3"}
         ${props.cols === 4 ? 'md-lg:grid-cols-4' : "md-lg:grid-cols-3"}
         ${props.cols === 5 ? 'md-lg:grid-cols-5' : "md-lg:grid-cols-3"}
         ${props.cols === 6 ? 'md-lg:grid-cols-6' : "md-lg:grid-cols-3"}
         `}>
            {props.children}
        </div>
        )
}