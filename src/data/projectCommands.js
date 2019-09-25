module.exports = [
    'new-window \\; \\\n',
    'renamew $(basename pathname)\\; \\\n',
    'send-keys "cd" Space "pathname" Space "&&" Space "clear" C-m \\; \\\n',
    'split-window -h -p 34 \\; \\\n',
    'send-keys "cd" Space "pathname" Space "&&" Space "clear" C-m \\; \\\n',
    'split-window -v \\; \\\n',
    'send-keys "cd" Space "pathname" Space "&&" Space "clear" C-m \\; \\\n',
    'select-pane -t 1 \\; \\\n',
];
