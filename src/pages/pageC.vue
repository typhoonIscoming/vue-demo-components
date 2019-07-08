<template>
  <div class="C common">
    <common title="c"></common>
    <div class="content">
      <!-- <quill-editor
        class="myQuillEditor"
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      /> -->
    </div>
    <div class="bottom">c页面</div>
  </div>
</template>

<script>
import common from "@/components/common";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      editorOption: {},
      content: ""
    };
  },
  components: {
    common,
    quillEditor
  },
  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {}
  },
  watch: {
    content(newval) {
      console.log("newval", newval);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/common.scss";
.myQuillEditor {
  width: 100%;
  height: 100%;
}
</style>