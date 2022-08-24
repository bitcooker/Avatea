export default function KPIWrapper(props) {
    if(props.cols === 2) {
        return (
            <div className={`grid grid-cols-1 gap-7.5 md-lg:grid-cols-2`}>
                {props.children}
            </div>
        )
    }
    if(props.cols === 4) {
        return (
            <div className={`grid grid-cols-1 gap-7.5 md-lg:grid-cols-4`}>
                {props.children}
            </div>
        )
    }

    if(props.cols === 5) {
        return (
            <div className={`grid grid-cols-1 gap-7.5 md-lg:grid-cols-5`}>
                {props.children}
            </div>
        )
    }
    if(props.cols === 6) {
        return (
            <div className={`grid grid-cols-1 gap-7.5 md-lg:grid-cols-6`}>
                {props.children}
            </div>
        )
    }

    return(
        <div className={`grid grid-cols-1 gap-7.5 md-lg:grid-cols-3`}>
            {props.children}
        </div>
    )
}