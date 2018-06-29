module.exports = {
  '**/*.{js,jsx,json,css}': ['prettier --write', 'git add'],
  '**/*.{js,jsx,json,css,html}': ['yarn dist', 'git add dist']
};
