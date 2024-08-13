from http.server import BaseHTTPRequestHandler
import json

class handler(BaseHTTPRequestHandler):

    def do_GET(self):
        json_data = {"foo": "bar"}
        self.send_response(200)
        self.send_header('Content-type', 'application/json')  # Important: Set content type to JSON
        self.end_headers()
        self.wfile.write(json.dumps(json_data).encode('utf-8'))
        return
