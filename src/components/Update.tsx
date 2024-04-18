import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../store/atoms/todo';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Update = () => {
    const params = useParams(); 

    const [todo, setTodo] = useState<Todo>(); 
    const [assignTo, setAssignTo] = useState('');
    const [users, setUsers] = useState<any[]>([]); 
    const [title, setTitle] = useState('');

    const navigate = useNavigate(); 

    useEffect(() => {
        const getTodos = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/todo/update/${params.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = response.data.todo; 
            console.log('todo :- ', response.data.todo);
            console.log('users :- ', response.data.users);
            setTitle(data.title); 
            setAssignTo(data.assignedTo); 
            setUsers(response.data.users); 
            setTodo(data); 
        };
        getTodos();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setAssignTo(event.target.value);
        console.log('assigned to :- ' + assignTo);
    };

    const updateTodo = async () => {
        
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/todo/update/${params.id}`, {
            title: title, 
            assignedTo: assignTo
        },{ 
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        const updatedTodo =  response.data.updatedTodo; 

        setTitle(updatedTodo.title); 
        setAssignTo(updatedTodo.assignedTo); 
        setTodo(updatedTodo); 

    }

    return (
        
        <>
        
        <div className="flex flex-grow items-center justify-center"> 
		<div className="max-w-full p-8 bg-gray-800 rounded-lg shadow-lg text-gray-200 mt-12 w-11/12 sm:w-96 lg:w-auto">
			<div className="flex items-center mb-6">
				<svg className="h-8 w-8 text-indigo-500 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
				</svg>
				<h4 className="font-semibold ml-3 text-lg" style={{fontFamily: 'Cookie', fontSize: "25px", color: 'white'}}>Your tasks</h4>
			</div>


            <div className='flex justify-between'>
                <form onSubmit={updateTodo}>
                <input type='text' 
                    className='bg-gray-900 outline-none rounded-md px-2 xl:pr-20 2xl:pr-40 p-2 mt-4'
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                        placeholder='Title' 
                />
                </form>

                <div className="mr-2 ml-2">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Assign to</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={assignTo}
                    onChange={handleChange}
                    label="Age"
                    >
                    <MenuItem value=""><em>None</em></MenuItem> 
                    { users ? 

                        users.map((user, index) => (
                            <MenuItem value={user.username}>{user.username}</MenuItem>
                        ))     
                        
                        : null                    

                    }
                    </Select>
                </FormControl>

                </div>

                <div>
                <button 
                    onClick={updateTodo}
                    className='p-2 mt-4 bg-gray-900 rounded-md px-1 text-xs sm:text-base' 
                >Update Todo</button>
                </div>

                <div>
                <button 
                    onClick={() => { navigate('/') }}
                    className='p-2 mt-4 bg-gray-900 rounded-md px-1 text-xs sm:text-base ml-5' 
                >Cancel</button>
                </div>

            </div>


            {/* <div className='mt-5'> */}

            {/* {todos.map((todo, index) => ( 
                 <div key={index}> 
                    
                    <div className='flex justify-between items-center mt-3' > 
                        <div className='' onClick={() => markDone(todo._id)} style={{ textDecoration: todo.done && "line-through", color: todo.done && "#9CA3AF" }}>
                            <input className="hidden" type="checkbox" id="task_6" checked />
                            <label className="flex items-center h-full px-2 rounded cursor-pointer hover:bg-gray-900 hover:px-2 hover:p-0.5" >
                                <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full" style={{ backgroundColor: todo.done && "#10B981", borderColor: todo.done && "#10B981", color: todo.done && "#9CA3AF" }}>
                                    <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                <span className="ml-4 text-sm break-words">{todo.title}</span>	
                            </label>
                        </div>
                        <div className='ml-auto mr-5'>
                            <span>{todo.assignedTo}</span>
                        </div>
                        <div className='mr-5'>
                            <button onClick={() => { navigate(`/update/${todo._id}`) }}>update</button>  
                        </div>
                        <div className='mr-1.5 sm:mr-4'>
                            <button onClick={() => deleteOne(todo._id)}>Delete</button>  
                        </div>
                    </div>
                 </div>
            ))} */}

            {/* </div> */}

        </div>

        </div>

        </>

    )
}

export default Update