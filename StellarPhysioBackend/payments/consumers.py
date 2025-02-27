# consumers.py
'''Note that the use of Django Channels has been deprecated in all future versions third party pusher_client will be used due to support in hosting platforms'''
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TransactionConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Get the service ID from the URL route
        self.service_id = self.scope['url_route']['kwargs']['service_id']
        self.group_name = f'transactions_{self.service_id}'

        # Join the group specific to the service ID
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave the service-specific group
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    # Receive message from the group
    async def send_transaction_status(self, event):
        message = event['message']
        status = event['status']
        service_id = event['id']

        # Send the message to the WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'status': status,
            'id': service_id
        }))