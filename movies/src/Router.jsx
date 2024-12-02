import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.jsx";

//createBrowserRouter 를 사용하면 기본 라우터보다 중첩라우팅에 편리하다.
const Router = () => {
    return <RouterProvider router={router}/>;
};

const router = createBrowserRouter([
    {
    path: "/",
    element: <App/>,
    errorElement:""
},
]);

export default Router;