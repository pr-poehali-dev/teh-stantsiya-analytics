import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [kpdValue, setKpdValue] = useState(87.3);
  const [temperature, setTemperature] = useState(425);
  const [pressure, setPressure] = useState(18.5);
  const [fuelConsumption, setFuelConsumption] = useState(145.8);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time data updates
      setKpdValue(prev => prev + (Math.random() - 0.5) * 0.2);
      setTemperature(prev => prev + (Math.random() - 0.5) * 2);
      setPressure(prev => prev + (Math.random() - 0.5) * 0.1);
      setFuelConsumption(prev => prev + (Math.random() - 0.5) * 1);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return 'bg-green-500';
    if (value > max * 1.1 || value < min * 0.9) return 'bg-red-500';
    return 'bg-yellow-500';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const navItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'Monitor' },
    { id: 'kpd', label: 'КПД', icon: 'Gauge' },
    { id: 'fuel', label: 'Топливо', icon: 'Fuel' },
    { id: 'heat', label: 'Тепло', icon: 'Thermometer' },
    { id: 'water', label: 'Вода', icon: 'Droplets' },
    { id: 'analytics', label: 'Аналитика', icon: 'BarChart' },
    { id: 'alerts', label: 'Аварии', icon: 'AlertTriangle' },
    { id: 'shift', label: 'Смена', icon: 'Clock' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Factory" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-primary">ТЭЦ-12</h1>
                <p className="text-sm text-muted-foreground">Автоматизированное рабочее место</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Смена начальника</p>
              <p className="font-mono text-lg">{formatTime(currentTime)}</p>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500">
              <Icon name="Circle" size={8} className="mr-2 fill-current" />
              Система активна
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 border-r border-border bg-card h-[calc(100vh-80px)]">
          <div className="p-4">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-1 h-auto p-1 bg-muted/20">
                {navItems.map((item) => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="justify-start p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon name={item.icon as any} size={16} className="mr-2" />
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Dashboard Content */}
              <TabsContent value="dashboard" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {/* KPD Card */}
                  <Card className="bg-card/50 border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Gauge" size={16} className="mr-2 text-primary" />
                          КПД
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(kpdValue, 85, 90)}`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono font-bold text-primary mb-2">
                        {kpdValue.toFixed(1)}%
                      </div>
                      <Progress value={kpdValue} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Норма: 85-90%
                      </p>
                    </CardContent>
                  </Card>

                  {/* Temperature Card */}
                  <Card className="bg-card/50 border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Thermometer" size={16} className="mr-2 text-accent" />
                          Температура
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(temperature, 420, 450)}`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono font-bold text-accent mb-2">
                        {temperature.toFixed(0)}°C
                      </div>
                      <Progress value={(temperature / 500) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Рабочий диапазон: 420-450°C
                      </p>
                    </CardContent>
                  </Card>

                  {/* Pressure Card */}
                  <Card className="bg-card/50 border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Gauge" size={16} className="mr-2 text-blue-400" />
                          Давление
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(pressure, 18, 20)}`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono font-bold text-blue-400 mb-2">
                        {pressure.toFixed(1)} МПа
                      </div>
                      <Progress value={(pressure / 25) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Норма: 18-20 МПа
                      </p>
                    </CardContent>
                  </Card>

                  {/* Fuel Consumption Card */}
                  <Card className="bg-card/50 border-border">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-sm">
                        <span className="flex items-center">
                          <Icon name="Fuel" size={16} className="mr-2 text-orange-400" />
                          Расход топлива
                        </span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(fuelConsumption, 140, 160)}`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-mono font-bold text-orange-400 mb-2">
                        {fuelConsumption.toFixed(1)} т/ч
                      </div>
                      <Progress value={(fuelConsumption / 200) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Плановый: 140-160 т/ч
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Other tabs content - placeholder */}
              {navItems.slice(1).map((item) => (
                <TabsContent key={item.id} value={item.id} className="mt-6">
                  <Card className="bg-card/50 border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon name={item.icon as any} size={20} className="mr-2 text-primary" />
                        {item.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Раздел "{item.label}" в разработке. Здесь будут отображаться 
                        детальные показатели и управление системами.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* System Status Overview */}
            <Card className="col-span-full bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Activity" size={20} className="mr-2 text-primary" />
                  Общее состояние системы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <p className="text-xs text-muted-foreground">Системы в норме</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">3</div>
                    <p className="text-xs text-muted-foreground">Предупреждения</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">0</div>
                    <p className="text-xs text-muted-foreground">Критические</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">98.7%</div>
                    <p className="text-xs text-muted-foreground">Общий КПД</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Bell" size={16} className="mr-2 text-yellow-400" />
                  Последние события
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2" />
                  <div>
                    <p className="text-sm">Превышение температуры в котле №2</p>
                    <p className="text-xs text-muted-foreground">15:42</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
                  <div>
                    <p className="text-sm">Система охлаждения восстановлена</p>
                    <p className="text-xs text-muted-foreground">14:18</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <div>
                    <p className="text-sm">Запуск генератора №3</p>
                    <p className="text-xs text-muted-foreground">13:55</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart Placeholder */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="TrendingUp" size={16} className="mr-2 text-primary" />
                  График производительности
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted/10 rounded relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
                    {[85, 87, 88, 89, 87, 86, 88, 89, 90, 91, 89, 87].map((value, index) => (
                      <div
                        key={index}
                        className="bg-primary/70 w-2 rounded-t transition-all duration-300"
                        style={{ height: `${(value / 100) * 100}%` }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 left-2 text-xs text-primary font-mono">
                    КПД: {kpdValue.toFixed(1)}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shift Information */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon name="Users" size={16} className="mr-2 text-primary" />
                  Информация о смене
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Начальник смены:</span>
                  <span className="text-sm font-medium">Иванов А.П.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Смена:</span>
                  <span className="text-sm font-medium">Дневная (08:00-20:00)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Персонал:</span>
                  <span className="text-sm font-medium">15 человек</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Статус:</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500">
                    Активная
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;