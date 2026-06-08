import { describe, it, expect } from "vitest";
import { scheduleReminders } from "@/lib/automation/no-show-reminder";

describe("scheduleReminders", () => {
  it("returns two reminders at offsetHours 24 and 2 before the appointment", () => {
    const appointmentAt = new Date("2026-06-10T14:00:00.000Z");
    const consulta = {
      id: "c1",
      patientName: "Ana Silva",
      patientPhone: "+5511999999999",
      appointmentAt,
      channel: "whatsapp" as const,
    };

    const reminders = scheduleReminders(consulta);

    expect(reminders).toHaveLength(2);

    const reminder24h = reminders.find((r) => r.offsetHours === 24);
    const reminder2h = reminders.find((r) => r.offsetHours === 2);

    expect(reminder24h).toBeDefined();
    expect(reminder2h).toBeDefined();

    // 24h reminder should fire at appointmentAt - 24h
    expect(reminder24h!.sendAt).toEqual(new Date("2026-06-09T14:00:00.000Z"));
    // 2h reminder should fire at appointmentAt - 2h
    expect(reminder2h!.sendAt).toEqual(new Date("2026-06-10T12:00:00.000Z"));

    // Both reminders should carry the channel and patient info
    expect(reminder24h!.channel).toBe("whatsapp");
    expect(reminder2h!.channel).toBe("whatsapp");
    expect(reminder24h!.patientPhone).toBe("+5511999999999");
    expect(reminder2h!.patientPhone).toBe("+5511999999999");
    expect(reminder24h!.consultaId).toBe("c1");
    expect(reminder2h!.consultaId).toBe("c1");
  });
});
