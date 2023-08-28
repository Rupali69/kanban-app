import React, { useState } from 'react'
import ProfileIcon from '../profile.svg'
import './kanban.css'

function Kanban() {
    const [showModal, setShowModal] = useState(false)
    const [planning, setPlanning] = useState([])
    const [started, setStarted] = useState([])
    const [done, setDone] = useState([])

    const [data, setData] = useState({
        task: '',
        date: '',
        person: '',
        list: '',
    })

    const [isEdit, setEdit] = useState({
        index: -1,
        taskType: ""
    })

    const onAdd = (/** @type {string} */ listName) => {
        setShowModal(true)
        setData({
            task: '',
            date: '',
            person: '',
            list: listName,
        })
    }
    const handleCancel = () => {
        setShowModal(false)
    }

    const handleOnChange = (/** @type {{ target: { name: any; value: any; }; }} */ e) => {
        const name = e.target.name
        const value = e.target.value
        setData({ ...data, [name]: value })
    }

    function removeDataFromArray() {
        if (isEdit.index < 0) return
        switch (isEdit.taskType) {
            case "planning": {
                var tempPlanning = planning
                tempPlanning.splice(isEdit.index, 1)
                setPlanning(tempPlanning)
                console.log("planning", planning)
                break;
            }
            case "started": {
                var tempStarted = started
                tempStarted.splice(isEdit.index, 1)
                setStarted(tempStarted)
                console.log("started", started)

                break;
            }
            case "done": {
                var tempDone = done
                done.splice(isEdit.index, 1)
                setDone(tempDone)
                console.log("done", done)

                break;
            }
            default:
        }

    }



    const onSave = (/** @type {any} */ e, /** @type {any} */ tasktype, /** @type {any} */ doubleClickindex) => {
        // e.preventDefault()


        console.log("form submitted")

        if (data.list === "planning") {
            if (isEdit.index > -1 && isEdit.taskType === "planning") {
                planning[isEdit.index] = data
                // console.log("planning", planning)
            } else {
                removeDataFromArray()
                setPlanning([...planning, data])
            }
        } else if (data.list === "started") {
            if (isEdit.index > -1 && isEdit.taskType === "started") {
                started[isEdit.index] = data
            } else {
                removeDataFromArray()
                setStarted([...started, data])
            }
        } else if (data.list === "done") {
            if (isEdit.index > -1 && isEdit.taskType === "done") {
                done[isEdit.index] = data
            } else {
                removeDataFromArray()
                setDone([...done, data])
            }
        }
        console.log(data)
        setData({
            task: '',
            date: '',
            person: '',
            list: '',
        })
        setEdit({
            index: -1,
            taskType: ""
        })
        setShowModal(false)
    }


    const handleDoubleClick = (/** @type {number} */ ind, /** @type {React.SetStateAction<{ task: string; date: string; person: string; list: string; }>} */ value) => {
        setShowModal(true)
        setEdit({
            index: ind,
            // @ts-ignore
            taskType: value.list
        })
        // console.log("sdws", value)
        setData(value)
    }

    return (
        <>
            <div className='border-2 border-slate-500 py-6 m-2'>
                <div className='flex justify-between p-2 text-lg font-semibold'>
                    <div className=''>Task Board</div>
                    <div className="flex p-2">
                        Members:
                        <img src={ProfileIcon} alt="profile_icon" width={20} height={20} />
                        <img src={ProfileIcon} alt="profile_icon" width={20} height={20} />
                        <img src={ProfileIcon} alt="profile_icon" width={20} height={20} />
                    </div>
                </div>
                <div className='flex flex-row mt-10 mx-10 justify-around'>
                    <div className='border-2 p-6'>
                        <div className='font-bold'>Planned</div>
                        <div className="w-[500px] border-2 border-gray">


                            {planning.map((value, index) => (
                                <React.Fragment key={index}  >
                                    <div className='w-[285px] h-[100px] m-[5.5px] border-2 border-gray ' onDoubleClick={() => handleDoubleClick(index, value)}>
                                        <div className='p-1.5' >
                                            <div>{value.task}</div>
                                            <div>Due: {value.date}</div>
                                            <div className='flex justify-end'>
                                                {value.person}<img src={ProfileIcon} className='ml-2' alt="asignee" width={24} height={24} />
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}

                            <div className='flex justify-center flex-row m-3'>
                                <button onClick={() => onAdd('planning')}>Add Another Task</button>
                            </div>
                        </div>
                    </div>
                    <div className='border-2 p-6'>
                        <div className='font-bold'>Started</div>
                        <div className="w-[500px] border-2 border-gray">

                            {started.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div className='w-[285px] h-[100px] m-[5.5px] border-2 border-gray ' onDoubleClick={() => handleDoubleClick(index, value)}>
                                        <div className='p-1.5'>
                                            <div>{value.task}</div>
                                            <div>Due: {value.date}</div>
                                            <div className='flex justify-end'>
                                                {value.person}<img src={ProfileIcon} className='ml-2' alt="asignee" width={24} height={24} />
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}


                            <div className='flex justify-center flex-row  m-3'>
                                <button onClick={() => onAdd('started')}>Add Another Task</button>
                            </div>
                        </div>
                    </div>
                    <div className='border-2 p-6'>
                        <div className='font-bold'>Done</div>
                        <div className="w-[300px] border-2 border-gray">
                            {done.map((value, index) => (
                                <React.Fragment key={index}>
                                    <div className='w-[285px] h-[100px] m-[5.5px] border-2 border-gray ' onDoubleClick={() => handleDoubleClick(index, value)}>
                                        <div className='p-1.5'>
                                            <div>{value.task}</div>
                                            <div>Due: {value.date}</div>
                                            <div className='flex justify-end'>
                                                {value.person}<img src={ProfileIcon} className='ml-2' alt="asignee" width={24} height={24} />
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}


                            <div className='flex justify-center flex-row m-3'>
                                <button onClick={() => onAdd('done')}>Add Another Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            {showModal === true ?
                <form>
                    <div className='card border-2 m-auto p-4 mt-20 bg-pink-400'>
                        <div className='border-2 mx-auto '>
                            <input onChange={handleOnChange} name='task' value={data.task} type="text" placeholder='Description' />
                        </div>
                        <div className='mx-auto mt-10 flex justify-between'>
                            <div className=' border-2'>
                                <input onChange={handleOnChange} name='date' value={data.date} type="date" className='border-2 ' /></div>
                            <div className=''>
                                <select onChange={handleOnChange} name='person' value={data.person} className="border-2"  >
                                    <option value="0">Select Person Name</option>
                                    <option value="jenny">Jenny</option>
                                    <option value="james">James</option>
                                    <option value="jane">Jane</option>
                                </select>
                            </div>
                        </div>
                        <div className='mx-auto mt-10 flex justify-end'>
                            <div className=''>
                                <select onChange={handleOnChange} name='list' value={data.list} className="border-2"  >
                                    <option value="check-list">Select List</option>
                                    <option value="planning" >Planning</option>
                                    <option value="started">Started</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                        </div>
                        <div className='mx-auto  mt-10 flex justify-center'>
                            <button onClick={onSave} className='border-2 p-2 font-medium w-[100px] text-white'>Save</button>
                            <button onClick={handleCancel} className='border-2 w-[100px] ml-6 p-2 font-medium text-white'>Cancel</button>

                        </div>
                    </div>
                </form> : ""}
        </>

    );
}

export default Kanban;