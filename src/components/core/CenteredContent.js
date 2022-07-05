import Card from "../pages/projectDetail/Card/Card";

export default function CenteredContent(props) {
    return (
        <Card>
            <div className="grid grid-cols-1 gap-4 content-center block text-center place-content-center" >
                {props.children}
            </div>
        </Card>
    )
}