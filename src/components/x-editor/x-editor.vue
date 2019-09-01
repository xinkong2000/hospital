<template>
    <div class="edit_container" >
        <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)" :style="'height: '+h+'px'">
        </quill-editor>
    </div>
</template>
<script>
// Quill编辑器
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import config from './x-editor-config';

var container = config.tool;
export default {
    name: 'x-editor',
    components: {
        quillEditor
    },
    props: ['text'],
    data() {
        return {
            content: this.text,
            editorOption: {
                modules: {
                    toolbar: { // 如果不上传图片到服务器，此处不必配置
                        container: container, // container为工具栏，此次引入了全部工具栏，也可自行配置
                        handlers: {
                            'image': function() { // 劫持原来的图片点击按钮事件
                                alert(1)
                            }
                        }
                    }
                },
                theme: 'snow',
                placeholder: ''
            },
            h: 400
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus() {}, // 获得焦点事件
        onEditorChange() {
            this.$emit('getEditorContent', this.content);
        }, // 内容改变事件
    },
    mounted() {
        let clientHeight = document.documentElement.clientHeight;
        this.h = clientHeight - 146;

        const _this = this;
        window.onresize = function temp() {
            clientHeight = document.documentElement.clientHeight;

            _this.h = clientHeight - 146;
        };
    }

}
</script>
<style>
.edit_container {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    /*width: 794px;*/
    /*background-color: #fff;*/
    
}

.ql-toolbar {
    background-color: #fff;
}


.ql-container {
    
    overflow: auto;
    border:none;
}
.ql-editor{
    height: 1090px;
    margin: 20px 0;
    border:1px solid #ccc;
    width: 794px;
    background-color: #fff;
    margin-left: calc((100% - 794px)/2);
    padding: 30px;
}

.edit_container .limit {
    height: 30px;
    border: 1px solid #ccc;
    line-height: 30px;
    text-align: right;
    

}

.edit_container .ql-picker-label {
    display: block;
}

.edit_container .ql-snow .ql-formats svg {
    display: block;
}

.edit_container .ql-snow .ql-editor img {
    max-width: 480px;
}

.edit_container .ql-editor .ql-video {
    max-width: 480px;
}

.ql-snow .ql-picker-label::before {
    display: inline-block;
    line-height: 22px;
    display: block;
}

.ql-snow .ql-picker-label::before {

    line-height: 22px;
    display: block;
}
</style>