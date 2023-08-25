<template>
    <div>
      <textarea :id="id" :value.prop="value" cols="30" rows="10" @input="update"/>
    </div>
  </template>
  
  <script>
  import "suneditor/dist/css/suneditor.min.css";
  import suneditor from "suneditor";
  import plugins from "suneditor/src/plugins";
  
  export default {
    name: "SunEditor",
    model: {
      prop: "value",
      event: "update"
    },
    props: {
      value: {
        type: String,
        default: ""
      },
      imageSize: {
        type: String,
        default: "500"
      },
      onImageUploadBefore: {
        type: Function,
        default: () => {}
      },
      onImageUpload: {
        type: Function,
        default: () => {}
      },
      onImageUploadError: {
        type: Function,
        default: () => {}
      },
      placeholder: {
        type: String,
        default: "Type something here..."
      },
      width: {
        type: String,
        default: "100%"
      },
      idEditor: {
        type: String,
        default: "sun-editor"
      }
    },
    data() {
      return {
        id: this.idEditor,
        model: null
      };
    },
    watch: {
      value() {
        this.model = this.value;
      }
    },
    mounted() {
      this.createEditor();
    },
    methods: {
      createEditor() {
        return suneditor.create(this.id, {
          width: this.width,
          placeholder: this.placeholder,
          plugins: plugins,
          height: "auto",
          minHeight: "150",
          charCounter: true,
          charCounterLabel: "Powered by SUNEDITOR - Total Character",
          buttonList: [
            ["undo", "redo"],
            ["removeFormat", "formatBlock", "fontColor", "hiliteColor"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["align", "horizontalRule", "lineHeight"],
            "/",
            ["paragraphStyle", "blockquote"],
            ["outdent", "indent", "list"],
            ["table", "link", "image", "video"],
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"]
          ]
        });
      },
      update(event) {
        this.$emit("update", event.currentTarget.value);
      }
    }
  };
  </script>
  