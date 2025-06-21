document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);
  // gsap code here!
});

// --- ADD TO CALENDAR BUTTON ---

document.getElementById("addToCalendar").addEventListener("click", () => {
  // --- Event Details ---
  const eventName = "Walimatul 'Urs Fahmi & Fidia";
  // IMPORTANT: The dates need to be in UTC format (ending with 'Z')
  // for correct time zone handling.
  // Example: 2025-12-20 at 2:00 PM Jakarta time (WIB is UTC+7)
  // 14:00 - 7:00 = 7:00 UTC.
  const startTime = "20250713T003000Z"; // The 'Z' indicates UTC time
  const endTime = "20250713T070000Z"; // Let's say it ends 3 hours later
  const location = "Masjid Asmaul Husna Gading Serpong, Kelapa Dua, Tangerang";
  const description =
    "Mohon Untuk Memperhatikan Adab Walimah saat pelaksanaan Acara Walimatul 'Urs";
  // --- Create the .ics File Content ---
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${startTime}
DTEND:${endTime}
LOCATION:${location}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR
    `.trim(); // .trim() removes leading/trailing whitespace

  // --- Create a Blob and a Download Link ---
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");

  // Create a URL for the blob
  link.href = URL.createObjectURL(blob);

  // Set the download attribute with a filename
  link.download = "wedding-invitation.ics";

  // Append the link to the body (required for Firefox), click it, and then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
