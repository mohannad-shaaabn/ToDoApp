import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import myphoto from './assets/to do 2.png';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function App() {
  const [time, setTime] = useState(dayjs().tz('Africa/Cairo'));
  const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

  const inputref = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().tz('Africa/Cairo'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };


  const handleAddToDo = (e) => {
    e.preventDefault();
    const text = inputref.current.value;
    if (text === '') return;
    const newTodo = {
      text,
      date: dayjs().tz('Africa/Cairo').format('YYYY-MM-DD HH:mm'),
      checked: false
    };
    setTodos([...todos, newTodo]);
    inputref.current.value = '';
  };

  const handleDeleteitem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <>
      <div className='w-8/12 mx-auto'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <h3 className='font-medium text-xl'>Hello ,</h3>
            <h2 className='font-semibold text-3xl text-mainRed'>{getGreeting(time.hour())} !</h2>
          </div>
          <div className='flex'>
            <h5 className='font-medium'>Time: </h5>
            <p className='ps-2 font-semibold text-mainRed'>{time.format('HH:mm:ss A')}</p>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='mt-4 font-extrabold text-4xl'>To Do List</h1>
          <img src={myphoto} alt="My Photo" className='ps-2 rounded-e-full translate-y-2' style={{ width: "65px", height: "auto" }} />
        </div>
      </div>

      <div className='w-5/12 mx-auto'>
        <form className="mx-auto mt-5">
          <div className="relative">
            <input ref={inputref} type="search" id="default-search" className="block w-full p-4 text-sm text-white border border-gray-300 rounded-full  focus:ring-blue-500 focus:border-blue-500 bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 placeholder:italic dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add New Task " required />
            <button onClick={handleAddToDo} type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-mainRed hover:bg-red-500 focus:ring-4 focus:outline-none font-medium rounded-full text-sm px-6 py-2">Add</button>
          </div>
        </form>

        {todos.length > 0 && (
          <div className='bg-gray-700 mt-3 p-3 rounded'>
            <ul>
              {todos.map((item, index) => (
                <li key={index} className={`flex justify-between items-center font-semibold bg-gray-300 rounded-full px-3 py-1 mt-2 ${item.checked ? 'opacity-50' : ''}`}>
                  <div className="flex items-center me-4">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {
                        const updatedTodos = [...todos];
                        updatedTodos[index].checked = !updatedTodos[index].checked;
                        setTodos(updatedTodos);
                      }}
                      className="appearance-none w-5 h-5 border-2 border-mainRed rounded-full checked:bg-mainRed checked:border-mainRed bg-white transition duration-300 cursor-pointer"
                    />
                  </div>
                  <div className='text-center'>
                    <p className={`${item.checked ? ' opacity-50' : ''}`}>{item.text}</p>
                    <p className='text-xs text-mainRed'>Added on: {item.date}</p>
                  </div>
                  <i onClick={() => handleDeleteitem(index)} className='fa-solid fa-trash cursor-pointer'></i>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
