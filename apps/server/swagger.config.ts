import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: any) {
  const options = new DocumentBuilder()
    .setTitle('Engineering Leader Board')
    .setDescription(apiDescription)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

const apiDescription = `An open source project for creating, completing, and competing for challenges. The application lists all the competing users ranked by their challenge points to a selected list of criteria. The app will feature the engineers and upon highlight will display their accomplishments and the points they have received for achieving any selected challenge.
Business Goal:
- Promote healthy competition.
- Create visibility into what everyone is accomplishing other than their day-to-day work.
- Recognize individuals who go above and beyond their expected duties.
- Promote networking.
- Promote knowledge sharing.`;
