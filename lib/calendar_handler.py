import json
from datetime import datetime, timedelta
from http.server import BaseHTTPRequestHandler

from google.oauth2 import service_account
from googleapiclient.discovery import build
import urllib.parse


class BaseCalendarHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        calendar_data = self.get_calendar_data()
        self.send_response(200)
        self.send_header(
            "Content-type", "application/json"
        )  # Important: Set content type to JSON
        self.end_headers()
        self.wfile.write(json.dumps(calendar_data).encode("utf-8"))
        return

    def construct_key(self):
        """Override this method in subclasses to provide calendar-specific credentials"""
        raise NotImplementedError("Subclasses must implement construct_key()")

    def get_calendar_data(self):
        SERVICE_ACCOUNT_JSON = self.construct_key()
        CALENDAR_ID = self.get_calendar_id()
        credentials = service_account.Credentials.from_service_account_info(
            SERVICE_ACCOUNT_JSON,
            scopes=["https://www.googleapis.com/auth/calendar.readonly"],
        )
        # Build the Google Calendar API client
        calendar_service = build(
            "calendar", "v3", credentials=credentials, cache_discovery=False
        )

        # # Get the current date and time in RFC 3339 format
        now = datetime.utcnow().isoformat() + "Z"

        # Retrieve events from the public Google Calendar
        events_result = (
            calendar_service.events()
            .list(
                calendarId=CALENDAR_ID,
                timeMin=now,
                maxResults=10,
                singleEvents=True,
                orderBy="startTime",
            )
            .execute()
        )
        events = events_result.get("items", [])
        return self.parse_events(events)

    def get_calendar_id(self):
        """Override this method in subclasses to provide calendar-specific ID"""
        raise NotImplementedError("Subclasses must implement get_calendar_id()")

    def make_date_string(self, event):
        start = event.get("start", {})
        end = event.get("end", {})

        result = {"date": None, "time": None}

        # Check if it's an all-day event
        if "date" in start:
            start_date = datetime.strptime(start["date"], "%Y-%m-%d")
            end_date = datetime.strptime(end["date"], "%Y-%m-%d")

            # Adjust end date for display (exclusive to inclusive)
            end_date = end_date - timedelta(days=1)

            # Single day event
            if start_date == end_date:
                result["date"] = start_date.strftime("%B %d")

            # Multi-day event in the same month
            elif start_date.month == end_date.month:
                result["date"] = (
                    f"{start_date.strftime('%B')} {start_date.day}-{end_date.day}"
                )

            # Multi-day event across different months
            else:
                result["date"] = (
                    f"{start_date.strftime('%B %d')}-{end_date.strftime('%B %d')}"
                )

        # If it's not an all-day event
        elif "dateTime" in start:
            start_time = datetime.strptime(start["dateTime"], "%Y-%m-%dT%H:%M:%S%z")
            end_time = datetime.strptime(end["dateTime"], "%Y-%m-%dT%H:%M:%S%z")

            result["date"] = start_time.strftime("%B %d")
            result["time"] = (
                f"{start_time.strftime('%I:%M')}-{end_time.strftime('%I:%M%p')}"
            )

        return result

    def make_location_strings(self, location_string):
        result = {}
        address_parts = location_string.split(",")
        trimmed_address = ",".join(address_parts[:3])
        trimmed_address = trimmed_address.strip()
        result["location_string"] = trimmed_address
        result["maps_link"] = (
            f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote(location_string)}"
        )
        return result

    def parse_events(self, events=None):
        if not events:
            events = []
        parsed_events = []
        for ev in events:
            ev_data = {}
            ev_data["title"] = ev.get("summary")
            ev_data["description"] = ev.get("description", "")
            ev_data["dates"] = self.make_date_string(ev)
            location_string = ev.get("location", None)
            if location_string:
                ev_data.update({**self.make_location_strings(location_string)})
            parsed_events.append(ev_data)
        return parsed_events
