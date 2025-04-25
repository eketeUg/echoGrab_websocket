import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TranscriptionDto } from './dto/transcription.dto';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway({
  path: '/echo',
  cors: {
    origin: '*', // Replace with your frontend domain
  },
})
export class socketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  onModuleInit() {
    this.server.on(`connection`, (socket) => {
      console.log(socket.id);
      console.log(`connected`);
    });
  }
  @SubscribeMessage('sendTranscription')
  sendTranscription(@MessageBody() transcriptionDto: TranscriptionDto) {
    console.log(transcriptionDto);
    this.server.emit('onMessage', {
      msg: `New Message`,
      content: transcriptionDto,
    });
    return;
  }
}
