import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
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
import { Photo } from 'entities/Photo';
import { ArticleService } from './services/article.service';
import { ArticleController } from './controllers/article.controller';
import { PhotoService } from './services/photo.service';
import { Workout } from 'entities/Workout';
import { WorkoutService } from './services/workout.service';
import { WorkoutController } from './controllers/workout.controller';
import { Stats } from 'entities/Stats';
import { StatsController } from './controllers/stats.controller';
import { StatsService } from './services/stats.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfig.hostname,
      port: 3306,
      username: DatabaseConfig.username,
      password: DatabaseConfig.password,
      database: DatabaseConfig.database,
      entities: [Admin, User, Article, Photo, Workout, Stats],
    }),
    TypeOrmModule.forFeature([Admin, User, Article, Photo, Workout, Stats]),
  ],
  controllers: [
    AppController,
    AdminController,
    AuthController,
    ArticleController,
    UserController,
    WorkoutController,
    StatsController
  ],
  providers: [
    AdminService,
    ArticleService,
    PhotoService,
    UserService,
    WorkoutService,
    StatsService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude('auth/*')
    //.forRoutes('api/*');
  }
}
