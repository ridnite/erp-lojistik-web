'use client'
import React, { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaTruck, FaProductHunt } from "react-icons/fa";
import { BsBox2Fill } from "react-icons/bs";

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const page = () => {
    const [tasks, setTasks] = useState<Array<any>>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${server}/api/employer/getTasks`, {}, {
                    withCredentials: true
                });
                console.log(response.data);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                tasks.length > 0 ? tasks.map((task, index) => (
                    <div key={index} className='w-full h-fit p-4 bg-card border border-border rounded-lg flex flex-col gap-4'>
                        <div className='w-fit h-fit flex flex-wrap items-center gap-2 break-words'>
                            <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-xl'>
                                <FaTruck className='text-white' />
                            </div>
                            <span className='text-lg font-semibold'>{task.vehiclePlate}</span>
                            <span className='text-md text-gray-500'>Plakalı araç</span>
                        </div>
                        <div className='w-full h-fit flex flex-wrap items-center gap-2 break-words'>
                            <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-xl'>
                                <FaProductHunt className='text-white' />
                            </div>
                            <span className='text-lg font-semibold break-words'>{task.productCode}</span>
                            <span className='text-md text-gray-500'>Ürün Kodu</span>
                        </div>
                        <div className='w-full h-fit flex flex-wrap items-center gap-2 break-words'>
                            <div className='w-8 h-8 bg-chart-1 rounded-lg flex items-center justify-center text-xl'>
                                <BsBox2Fill className='text-white' />
                            </div>
                            <span className='text-lg font-semibold'>{task.quantity}</span>
                            <span className='text-md text-gray-500'>Adet</span>
                        </div>
                    </div>
                )) : <p className='text-center text-lg'>Görev bulunamadı.</p>
            }
            </div>
        </div>
    )
}

export default page