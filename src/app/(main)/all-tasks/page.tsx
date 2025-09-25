'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTruck, FaProductHunt, FaClock, FaCheckCircle, FaExclamationTriangle, FaSearch, FaSort, FaUser, FaCalendarAlt } from "react-icons/fa"
import { BsBox2Fill, BsFilter, BsThreeDotsVertical } from "react-icons/bs"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const server = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

const page = () => {
  const [allTasks, setAllTasks] = useState<Array<any>>([]);
  const [filteredTasks, setFilteredTasks] = useState<Array<any>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'urgent' | 'assigned'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status' | 'employee'>('date');
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/api/manager/getAllTasks`, {
          withCredentials: true
        });
        setAllTasks(response.data);
        setFilteredTasks(response.data);
      } catch (error) {
        console.error("Error fetching all tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    const getUserRole = () => {
      const allCookies = document.cookie.split("; ");
      const userInfoCookie = allCookies.find((row) => row.startsWith("userInfo="));
      if (userInfoCookie) {
        try {
          const raw = userInfoCookie.split("=")[1];
          const parsed = JSON.parse(decodeURIComponent(raw));
          setUserRole(parsed.role);
        } catch (e) {
          console.error("Cookie parse error:", e);
        }
      }
    };

    getUserRole();
    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = allTasks;

    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.vehiclePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.employeeName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch(filter) {
      case 'pending':
        filtered = filtered.filter(task => task.status === 'pending' || !task.status);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.status === 'completed');
        break;
      case 'urgent':
        filtered = filtered.filter(task => task.priority === 'urgent' || task.urgent);
        break;
      case 'assigned':
        filtered = filtered.filter(task => task.employeeId);
        break;
    }

    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'priority':
          const aPriority = a.urgent || a.priority === 'urgent' ? 3 : a.status === 'pending' ? 2 : 1;
          const bPriority = b.urgent || b.priority === 'urgent' ? 3 : b.status === 'pending' ? 2 : 1;
          return bPriority - aPriority;
        case 'status':
          return (a.status || 'pending').localeCompare(b.status || 'pending');
        case 'employee':
          return (a.employeeName || '').localeCompare(b.employeeName || '');
        case 'date':
        default:
          return new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime();
      }
    });

    setFilteredTasks(filtered);
  }, [allTasks, searchTerm, filter, sortBy]);

  const getTaskStatus = (task: any) => {
    if (task.status === 'completed') return { text: 'Tamamlandı', color: 'text-green-600', bg: 'bg-green-100', icon: FaCheckCircle };
    if (task.urgent || task.priority === 'urgent') return { text: 'Acil', color: 'text-red-600', bg: 'bg-red-100', icon: FaExclamationTriangle };
    if (task.status === 'in-progress') return { text: 'Devam Ediyor', color: 'text-blue-600', bg: 'bg-blue-100', icon: FaClock };
    return { text: 'Bekliyor', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: FaClock };
  };

  const assignTask = async (taskId: string, employeeId: string) => {
    try {
      await axios.post(`${server}/api/manager/assignTask`, { taskId, employeeId }, {
        withCredentials: true
      });
      
      setAllTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, employeeId, status: 'assigned' } : task
      ));
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center min-h-[400px]'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 bg-gradient-to-r from-chart-1 to-chart-2 animate-spin rounded-full flex items-center justify-center'>
            <div className='w-6 h-6 bg-background rounded-full'></div>
          </div>
          <span className='text-lg text-muted-foreground'>Tüm görevler yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col gap-6'>
      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-foreground'>Tüm Görevler</h1>
          <p className='text-muted-foreground'>Sistemdeki tüm görevleri görüntüleyin ve yönetin</p>
        </div>
        
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto'>
          <div className='relative'>
            <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
            <Input
              placeholder="Görev, plaka veya çalışan ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10 w-full sm:w-64'
            />
          </div>
          
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1 bg-muted rounded-lg p-1'>
              <Button
                variant={sortBy === 'date' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('date')}
                className='h-8 text-xs'
              >
                <FaCalendarAlt className='w-3 h-3 mr-1' />
                Tarih
              </Button>
              <Button
                variant={sortBy === 'priority' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('priority')}
                className='h-8 text-xs'
              >
                <FaSort className='w-3 h-3 mr-1' />
                Öncelik
              </Button>
              <Button
                variant={sortBy === 'employee' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSortBy('employee')}
                className='h-8 text-xs'
              >
                <FaUser className='w-3 h-3 mr-1' />
                Çalışan
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-2 overflow-x-auto pb-2'>
        <BsFilter className='text-muted-foreground flex-shrink-0' />
        <div className='flex items-center gap-1 bg-muted rounded-lg p-1'>
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
            className='h-8 whitespace-nowrap'
          >
            Tümü ({allTasks.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('pending')}
            className='h-8 whitespace-nowrap'
          >
            Bekleyen ({allTasks.filter(t => t.status === 'pending' || !t.status).length})
          </Button>
          <Button
            variant={filter === 'urgent' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('urgent')}
            className='h-8 whitespace-nowrap'
          >
            Acil ({allTasks.filter(t => t.urgent || t.priority === 'urgent').length})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('completed')}
            className='h-8 whitespace-nowrap'
          >
            Tamamlanan ({allTasks.filter(t => t.status === 'completed').length})
          </Button>
          <Button
            variant={filter === 'assigned' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter('assigned')}
            className='h-8 whitespace-nowrap'
          >
            Atanmış ({allTasks.filter(t => t.employeeId).length})
          </Button>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className='space-y-4'>
          <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
            {filteredTasks.map((task, index) => {
              const status = getTaskStatus(task);
              const StatusIcon = status.icon;
              
              return (
                <div key={task.id || index} className='bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}>
                        <StatusIcon className={`w-3 h-3 ${status.color}`} />
                        <span className={`text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                      {(task.urgent || task.priority === 'urgent') && (
                        <div className='bg-red-100 text-red-600 px-2 py-1 rounded-full'>
                          <FaExclamationTriangle className='w-3 h-3' />
                        </div>
                      )}
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-xs text-muted-foreground'>
                        #{(task.id || index + 1).toString().padStart(4, '0')}
                      </span>
                      {userRole === 'manager' && (
                        <button className='p-1 hover:bg-muted rounded'>
                          <BsThreeDotsVertical className='w-4 h-4 text-muted-foreground' />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-chart-1 to-chart-2 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <FaTruck className='text-white text-lg' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='font-semibold text-foreground break-words'>{task.vehiclePlate}</p>
                        <p className='text-sm text-muted-foreground'>Araç Plakası</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-chart-2 to-chart-3 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <FaProductHunt className='text-white text-lg' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='font-semibold text-foreground break-words'>{task.productCode}</p>
                        <p className='text-sm text-muted-foreground'>Ürün Kodu</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-chart-3 to-chart-4 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <BsBox2Fill className='text-white text-lg' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='font-semibold text-foreground'>{task.quantity} Adet</p>
                        <p className='text-sm text-muted-foreground'>Miktar</p>
                      </div>
                    </div>

                    <div className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-gradient-to-br from-chart-4 to-chart-1 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <FaUser className='text-white text-lg' />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='font-semibold text-foreground break-words'>
                          {task.employeeName || 'Atanmamış'}
                        </p>
                        <p className='text-sm text-muted-foreground'>Sorumlu Çalışan</p>
                      </div>
                    </div>
                  </div>

                  {task.deliveryAddress && (
                    <div className='mb-4 p-3 bg-muted/30 rounded-lg'>
                      <p className='text-sm text-muted-foreground mb-1'>Teslimat Adresi:</p>
                      <p className='text-sm font-medium break-words'>{task.deliveryAddress}</p>
                    </div>
                  )}

                  {task.notes && (
                    <div className='mb-4 p-3 bg-muted/30 rounded-lg'>
                      <p className='text-sm text-muted-foreground mb-1'>Notlar:</p>
                      <p className='text-sm break-words'>{task.notes}</p>
                    </div>
                  )}

                  <div className='flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3'>
                    <span>
                      Oluşturulma: {isClient && task.createdAt ? new Date(task.createdAt).toLocaleDateString('tr-TR') : 'Bilinmiyor'}
                    </span>
                    {isClient && task.updatedAt && (
                      <span>
                        Güncelleme: {new Date(task.updatedAt).toLocaleDateString('tr-TR')}
                      </span>
                    )}
                  </div>

                  {userRole === 'manager' && task.status !== 'completed' && (
                    <div className='mt-4 pt-4 border-t border-border flex gap-2'>
                      <Button size="sm" variant="outline" className='flex-1'>
                        Düzenle
                      </Button>
                      <Button size="sm" className='flex-1 bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-1/90 hover:to-chart-2/90 text-white'>
                        Çalışan Ata
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
          <div className='w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mb-4'>
            <FaTruck className='w-12 h-12 text-muted-foreground/50' />
          </div>
          <h3 className='text-xl font-semibold text-foreground mb-2'>
            {searchTerm ? 'Arama sonucu bulunamadı' : 'Görev bulunamadı'}
          </h3>
          <p className='text-muted-foreground max-w-md'>
            {searchTerm 
              ? `"${searchTerm}" aramasına uygun görev bulunmuyor. Farklı anahtar kelimeler deneyin.`
              : filter === 'all' 
                ? 'Henüz sistemde görev bulunmuyor.'
                : 'Bu kategoride görev bulunmuyor. Diğer filtreleri kontrol edebilirsiniz.'
            }
          </p>
          {(searchTerm || filter !== 'all') && (
            <div className='flex gap-2 mt-4'>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                  size="sm"
                >
                  Aramayı Temizle
                </Button>
              )}
              {filter !== 'all' && (
                <Button
                  onClick={() => setFilter('all')}
                  variant="outline"
                  size="sm"
                >
                  Tüm Görevleri Göster
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <div className='mt-6 p-4 bg-muted/30 rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
          <div>
            <p className='text-2xl font-bold text-chart-1'>{allTasks.length}</p>
            <p className='text-sm text-muted-foreground'>Toplam Görev</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-chart-2'>{allTasks.filter(t => t.status === 'pending' || !t.status).length}</p>
            <p className='text-sm text-muted-foreground'>Bekleyen</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-chart-3'>{allTasks.filter(t => t.status === 'completed').length}</p>
            <p className='text-sm text-muted-foreground'>Tamamlanan</p>
          </div>
          <div>
            <p className='text-2xl font-bold text-chart-4'>{allTasks.filter(t => t.urgent || t.priority === 'urgent').length}</p>
            <p className='text-sm text-muted-foreground'>Acil</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page