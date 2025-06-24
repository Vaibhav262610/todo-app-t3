"use server";

import { eq, not, and, max } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getData = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    
    const data = await db.select().from(todo).where(eq(todo.userId, session.user.id));
    return data;
  } catch (err) {
    console.error("Error in getData:", err);
    throw err;
  }
};

export const addTodo = async (text: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    
    // Get the maximum ID to generate a new unique ID
    const maxIdResult = await db.select({ maxId: max(todo.id) }).from(todo);
    const newId = (maxIdResult[0]?.maxId || 0) + 1;
    
    await db.insert(todo).values({ id: newId, text, userId: session.user.id });
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("Error in addTodo:", err);
    throw err;
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    
    await db.delete(todo).where(and(eq(todo.id, id), eq(todo.userId, session.user.id)));
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("Error in deleteTodo:", err);
    throw err;
  }
};

export const toggleTodo = async (id: number) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    
    await db
      .update(todo)
      .set({
        done: not(todo.done),
      })
      .where(and(eq(todo.id, id), eq(todo.userId, session.user.id)));
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("Error in toggleTodo:", err);
    throw err;
  }
};

export const editTodo = async (id: number, text: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    
    await db
      .update(todo)
      .set({
        text,
      })
      .where(and(eq(todo.id, id), eq(todo.userId, session.user.id)));
    revalidatePath("/dashboard");
  } catch (err) {
    console.error("Error in editTodo:", err);
    throw err;
  }
};
