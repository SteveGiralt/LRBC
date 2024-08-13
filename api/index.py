from http.server import BaseHTTPRequestHandler
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
from datetime import datetime
import os


class handler(BaseHTTPRequestHandler):

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
        key_dict = {
            "type": "service_account",
            "project_id": os.environ.get("CALENDAR_PROJECT_ID"),
            "private_key_id": os.environ.get("CALENDAR_PRIVATE_KEY_ID"),
            "private_key": os.environ.get("CALENDAR_PRIVATE_KEY"),
            "client_email": os.environ.get("CALENDAR_CLIENT_EMAIL"),
            "client_id": os.environ.get("CALENDAR_CLIENT_ID"),
            "auth_uri": os.environ.get("CALENDAR_CLIENT_EMAIL"),
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": os.environ.get("CALENDAR_CLIENT_X509_CERT_URL"),
            "universe_domain": "googleapis.com",
        }
        return key_dict

    def get_calendar_data(self):
        SERVICE_ACCOUNT_JSON = self.construct_key()
        CALENDAR_ID = os.environ.get("CALENDAR_CALENDAR_ID")
        credentials = service_account.Credentials.from_service_account_info(
            SERVICE_ACCOUNT_JSON,
            scopes=["https://www.googleapis.com/auth/calendar.readonly"],
        )
        # Build the Google Calendar API client
        calendar_service = build("calendar", "v3", credentials=credentials)

        # Get the current date and time in RFC 3339 format
        now = datetime.utcnow().isoformat() + "Z"

        # Retrieve events from the public Google Calendar
        events_result = (
            calendar_service.events()
            .list(calendarId=CALENDAR_ID, timeMin=now)
            .execute()
        )
        events = events_result.get("items", [])

        parsed_events = [
            {
                "description": ev.get("summary"),
                "start": ev.get("start"),
                "end": ev.get("end"),
            }
            for ev in events
        ]
        return parsed_events
