module.exports = [
    "tmux new-session -s namesession -n \'status\' \\; \\\n",
    'send-keys "cd" Space "~" Space "&&" Space "clear" C-m \\; \\\n',
    "split-window -v -p 22 \\; \\\n",
    "send-keys \'htop\' C-m \\; \\\n",
    "select-pane -t 1 \\; \\\n",
    "split-window -h -p 34 \\; \\\n",
    'send-keys "cd" Space "~" Space "&&" Space "clear" C-m \\; \\\n',
    "select-pane -t 1 \\; \\\n",
];
