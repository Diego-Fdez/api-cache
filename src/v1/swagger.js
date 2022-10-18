import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

//Metadata info about our API
const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'CrossFit WOD API', version: '1.0.0' },
  },
  apis: ['src/v1/routes/workoutRoutes.js', 'src/database/Workout.js'],
};

//Docs JSON Format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs
export const swaggerDocs = (app, port) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('Version 1 Docs');
};
