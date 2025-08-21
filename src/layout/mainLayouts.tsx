import { Outlet } from "react-router-dom"
import { Header } from "../components/header"

export function MainLayout() {
    return (
        <>
            <div className="flex flex-col ">
                <div className=" md:px-40 w-full">
                    <Header />
                </div>
                <main >
                    <Outlet />
                </main>
            </div>      
        </>
    )
}