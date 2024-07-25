
import frappe
import requests
import json

def realcustomer(doc, method=None):
    message = {
        "message": "A new event has occurred!",
        "data": {
            "doc": doc.as_dict(),
            "method": method
        }
    }

    url = 'http://localhost:4200'  
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(message), headers=headers)

    if response.status_code == 200:
        print('Message sent successfully')
    else:
        print('Failed to send message')

    frappe.publish_realtime(event='my_event', message=message)