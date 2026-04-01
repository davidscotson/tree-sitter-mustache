# Moodle Mustache Extensions

This parser supports Mustache 1.3.0 extensions and specific Moodle functionality:

- **Inheritance (`{{< parent }}`)**: Handled as an `inheritance_statement`.
- **Blocks (`{{$ block }}`)**: Handled as a `block_statement`.
- **Moodle Lambdas**: Highlights specific Moodle lambda names (`str`, `pix`, `userdate`, `quote`, `shortentext`) as `function.builtin`.
- **Neovim Injections**: Injects HTML to `text` nodes and Javascript to `{{#js}}` block contents.
