"use server";

import { eq, not } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";

export const getData = async () => {
  try {
    const data = await db.select().from(todo);
    return data;
  } catch (err) {
    console.error("Error in getData:", err);
    throw err;
  }
};

export const addTodo = async (id: number, text: string) => {
  try {
    await db.insert(todo).values({ id, text });
    revalidatePath("/");
  } catch (err) {
    console.error("Error in addTodo:", err);
    throw err;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    await db.delete(todo).where(eq(todo.id, id));
    revalidatePath("/");
  } catch (err) {
    console.error("Error in deleteTodo:", err);
    throw err;
  }
};

export const toggleTodo = async (id: number) => {
  try {
    await db
      .update(todo)
      .set({
        done: not(todo.done),
      })
      .where(eq(todo.id, id));
    revalidatePath("/");
  } catch (err) {
    console.error("Error in toggleTodo:", err);
    throw err;
  }
};

export const editTodo = async (id: number, text: string) => {
  try {
    await db
      .update(todo)
      .set({
        text,
      })
      .where(eq(todo.id, id));
    revalidatePath("/");
  } catch (err) {
    console.error("Error in editTodo:", err);
    throw err;
  }
};
