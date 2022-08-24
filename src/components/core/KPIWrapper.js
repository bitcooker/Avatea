export default function KPIWrapper(props) {
    return(
        <div className={`grid md-lg:grid-cols-${props.cols ? props.cols : '3'} gap-7.5`}>
            {props.children}
        </div>
        )
}