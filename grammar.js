module.exports = grammar({
  name: 'mustache',
  rules: {
    template: ($) => repeat($._declaration),
    _declaration: ($) => $._statement,
    comment_statement: ($) =>
      seq(
        alias($.start_delimiter, $._start_delimiter),
        "!",
        alias($._comment_content, $.comment_content),
        alias($.end_delimiter, $._end_delimiter),
      ),

    _statement: ($) =>
      choice(
        $.comment_statement,
        $.triple_statement,
        $.ampersand_statement,
        $.section,
        $.inverted_section,
        $.block_statement,
        $.parent_partial_statement,
        $.partial_statement,
        $.interpolation_statement,
        $.text,
      ),
    interpolation_statement: ($) =>
      seq($.start_delimiter, $._expression, $.end_delimiter),
    triple_statement: ($) =>
      seq($.start_delimiter, "{", $._expression, "}", $.end_delimiter),
    ampersand_statement: ($) =>
      seq($.start_delimiter, "&", $._expression, $.end_delimiter),
    partial_statement: ($) =>
      seq(
        $.start_delimiter,
        ">",
        alias($._start_tag_name, $.partial_content),
        $.end_delimiter,
      ),

    parent_partial_statement: ($) =>
      seq(
        $.parent_partial_begin,
        repeat($._statement),
        alias($._section_end, $.parent_partial_end),
      ),

    parent_partial_begin: ($) =>
      seq(
        $.start_delimiter,
        "<",
        alias($._start_tag_name, $.partial_content),
        $.end_delimiter,
      ),

    block_statement: ($) =>
      seq(
        $.block_begin,
        repeat($._statement),
        alias($._section_end, $.block_end),
      ),

    block_begin: ($) =>
      seq(
        $.start_delimiter,
        "$",
        alias($._start_tag_name, $.block_name),
        $.end_delimiter,
      ),

    section: ($) =>
      seq(
        $.section_begin,
        repeat($._statement),
        alias($._section_end, $.section_end),
      ),

    _section_end: ($) =>
      seq(
        $.start_delimiter,
        "/",
        alias($._end_tag_name, $.tag_name),
        $.end_delimiter,
      ),

    section_begin: ($) =>
      seq(
        $.start_delimiter,
        "#",
        alias($._start_tag_name, $.tag_name),
        $.end_delimiter,
      ),

    inverted_section: ($) =>
      seq(
        $.inverted_section_begin,
        repeat($._statement),
        alias($._section_end, $.inverted_section_end),
      ),
    inverted_section_begin: ($) =>
      seq(
        $.start_delimiter,
        "^",
        alias($._start_tag_name, $.tag_name),
        $.end_delimiter,
      ),

    _expression: ($) => choice($.path_expression, $.identifier, "."),

    identifier: ($) => $._identifier_content,
    path_expression: ($) => seq($.identifier, repeat1(seq(".", $.identifier))),

    start_delimiter: ($) => "{{",
    end_delimiter: ($) => "}}",

    _start_tag_name: ($) => /[^\s}]+/,
    _end_tag_name: ($) => /[^\s}]+/,

    _comment_content: ($) => /([^}]|}[^}])*/,
    _identifier_content: ($) => /[^\s}\.#\^\/!><\$&\{]+/,

    text: ($) => choice(
      /([^{}]|\{[^{]|\}[^}])*[^\{\}\s]([^{}]|\{[^{]|\}[^}])*/,
      /\{/,
      /\}/
    )
  },
});
