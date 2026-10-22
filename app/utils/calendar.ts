// app/utils/calendar.ts

export function generateGoogleCalendarUrl(examDateStr: string, trackName: string, isZh: boolean): string {
  const dateObj = new Date(examDateStr);
  // Default HK EAA exam time slot: 09:00 AM - 12:00 PM HKT
  dateObj.setHours(9, 0, 0, 0);
  const endDateObj = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000);

  const formatIso = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const title = encodeURIComponent(
    isZh ? `AgentPass™ ${trackName} 資格考試日` : `AgentPass™ ${trackName} Licensing Exam`
  );
  const details = encodeURIComponent(
    isZh
      ? `地產代理監管局 (EAA) 資格考試。請提前 30 分鐘到達考場，並帶備身份證與准考證。\n\nAgentPass 備考平台: https://agentpass.hk`
      : `Official HK EAA Licensing Examination. Please arrive 30 minutes prior with HKID card and admission ticket.\n\nAgentPass Prep Platform: https://agentpass.hk`
  );
  const location = encodeURIComponent('Hong Kong Examination and Assessment Authority (HKEAA)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatIso(dateObj)}/${formatIso(endDateObj)}&details=${details}&location=${location}`;
}

export function downloadIcsCalendarFile(examDateStr: string, trackName: string, isZh: boolean) {
  const dateObj = new Date(examDateStr);
  dateObj.setHours(9, 0, 0, 0);
  const endDateObj = new Date(dateObj.getTime() + 3 * 60 * 60 * 1000);

  const formatIso = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const title = isZh ? `AgentPass™ ${trackName} 資格考試日` : `AgentPass™ ${trackName} Licensing Exam`;
  const description = isZh
    ? `地產代理監管局 (EAA) 資格考試。請提前 30 分鐘到達考場。`
    : `Official HK EAA Licensing Examination. Arrive 30 minutes prior.`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AgentPass//HK Licensing Exam Prep//EN',
    'BEGIN:VEVENT',
    `UID:agentpass-exam-${Date.now()}@agentpass.hk`,
    `DTSTAMP:${formatIso(new Date())}`,
    `DTSTART:${formatIso(dateObj)}`,
    `DTEND:${formatIso(endDateObj)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    'LOCATION:HKEAA Examination Centre, Hong Kong',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Tomorrow is your ${trackName} Licensing Exam!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `AgentPass_${trackName}_Exam_Reminder.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}