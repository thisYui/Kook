import React from "react";
import Button from "./Button";

/* 
<Dialog title="Add Task" description="New tasks are added to the default category." actionName="Add">

    <Label label="Task Name" name="taskName" type="text" placeholder="Input Value" className='flex flex-col my-3'/>

    <DropdownLabel
        label="Country"
        name="country"
        options={options}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        placeholder="Choose a country"
        required
        error={!selected && "Please select a country"}
        className='text-lg ml-3'
        selectClassName=''
    />

</Dialog>
*/

export default function Dialog({children, title, description, actionName, onAction, className}) {

    return (
        <form action={onAction} className="w-full h-fit border px-6 py-8 rounded-2xl">
            <h3 className="text-3xl font-medium mb-3 ml-2">{title}</h3>
            <p className="text-lg ml-2">{description}</p>
            <div className={className}>
                {children}
            </div>
            <div className="flex flex-row mt-5">
                <Button name="Cancel" className="ml-auto border px-4 py-2 rounded-xl"></Button>
                <Button name={actionName} onClick={onAction} className="text-white ml-6 border px-4 py-2 rounded-xl bg-blue-500"></Button>
            </div>
        </form> 
    );
}