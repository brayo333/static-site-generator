# Static Site Generator

This repository contains source code of a static site generator that looks for markdown files in a directory and converts their contents into HTML which is then used when creating the HTML files using JavaScript (Node.js).

I used JavaScript for this project because I have never done file/folder reading in Node.js and never created a server using Node.js and I thought it would be interesting to learn it through this project.

This project has helped me learn about setting up a server in Node.js, navigating through files and folders in Node.js, working with async/await JavaScript functions & working with regular expressions (Regex).

## Prerequisites
+ Node - v16.0.0 + (make sure to add the path to the nodejs application in your system environment variables so as to run the node command from anywhere when using the terminal)

## Project setup/Installation
First clone the project using the following command `git clone https://github.com/brayo333/static-site-generator.git` in a terminal.

Next, run `node parser` or `node parser.js` to generate the HTML files (index.html included) from any existing markdown files inside the `./pages` & `./posts` folders.

Finally, start the Node server locally using `node server` or `node server.js` command and open [http://localhost:5000](http://localhost:5000) on the browser when the server is running.

## Project folder structure
```
├── pages
	├── about.md
├── posts
├── public
	├── pages
          └── .gitignore
	├── posts
          └── .gitignore
	└── .gitignore
├── LICENSE.txt
├── parser.js
├── README.md
├── rules.js
└── server.js
```

## Usage

### Creating the markdown files

First, some markdown files with content need to exist inside the `./pages` (for pages to be generated) or `./posts` (for articles/posts to be generated) folders for any of the HTML pages to be generated. If none exists, the `index.html` page generated will be a blank page containing only one link (to the Homepage). When adding your markdown files in either the `./pages` or `./posts` folders, use kebab-case (e.g: `kebab-case`) to name your files if the name has more than one word followed by the `.md` extension e.g: `file-name.md`.

### Generating the HTML files

After adding your markdown files, run `node parser` to generate their respective HTML files.

### Serving the files on a local Node.js server

The last thing left to do is to run `node server`. If the Node server was already running when you ran the `node parser` command, you have to restart it (by pressing `ctrl + c` to stop it then running `node server` to start it again) in order to see any changes or files added.

## How it works

### rules.js
This file contains regex patterns for the following:
+ Heading tags (H1 to H6)
+ Bold tags
+ Italics tags
+ Code block highlights
+ Code highlight tags
+ Blockquote tags
+ Unordered list tags
+ Image tags
+ Links tags
+ Paragraph tags


### parser.js

The `parser.js` file has two main functions that handle writing the HTML files `loopDirectoryMDFiles()` and `writeIndexHTML()`. The former function handles searching for markdown files (files with the `.md` extension) in the specified directory (passed as an argument to the function) using a loop and converts the markdown file contents into HTML with the help of the regex patterns found inside `rules.js`. This function calls another function named `HTMLTemplate()` which uses the HTML contents which were converted from markdown and writes a HTML file using the contents which is then saved inside `./public/pages` (for pages) or `./public/posts` (for posts).

The function is called twice. First, to search for the markdown files found in the pages folder (`./pages`) and the second time to search for files in the posts folder (`./posts`).

The `writeIndexHTML()` function handles writing the `index.html` file (saved inside `./public` folder) which acts as the home page for the static site generated. It calls another function in the `parser.js` named `checkForFiles()` to assist in determining which links will exist when the server is running and adds the links (both for posts & pages) to the home page.

Running the `node parser` or `node parser.js` command in a terminal runs the `parser.js` file. You will see something similar to the image in the terminal:

![Sample terminal message](https://objectstorageapi.brianmulaa.com/storage/1676455119_JLTCFM/1676455119_j7vA.jpg)

If the `./public/pages/` folder and the `./public/posts/` do not exist the parser command will bring up an error. You need to create the `pages` & `posts` folder inside the `public` folder if they do NOT exist.

### server.js
This is the file that handles the server, host, port number & serving up the HTML files that exist.

Running the `node server` or `node server.js` command in a terminal runs the `server.js` file. You will see something similar to the image in the terminal:

![Sample terminal message](https://objectstorageapi.brianmulaa.com/storage/1676455119_JLTCFM/1676455250_pWni.jpg)

## Challenges faced
The main challenge faced was coming up with efficient regex patterns to match with patterns in the markdown files.

## Features pending
- [ ] Custom theme/templating system
- [ ] Layout support for smaller screen widths e.g: mobile screens (generated site currently optimized for larger screens only)
- [ ] Addition of more markdown rules
- [ ] Automatic server restart upon running the `node parser` command to reflect changes if server was already running

## Credits
I would like to give credit to the authors of these two blog posts which help me to understand more on writing Regular Expressions:
+ [Creating Your Own Markdown Parser](https://betterprogramming.pub/create-your-own-markdown-parser-bffb392a06db)
+ [How to write Regular Expressions?](https://www.geeksforgeeks.org/write-regular-expressions/)

Also I would like to show appreciation for this [tool](https://regex101.com/) which helped me come up with some of the regex patterns.

## License

This package is an open-sourced software licensed under the [MIT license](LICENSE.txt).