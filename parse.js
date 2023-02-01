const path = require("path");
const fs = require("fs");
const { rules } = require("./rules");

const EXTENSION = ".md";

// const readFiles = async (directory) => {
//   const files = await fs.promises.opendir(directory);

//   for await (const file of files) {

//   }
// };

// readFiles("posts").catch((e) => console.log(e));

let html;

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
                          <title>Static site generator</title>
                          <script src="https://cdn.tailwindcss.com"></script>
                        </head>

                        <body>
                          ${html}
                        </body>
                    </html>`;

            // console.log(html);

            // Write new pages here
            fs.open(`public/posts/${path.parse(file).name}.html`, "w+", function (err, fd) {
              if (err) {
                return console.error(err);
              }

              fs.writeFile(
                `public/posts/${path.parse(file).name}.html`,
                html,
                function (err) {
                  if (err) console.log(err);
                  else console.log(`File ${path.parse(file).name}.html has been created or updated`);
                }
              );

              fs.close(fd, function (err) {
                if (err) throw err;
              });
            });
          }

          // Close the opened file.
          fs.close(fd, function (err) {
            if (err) throw err;
          });
        });
      });
    }
  }
});
