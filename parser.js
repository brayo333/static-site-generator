const path = require("path");
const fs = require("fs");
const { rules } = require("./rules");

const EXTENSION = ".md";

function seperateWord(value) {
  var title = "";
  var temp = value.split("-");
  title = temp.join(" ");

  return title;
}

// Function used for paths creation on the html files
async function checkForFiles() {
  var contents = [[], []];
  try {
    const pages = await fs.promises.readdir("pages");

    for (let file of pages) {
      try {
        if (path.parse(file).ext === EXTENSION) {
          // if (directoryName == "pages")
          contents[0].push({ name: path.parse(file).name });
          // console.log(path.parse(file).name);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    const posts = await fs.promises.readdir("posts");

    for (let file of posts) {
      try {
        if (path.parse(file).ext === EXTENSION) {
          // if (directoryName == "pages")
          contents[1].push({ name: path.parse(file).name });
          // console.log(path.parse(file).name);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    return contents;
  } catch (error) {
    console.log(error);
  }
}

// The function provides html templating based on whether the source md file was meant for a post or a page
function HTMLTemplate(type, htmlContent, fileName) {
  let finalContent;
  let pageLinks = "";

  checkForFiles().then(
    (data) => {
      for (let i = 0; i < data[0].length; i++) {
        pageLinks = pageLinks.concat(
          "<a href=",
          `/${data[0][i].name}`,
          " class='capitalize mt-3'>",
          seperateWord(data[0][i].name),
          "</a>"
        );
      }

      finalContent = `<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="utf-8" />
                            <title>This is a ${
                              type == "posts" ? "post" : "page"
                            }</title>
                            <script src="https://cdn.tailwindcss.com"></script>
                          </head>

                          <body>
                            <div class="w-full grid grid-col grid-cols-5 gap-3">
                              <nav class="col-span-1 h-screen p-5 flex flex-col">
                                <div class="w-full h-full flex flex-col overflow-y-auto">
                                  <a href="/">Home</a>
                                  ${pageLinks}
                                </div>
                              </nav>

                              <div class="col-span-4 w-full max-w-7xl p-5 flex flex-col">
                                ${htmlContent}
                              </div>
                            </div>
                          </body>
                      </html>`;

      writeHTMLFile(
        `public/${type}/${fileName}.html`,
        finalContent
      );
    },
    (error) => {
      console.log(error);
    }
  );
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

              html = HTMLTemplate(directoryName, html, path.parse(file).name);

              // writeHTMLFile(
              //   `public/${directoryName}/${path.parse(file).name}.html`,
              //   html
              // );
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

// Function for writing the home page
function writeIndexHTML() {
  var indexFile;
  var pageLinks = "";
  var postsLinks = "";

  checkForFiles().then(
    (data) => {
      for (let i = 0; i < data[0].length; i++) {
        pageLinks = pageLinks.concat(
          "<a href=",
          `/${data[0][i].name}`,
          " class='capitalize mt-3'>",
          seperateWord(data[0][i].name),
          "</a>"
        );
      }

      for (let i = 0; i < data[1].length; i++) {
        postsLinks = postsLinks.concat(
          "<div class='w-full mb-5'><a href=",
          `/posts/${data[1][i].name}`,
          " class='flex flex-col capitalize text-xl font-medium'>",
          seperateWord(data[1][i].name),
          "<div class='mt-3'><button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>See post</button></div></a><hr class='h-[2px] mt-2 bg-blue-500' /></div>"
        );
      }

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
                                  ${pageLinks}
                                </div>
                              </nav>

                              <div class="col-span-4 w-full max-w-7xl p-5 flex flex-col">
                                <div class="w-full flex flex-col">
                                  ${postsLinks}
                                </div>
                              </div>
                            </div>
                          </body>
                      </html>`;

      writeHTMLFile("public/index.html", indexFile);
    },
    (error) => {
      console.log(error);
    }
  );
}

// Convert the posts markdown files
loopDirectoryMDFiles("posts");

// Convert the pages markdown files
loopDirectoryMDFiles("pages");

// Write the index file for the Home page
writeIndexHTML();
