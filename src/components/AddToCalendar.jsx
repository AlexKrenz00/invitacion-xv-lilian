import { CalendarPlus } from "lucide-react";
import "./AddToCalendar.css";

export default function AddToCalendar() {
  const handleAdd = () => {
    const start = "20260817T003000Z";
    const end = "20260817T080000Z";

    const title = encodeURIComponent("XV de LILIAN");
    const details = encodeURIComponent(
      "Mis XV de LILIAN · Dress code elegante · El celeste está reservado para la quinceañera."
    );

    const location = encodeURIComponent(
      "Fantasy Gold, Av. Forest 1422/32, Belgrano R, CABA"
    );

    const url =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${title}` +
      `&dates=${start}/${end}` +
      `&details=${details}` +
      `&location=${location}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      className="calendarButton"
      onClick={handleAdd}
      type="button"
    >
      <CalendarPlus size={15} />
      AGREGAR AL CALENDARIO
    </button>
  );
}
