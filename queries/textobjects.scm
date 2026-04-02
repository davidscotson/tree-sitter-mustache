[
  (section)
  (inverted_section)
  (block_statement)
] @block.outer

(section
  (section_begin)
  (_) @block.inner
  (section_end))

(inverted_section
  (inverted_section_begin)
  (_) @block.inner
  (inverted_section_end))

(block_statement
  (block_begin)
  (_) @block.inner
  (block_end))
