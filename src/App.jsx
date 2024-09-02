
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getLocation } from "./store/locationSlice";
import { useEffect } from "react";
import locpic from "./assets/location-svgrepo-com.svg"
import securityDog from "./assets/snyk-svgrepo-com.svg"

function App() {

    const data = useSelector(state => state.location)
    const dispatch = useDispatch();

    console.log(data)

    useEffect(() => {
        dispatch(getLocation())
    }, [])

    return (
        <>
            <header className="text-black py-2 bg-lime-500 pl-2 flex justify-start items-center gap-4">
                <div className="w-[35px] h-[35px] overflow-hidden">
                    <img src={locpic} alt="" className="w-full h-full object-contain loc-icon" />
                </div>
                <h1 className="text-[1.25rem] md:text-2xl font-bold uppercase">Location from IP Address</h1>

            </header>
            {data.status === "loading" && <LoadingDiv title={"loading please wait ..."} />}
            {data.status === "error" && <LoadingDiv title={"something went wrong"} />}
            {data.status === "idle" && <DisplayDetails details={data.data} />}
            <div className="fix-pic">
                    <img src={securityDog} alt="" className="w-full h-full object-contain"/>
            </div>

        </>
    )



}

export default App;


function LoadingDiv({ title }) {
    return (
        <div className="w-[100%] h-[400px] text-white grid place-items-center text-4xl capitalize font-bold">
            <p className={title === "something went wrong" ? "text-red-500" : ""}>{title}</p>
        </div>
    )
}

function DisplayDetails({ details }) {
    console.log(details);


    return (
        <div className="text-lime-400   my-10">

            <table className="border-[1px] border-gray-500 block w-[95%] mx-auto text-base md:text-xl overflow-hidden md:w-[90%] lg:w-[70%] border-dashed">
                <tr>
                    <td className="w-[35%]">ip address</td>
                    <td className="w-[65%]">{details.ip}</td>
                </tr>
                <tr>
                    <td className="w-[35%]">coordinates</td>
                    <td className="w-[65%]">{details.loc}</td>
                </tr>
                <tr>
                    <td className="w-[35%]">city</td>
                    <td className="w-[65%]">{details.city}</td>
                </tr>
                <tr>
                    <td className="w-[35%]">region</td>
                    <td className="w-[65%]">{details.region}</td>
                </tr>
                <tr>
                    <td className="w-[35%]">PIN code</td>
                    <td className="w-[65%]">{details.postal}</td>
                </tr>

                <tr>
                    <td className="w-[35%]">service provider</td>
                    <td className="w-[65%]">{details.org}</td>
                </tr>
                <tr>
                    <td className="w-[35%]">time zone</td>
                    <td className="w-[65%]">{details.timezone}</td>
                </tr>
            </table>

        </div>
    )
}