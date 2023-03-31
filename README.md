# Zephyr – Build highlighted syntax trees in Figma

Zephyr is designed for people that want highlighted code blocks in Figma for use in designing code editors, and other software engineering tools.

These tools have many states and feature that require being able to style individual text notes.

Zephyr was build out of frustration of the current state of plugins in this space and needing more control over the output.

## Roadmap

- [x] Basic output: JSON -> structured text slice by node in figma
- [x] Autolayout aware outputs
- [ ] Syntactic slicing using Tresitter for a single language (Rust)
- [x] Highlight syntax tree in a single theme
- [ ] Controling styling using [Tokens Studio](https://tokens.studio/)
- [ ] Add a list of selectable languages
- [ ] Add a list of selectable themes

## API Roadmap

Use a Next.js API to process the code from figma

- [ ] Recieve a string from figma and send a response
- [ ] Return a highlighted array from a Rust string
- [ ] Use multiple routes or arguments to specify the language to use for highlighting
