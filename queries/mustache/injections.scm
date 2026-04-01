((text) @injection.content
 (#set! injection.language "html"))

(section
  (section_begin
    (tag_name) @_name
    (#eq? @_name "js"))
  (text) @injection.content
  (#set! injection.language "javascript"))
