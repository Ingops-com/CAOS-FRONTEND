import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)

    return (
        <div>
            <h1>"Ooops"</h1>
            <p>"Ah ocurrido un error"</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}