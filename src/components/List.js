import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function List({ todoData, setTodoData }) {
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };
  const handleComplete = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };
  const handelEnd = (result) => {
    console.log('result', result);
    if (!result.destination) return;
    // 1.변경시키는 아이템을 배열에서 지워줍니다
    // 2.리턴값으로 지워진 아이템을 잡아줍니다.
    const newTodoData = todoData;
    const [renderItem] = newTodoData.splice(result.source.index, 1);

    // 원하는 자리에 renderItem를 insert 해줍니다
    newTodoData.splice(result.destination.index, 0, renderItem);
    setTodoData(newTodoData);
  };
  return (
    <div>
      <DragDropContext onDragEnd={handelEnd}>
        <Droppable droppableId='to-dos'>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? 'bg-gray-400' : 'bg-gray-100'
                      } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600  border rounded`}
                    >
                      <div className='items-center'>
                        <input
                          type='checkbox'
                          defaultChecked={data.completed}
                          onChange={() => handleComplete(data.id)}
                        />
                        <span
                          className={
                            data.completed ? 'line-through' : undefined
                          }
                        >
                          {data.title}
                        </span>
                      </div>
                      <div className='items-center'>
                        <button
                          className='px-4 py-2 float-right'
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
