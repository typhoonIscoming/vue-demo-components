var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));



let html = `<div>
<p>This is some <strong>sample text</strong>. You are using <a href="https://ckeditor.com/">CKEditor</a>.</p>
<p>占位符</p>
<p>我在占位符后面</p>
</div>`
