const http = require("http");

const host = "127.0.0.1";
const port = 7000;

const stats = new Map();

function notFound(res) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end("Bad Request\n");
}

const server = http.createServer((req, res) => {
  console.log("Новый запрос");
  if (stats.has(req.headers["user-agent"]))
    stats.set(
      req.headers["user-agent"],
      stats.get(req.headers["user-agent"]) + 1
    );
  else stats.set(req.headers["user-agent"], 1);

  switch (req.method) {
    case "GET": {
      switch (req.url) {
        case "/": {
          res.end("Hello world");
          break;
        }
        case "/stats": {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          let result = `<table>`;
          for (const [key, value] of stats) {
            result += `<tr>`;
            result += `<td>${key}</td><td>${value}</td>`;
            result += `</tr>`;
          }
          result += `</table>`;
          res.end(result);
          break;
        }
        default: {
          notFound(res);
          break;
        }
      }

      break;
    }
    case "POST": {
      switch (req.url) {
        case "/comments": {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/json");
          res.end('{"hello":"world"}');
          break;
        }
        default: {
          notFound(res);
          break;
        }
      }

      break;
    }
    default: {
      notFound(res);
      break;
    }
  }
});

server.listen(port, host, () => {
  console.log("Начало работы");
  console.log(`host: ${host}\nport: ${port}`);
});
