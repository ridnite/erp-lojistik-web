'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { GrUserWorker } from "react-icons/gr";
import { FaTruck, FaProductHunt } from "react-icons/fa";

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const Manager = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.post(`${server}/api/manager/getAllTasks`, {}, {
                    withCredentials: true
                });
                console.log(response.data);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        const fetchEmployees = async () => {
            try {
                const response = await axios.post(`${server}/api/manager/getAllEmployer`, {}, {
                    withCredentials: true
                });
                console.log(response.data);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchTasks();
        fetchEmployees();
    }, []);

    return (
        <div className='w-full h-fit flex flex-col p-4 gap-4'>
            <p className='text-xl'>Aktif Görevler</p>
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    tasks.length > 0 ? tasks.map((task: any, index) => (
                        <div key={index} className='w-full h-fit p-4 bg-card border border-border rounded-lg flex flex-col gap-4'>
                            <div className='w-full h-fit flex items-center justify-center gap-2 p-4'>
                                <div className='w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center'><GrUserWorker className='text-white text-2xl' /></div>
                                <span className='text-lg font-semibold'>{task.assignedTo.fullname}</span>
                            </div>
                            <div className='w-full h-fit flex flex-col items-center gap-2 break-words'>
                                <div className='flex items-center gap-2 w-full'>
                                    <div className='w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center'><FaTruck className='text-white text-2xl' /></div>
                                    <span className='text-lg font-semibold'>Araç: {task.vehiclePlate}</span>
                                </div>
                                <div className='flex items-center gap-2 w-full'>
                                    <div className='w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center'><FaProductHunt className='text-white text-2xl' /></div>
                                    <span className='text-lg font-semibold'>Ürün: {task.productCode}</span>
                                </div>
                                <div className='flex items-center gap-2 w-full'>
                                    <div className='w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center'><FaTruck className='text-white text-2xl' /></div>
                                    <span className='text-lg font-semibold'>Adet: {task.quantity}</span>
                                </div>
                            </div>
                        </div>
                    )) : <p className='text-center text-lg'>Görev bulunamadı.</p>
                }
            </div>
            <p className='text-xl'>Aktif Çalışanlar</p>
            <div className='w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-4'>
                {
                    employees.length > 0 ? employees.map((emp: any, index) => (
                        <div key={index} className='w-full h-fit p-4 bg-card border border-border rounded-lg flex flex-col gap-4'>
                            <div className='w-full h-fit flex items-center justify-center gap-2 p-4'>
                                <div className='w-10 h-10 rounded-lg bg-chart-2 flex items-center justify-center'><GrUserWorker className='text-white text-2xl' /></div>
                                <span className='text-lg font-semibold'>{emp.fullname}</span>
                            </div>
                        </div>
                    )) : <p className='text-center text-lg'>Çalışan bulunamadı.</p>
                }
            </div>
        </div>
    )
}

export default Manager