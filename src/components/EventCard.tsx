import moment from "moment";
import events from "../data/calendar.json";

interface Event {
  date?: string;
  time?: string;
  eventExpires: string;
  title: string;
  description: string;
  eventLink?: {
    href: string;
    text: string;
  };
  sticky?: boolean;
}

const sortedEvents: Event[] = events
  .filter(
    (event) =>
      !event.eventExpires ||
      moment(event.eventExpires, "YYYY-MM-DD").isSameOrAfter(moment(), "day")
  )
  .sort((a, b) => {
    const dateA = moment(a.eventExpires, "YYYY-MM-DD");
    const dateB = moment(b.eventExpires, "YYYY-MM-DD");
    return dateA.diff(dateB);
  });

const stickyEvents = sortedEvents.filter((event) => event.sticky);
const nonStickyEvents = sortedEvents.filter((event) => !event.sticky);
const currentEvents = nonStickyEvents
  .splice(0, 4 - stickyEvents.length)
  .concat(stickyEvents);

const EventCard = () => {
  return (
    <div className="flex justify-center">
      <div className=" bg-neutral-100 p-8 rounded-lg shadow-md m-auto w-full">
        <h2 className="text-2xl font-semibold mb-4 font-oswald">
          Coming Events
        </h2>
        <div className="space-y-4">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <div
                className={`border border-gray-300 p-4 rounded-md`} //${event.sticky ? "border-red-200" : ""} ??? Maybe?
                key={event.description}
              >
                <p className="text-gray-600 font-oswald">
                  {event?.date ?? moment(event?.eventExpires).format("LL")}{" "}
                  {event?.time ?? ""}
                </p>
                <h3 className="text-lg font-semibold font-oswald">
                  {event?.title}
                </h3>
                <p className="text-gray-700">{event?.description}</p>
                {event?.eventLink && (
                  <a href={event.eventLink.href} className="underline">
                    {event.eventLink.text}
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
  );
};

export default EventCard;
