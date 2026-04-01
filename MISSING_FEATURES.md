# Missing Features in Mustache implementation

Based on the [Mustache Specification](https://github.com/mustache/spec), the current tree-sitter parser implementation covers the core features such as interpolations, sections, inverted sections, comments, partials, and delimiter changes. However, there are a few features (mainly optional modules in the spec) that are not currently covered by tests or implemented in the grammar:

1. **Inheritance (Parent and Block tags)**: The `{{< parent }}` syntax is used to expand an external template into the current template, similar to a partial but allowing argument substitutions (blocks). The `{{$ block }}...{{/ block }}` syntax is used alongside parent tags to define or override parameters within the template.
2. **Dynamic Names (Dynamic Partials)**: The `{{> *dynamic }}` syntax allows dynamic loading of partials. The current parser treats the content of partial tags as raw comment content, so it might inadvertently consume the `*` as part of the partial name but doesn't expose it distinctively in the AST.

## Most Important Feature to Implement

The most important feature to implement is **Inheritance** (Parent and Block tags). These tags introduce block-level structures that the current parser fails to parse, which leads to syntax errors when parsing templates that use inheritance (which is especially common in Moodle-specific extensions that use this Mustache version).

We will implement the parsing for **Parent tags (`<`)** and **Block tags (`$`)** to correctly build the syntax tree for templates utilizing inheritance.