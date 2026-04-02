((comment_statement) @injection.content
 (#match? @injection.content "json")
 (#set! injection.language "json"))

((comment_statement) @injection.content
 (#not-match? @injection.content "json")
 (#set! injection.language "comment"))

(section
  (section_begin
    (tag_name) @tag_name
    (#eq? @tag_name "js"))
  (text) @injection.content
  (#set! injection.language "javascript")
  (#set! injection.combined))

((text) @injection.content
 (#set! injection.language "html")
 (#set! injection.combined))
