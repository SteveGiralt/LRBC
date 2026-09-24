import type { ImageMetadata } from "astro";
import truthProject from "../images/bible-studies/truth-project.png";
import momlife from "../images/bible-studies/momlife.png";
import ladiesWednesday from "../images/bible-studies/ladies-wednesday-exodus.png";
import ladiesThursdayActs from "../images/bible-studies/ladies-thursday-acts.png";
import ladiesThursdayEvening from "../images/bible-studies/ladies-thursday-evening.png";
import mensFraternity from "../images/bible-studies/mens-fraternity.png";
import mensFellowship from "../images/bible-studies/mens-fellowship.png";
import youthGroup from "../images/bible-studies/youth-group.png";

export type Day =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export type Audience = "everyone" | "women" | "men" | "youth";

export interface BibleStudy {
  /** URL-safe id, used for in-page anchors */
  id: string;
  name: string;
  audience: Audience;
  schedule: {
    day: Day;
    /** 24h "HH:MM" */
    start: string;
    /** 24h "HH:MM" — omit for open-ended gatherings */
    end?: string;
    /** Weeks of the month this meets on (e.g. [2, 4]); omit for weekly */
    weeksOfMonth?: number[];
  };
  location: {
    name: string;
    detail?: string;
    /** Set when the study meets somewhere other than the church building */
    locality?: string;
  };
  /** ISO date the current session begins/resumes (e.g. "2026-09-17") */
  startDate?: string;
  study?: {
    title: string;
    author?: string;
  };
  description: string;
  contact?: {
    name: string;
    phone?: string;
    email?: string;
  };
  image?: ImageMetadata;
  /** Optional page with more information */
  link?: { href: string; label: string };
}

export const CHURCH_LOCATION = {
  name: "Lone Rock Bible Church",
  streetAddress: "1142 Three Mile Creek Rd",
  addressLocality: "Stevensville",
  addressRegion: "MT",
  postalCode: "59870",
};

export const bibleStudies: BibleStudy[] = [
  {
    id: "sunday-morning-bible-training",
    name: "Sunday Morning Bible Training Time",
    audience: "everyone",
    schedule: { day: "Sunday", start: "09:00", end: "09:45" },
    location: { name: "Lone Rock Bible Church", detail: "Room 6" },
    study: { title: "The Truth Project", author: "Del Tackett" },
    description:
      "An adult Sunday school class that meets before the worship service. We are currently working through The Truth Project, Del Tackett's video series on seeing all of life through a biblical worldview. Come early on Sunday, join the discussion, and stay for the 10:00 AM service.",
    image: truthProject,
  },
  {
    id: "momlife",
    name: "MomLife",
    audience: "women",
    schedule: { day: "Tuesday", start: "09:30", end: "11:30", weeksOfMonth: [2, 4] },
    location: { name: "Lone Rock Bible Church" },
    startDate: "2026-09-08",
    description:
      "A refreshing time of connecting with Jesus and with other moms. MomLife meets on the 2nd and 4th Tuesdays of the month during the school year, and moms of kids of any age are welcome. Childcare is provided, so bring the little ones along.",
    contact: { name: "Katy Hofman", phone: "406-360-1485" },
    image: momlife,
  },
  {
    id: "wednesday-morning-ladies-study",
    name: "Wednesday Morning Ladies Study",
    audience: "women",
    schedule: { day: "Wednesday", start: "10:00", end: "12:00" },
    location: { name: "Lone Rock Bible Church" },
    startDate: "2026-09-09",
    study: {
      title: "God of Deliverance: A Study of Exodus 1–18",
      author: "Jen Wilkin",
    },
    description:
      "A women's Bible study walking through the first half of Exodus with Jen Wilkin's God of Deliverance. Together we'll see how God hears, remembers, and rescues His people. Contact Karen for a study guide before the session begins.",
    contact: { name: "Karen Moore", phone: "406-381-2730" },
    image: ladiesWednesday,
  },
  {
    id: "thursday-afternoon-acts",
    name: "Thursday Afternoon Read-and-Discuss: Acts",
    audience: "women",
    schedule: { day: "Thursday", start: "13:00", end: "15:00" },
    location: { name: "Lone Rock Bible Church" },
    startDate: "2026-09-17",
    study: { title: "The Book of Acts" },
    description:
      "A relaxed read-and-discuss study through the Book of Acts, led by Robin Howard, following the story of the early church as the gospel spreads. There is no homework and no sign-up. Just show up with yourself and your Bible.",
    contact: { name: "Robin Howard", phone: "406-369-8603" },
    image: ladiesThursdayActs,
  },
  {
    id: "thursday-evening-ladies-study",
    name: "Thursday Evening Ladies Study",
    audience: "women",
    schedule: { day: "Thursday", start: "18:30", end: "20:00" },
    location: { name: "Lone Rock Bible Church" },
    startDate: "2026-09-10",
    study: { title: "Lies Women Believe", author: "Nancy DeMoss Wolgemuth" },
    description:
      "An evening women's study for those who can't make it during the day. We're going through Lies Women Believe and the Truth That Sets Them Free, holding the lies our culture tells women up against the truth of Scripture.",
    contact: { name: "Elena Kornoff", phone: "714-916-6166" },
    image: ladiesThursdayEvening,
  },
  {
    id: "mens-fraternity",
    name: "Men's Fraternity",
    audience: "men",
    schedule: { day: "Wednesday", start: "18:30", end: "20:00" },
    location: {
      name: "The Orton home",
      detail: "Stevensville — call for directions",
      locality: "Stevensville",
    },
    study: { title: "The Overcomers", author: "Matt Chandler" },
    description:
      "A midweek men's Bible study in a home setting. We have resumed with The Overcomers, Matt Chandler's eight-session study in the Book of Revelation, looking at what it means to stand firm in Christ.",
    contact: { name: "Thayne Orton", phone: "406-777-7328" },
    image: mensFraternity,
  },
  {
    id: "mens-fellowship",
    name: "Men's Fellowship",
    audience: "men",
    schedule: { day: "Tuesday", start: "09:30", end: "10:30" },
    location: {
      name: "Frontier Café",
      detail: "Stevensville",
      locality: "Stevensville",
    },
    study: { title: "The Book of Hebrews" },
    description:
      "Coffee, breakfast, and the Word. Men gather at the Frontier Café in Stevensville on Tuesday mornings to share testimonies, encourage one another, and read through the Book of Hebrews together. Come whenever you can.",
    contact: { name: "Bud Murphy", phone: "406-396-2204" },
    image: mensFellowship,
  },
  {
    id: "youth-group",
    name: "Lone Rock Youth Group",
    audience: "youth",
    schedule: { day: "Wednesday", start: "18:30", end: "20:00" },
    location: { name: "Lone Rock Bible Church" },
    startDate: "2026-09-09",
    study: { title: "The Character of God" },
    description:
      "Bible study, games, food, music, and good friends for students in grades 6–12. This year we're studying the character of God: biblical themes relating to the attributes of God and the Ten Commandments.",
    contact: { name: "Lucas Pernsteiner", phone: "406-273-0237" },
    image: youthGroup,
    link: { href: "/youth", label: "Visit the Youth Group page" },
  },
];

export const audienceLabels: Record<Audience, { heading: string; blurb: string }> = {
  everyone: {
    heading: "Sunday Morning",
    blurb: "Adult Bible training before the worship service. All ages welcome.",
  },
  women: {
    heading: "Women's Bible Studies",
    blurb: "Morning, afternoon, and evening options, plus a group just for moms.",
  },
  men: {
    heading: "Men's Bible Studies",
    blurb: "A breakfast fellowship and an evening study in a home.",
  },
  youth: {
    heading: "Youth",
    blurb: "Junior high and high school students, grades 6–12.",
  },
};

/** "09:30" → "9:30 AM" */
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

const ordinal = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

/** "2nd & 4th Tuesdays" / "Wednesdays" */
export function formatDays(s: BibleStudy["schedule"]): string {
  if (s.weeksOfMonth?.length) {
    return `${s.weeksOfMonth.map(ordinal).join(" & ")} ${s.day}s`;
  }
  return `${s.day}s`;
}

/** "10:00 AM – 12:00 PM" / "9:30 AM" */
export function formatTimeRange(s: BibleStudy["schedule"]): string {
  return s.end ? `${formatTime(s.start)} – ${formatTime(s.end)}` : formatTime(s.start);
}

/** "September 17" */
export function formatStartDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export const dayOrder: Day[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const TIMEZONE = "America/Denver";

/** Today's date in church-local time, "YYYY-MM-DD" */
function localToday(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: TIMEZONE });
}

/** UTC offset in church-local time for a given date, e.g. "-06:00" */
function localOffset(isoDate: string): string {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(`${isoDate}T12:00:00Z`))
    .find((p) => p.type === "timeZoneName")!.value;
  return name.replace("GMT", "") || "+00:00";
}

/**
 * Next date (on or after today and the session start) this study meets,
 * as "YYYY-MM-DD". Honors weeksOfMonth for studies that don't meet weekly.
 */
export function nextMeetingDate(study: BibleStudy): string {
  const today = localToday();
  const from = study.startDate && study.startDate > today ? study.startDate : today;
  const date = new Date(`${from}T00:00:00Z`);
  const targetDay = dayOrder.indexOf(study.schedule.day);
  const weeks = study.schedule.weeksOfMonth;
  for (;;) {
    const weekOfMonth = Math.ceil(date.getUTCDate() / 7);
    if (date.getUTCDay() === targetDay && (!weeks || weeks.includes(weekOfMonth))) {
      return date.toISOString().slice(0, 10);
    }
    date.setUTCDate(date.getUTCDate() + 1);
  }
}

/** "2026-09-27" + "09:00" → "2026-09-27T09:00:00-06:00" */
export function localDateTime(isoDate: string, time: string): string {
  return `${isoDate}T${time}:00${localOffset(isoDate)}`;
}
