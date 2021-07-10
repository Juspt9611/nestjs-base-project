import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: 5432,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: configService.get('DB_SRYNC'),
        // ssl: {
        //  rejectUnauthorized: false
        // },
        entities: [
          __dirname + '/../core/**/*.entity{.ts,.js}',
        ],
        migrationsTableName: "migrations",
        migrations: [
          __dirname + '/../../migration/*{.ts,.js}',
        ],
        extra: {
          max: 25,
          min: 1
        },
      })
    }),
  ],
})
export class DatabaseModule { }