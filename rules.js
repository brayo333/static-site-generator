const rules = [
  //header rules
  [/#{6}\s?([^\n]+)/g, "<h6 class='mb-3 font-medium'>$1</h6>"],
  [/#{5}\s?([^\n]+)/g, "<h5 class='mb-3 text-lg font-medium'>$1</h5>"],
  [/#{4}\s?([^\n]+)/g, "<h4 class='mb-3 text-xl font-medium'>$1</h4>"],
  [/#{3}\s?([^\n]+)/g, "<h3 class='mb-3 capitalize text-2xl font-medium'>$1</h3>"],
  [/#{2}\s?([^\n]+)/g, "<h2 class='mb-5 capitalize text-3xl font-medium'>$1</h2>"],
  [/#{1}\s?([^\n]+)/g, "<h1 class='mb-5 capitalize text-4xl font-medium'>$1</h1>"],

  //bold, italics and paragragh rules
  [/\*{2}\s?([^\n]+)\*{2}/g, "<b>$1</b>"],
  [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
  [/_{2}([^_]+)_{2}/g, "<b>$1</b>"],
  [/_([^_`]+)_/g, "<i>$1</i>"],
  [/([^\n]+\n?)/g, "<p>$1</p>"],

  //links
  [
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" style="text-decoration: none;" class="bg-blue-500">$1</a>',
  ],

  //highlights
  [
    /^`{3}(\n+[^\n]+\n+)`{3}$/gm,
    '<div style="background-color:grey;color:white;text-decoration: none;border-radius: 3px;padding:1px 2px;"><code>$1</code></div>',
  ],
  [
    /(`)(\s?[^\n,]+\s?)(`)/g,
    '<code style="background-color:grey;color:white;text-decoration: none;border-radius: 3px;padding:1px 2px;">$2</code>',
  ],

  // blockquote
  // [/\>\s?([^\n]+)/g, "<blockquote><p>$2</p></blockquote>"],

  //Lists
  [/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$2</li></ul>"],
  [/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$2</li></ul>"],

  //Image
  [
    /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
    '<img src="$2" alt="$1" title="$3" />',
  ],
];

exports.rules = rules;
