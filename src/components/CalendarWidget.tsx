'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

interface CalendarEvent {
  text: string;
  type: 'primary' | 'warning';
  branch: 'vitacura' | 'tribunales' | 'all';
}

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 1)); // Initialize in June 2026
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'vitacura' | 'tribunales'>('all');

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // Get first day of the month offset
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Align to Monday as 0

  const totalDays = getDaysInMonth(year, month);

  // Calendario 2026: Feriados Típicos de Chile y Cumpleaños del Personal
  // type: 'warning' para Feriados (Naranja), 'primary' para Cumpleaños (Turquesa)
  const eventsData: Record<number, Record<number, CalendarEvent[]>> = {
    0: { // Enero 2026
      1: [{ text: "Feriado: Año Nuevo", type: "warning", branch: "all" }],
      8: [{ text: "🎂 Cumpleaños: Catalina Rojas", type: "primary", branch: "tribunales" }],
      19: [{ text: "🎂 Cumpleaños: Antonia Pardo", type: "primary", branch: "tribunales" }],
      28: [{ text: "🎂 Cumpleaños: Natalia S.", type: "primary", branch: "vitacura" }]
    },
    1: { // Febrero 2026
      10: [{ text: "🎂 Cumpleaños: Macarena Fuenzalida", type: "primary", branch: "tribunales" }],
      20: [{ text: "🎂 Cumpleaños: Marisol S.", type: "primary", branch: "vitacura" }]
    },
    2: { // Marzo 2026
      6: [{ text: "🎂 Cumpleaños: Mjose Arteaga", type: "primary", branch: "tribunales" }],
      7: [{ text: "🎂 Cumpleaños: Martina T.", type: "primary", branch: "vitacura" }],
      23: [{ text: "🎂 Cumpleaños: Antonio Alvear", type: "primary", branch: "all" }],
      26: [{ text: "🎂 Cumpleaños: Carolina Fones", type: "primary", branch: "tribunales" }]
    },
    3: { // Abril 2026
      3: [{ text: "Feriado: Viernes Santo", type: "warning", branch: "all" }],
      4: [{ text: "Feriado: Sábado Santo", type: "warning", branch: "all" }],
      15: [{ text: "🎂 Cumpleaños: Camila dPuerto", type: "primary", branch: "tribunales" }],
      18: [{ text: "🎂 Cumpleaños: Gabriela Lagos", type: "primary", branch: "tribunales" }],
      22: [{ text: "🎂 Cumpleaños: Patricia Anguita", type: "primary", branch: "tribunales" }],
      27: [{ text: "🎂 Cumpleaños: Nicolás Jofré", type: "primary", branch: "all" }]
    },
    4: { // Mayo 2026
      1: [{ text: "Feriado: Día del Trabajo", type: "warning", branch: "all" }],
      4: [{ text: "🎂 Cumpleaños: Josefina Mass", type: "primary", branch: "tribunales" }],
      7: [{ text: "🎂 Cumpleaños: Marcela Burgos", type: "primary", branch: "tribunales" }],
      10: [{ text: "🎂 Cumpleaños: María Ormazab", type: "primary", branch: "tribunales" }],
      21: [
        { text: "Feriado: Día de las Glorias Navales", type: "warning", branch: "all" },
        { text: "🎂 Cumpleaños: Fca Cisternas", type: "primary", branch: "tribunales" }
      ],
      25: [{ text: "🎂 Cumpleaños: Trinidad Sanchez", type: "primary", branch: "tribunales" }]
    },
    5: { // Junio 2026
      2: [{ text: "🎂 Cumpleaños: Flo Mizala", type: "primary", branch: "tribunales" }],
      3: [{ text: "🎂 Cumpleaños: Consuelo Olivares", type: "primary", branch: "tribunales" }],
      8: [{ text: "🎂 Cumpleaños: Tamara S.", type: "primary", branch: "vitacura" }],
      9: [{ text: "🎂 Cumpleaños: Felipe Valenzuela", type: "primary", branch: "tribunales" }],
      15: [{ text: "🎂 Cumpleaños: Karen M.", type: "primary", branch: "vitacura" }],
      16: [{ text: "🎂 Cumpleaños: Isabel Braun", type: "primary", branch: "tribunales" }],
      17: [{ text: "🎂 Cumpleaños: Javiera M.", type: "primary", branch: "vitacura" }],
      20: [{ text: "🎂 Cumpleaños: Francisca Lagos", type: "primary", branch: "vitacura" }],
      21: [{ text: "Feriado: Día Nacional de los Pueblos Indígenas", type: "warning", branch: "all" }],
      29: [{ text: "Feriado: San Pedro y San Pablo", type: "warning", branch: "all" }]
    },
    6: { // Julio 2026
      2: [{ text: "🎂 Cumpleaños: Valentina Pavez", type: "primary", branch: "tribunales" }],
      3: [{ text: "🎂 Cumpleaños: Álvaro M.", type: "primary", branch: "vitacura" }],
      15: [{ text: "🎂 Cumpleaños: Grace Martinson", type: "primary", branch: "tribunales" }],
      16: [
        { text: "Feriado: Virgen del Carmen", type: "warning", branch: "all" },
        { text: "🎂 Cumpleaños: Teresita Covarrubias", type: "primary", branch: "all" }
      ],
      22: [{ text: "🎂 Cumpleaños: Loreto F.", type: "primary", branch: "vitacura" }],
      26: [{ text: "🎂 Cumpleaños: Cecilia Tapia", type: "primary", branch: "tribunales" }],
      27: [{ text: "🎂 Cumpleaños: Isidora Q.", type: "primary", branch: "vitacura" }],
      30: [{ text: "🎂 Cumpleaños: Isidora Luengo", type: "primary", branch: "tribunales" }]
    },
    7: { // Agosto 2026
      6: [{ text: "🎂 Cumpleaños: Felipe Nilo", type: "primary", branch: "all" }],
      9: [{ text: "🎂 Cumpleaños: Natalia A.", type: "primary", branch: "vitacura" }],
      15: [{ text: "Feriado: Asunción de la Virgen", type: "warning", branch: "all" }],
      18: [{ text: "🎂 Cumpleaños: Javiera P.", type: "primary", branch: "vitacura" }],
      21: [{ text: "🎂 Cumpleaños: Fernando Urbina", type: "primary", branch: "tribunales" }],
      27: [{ text: "🎂 Cumpleaños: Jacqueline M.", type: "primary", branch: "vitacura" }]
    },
    8: { // Septiembre 2026
      8: [{ text: "🎂 Cumpleaños: Fernanda C.", type: "primary", branch: "vitacura" }],
      18: [{ text: "Feriado: Independencia Nacional (Fiestas Patrias 🇨🇱)", type: "warning", branch: "all" }],
      19: [{ text: "Feriado: Día de las Glorias del Ejército", type: "warning", branch: "all" }]
    },
    9: { // Octubre 2026
      3: [{ text: "🎂 Cumpleaños: Carolina S.", type: "primary", branch: "vitacura" }],
      9: [{ text: "🎂 Cumpleaños: Carolina H.", type: "primary", branch: "vitacura" }],
      11: [{ text: "🎂 Cumpleaños: Verónica P.", type: "primary", branch: "vitacura" }],
      12: [{ text: "Feriado: Encuentro de Dos Mundos", type: "warning", branch: "all" }],
      17: [{ text: "🎂 Cumpleaños: Gloria Retti", type: "primary", branch: "tribunales" }],
      19: [{ text: "🎂 Cumpleaños: Pauline Henriksen", type: "primary", branch: "tribunales" }],
      31: [
        { text: "Feriado: Iglesias Protestantes", type: "warning", branch: "all" },
        { text: "🎂 Cumpleaños: Belkis V.", type: "primary", branch: "vitacura" }
      ]
    },
    10: { // Noviembre 2026
      1: [{ text: "Feriado: Día de Todos los Santos", type: "warning", branch: "all" }],
      3: [{ text: "🎂 Cumpleaños: Constanza Jiménez", type: "primary", branch: "tribunales" }],
      8: [{ text: "🎂 Cumpleaños: Alejandro Valenzuela", type: "primary", branch: "all" }],
      18: [{ text: "🎂 Cumpleaños: Soledad Iturra", type: "primary", branch: "tribunales" }]
    },
    11: { // Diciembre 2026
      1: [{ text: "🎂 Cumpleaños: Anabela Bello", type: "primary", branch: "tribunales" }],
      3: [{ text: "🎂 Cumpleaños: Gardenia Saldia", type: "primary", branch: "tribunales" }],
      8: [{ text: "Feriado: Inmaculada Concepción", type: "warning", branch: "all" }],
      9: [{ text: "🎂 Cumpleaños: Andrea P. & Valeria M.", type: "primary", branch: "vitacura" }],
      24: [{ text: "🎂 Cumpleaños: Ximena Greene", type: "primary", branch: "tribunales" }],
      25: [{ text: "Feriado: Navidad 🎄", type: "warning", branch: "all" }],
      26: [{ text: "🎂 Cumpleaños: Nicole J.", type: "primary", branch: "vitacura" }],
      27: [{ text: "🎂 Cumpleaños: Gisella G.", type: "primary", branch: "vitacura" }]
    }
  };

  const monthEvents = eventsData[month] || {};

  const handlePrevMonth = () => {
    if (year === 2026 && month === 0) return; // Limit to January 2026
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    if (year === 2026 && month === 11) return; // Limit to December 2026
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleGoToday = () => {
    const now = new Date();
    if (now.getFullYear() === 2026) {
      setCurrentDate(now);
    } else {
      setCurrentDate(new Date(2026, 5, 1)); // Default fallback to June 2026
    }
  };

  const toggleBranch = (branch: 'vitacura' | 'tribunales') => {
    setSelectedBranch(prev => prev === branch ? 'all' : branch);
  };

  const renderCells = () => {
    const cells = [];

    // Empty cells
    for (let i = 0; i < offset; i++) {
      cells.push(<span key={`empty-${i}`} className="day-cell empty" />);
    }

    // Days cells
    for (let i = 1; i <= totalDays; i++) {
      const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      const dayEventsList = monthEvents[i] || [];
      
      const filteredDayEvents = dayEventsList.filter(event => 
        selectedBranch === 'all' || event.branch === 'all' || event.branch === selectedBranch
      );

      const isHoliday = filteredDayEvents.find(e => e.type === 'warning');
      const isBirthday = filteredDayEvents.find(e => e.type === 'primary');
      const hasEvent = filteredDayEvents.length > 0 || isToday;

      const classes = ["day-cell"];
      if (isToday) classes.push("today");
      if (hasEvent) {
        classes.push("has-event");
        const eventColor = isToday ? "today-marker" : (isHoliday ? "warning" : "primary");
        classes.push(eventColor);
      }

      let tooltipText = "";
      if (isToday) {
        tooltipText = `Hoy: Día ${i} de ${monthNames[month]}`;
        if (filteredDayEvents.length > 0) {
          const eventsText = filteredDayEvents.map(e => e.text).join(" / ");
          tooltipText += ` (${eventsText})`;
        }
      } else if (filteredDayEvents.length > 0) {
        tooltipText = filteredDayEvents.map(e => e.text).join(" / ");
      }

      cells.push(
        <span
          key={`day-${i}`}
          className={classes.join(" ")}
          {...(tooltipText ? { "data-tooltip": tooltipText } : {})}
        >
          {i}
          {isBirthday && <span className="birthday-mini-icon">🎂</span>}
        </span>
      );
    }

    return cells;
  };

  return (
    <div className="calendar-widget glass-panel">
      <div className="calendar-header">
        <div className="calendar-title">
          <Calendar size={18} />
          <span>Calendario</span>
        </div>
        <div className="calendar-controls">
          <button onClick={handleGoToday} className="cal-today-btn" title="Ir al mes actual">Hoy</button>
          <button 
            onClick={handlePrevMonth} 
            className="cal-control-btn" 
            aria-label="Mes anterior"
            disabled={year === 2026 && month === 0}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="month-year">
            {monthNames[month]} {year}
          </span>
          <button 
            onClick={handleNextMonth} 
            className="cal-control-btn" 
            aria-label="Mes siguiente"
            disabled={year === 2026 && month === 11}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Branch selector buttons */}
      <div className="calendar-branch-filter">
        <button 
          onClick={() => toggleBranch('vitacura')} 
          className={`branch-filter-btn ${selectedBranch === 'vitacura' ? 'active' : ''}`}
        >
          S. Vitacura
        </button>
        <button 
          onClick={() => toggleBranch('tribunales')} 
          className={`branch-filter-btn ${selectedBranch === 'tribunales' ? 'active' : ''}`}
        >
          S. Tribunales
        </button>
      </div>

      <div className="calendar-body">
        <div className="days-header-grid">
          {dayNames.map((day, idx) => (
            <span key={idx} className="day-name">{day}</span>
          ))}
        </div>
        <div className="days-cells-grid">
          {renderCells()}
        </div>
      </div>
    </div>
  );
}
