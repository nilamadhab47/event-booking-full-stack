/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *      type: object
 *      properties:
 *        desktopImage:
 *         type: string
 *         format: binary
 */
 class image {
    public message: string;
  
    public constructor(message: string) {
      this.message = message;
    }
  }
  
  export default image;