# Static Site Generator

This repository contains source code of a static site generator that looks for markdown files in a directory and converts their contents into HTML which is then used when creating the HTML files using JavaScript (Node.js).

This project has helped me learn about setting up a server in Node.js, navigating through files and folders in Node.js, working with async/await JavaScript functions & working with regular expressions (Regex).

## Prerequisites
+ Node - v16.0.0 + (make sure to add the path to the nodejs application in your system environment variables so as to run the node command from anywhere when using the terminal)

## Project setup
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

## How it works/usage
First, some markdown files with content need to exist inside the `./pages` (for pages to be generated) or `./posts` (for articles/posts to be generated) folders for any of the HTML pages to be generated. If none exists, the `index.html` page generated will be a blank page containing only one link (to the Homepage). When adding your markdown files in either the `./pages` or `./posts` folders, use kebab-case (e.g: `kebab-case`) to name your files if the name has more than one word followed by the `.md` extension e.g: `file-name.md`.

After adding your markdown files, run `node parser` to generate its respective HTML file. The last thing left to do is to run `node server`. If the Node server was already running when you ran the `node parser` command, you have to restart it (by pressing `ctrl + c` to stop it then `node server` to start it again) in order to see any changes or files added.

## Features pending
- [ ] Custom theme
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