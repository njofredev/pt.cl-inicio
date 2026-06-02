'use client';

import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 1)); // Initialize in June 2026

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
  const eventsData: Record<number, Record<number, { text: string; type: 'primary' | 'warning' }>> = {
    0: { // Enero 2026
      1: { text: "Feriado: Año Nuevo", type: "warning" },
      28: { text: "🎂 Cumpleaños: Natalia S.", type: "primary" }
    },
    1: { // Febrero 2026
      20: { text: "🎂 Cumpleaños: Marisol S.", type: "primary" }
    },
    2: { // Marzo 2026
      7: { text: "🎂 Cumpleaños: Martina T.", type: "primary" },
      23: { text: "🎂 Cumpleaños: Antonio A.", type: "primary" }
    },
    3: { // Abril 2026
      3: { text: "Feriado: Viernes Santo", type: "warning" },
      4: { text: "Feriado: Sábado Santo", type: "warning" },
      27: { text: "🎂 Cumpleaños: Nicolás J.", type: "primary" }
    },
    4: { // Mayo 2026
      1: { text: "Feriado: Día del Trabajo", type: "warning" },
      21: { text: "Feriado: Día de las Glorias Navales", type: "warning" }
    },
    5: { // Junio 2026
      8: { text: "🎂 Cumpleaños: Tamara S.", type: "primary" },
      15: { text: "🎂 Cumpleaños: Karen M.", type: "primary" },
      17: { text: "🎂 Cumpleaños: Javiera M.", type: "primary" },
      21: { text: "Feriado: Día Nacional de los Pueblos Indígenas", type: "warning" },
      29: { text: "Feriado: San Pedro y San Pablo", type: "warning" }
    },
    6: { // Julio 2026
      3: { text: "🎂 Cumpleaños: Álvaro M.", type: "primary" },
      16: { text: "Feriado: Virgen del Carmen / 🎂 Cumpleaños: Teresita C.", type: "warning" },
      22: { text: "🎂 Cumpleaños: Loreto F.", type: "primary" },
      27: { text: "🎂 Cumpleaños: Isidora Q.", type: "primary" }
    },
    7: { // Agosto 2026
      6: { text: "🎂 Cumpleaños: Felipe N.", type: "primary" },
      9: { text: "🎂 Cumpleaños: Natalia A.", type: "primary" },
      15: { text: "Feriado: Asunción de la Virgen", type: "warning" },
      18: { text: "🎂 Cumpleaños: Javiera P.", type: "primary" },
      27: { text: "🎂 Cumpleaños: Jacqueline M.", type: "primary" }
    },
    8: { // Septiembre 2026
      8: { text: "🎂 Cumpleaños: Fernanda C.", type: "primary" },
      18: { text: "Feriado: Independencia Nacional (Fiestas Patrias 🇨🇱)", type: "warning" },
      19: { text: "Feriado: Día de las Glorias del Ejército", type: "warning" }
    },
    9: { // Octubre 2026
      3: { text: "🎂 Cumpleaños: Carolina S.", type: "primary" },
      9: { text: "🎂 Cumpleaños: Carolina H.", type: "primary" },
      11: { text: "🎂 Cumpleaños: Verónica P.", type: "primary" },
      12: { text: "Feriado: Encuentro de Dos Mundos", type: "warning" },
      31: { text: "Feriado: Iglesias Protestantes / 🎂 Cumpleaños: Belkis V.", type: "warning" }
    },
    10: { // Noviembre 2026
      1: { text: "Feriado: Día de Todos los Santos", type: "warning" },
      8: { text: "🎂 Cumpleaños: Alejandro V.", type: "primary" }
    },
    11: { // Diciembre 2026
      8: { text: "Feriado: Inmaculada Concepción", type: "warning" },
      9: { text: "🎂 Cumpleaños: Andrea P. & Valeria M.", type: "primary" },
      25: { text: "Feriado: Navidad 🎄", type: "warning" },
      26: { text: "🎂 Cumpleaños: Nicole J.", type: "primary" },
      27: { text: "🎂 Cumpleaños: Gisella G.", type: "primary" }
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
    // Return to current month in 2026
    const now = new Date();
    if (now.getFullYear() === 2026) {
      setCurrentDate(now);
    } else {
      setCurrentDate(new Date(2026, 5, 1)); // Default fallback to June 2026
    }
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
      const holiday = monthEvents[i];
      const hasEvent = !!holiday || isToday;

      const classes = ["day-cell"];
      if (isToday) classes.push("today");
      if (hasEvent) {
        classes.push("has-event");
        const eventColor = isToday ? "today-marker" : (holiday?.type || "primary");
        classes.push(eventColor);
      }

      let tooltipText = "";
      if (isToday) {
        tooltipText = `Hoy: Día ${i} de ${monthNames[month]}`;
        if (holiday) {
          tooltipText += ` (${holiday.text})`;
        }
      } else if (holiday) {
        tooltipText = holiday.text;
      }

      const isBirthday = holiday && holiday.type === 'primary';

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
