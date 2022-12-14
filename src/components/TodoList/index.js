import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useDispatch, useSelector } from "react-redux";
import { createAddTodo } from "../../redux/actions";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { todosRemainSelector } from "../../redux/selectors";

export default function TodoList() {
  const todoList = useSelector(todosRemainSelector);
  const inputRef = useRef();
  const [userInput, setUserInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    const data = {
      id: uuidv4(),
      name: userInput,
      priority: priority,
      completed: false,
    };
    dispatch(createAddTodo(data));
    setUserInput("");
    setPriority("Medium");
    inputRef.current.focus();
  };

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriority(value);
  };

  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <Todo
            key={todo.id}
            todoId = {todo.id}
            name={todo.name}
            prioriry={todo.priority}
            completed={todo.completed}
          />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input value={userInput} onChange={handleInput} ref={inputRef} />
          <Select
            defaultValue="Medium"
            value={priority}
            onChange={handlePriorityChange}
          >
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAddButtonClick}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
