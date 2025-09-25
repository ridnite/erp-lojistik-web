'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaTruck, FaProductHunt, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { BsBox2Fill, BsFilter } from "react-icons/bs";
import { Button } from '@/components/ui/button';

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const page = () => {
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [filteredTasks, setFilteredTasks] = useState<Array<any>>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'urgent'>('all');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post(`${server}/api/employer/getTasks`, {}, {
                    withCredentials: true
                });
                console.log(response.data);
                setTasks(response.data);
                setFilteredTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = tasks;
        switch(filter) {
            case 'pending':
                filtered = tasks.filter(task => task.status === 'pending' || !task.status);
                break;
            case 'completed':
                filtered = tasks.filter(task => task.status === 'completed');
                break;
            case 'urgent':
                filtered = tasks.filter(task => task.priority === 'urgent' || task.urgent);
                break;
            default:
                filtered = tasks;
        }
        setFilteredTasks(filtered);
    }, [filter, tasks]);

    const getTaskStatus = (task: any) => {
        if (task.status === 'completed') return { text: 'Tamamlandı', color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle };
        if (task.urgent || task.priority === 'urgent') return { text: 'Acil', color: 'text-red-600', bg: 'bg-red-100', icon: FaExclamationTriangle };
        return { text: 'Bekliyor', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaClock };
    };

    const handleTaskComplete = async (taskId: string) => {
        try {
            await axios.post(`${server}/api/employer/completeTask`, { taskId }, {
                withCredentials: true
            });
            setTasks(prev => prev.map(task => 
                task.id === taskId ? { ...task, status: 'completed' } : task
            ));
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };

    if (loading) {
        return (
            <div className='w-full flex items-center justify-center min-h-[400px]'>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-gradient-to-r from-chart-1 to-chart-2 animate-spin rounded-full flex items-center justify-center'>
                        <div className='w-6 h-6 bg-background rounded-full'></div>
                    </div>
                    <span className='text-lg text-muted-foreground'>Görevler yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full flex flex-col gap-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
                <div>
                    <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>Görevlerim</h1>
                    <p className='text-muted-foreground'>Size atanan tüm görevleri burada görüntüleyebilirsiniz</p>
                </div>
                
                <div className='flex items-center gap-2'>
                    <BsFilter className='text-muted-foreground' />
                    <div className='flex items-center gap-1 bg-muted rounded-lg p-1'>
                        <Button
                            variant={filter === 'all' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setFilter('all')}
                            className='h-8'
                        >
                            Tümü ({tasks.length})
                        </Button>
                        <Button
                            variant={filter === 'pending' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setFilter('pending')}
                            className='h-8'
                        >
                            Bekleyen ({tasks.filter(t => t.status !== 'completed').length})
                        </Button>
                        <Button
                            variant={filter === 'completed' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setFilter('completed')}
                            className='h-8'
                        >
                            Tamamlanan ({tasks.filter(t => t.status === 'completed').length})
                        </Button>
                        <Button
                            variant={filter === 'urgent' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setFilter('urgent')}
                            className='h-8'
                        >
                            Acil ({tasks.filter(t => t.urgent || t.priority === 'urgent').length})
                        </Button>
                    </div>
                </div>
            </div>

            {filteredTasks.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredTasks.map((task, index) => {
                        const status = getTaskStatus(task);
                        const StatusIcon = status.icon;
                        
                        return (
                            <div key={task.id || index} className='bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200 group'>
                                <div className='flex items-start justify-between mb-4'>
                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}>
                                        <StatusIcon className={`w-3 h-3 ${status.color}`} />
                                        <span className={`text-xs font-medium ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </div>
                                    <div className='text-xs text-muted-foreground'>
                                        #{(task.id || index + 1).toString().padStart(3, '0')}
                                    </div>
                                </div>

                                <div className='space-y-4'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-gradient-to-br from-chart-1 to-chart-2 rounded-lg flex items-center justify-center'>
                                            <FaTruck className='text-white text-lg' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-semibold text-foreground break-words'>{task.vehiclePlate}</p>
                                            <p className='text-sm text-muted-foreground'>Araç Plakası</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-gradient-to-br from-chart-2 to-chart-3 rounded-lg flex items-center justify-center'>
                                            <FaProductHunt className='text-white text-lg' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-semibold text-foreground break-words'>{task.productCode}</p>
                                            <p className='text-sm text-muted-foreground'>Ürün Kodu</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-gradient-to-br from-chart-3 to-chart-4 rounded-lg flex items-center justify-center'>
                                            <BsBox2Fill className='text-white text-lg' />
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <p className='font-semibold text-foreground'>{task.quantity} Adet</p>
                                            <p className='text-sm text-muted-foreground'>Teslimat Adedi</p>
                                        </div>
                                    </div>

                                    {task.deliveryAddress && (
                                        <div className='p-3 bg-muted/30 rounded-lg'>
                                            <p className='text-sm text-muted-foreground mb-1'>Teslimat Adresi:</p>
                                            <p className='text-sm font-medium break-words'>{task.deliveryAddress}</p>
                                        </div>
                                    )}

                                    {task.notes && (
                                        <div className='p-3 bg-muted/30 rounded-lg'>
                                            <p className='text-sm text-muted-foreground mb-1'>Notlar:</p>
                                            <p className='text-sm break-words'>{task.notes}</p>
                                        </div>
                                    )}
                                </div>

                                {task.status !== 'completed' && (
                                    <div className='mt-6 pt-4 border-t border-border'>
                                        <Button
                                            onClick={() => handleTaskComplete(task.id)}
                                            className='w-full bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90 text-white font-medium transition-all duration-200'
                                            size="sm"
                                        >
                                            <FaCheckCircle className='w-4 h-4 mr-2' />
                                            Görevi Tamamla
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
                    <div className='w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
                        <FaTruck className='w-12 h-12 text-muted-foreground/50' />
                    </div>
                    <h3 className='text-xl font-semibold text-foreground mb-2'>
                        {filter === 'all' ? 'Henüz görev yok' : `${filter === 'pending' ? 'Bekleyen' : filter === 'completed' ? 'Tamamlanan' : 'Acil'} görev bulunamadı`}
                    </h3>
                    <p className='text-muted-foreground max-w-md'>
                        {filter === 'all' 
                            ? 'Size henüz bir görev atanmamış. Yeni görevler için bekleyin.'
                            : 'Bu kategoride görev bulunmuyor. Diğer kategorileri kontrol edebilirsiniz.'
                        }
                    </p>
                    {filter !== 'all' && (
                        <Button
                            onClick={() => setFilter('all')}
                            variant="outline"
                            className='mt-4'
                        >
                            Tüm Görevleri Görüntüle
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default page