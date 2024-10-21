import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Checkbox, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, useState } from "react";
import { useMessage } from "../../hooks/useMessage";
import { MAX_INPUT_CHAR_COUNT, MIN_INPUT_CHAR_COUNT } from "../../config/validation";

type Props = {
  index: number;
  todoItem: string;
  onClickDelete: (index: number, isCompleted: boolean) => void;
  onClickCheck: (isChecked: boolean) => void;
}

export const TodoItem: FC<Props> = memo((props) => {
  const {
    index,
    todoItem,
    onClickDelete,
    onClickCheck,
  } = props;
  const [todo, setTodo] = useState(todoItem);
  const [tempTodo, setTempTodo] = useState(todoItem);
  const [isEditing, setIsEditing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { showMessage } = useMessage();

  const onClickEdit = () => setIsEditing(true);
  const onChangeCheck = () => {
    setIsCompleted(!isCompleted);
    onClickCheck(!isCompleted);
  }
  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 10) {
      showMessage({ title: MAX_INPUT_CHAR_COUNT, status: "warning" });
      return;
    }

    setTempTodo(e.target.value);
  }

  const onClickUpdate = () => {
    if (tempTodo === '') {
      showMessage({ title: MIN_INPUT_CHAR_COUNT, status: "warning" });
      return;
    }
    
    setTodo(tempTodo);
    setIsEditing(false);
  }
  

  return (
  <Flex gap={2} align="center" justify="space-between">
    { isEditing ? (
      <>
      <Input
        autoFocus
        value={tempTodo}
        onChange={onChangeTodo}
      />

      <IconButton
        aria-label="Update Task"
        icon={<CheckIcon />}
        colorScheme="teal"
        variant="ghost"
        size="sm"
        onClick={onClickUpdate}
      />
      </>
    ) : (
      <>
        <Checkbox 
          size="md"
          colorScheme="teal"
          isChecked={isCompleted}
          onChange={onChangeCheck}
        />

        <Text 
          as={isCompleted ? 's' : 'span'}
          ml={4}
          flex={1}
        >
          { todo }
        </Text>

        <IconButton
          aria-label="Edit Task"
          icon={<EditIcon />}
          colorScheme="teal"
          variant="ghost"
          size="sm"
          onClick={onClickEdit}
        />

        <IconButton
          aria-label="Delete Task"
          icon={<DeleteIcon />}
          variant="ghost"
          size="sm"
          colorScheme="red"
          onClick={() => onClickDelete(index, isCompleted)}
        />
      </>
    )}
  </Flex>
  )
})