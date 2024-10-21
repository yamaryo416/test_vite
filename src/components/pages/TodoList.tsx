import { Box, Button, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { TodoItem } from "../molucules/TodoItem";
import { useMessage } from "../../hooks/useMessage";
import { v4 as uuid } from "uuid";

import { MAX_INPUT_CHAR_COUNT, MIN_INPUT_CHAR_COUNT } from "../../config/validation";

export const TodoList:FC = () => {
  type todoType = {
    id: string;
    item: string;
  }
  const [todos, setTodos] = useState<todoType[]>([]);
  const [inputedTodo, setInputedTodo] = useState('');
  const { showMessage } = useMessage();
  const [completedTodoCount, setCompletedTodoCount] = useState(0);
  const [inCompleteTodoCount, setInCompleteTodoCount] = useState(0);

  const onClickAddTodo = () => {
    if (inputedTodo === '') {
      showMessage({ title: MIN_INPUT_CHAR_COUNT , status: "warning" });
      return;
    }

    setInCompleteTodoCount((prev) => prev + 1);
    setTodos((prevTodos) => [...prevTodos, { id: uuid(), item: inputedTodo } ])
    setInputedTodo('');
  }

  const onClickDelete = (id: number, isCompleted: boolean) => {
    const isDeleteConfirmed = confirm("本当によろしいですか？");
    if (!isDeleteConfirmed) {
      return;
    }

    const newTodos = [...todos];
    newTodos.splice(id, 1);
    if (isCompleted) {
      setCompletedTodoCount((prev) => prev - 1);
    } else {
      setInCompleteTodoCount((prev) => prev - 1);
    }

    setTodos(newTodos);

  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      showMessage({ title: MAX_INPUT_CHAR_COUNT, status: "warning" });
      return;
    }

    setInputedTodo(e.target.value);
  }

  const onClickCheck = (isChecked: boolean) => {
    if (isChecked) {
      setCompletedTodoCount((prev) => prev + 1);
      setInCompleteTodoCount((prev) => prev - 1);
    } else {
      setCompletedTodoCount((prev) => prev - 1);
      setInCompleteTodoCount((prev) => prev + 1);
    }
  }

  return (
  <Flex align="center" justify="center" height="100vh">
    <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
      <Heading as="h2" size="lg" textAlign="center" color={"gray.600"}>
        TodoList
      </Heading>
      <Divider my={4} />
      <Stack spacing={6} py={4} px={10}>
        <Flex gap={2}>
          <Input
            onChange={onChangeInput}
            value={inputedTodo}
            placeholder="タスク"
          />
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={onClickAddTodo}
          >
            追加
          </Button>
        </Flex>
      </Stack>
      <Stack spacing={2} py={4} px={10} >
        { todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index}
            todoItem={todo.item}
            onClickDelete={onClickDelete}
            onClickCheck={onClickCheck}
          />
        ))}
      </Stack>
      <Text fontSize="sm">{`total:${todos.length} completed:${completedTodoCount} incomplete:${inCompleteTodoCount}`}</Text>
    </Box>
  </Flex>
  )
}