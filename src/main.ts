import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api/v1');
    app.enableCors({
        origin: '*',
        methods: 'GET,PUT,PATCH,POST',
        preflightContinue: false,
    });
    app.useGlobalPipes(new ValidationPipe());
    setupSwagger(app);
    await app.listen(3001, function() {
        console.log('server is running on port 3001');
    });
}

bootstrap();
