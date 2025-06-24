import SignOut from '@/components/SignOut'
import Link from 'next/link'
import React from 'react'
import { getData } from "@/actions/todoActions";
import Todos from "@/components/todos";
import { todoType } from "@/types/todoTypes";

const Dashboard = async () => {
    let data: todoType[] = [];
    try {
        data = await getData();
        if(data){
            console.log(data,"dashboard data");
        }else{
            console.log("dashboard data not fetched");
        }
    } catch (error) {
        console.error("Error fetching todos:", error);
        data = [];
    }
    // console.log("hello");
     
  return (
    <div className='flex justify-center items-center flex-col'>
        <div className='flex flex-col w-full'>
            <div className='flex items-center bg-gray-100 p-5 border-b border-black  justify-around w-full'>
                <h1 className='font-bold text-2xl'>TODO-APP</h1>
                <Link href={'/'}>
                    <SignOut />
                </Link>
            </div>
            <Todos todos={data || []} />
        </div>
    </div>
  )
}

export default Dashboard