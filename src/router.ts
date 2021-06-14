import express from 'express';

export enum RestOperation {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE"
}

export enum Colors {
  Black = '\033[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\033[34m',
  Magenta = '\033[35m',
  Cyan = '\033[36m',
  White = '\033[37m'
}


function color(text: string, color: Colors) {
  return `${color}${text}\x1b[0m`;
}

export interface RouteProps {
  route: string
  handler: (req, res) => void,
  method: RestOperation
}

export interface RouterProps {
  app: any,
  routes: RouteProps[]
}

export const logRoute = (op: RestOperation, req: express.Request) => {
  let currentDate = new Date();
  console.log(`${color(currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString() + " " + op + " @ " + req.path, Colors.Green)}: 
  params: ${JSON.stringify(req.params)} 
  query: ${JSON.stringify(req.query)} 
  body: ${req.body ? JSON.stringify(req.body) : '{}'}\n`);
}

export const logError = (errorMsg: string) => {
  console.log(`${color(errorMsg, Colors.Red)}`);
}

export class Router {
  constructor(props: RouterProps) {
    props.routes.forEach((route) => {
      switch (route.method) {
        case RestOperation.GET:
          props.app.get(route.route, (req, res) => {
            logRoute(route.method, req);
            try {
              route.handler(req, res);
            } catch (err) {
              logError(err);
              throw (err);
            }
          });
          break;
        case RestOperation.POST:
          props.app.post(route.route, (req, res) => {
            logRoute(route.method, req);
            try {
              route.handler(req, res);
            } catch (err) {
              logError(err);
              throw (err);
            }
          });
          break;
        case RestOperation.PUT:
          props.app.put(route.route, (req, res) => {
            logRoute(route.method, req);
            try {
              route.handler(req, res);
            } catch (err) {
              logError(err);
              throw (err);
            }
          });
          break;
        case RestOperation.DELETE:
          props.app.delete(route.route, (req, res) => {
            logRoute(route.method, req);
            try {
              route.handler(req, res);
            } catch (err) {
              logError(err);
              throw (err);
            }
          });
          break;
        default:
          throw new Error("Error setting up router routes!");
      }
    });
  }
}