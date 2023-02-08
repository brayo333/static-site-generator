const path = require("path");
const fs = require("fs");
const { rules } = require("./rules");

const EXTENSION = ".md";

let posts = [];
let pages = [];

// The function provides html templating based on whether the source md file was meant for a post or a page
function HTMLTemplate(type, htmlContent) {
  let finalContent;

  switch (type) {
    case "pages":
      finalContent = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <title>This is a page</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                          </head>

                          <body>
                            <div class="w-full p-5">
                              ${htmlContent}
                            </div>
                          </body>
                      </html>`;
      break;

    case "posts":
      finalContent = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <title>This is a post</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                          </head>

                          <body>
                            <div class="w-full p-5">
                              ${htmlContent}
                            </div>
                          </body>
                      </html>`;
      break;

    default:
      finalContent = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <title>This is something</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                          </head>

                          <body>
                            <div class="w-full p-5">
                              ${htmlContent}
                            </div>
                          </body>
                      </html>`;
  }

  return finalContent;
}

// The function adds the html content passed to it after conversion into a html file with file path specified
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

// The function loops through a directory/folder and looks for md files & converts the content into html content
function loopDirectoryMDFiles(directoryName) {
  fs.readdir(directoryName, (err, files) => {
    if (err) throw err;

    for (let file of files) {
      if (path.parse(file).ext === EXTENSION) {
        if (directoryName == "pages")
          pages.push({ name: path.parse(file).name });
        if (directoryName == "posts")
          posts.push({ name: path.parse(file).name });

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

              html = HTMLTemplate(directoryName, html);

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

function writeIndexHTML() {
  let pagesLink;
  let indexFile

  pages.forEach(([page]) => {
    pagesLink = pagesLink.concat(
     "<a href=`/${page.name}` class=`capitalize`>`${page.name}`</a>"
    );
  });

  indexFile = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <title>Website made using a custom static site generator</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                          </head>

                          <body>
                            <div class="w-full grid grid-col grid-cols-5 gap-3">
                              <nav class="col-span-1 h-screen p-5 flex flex-col">
                                <div class="w-full h-full flex flex-col overflow-y-auto">
                                  <a href="/">Home</a>
                                  ${pagesLink}
                                </div>
                              </nav>

                              <div class="col-span-4 w-full p-5 flex flex-col">
                                ${posts.forEach((post) => {
                                  "<p>Hello there</p>";
                                })}
                              </div>
                            </div>
                          </body>
                      </html>`;

  writeHTMLFile("public/index.html", indexFile);
}

// Convert the posts markdown files
loopDirectoryMDFiles("posts");

// Convert the pages markdown files
loopDirectoryMDFiles("pages");

// Write the index file for the HOme page
writeIndexHTML();
