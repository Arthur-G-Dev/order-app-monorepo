import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import cors from 'cors'
import { Server } from '@overnightjs/core';
import {NextFunction, Request, Response} from 'express';
import { AppDataSource, Order } from "@package/database/src";


const options: cors.CorsOptions = {
  credentials: true,
  origin: '*',
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false
}

class NormalRouterServer extends Server {

  private readonly FRONT_END_MSG = 'OvernightJS with standard express router started.';
  private readonly START_MSG = 'OvernightJS with standard express router started on port: ';


  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(cors(options))
    this.setupControllers();
    // error handler
    this.app.use((err: any, _: Request, res: Response, __: NextFunction) => {
      const status = err.status || 500
      res.status(status)
      const response = {
        error: err.message,
        code: err.code,
        stack: status > 499
          ? err.stack
          : undefined
      }
      res.json(response)
    })
  }


  private setupControllers(): void {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
      const controller = (controllers as any)[name];
      if (typeof controller === 'function') {
        controllerInstances.push(new controller());
      }
    }
    super.addControllers(controllerInstances);
  }

  public async initPostgres () {
    AppDataSource.initialize().then(async () => {

      console.log("Inserting a new order into the database...")
      const order = new Order()
      order.type = "Margarita"
      order.toppings = ['mayo', 'cheese']
      await AppDataSource.manager.save(order)
      console.log("Saved a new order with id: " + order.id)

      console.log("Loading orders from the database...")
      const orders = await AppDataSource.manager.find(Order)
      console.log("Loaded orders: ", orders)

      console.log("Here you can setup and run express / fastify / any other framework.")

      return "DB up and running..."

    }).catch(error => console.log(error))
  }


  public start(port?: number): void {
    this.app.use((_: Request, res: Response) => {
      res.status(404).json({
        message: '0_o Route not found'
      })
    })
    this.app.listen(port, () => {
      console.log(`Server started on ${port} port`)
    });
  }
}

export default NormalRouterServer;