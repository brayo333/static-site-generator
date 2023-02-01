const path = require("path");
const fs = require("fs");
const { rules } = require("./rules");

const EXTENSION = ".md";

let html;

// Convert the posts markdown files
fs.readdir("posts", (err, files) => {
  if (err) throw err;

  for (let file of files) {
    if (path.parse(file).ext === EXTENSION) {
      fs.open(`posts/${file}`, "r", function (err, fd) {
        if (err) {
          return console.error(err);
        }

        var buffr = new Buffer.alloc(1024);

        fs.read(fd, buffr, 0, buffr.length, 0, function (err, bytes) {
          if (err) throw err;

          // Print only read bytes to avoid junk.
          if (bytes > 0) {
            let html = buffr.slice(0, bytes).toString();

            rules.forEach(([rule, template]) => {
              html = html.replace(rule, template);
            });

            html = `<!DOCTYPE html>
                      <html lang="en">
                        <head>
                          <meta charset="utf-8" />
                          <title>This is a post</title>
                          <script src="https://cdn.tailwindcss.com"></script>
                        </head>

                        <body>
                          <div class="w-full p-5">
                            ${html}
                          </div>
                        </body>
                    </html>`;

            // Writing new post html pages here
            fs.open(
              `public/posts/${path.parse(file).name}.html`,
              "w+",
              function (err, fd) {
                if (err) {
                  return console.error(err);
                }

                fs.writeFile(
                  `public/posts/${path.parse(file).name}.html`,
                  html,
                  function (err) {
                    if (err) console.log(err);
                    else
                      console.log(
                        `File ${
                          path.parse(file).name
                        }.html has been created or updated as a post`
                      );
                  }
                );

                fs.close(fd, function (err) {
                  if (err) throw err;
                });
              }
            );
          }

          // Close the opened post markdown file.
          fs.close(fd, function (err) {
            if (err) throw err;
          });
        });
      });
    }
  }
});

// Convert the pages markdown files
fs.readdir("pages", (err, files) => {
  if (err) throw err;

  for (let file of files) {
    if (path.parse(file).ext === EXTENSION) {
      fs.open(`pages/${file}`, "r", function (err, fd) {
        if (err) {
          return console.error(err);
        }

        var buffr = new Buffer.alloc(1024);

        fs.read(fd, buffr, 0, buffr.length, 0, function (err, bytes) {
          if (err) throw err;

          // Print only read bytes to avoid junk.
          if (bytes > 0) {
            let html = buffr.slice(0, bytes).toString();

            rules.forEach(([rule, template]) => {
              html = html.replace(rule, template);
            });

            html = `<!DOCTYPE html>
                      <html lang="en">
                        <head>
                          <meta charset="utf-8" />
                          <title>This is a page</title>
                          <script src="https://cdn.tailwindcss.com"></script>
                        </head>

                        <body>
                          <div class="w-full p-5">
                            ${html}
                          </div>
                        </body>
                    </html>`;

            // Writing new page html pages here
            fs.open(
              `public/pages/${path.parse(file).name}.html`,
              "w+",
              function (err, fd) {
                if (err) {
                  return console.error(err);
                }

                fs.writeFile(
                  `public/pages/${path.parse(file).name}.html`,
                  html,
                  function (err) {
                    if (err) console.log(err);
                    else
                      console.log(
                        `File ${
                          path.parse(file).name
                        }.html has been created or updated page`
                      );
                  }
                );

                fs.close(fd, function (err) {
                  if (err) throw err;
                });
              }
            );
          }

          // Close the opened post markdown file.
          fs.close(fd, function (err) {
            if (err) throw err;
          });
        });
      });
    }
  }
});
