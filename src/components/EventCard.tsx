import React from "react";
import Spinner from "./Spinner";

interface Event {
  title: string;
  description: string;
  location_string?: string;
  maps_link?: string;
  dates: {
    date: string;
    time: string;
  };
}

interface EventCardProps {
  apiEndpoint: string;
}

function sanitizeHtml(html: string): string {
  const div = document.createElement("div");
  div.textContent = html;
  return div.innerHTML;
}

const EventCard = ({ apiEndpoint }: EventCardProps) => {
  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [apiEndpoint]);

  return (
    <div className="bg-sand/50 rounded-xl p-6 border border-[#EDE8E0]">
      <h2 className="font-['DM_Serif_Display'] text-2xl text-[#3D3832] mb-4">
        Coming Events
      </h2>
      <div className="w-10 h-0.5 bg-[#C8956C] mb-5"></div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-[#3D3832]/60 text-sm italic py-4">
          Unable to load events. Please check back later.
        </p>
      ) : events.length === 0 ? (
        <p className="text-[#3D3832]/60 text-sm italic py-4">
          No upcoming events scheduled. Check back soon!
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div
              className="border-l-3 border-[#C8956C] pl-4 py-2"
              key={`${event.title}${event.dates.date}`}
            >
              <p className="text-xs font-medium text-[#C8956C] uppercase tracking-wide">
                {event.dates.date} {event.dates.time ?? ""}
              </p>
              <h3 className="font-['DM_Serif_Display'] text-lg text-[#3D3832] mt-1">
                {event?.title}
              </h3>
              {event?.description && (
                <p className="text-sm text-[#3D3832]/70 mt-1">
                  {sanitizeHtml(event.description)}
                </p>
              )}
              {event?.location_string && (
                <a
                  href={event.maps_link}
                  className="text-sm text-[#9B2335] underline underline-offset-2 hover:text-[#7A1C2A] mt-1 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.location_string}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;
