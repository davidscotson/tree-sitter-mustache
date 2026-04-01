# Glimmer vs. Mustache Tree-Sitter Grammars

This document explains what the `tree-sitter-glimmer` implementation does *beyond* what is supported in the base `tree-sitter-mustache` implementation.

## 1. Native HTML Support
`tree-sitter-mustache` treats everything that isn't a Mustache tag as generic, opaque `text`. In contrast, `tree-sitter-glimmer` has native support for parsing HTML nodes. It explicitly parses `element_node_start`, `element_node_end`, `attribute_node`, and text nodes. This allows for precise structural awareness of HTML content interwoven with templating logic (e.g. `class="{{my_class}}"`).

## 2. Advanced Helper Invocations (Arguments and Hash Pairs)
Standard Mustache (and thus `tree-sitter-mustache`) doesn't natively parse helper arguments inside the tags. In standard Mustache, a tag like `{{#helper arg}}` is often parsed completely as an identifier until `}}` or handled by treating the section contents as raw string payload.
`tree-sitter-glimmer` natively parses Handlebars-style arguments and kwargs. A `helper_invocation` is parsed explicitly as an identifier followed by optional positional arguments and `hash_pair`s (e.g., `{{helper arg1 key=value}}`).

## 3. Sub-expressions
`tree-sitter-glimmer` supports Handlebars sub-expressions, allowing helper results to be passed as arguments to other helpers. These are parsed natively using the `sub_expression` node syntax `(helper arg)`. This is not a standard Mustache feature and thus is omitted in `tree-sitter-mustache`.

## 4. Literals
`tree-sitter-glimmer` introduces granular types for data embedded in the template:
* `string_literal` (single and double quotes)
* `number_literal`
* `boolean_literal`
Standard Mustache usually assumes variables reference the context and does not distinguish literal numbers or booleans directly in tag invocations.

## 5. Block Parameters
`tree-sitter-glimmer` supports block parameters, using the syntax `as |param|`, which is very common in Glimmer/Ember and Handlebars. This allows variables to be yielded and explicitly named within the block scope.

## 6. Whitespace Control
`tree-sitter-glimmer` parses Handlebars-style whitespace-control delimiters like `{{~` and `~}}`. `tree-sitter-mustache` strictly looks for standard `{{`, `}}}`, `{{{`, etc., lacking special handling for tilde-based whitespace modifiers.

## Relevance for Moodle
While Moodle uses Mustache for templating, it extends standard functionality (via Mustache 1.3.0 specs) and relies heavily on components and helper functions (like `{{#str}}` and `{{#pix}}`). Out of all Glimmer features, **Blocks and Parent Partials** (from Mustache specs: `{{< parent }}` and `{{$ block_name }}`) are the most directly applicable architectural improvements that standard Mustache relies upon but aren't currently part of this `tree-sitter-mustache` implementation. Implementing parent partials and blocks provides a more complete, Moodle-ready tree-sitter configuration while keeping it closer to Moodle's actual Mustache extensions.