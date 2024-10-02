declare module 'react-awesome-calendar' {
    interface Event {
      id?: number | string;
      color?: string;
      from: string;
      to: string;
      title: string;
    }
  
    interface CalendarProps {
      events: Event[];
      onEventClick?: (event: Event) => void;
      onEventDoubleClick?: (event: Event) => void;
      onEventMouseOver?: (event: Event) => void;
      onEventMouseOut?: (event: Event) => void;
    }
  
    const Calendar: React.FC<CalendarProps>;
  
    export default Calendar;
  }
  