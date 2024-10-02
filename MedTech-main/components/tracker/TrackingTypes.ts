export type Tracker = {
    id: string;
    user_id: string;
    activity: number; 
    sleep: number;
    wellness: number;
    overview_report: Overview[];
    health_monitoring: HealthMonitoring[];
    health_expected: HealthExpected[];
    createdAt: Date;
    updatedAt: Date;
  };
  export type HealthExpected = {
    id: string;
    trackerId: string;
    month: string;
    health: number; 
    expected: number;
    tracker?: Tracker; 
  };
  export type HealthMonitoring = {
    id: string;
    trackerId: string;
    month: string;
    stress_level: number; 
    pulse: number;
    temperature: number;
    calories_burned: number;
    tracker?: Tracker; 
  };
  export type Overview = {
    id: string;
    trackerId: string;
    week: string;
    this_month: number; 
    prev_month: number;
    tracker?: Tracker; }
        