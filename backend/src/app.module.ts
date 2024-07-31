import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nome-do-banco'), // Altere para o nome do seu banco
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
