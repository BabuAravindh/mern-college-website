import { useState } from "react";
function Hooks(){
    const[name,setName]=useState("Abishek");
    return(
        <>
                        <h2>My Name is {name}</h2>

                        <button type="button" onClick={() => setName("Sathish")}>change</button>
            <button type="button" onClick={() => setName("Suersh")}>change</button>

            <button type="button" onClick={() => setName("Ramesh")}>change</button>

            <button type="button" onClick={() => setName("RAjesh")}>change</button>

        </>
    );
}
export default Hooks;