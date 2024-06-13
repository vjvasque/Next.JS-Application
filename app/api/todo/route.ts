import { NextResponse } from 'next/server';

// Sample todo data (you can replace this with a database)
let todos = [
  { id: 1, title: 'Todo 1', completed: false },
  { id: 2, title: 'Todo 2', completed: true },
];

// GET /api/todo
export async function GET(request: Request) {
  return NextResponse.json(todos);
}

// POST /api/todo
export async function POST(request: Request) {
  const todo = await request.json();
  const newTodo = {
    id: todos.length + 1,
    ...todo,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo);
}

// PUT /api/todo/:id
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const todoId = parseInt(params.id);
  const updatedTodo = await request.json();
  todos = todos.map((todo) => (todo.id === todoId ? { ...todo, ...updatedTodo } : todo));
  return NextResponse.json(todos.find((todo) => todo.id === todoId));
}

// DELETE /api/todo/:id
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const todoId = parseInt(params.id);
  todos = todos.filter((todo) => todo.id !== todoId);
  return NextResponse.json({ message: 'Todo deleted successfully' });
}