import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import SearchedMovies from "./pages/SearchedMovies.jsx";

//createBrowserRouter 를 사용하면 기본 라우터보다 중첩라우팅에 편리하다.
const Router = () => {
    return <RouterProvider router={router}/>;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
        errorElement: "",
    },
    {
        path: "/",
        element: <Header/>,
        errorElement: "",
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/search",
                element: <SearchedMovies/>
            }
        ]
    },
]);

export default Router;