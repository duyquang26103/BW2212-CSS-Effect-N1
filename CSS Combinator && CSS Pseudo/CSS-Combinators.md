CSS Combinators là các từ kết nối giữa các thẻ HTML, giúp bạn xác định mối quan hệ giữa các thẻ và tạo ra các câu lệnh CSS chính xác. Có 4 loại chính của CSS Combinators:

1/ Descendant selector (kết nối họ): Dùng để chỉ định tất cả thẻ hậu duệ của một thẻ cha.
Ví dụ:

<!-- <!DOCTYPE html>
<html>
<head>
<style>
div p {
  background-color: yellow;
}
</style>
</head>
<body>

<h2>Descendant Selector</h2>

<p>The descendant selector matches all elements that are descendants of a specified element.</p>

<div>
  <p>Paragraph 1 in the div.</p>								//yellow
  <p>Paragraph 2 in the div.</p>								//yellow
  <section><p>Paragraph 3 in the div.</p></section>				//yellow
</div>

<p>Paragraph 4. Not in a div.</p>
<p>Paragraph 5. Not in a div.</p>

</body>
</html> -->

2/ Child selector (kết nối con): Dùng để chỉ định tất thẻ con trực tiếp của một thẻ cha.
Ví dụ:

<!-- <!DOCTYPE html>
<html>
<head>
<style>
div > p {
  background-color: yellow;
}
</style>
</head>
<body>

<h2>Child Selector</h2>

<p>The child selector (>) selects all elements that are the children of a specified element.</p>

<div>
  <p>Paragraph 1 in the div.</p>				//yellow
  <p>Paragraph 2 in the div.</p>				//yellow
  <section>
    <p>Paragraph 3 in the div (inside a section element).</p>   //not Child but Descendant
  </section>
  <p>Paragraph 4 in the div.</p>				//yellow
</div>

<p>Paragraph 5. Not in a div.</p>
<p>Paragraph 6. Not in a div.</p>

</body>
</html> -->

3/ Adjacent Sibling Selector (kết nối anh em kề): Dùng để chỉ định một thẻ đầu tiên nằm sau một thẻ khác nằm cùng cấp.
Ví dụ:

<!-- <!DOCTYPE html>
<html>
<head>
<style>
div + p {
  background-color: yellow;
}
</style>
</head>
<body>

<h2>Adjacent Sibling Selector</h2>

<p>The + selector is used to select an element that is directly after another specific element.</p>
<p>The following example selects the first p element that are placed immediately after div elements:</p>

<div>
  <p>Paragraph 1 in the div.</p>
  <p>Paragraph 2 in the div.</p>
</div>

<p>Paragraph 3. After a div.</p>			//yellow
<p>Paragraph 4. After a div.</p>

<div>
  <p>Paragraph 5 in the div.</p>
  <p>Paragraph 6 in the div.</p>
</div>

<p>Paragraph 7. After a div.</p>			//yellow
<p>Paragraph 8. After a div.</p>

</body>
</html> -->

4/ General Sibling Selector (kết nối anh em chung): Dùng để chỉ định chỉ định một thẻ sau một thẻ khác nằm cùng cấp, không chỉ giới hạn trong việc chỉ định thẻ đầu tiên sau như Adjacent sibling selector.
Ví dụ:

<!-- <!DOCTYPE html>
<html>
<head>
<style>
div ~ p {
  background-color: yellow;
}
</style>
</head>
<body>

<h2>General Sibling Selector</h2>

<p>The general sibling selector (~) selects all elements that are next siblings of a specified element.</p>

<p>Paragraph 1.</p>

<div>
  <p>Paragraph 2.</p>
</div>

<p>Paragraph 3.</p>
<code>Some code.</code>
<p>Paragraph 4.</p>

</body>
</html> -->

Các CSS Combinators giúp bạn cụ thể hóa mối quan hệ giữa các thẻ HTML và cho phép bạn tạo ra các câu lệnh CSS chính xác và cụ thể.
