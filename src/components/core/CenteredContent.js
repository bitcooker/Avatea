import Card from "../pages/projectDetail/Card/Card";

export default function CenteredContent(props) {
    return (
        <Card className="h-[85vh] flex items-center justify-center">
            <div className="grid grid-cols-1 gap-4 content-center text-center place-content-center" >
                {props.children}
            </div>
        </Card>
    )
}