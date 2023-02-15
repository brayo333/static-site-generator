const rules = [
  //header rules
  [/^#{6}\s?([^\n]+)/gm, "<h6 class='mb-3 font-medium'>$1</h6>"],
  [/^#{5}\s?([^\n]+)/gm, "<h5 class='mb-3 text-lg font-medium'>$1</h5>"],
  [/^#{4}\s?([^\n]+)/gm, "<h4 class='mb-3 text-xl font-medium'>$1</h4>"],
  [
    /^#{3}\s?([^\n]+)/gm,
    "<h3 class='mb-3 capitalize text-2xl font-medium'>$1</h3>",
  ],
  [
    /^#{2}\s?([^\n]+)/gm,
    "<h2 class='mb-5 capitalize text-3xl font-medium'>$1</h2>",
  ],
  [
    /^#{1}\s?([^\n]+)/gm,
    "<h1 class='mb-5 capitalize text-4xl font-medium'>$1</h1>",
  ],

  //bold, italics
  [/\*{2}\s?([^\n]+)\*{2}/g, "<b>$1</b>"],
  [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
  [/_{2}([^_]+)_{2}/g, "<b>$1</b>"],
  [/_([^_`]+)_/g, "<i>$1</i>"],

  //code block highlight
  [
    /^```([\s\S]*?)^```$/gm,
    '<div class="py-1 px-2 bg-gray-500 rounded-sm"><code style="color:white;text-decoration: none;">$1</code></div><br />',
  ],
  //code highlight
  [
    /[^`]`{1}(\s?[^\n`]+\s?)`{1}/g,
    '<span><code style="background-color:grey;color:white;text-decoration: none;border-radius: 3px;padding:1px 2px;">$1</code></span>',
  ],

  // blockquote
  [
    /\n\>+\s?([^\n]+)/g,
    "<blockquote class='p-4 my-4 border-l-4 border-gray-300 bg-gray-50'><p>$1</p></blockquote>",
  ],

  //Lists
  [/\n\+\s?([^\n]+)/g, "<ul><li>• $1</li></ul>"],
  [/\n\*\s?([^\n]+)/g, "<ul><li>• $1</li></ul>"],

  //Image
  [
    /\!\[([^\]]+)\]\((\S+)\)/g,
    '<img src="$2" alt="$1" style="width: 100%; height: 100%; object-fit: contain;" />',
  ],

  //links
  [/\[([^\n]+)\]\(([^\n]+)\)/g, '<span><a href="$2" class="text-blue-500">$1</a></span>'],

  //paragragh
  [/^.+[\r\n]+(\r?\n|$)/gm, "<p>$&</p>"],
];

exports.rules = rules;
