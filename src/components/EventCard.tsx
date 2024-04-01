import moment from "moment";
const events: {
  date?: string;
  time?: string;
  eventDate: string;
  title: string;
  description: string;
  eventLink?: {
    href: string;
    text: string;
  };
}[] = [
  {
    title: "Easter Sunday",
    eventDate: "2024-03-31",
    description: "Join us for Easter Sunday service at 10:00AM",
  },
  {
    date: "April Fools Day",
    eventDate: "2024-04-01",
    title: "April Fools Day",
    description: "Don't be fooled!",
  },
  {
    date: "June 24th thru 28th",
    eventDate: "2024-06-28",
    title: "Vacation Bible School",
    description:
      "Kids K-6th grade are invited to join us for VBS. Contact us for more information!",
    // eventLink: { href: "/vbs", text: "Learn More" },
    time: "4-7PM",
  },
  {
    date: "May 2nd",
    eventDate: "2024-05-02",
    title: "National Day of Prayer",
    description: "",
  },
  {
    title: "2024 Annual Shepherds’ Conference",
    eventDate: "2024-04-18",
    date: "April 16-18",
    description:
      "The Rocky Mountain Bible Mission will be hosting the 2024 Annual Shepherds’ Conference from Tuesday, April 16 through Thursday, April 18 at Discovery Alliance Church in Missoula.",
    eventLink: {
      href: "https://rmbible.org/shepherds-conference",
      text: "Learn More or Register",
    },
  },
];

const currentEvents = events
  .filter(
    (event) =>
      !event.eventDate ||
      moment(event.eventDate, "YYYY-MM-DD").isSameOrAfter(moment(), "day")
  )
  .sort((a, b) => {
    const dateA = moment(a.eventDate, "YYYY-MM-DD");
    const dateB = moment(b.eventDate, "YYYY-MM-DD");
    return dateA.diff(dateB);
  })
  .splice(0, 3);

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
                className="border border-gray-300 p-4 rounded-md"
                key={event.description}
              >
                <p className="text-gray-600 font-oswald">
                  {event?.date ?? moment(event?.eventDate).format("LL")}{" "}
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
