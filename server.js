var http = require("http");
const path = require("path");
const fs = require("fs").promises;

const host = "localhost";
const port = 5000;
let indexFile;
let posts = [];
let pages = [];

const requestListener = function (req, res) {
  if (req.url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(indexFile);
  }

  pages.forEach((page) => {
    if (req.url == `/${page.name}`) {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(page.page);
    }
  });

  posts.forEach((post) => {
    if (req.url == `/posts/${post.name}`) {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(post.page);
    }
  });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

fs.readFile(__dirname + "/public/index.html")
  .then((contents) => {
    indexFile = contents;
  })
  .catch((err) => {
    console.error(`Could not read the file: ${err}`);
    process.exit(1);
  });

fs.readdir("public/pages")
  .then((files) => {
    for (let file of files) {
      if (path.parse(file).ext == ".html") {
        fs.readFile(__dirname + `/public/pages/${path.parse(file).name}.html`)
          .then((contents) => {
            pages.push({ name: path.parse(file).name, page: contents });
          })
          .catch((err) => {
            console.error(`Could not read the file: ${err}`);
            process.exit(1);
          });
      }
    }
  })
  .catch((err) => {
    console.error(`Could not read from the posts directory: ${err}`);
    process.exit(1);
  });

fs.readdir("public/posts")
  .then((files) => {
    for (let file of files) {
      if (path.parse(file).ext == ".html") {
        fs.readFile(__dirname + `/public/posts/${path.parse(file).name}.html`)
          .then((contents) => {
            posts.push({ name: path.parse(file).name, page: contents });
          })
          .catch((err) => {
            console.error(`Could not read the file: ${err}`);
            process.exit(1);
          });
      }
    }
  })
  .catch((err) => {
    console.error(`Could not read from the posts directory: ${err}`);
    process.exit(1);
  });

exports.posts = posts;
exports.pages = pages;
