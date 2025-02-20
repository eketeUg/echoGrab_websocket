import { Module } from '@nestjs/common';
import { socketGateway } from './socket.gateway';

@Module({
  providers: [socketGateway],
})
export class SocketModule {}
