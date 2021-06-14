import express from 'express';
import { Router, RestOperation } from './router';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const r = new Router({
  app,
  routes: [
    {
      route: "/",
      method: RestOperation.GET,
      handler: (req, res) => {
        res.json({
          status: "GET OK"
        });
      }
    },
    {
      route: "/",
      method: RestOperation.POST,
      handler: (req, res) => {
        res.json({
          status: "POST OK"
        });
      }
    },
    {
      route: "/",
      method: RestOperation.PUT,
      handler: (req, res) => {
        res.json({
          status: "PUT OK"
        });
      }
    },
    {
      route: "/",
      method: RestOperation.DELETE,
      handler: (req, res) => {
        res.json({
          status: "DELETE OK"
        });
      }
    }
  ]
});


app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});