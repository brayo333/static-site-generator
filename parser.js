const path = require("path");
const fs = require("fs");
const { rules } = require("./rules");

const EXTENSION = ".md";

function writeHTMLFile(filePath, htmlContent) {
  fs.open(filePath, "w+", function (err, fd) {
    if (err) {
      return console.error(err);
    }

    fs.writeFile(filePath, htmlContent, function (err) {
      if (err) console.log(err);
      else console.log(`File '${filePath}' has been created or updated`);
    });

    fs.close(fd, function (err) {
      if (err) throw err;
    });
  });
}

function loopDirectoryMDFiles(directoryName) {
  fs.readdir(directoryName, (err, files) => {
    if (err) throw err;

    for (let file of files) {
      if (path.parse(file).ext === EXTENSION) {
        fs.open(`${directoryName}/${file}`, "r", function (err, fd) {
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

              writeHTMLFile(
                `public/${directoryName}/${path.parse(file).name}.html`,
                html
              );
            }

            fs.close(fd, function (err) {
              if (err) throw err;
            });
          });
        });
      }
    }
  });
}

// Convert the posts markdown files
loopDirectoryMDFiles("posts");

// Convert the pages markdown files
loopDirectoryMDFiles("pages");
