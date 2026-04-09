[
  (start_delimiter)
  (end_delimiter)
  (_start_delimiter)
  (_end_delimiter)
  "{"
  "}"
] @punctuation.bracket

(identifier) @variable

(tag_name) @variable.parameter
(erroneous_tag_name) @error

(text) @string

((tag_name) @function.builtin
 (#any-of? @function.builtin "js" "str" "pix" "quote" "userdate" "shortentext" "cleanstr"))

(partial_content) @module

(path_expression "." @punctuation.delimiter)
"." @punctuation.delimiter

[ "#" "^" "/" ] @keyword
">" @operator

(comment_statement) @comment

(triple_statement "{" @punctuation.bracket "}" @punctuation.bracket)
