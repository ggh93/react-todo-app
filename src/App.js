import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from './components/List';

export default function App() {
  const [todoData, setTodoData] = useState([
    {
      id: '1',
      title: '공부하기',
      completed: true,
    },
    {
      id: '2',
      title: '밥먹기',
      completed: false,
    },
  ]);
  const [value, setValue] = useState('');
  const handleSubmit = (e) => {
    // form 안에 input을 전송할 때 페이지 리로드 되는걸 막아줌
    e.preventDefault();
    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };
    // 원래 있던 할 일에 새로운 할일 더하기
    setTodoData((prev) => [...prev, newTodo]);
    setValue('');
  };

  return (
    <div className='flex items-center justify-center'>
      <div>
        <div>
          <h1>할일목록</h1>
        </div>
        <Lists todoData={todoData} setTodoData={setTodoData} />
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
