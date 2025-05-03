if (process.argv.length < 3) {
  console.log("No arguments set");
  process.exit(0);
}
const fs = require("node:fs");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const src = __dirname + "/src";
const controllers = src + "/controllers";
const routes = src + "/routes";

const functions = {};

functions.route = (method) => {
  const methods = {
    "create": () => {
      if (!process.argv[3]) {
        console.log("Action \"" + method[1] + "\" requires additional argument");
        return;
      }

      if (fs.existsSync(routes + "/" + process.argv[3] + ".ts") || fs.existsSync(controllers + "/" + process.argv[3] + ".ts")) {
        console.log("This route exists already");
        return;
      }

      const uppercaseName = process.argv[3].charAt(0).toUpperCase() + process.argv[3].slice(1);

      fs.writeFileSync(controllers + "/" + process.argv[3] + ".ts", `
import { Request, Response, NextFunction } from "express"

export const create${uppercaseName} = async (req: Request, res: Response, next: NextFunction) => {
    res.send('Created');
}

export const delete${uppercaseName} = async (req: Request, res: Response, next: NextFunction) => {
    res.send('deleted');
}

export const modify${uppercaseName} = async (req: Request, res: Response) => {
    res.send('Modified');
}

export const get${uppercaseName} = async (req: Request, res: Response) => {
    res.send('Reading');
}

export const get${uppercaseName}ById = async (req: Request, res: Response) => {
    res.send('${uppercaseName} ID is ' + req.params.id);
}
                `);

      fs.writeFileSync(routes + "/" + process.argv[3] + ".ts", `
import express from 'express';
import {create${uppercaseName}, delete${uppercaseName}, get${uppercaseName}, modify${uppercaseName}, get${uppercaseName}ById} from '../controllers/${process.argv[3]}';
const router = express.Router();

router.post('/', create${uppercaseName});
router.get('/', get${uppercaseName});
router.get('/:id', get${uppercaseName}ById);
router.patch('/', modify${uppercaseName});
router.delete('/', delete${uppercaseName});

export {router as ${process.argv[3]}Route};
            `);
      let routesFile = fs.readFileSync(src + "/routes.ts", {
        encoding: "utf8"
      }).replace("// ROUTE IMPORTS START", `// ROUTE IMPORTS START
import {${process.argv[3]}Route} from './routes/${process.argv[3]}';`)
        .replace("// ROUTES START", `// ROUTES START
    app.use('/${process.argv[3]}', ${process.argv[3]}Route);`);

      fs.writeFileSync(src + "/routes.ts", routesFile);

    },
    "remove": () => {
      if (!process.argv[3]) {
        console.log("Action \"" + method[1] + "\" requires additional argument");
        return;
      }

      if (fs.existsSync(routes + "/" + process.argv[3] + ".ts")) {
        try {
          fs.rm(routes + "/" + process.argv[3] + ".ts", (err) => {
            if (err) console.log(err);
          });
        }
        catch(err) {
          console.error("Failed to remove route file");
        }
      }
      if (fs.existsSync(controllers + "/" + process.argv[3] + ".ts")) {
        try {
          fs.rm(controllers + "/" + process.argv[3] + ".ts", (err) => {
            if (err) console.log(err);
          });
        }
        catch (err) {
          console.error("Failed to remove controller file");
        }
      }

      let routesFile = fs.readFileSync(src + "/routes.ts", {
        encoding: "utf8"
      }).replace(`import {${process.argv[3]}Route} from './routes/${process.argv[3]}';`, "")
        .replace(`    app.use('/${process.argv[3]}', ${process.argv[3]}Route);`, "");

      fs.writeFileSync(src + "/routes.ts", routesFile);
    },
  };

  if (!methods[method[1]]) {
    console.error("Action \"" + method[1] + "\" not found under main method \"" + method[0] + "\"");
    return;
  }

  methods[method[1]](method);
};

functions.model = (method) => {
  const methods = {
    "create": () => {},
    "remove": () => {},
    "modify": () => {}
  };

  if (!methods[method[1]]) {
    console.error("Action \"" + method[1] + "\" not found under main method \"" + method[0] + "\"");
    return;
  }

  methods[method[1]](method);
};
// Generate JWT authentication keys
functions.auth = (method) => {

  const methods = {
    "generate": () => {

      console.log("JWT_REFRESH_SECRET=" + crypto.randomBytes(32).toString("hex"));
      console.log("JWT_ACCESS_SECRET=" + crypto.randomBytes(32).toString("hex"));

    },
    "remove": () => {}
  };

  if (!methods[method[1]]) {
    console.error("Action \"" + method[1] + "\" not found under main method \"" + method[0] + "\"");
    return;
  }
  methods[method[1]](method);

};

const firstArgument = process.argv[2].split(":");

if (functions[firstArgument[0]]) {
  functions[firstArgument[0]](firstArgument);
}
else {
  console.log("Invalid command");
}
