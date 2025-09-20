import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [kpdValue, setKpdValue] = useState(89.2);
  const [fuelEcon, setFuelEcon] = useState(91.5);
  const [fuelUse, setFuelUse] = useState(87.3);
  const [heatUse, setHeatUse] = useState(93.1);
  const [secondaryFuel, setSecondaryFuel] = useState(15.8);
  const [waterUse, setWaterUse] = useState(2.4);
  const [kit, setKit] = useState(88.7);
  const [specificGeneration, setSpecificGeneration] = useState(156.2);

  // Симуляция реального времени и изменения данных
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Небольшие флуктуации показателей
      setKpdValue(prev => Math.max(85, Math.min(95, prev + (Math.random() - 0.5) * 0.2)));
      setFuelEcon(prev => Math.max(88, Math.min(95, prev + (Math.random() - 0.5) * 0.3)));
      setFuelUse(prev => Math.max(82, Math.min(92, prev + (Math.random() - 0.5) * 0.25)));
      setHeatUse(prev => Math.max(90, Math.min(98, prev + (Math.random() - 0.5) * 0.2)));
      setSecondaryFuel(prev => Math.max(10, Math.min(25, prev + (Math.random() - 0.5) * 0.4)));
      setWaterUse(prev => Math.max(2.0, Math.min(3.0, prev + (Math.random() - 0.5) * 0.05)));
      setKit(prev => Math.max(84, Math.min(94, prev + (Math.random() - 0.5) * 0.3)));
      setSpecificGeneration(prev => Math.max(140, Math.min(170, prev + (Math.random() - 0.5) * 1.0)));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, min: number, optimal: number) => {
    if (value >= optimal) return 'text-green-400';
    if (value >= min) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (value: number, min: number, optimal: number) => {
    if (value >= optimal) return 'CheckCircle';
    if (value >= min) return 'AlertTriangle';
    return 'AlertCircle';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-mono">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">АРМ НАЧАЛЬНИКА СМЕНЫ</h1>
                <p className="text-slate-400 text-sm">ТЭЦ-12 • Автоматизированное рабочее место</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{formatTime(currentTime)}</div>
              <div className="text-sm text-slate-400">{currentTime.toLocaleDateString('ru-RU')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Основные показатели эффективности */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* КПД */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(kpdValue, 85, 90)} size={16} className={`mr-2 ${getStatusColor(kpdValue, 85, 90)}`} />
                КПД станции
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(kpdValue, 85, 90)}`}>
                {kpdValue.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Норма: ≥90%</p>
            </CardContent>
          </Card>

          {/* Топливоэкономия */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(fuelEcon, 88, 92)} size={16} className={`mr-2 ${getStatusColor(fuelEcon, 88, 92)}`} />
                Топливоэкономия
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(fuelEcon, 88, 92)}`}>
                {fuelEcon.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Норма: ≥92%</p>
            </CardContent>
          </Card>

          {/* Коэффициент использования топлива */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(fuelUse, 82, 88)} size={16} className={`mr-2 ${getStatusColor(fuelUse, 82, 88)}`} />
                Использование топлива
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(fuelUse, 82, 88)}`}>
                {fuelUse.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Норма: ≥88%</p>
            </CardContent>
          </Card>

          {/* Коэффициент использования тепла */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(heatUse, 90, 95)} size={16} className={`mr-2 ${getStatusColor(heatUse, 90, 95)}`} />
                Использование тепла
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(heatUse, 90, 95)}`}>
                {heatUse.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Норма: ≥95%</p>
            </CardContent>
          </Card>
        </div>

        {/* Дополнительные коэффициенты */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Вторичное топливо */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(secondaryFuel, 12, 18)} size={16} className={`mr-2 ${getStatusColor(secondaryFuel, 12, 18)}`} />
                Вторичное топливо
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(secondaryFuel, 12, 18)}`}>
                {secondaryFuel.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Целевое: 15-20%</p>
            </CardContent>
          </Card>

          {/* Использование воды */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(3.5 - waterUse, 0.5, 1.0)} size={16} className={`mr-2 ${waterUse <= 2.5 ? 'text-green-400' : waterUse <= 2.8 ? 'text-yellow-400' : 'text-red-400'}`} />
                Использование воды
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${waterUse <= 2.5 ? 'text-green-400' : waterUse <= 2.8 ? 'text-yellow-400' : 'text-red-400'}`}>
                {waterUse.toFixed(2)}
              </div>
              <p className="text-xs text-slate-400 mt-1">м³/МВт·ч (≤2.5)</p>
            </CardContent>
          </Card>

          {/* КИТ */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(kit, 84, 90)} size={16} className={`mr-2 ${getStatusColor(kit, 84, 90)}`} />
                КИТ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(kit, 84, 90)}`}>
                {kit.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Норма: ≥90%</p>
            </CardContent>
          </Card>

          {/* Удельная выработка */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center">
                <Icon name={getStatusIcon(specificGeneration, 140, 160)} size={16} className={`mr-2 ${getStatusColor(specificGeneration, 140, 160)}`} />
                Удельная выработка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor(specificGeneration, 140, 160)}`}>
                {specificGeneration.toFixed(1)}
              </div>
              <p className="text-xs text-slate-400 mt-1">кВт·ч/ГДж (≥160)</p>
            </CardContent>
          </Card>
        </div>

        {/* Графики и детальная информация */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* График КПД за смену */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="TrendingUp" size={16} className="mr-2 text-orange-400" />
                Динамика КПД за смену
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-slate-900/50 rounded relative overflow-hidden">
                <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
                  {[87.2, 88.1, 89.3, 89.8, 88.9, 89.5, 90.1, 89.7, 89.2, 88.8, 89.4, 89.2].map((value, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-orange-500 to-orange-300 w-3 rounded-t transition-all duration-500"
                      style={{ height: `${((value - 85) / 10) * 100}%` }}
                    />
                  ))}
                </div>
                <div className="absolute top-2 left-2 text-xs text-orange-400 font-semibold">
                  Текущий: {kpdValue.toFixed(1)}%
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-slate-400">
                  08:00 - 20:00
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Системные предупреждения */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="AlertTriangle" size={16} className="mr-2 text-yellow-400" />
                Системные уведомления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-2 bg-yellow-400/10 rounded border-l-2 border-yellow-400">
                  <Icon name="AlertTriangle" size={14} className="text-yellow-400 mr-2" />
                  <div className="text-xs">
                    <div className="font-semibold">Превышение расхода воды</div>
                    <div className="text-slate-400">Блок №2 • {formatTime(currentTime)}</div>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-green-400/10 rounded border-l-2 border-green-400">
                  <Icon name="CheckCircle" size={14} className="text-green-400 mr-2" />
                  <div className="text-xs">
                    <div className="font-semibold">КПД в норме</div>
                    <div className="text-slate-400">Все блоки • {formatTime(currentTime)}</div>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-blue-400/10 rounded border-l-2 border-blue-400">
                  <Icon name="Info" size={14} className="text-blue-400 mr-2" />
                  <div className="text-xs">
                    <div className="font-semibold">Плановый ремонт</div>
                    <div className="text-slate-400">Блок №1 • 22:00-06:00</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Быстрые действия */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Icon name="Settings" size={16} className="mr-2 text-slate-400" />
              Управление станцией
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {[
                { icon: 'Activity', label: 'Блоки', color: 'bg-blue-600' },
                { icon: 'Thermometer', label: 'Теплосеть', color: 'bg-red-600' },
                { icon: 'Fuel', label: 'Топливо', color: 'bg-orange-600' },
                { icon: 'Droplets', label: 'Водоподготовка', color: 'bg-cyan-600' },
                { icon: 'Gauge', label: 'Турбины', color: 'bg-green-600' },
                { icon: 'Zap', label: 'Электросеть', color: 'bg-yellow-600' },
                { icon: 'Shield', label: 'Безопасность', color: 'bg-purple-600' },
                { icon: 'BarChart3', label: 'Отчёты', color: 'bg-slate-600' }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`${item.color} border-0 text-white hover:scale-105 transition-transform flex flex-col items-center p-4 h-16`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="text-xs mt-1">{item.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;