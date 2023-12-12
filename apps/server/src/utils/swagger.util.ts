import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as SWAGGER_DOCS from '@/constants/swagger.constant';

/**
 * Initializes Swagger documentation for the Nest.js application.
 *
 * @param app - An instance of INestApplication representing the Nest.js application.
 */
export function initSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_DOCS.TITLE)
    .setDescription(SWAGGER_DOCS.API_DESCRIPTION)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
