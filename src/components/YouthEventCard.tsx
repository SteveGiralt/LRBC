import axios from "axios";
import React from "react";
import youthEventsTest from "../data/youth-cal-test.json";

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

const YouthEventCard = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/youth-calendar");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    setEvents(youthEventsTest);
    // if (import.meta.env.PROD === "production") {
    //   fetchEvents();
    // } else {
    //   setEvents(youthEventsTest);
    // }
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <div className=" bg-neutral-100 p-8 rounded-lg shadow-md m-auto w-full">
          <h2 className="text-2xl font-semibold mb-4 font-oswald">
            Coming Events
          </h2>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  className={`border border-gray-300 p-4 rounded-md`}
                  key={`${event.title}${event.dates.date}`}
                >
                  <p className="text-gray-600 font-oswald">
                    {event.dates.date} {event.dates.time ?? ""}
                  </p>
                  <h3 className="text-lg font-semibold font-oswald">
                    {event?.title}
                  </h3>
                  <p className="text-gray-700">{event?.description}</p>
                  {event?.location_string && (
                    <a href={event.maps_link} className="underline">
                      {event.location_string}
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="border border-gray-300 p-4 rounded-md">
                <p className="text-gray-600 font-oswald">
                  Sunday Morning Worship
                </p>
                <h3 className="text-lg font-semibold font-oswald">
                  Join us for worship every Sunday at 10:00AM
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default YouthEventCard;
