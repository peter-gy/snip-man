import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { configuration } from "./lib/config/configuration";
import { validationSchema } from "./lib/config/validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: validationSchema
    })
  ]
})
export class AppModule {
}
