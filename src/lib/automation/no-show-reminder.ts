export type ReminderChannel = "whatsapp" | "sms" | "email";

export interface Consulta {
  id: string;
  patientName: string;
  patientPhone: string;
  appointmentAt: Date;
  channel: ReminderChannel;
}

export interface ScheduledReminder {
  consultaId: string;
  patientName: string;
  patientPhone: string;
  channel: ReminderChannel;
  offsetHours: number;
  sendAt: Date;
}

const REMINDER_OFFSETS_HOURS = [24, 2] as const;

export function scheduleReminders(consulta: Consulta): ScheduledReminder[] {
  return REMINDER_OFFSETS_HOURS.map((offsetHours) => ({
    consultaId: consulta.id,
    patientName: consulta.patientName,
    patientPhone: consulta.patientPhone,
    channel: consulta.channel,
    offsetHours,
    sendAt: new Date(consulta.appointmentAt.getTime() - offsetHours * 60 * 60 * 1000),
  }));
}
