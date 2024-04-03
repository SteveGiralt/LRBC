import moment from "moment";
const events: {
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
}[] = [
  {
    title: "Easter Sunday",
    eventExpires: "2024-03-31",
    description: "Join us for Easter Sunday service at 10:00AM",
  },
  {
    title: "Men's Retreat",
    eventExpires: "2024-04-06",
    description: "Men's retreat at Camp Utmost.",
    eventLink: {
      text: "Contact Camp Utmost for More Info",
      href: "https://www.camputmost.org/",
    },
    date: "April 5-6",
  },
  {
    date: "June 24th thru 28th",
    eventExpires: "2024-06-28",
    title: "Vacation Bible School",
    description:
      "Kids K-6th grade are invited to join us for VBS. Contact us for more information!",
    time: "4-7PM",
    // sticky: true,
  },
  {
    date: "May 2nd",
    eventExpires: "2024-05-02",
    title: "National Day of Prayer",
    description: "",
  },
  {
    title: "2024 Annual Shepherds’ Conference",
    eventExpires: "2024-04-18",
    date: "April 16-18",
    description:
      "The Rocky Mountain Bible Mission will be hosting the 2024 Annual Shepherds’ Conference from Tuesday, April 16 through Thursday, April 18 at Discovery Alliance Church in Missoula.",
    eventLink: {
      href: "https://rmbible.org/shepherds-conference",
      text: "Learn More or Register",
    },
  },
  {
    title: "CareNet Fundraiser",
    eventExpires: "2024-05-06",
    description: `The Spring Fundraising Gala, "Big Hearts Under the Big Sky" will be at the Downtown Holiday Inn.`,
    eventLink: {
      href: "https://secure.fundeasy.com/ministrysync/event/home.php?e=26966",
      text: "Learn More",
    },
  },
  {
    title: "Biblical Counseling Conference",
    eventExpires: "2024-07-20",
    date: "July 18-20",
    description: "Grace Bible Church, Bozeman",
    eventLink: { href: "https://gbcmt.org/bcc", text: "Info and Registration" },
  },
  {
    title: "Celebration of Life",
    eventExpires: "2024-04-27",
    time: "1-4PM",
    description:
      "A Celebration of Life will be held for Jane Rectenwald at the Missoula Country Club",
  },
];

const sortedEvents = events
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

const currentEvents = sortedEvents
  .splice(0, 3 - stickyEvents.length)
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
