import os
import sys

# Add the project root to the path so we can import from lib
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../.."))

from lib.calendar_handler import BaseCalendarHandler


class handler(BaseCalendarHandler):

    def construct_key(self):
        key_dict = {
            "type": "service_account",
            "project_id": os.environ.get("MAIN_CALENDAR_PROJECT_ID"),
            "private_key_id": os.environ.get("MAIN_CALENDAR_PRIVATE_KEY_ID"),
            "private_key": os.environ.get("MAIN_CALENDAR_PRIVATE_KEY"),
            "client_email": os.environ.get("MAIN_CALENDAR_CLIENT_EMAIL"),
            "client_id": os.environ.get("MAIN_CALENDAR_CLIENT_ID"),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": os.environ.get("MAIN_CALENDAR_CLIENT_X509_CERT_URL"),
            "universe_domain": "googleapis.com",
        }
        return key_dict

    def get_calendar_id(self):
        return os.environ.get("MAIN_CALENDAR_CALENDAR_ID")
