/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { LoadingIndicatorPage } from "@strapi/helper-plugin"
import todoRequests from "../../api/todo"
import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";

import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { Button } from "@strapi/design-system/Button";
import Plus from "@strapi/icons/Plus";
import { Illo } from "../../components/Illo";

import TodoModal from "../../components/TodoModal";
import TodoCount from "../../components/TodoCount";
import TodoTable from "../../components/TodoTable";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function addTodo(data) {
    setTodoData([...todoData, { ...data, id: nanoid(), isDone: false }]);
  }

  async function toggleTodo(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteTodo(data) {
    alert("Add Delete Todo in API");
  }

  async function editTodo(id, data) {
    alert("Add Edit Todo in API");
  }

  // ...
const [isLoading, setIsLoading] = useState(true);

const fetchData = async () => {
  if (isLoading === false) setIsLoading(true);

  const todo = await todoRequests.getAllTodos();
  setTodoData(todo);
  setIsLoading(false);
};

useEffect(async () => {
  await fetchData();
}, []);

async function addTodo(data) {
  await todoRequests.addTodo(data);
  await fetchData();
}

async function toggleTodo(data) {
  await todoRequests.toggleTodo(data.id);
}

async function deleteTodo(data) {
  await todoRequests.deleteTodo(data.id);
  await fetchData();
}

async function editTodo(id, data) {
  await todoRequests.editTodo(id, data);
  await fetchData();
}

if (isLoading) return <LoadingIndicatorPage />;
// ...

  return (
    <Layout>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All your todos in one place."
        as="h2"
      />

      <ContentLayout>
        {todoData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first todo
              </Button>
            }
          />
        ) : (
          <>
            <TodoCount count={todoData.length} />
            <TodoTable
              todoData={todoData}
              setShowModal={setShowModal}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </>
        )}
      </ContentLayout>
      {showModal && <TodoModal setShowModal={setShowModal} addTodo={addTodo} />}
    </Layout>
  );
};

export default memo(HomePage);
