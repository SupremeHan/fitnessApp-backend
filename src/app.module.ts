import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { DatabaseConfig } from 'config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'entities/Admin';
import { User } from 'entities/User';
import { Article } from 'entities/Article';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: 3306,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [
        Admin,
        User,
        Article
      ]
    }),
    TypeOrmModule.forFeature([
      Admin,
      User,
      Article
    ])
  ],
  controllers: [
                AppController,
                AdminController,
                AuthController,
                UserController
              ],
  providers: [
              AdminService,
              UserService
            ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('auth/*')
      .forRoutes('api/*');
  }
}
