<template>
    <div id="wangeditor" v-if="bingli">
        <div ref="editorElem" style="text-align:left" @click='cd'></div>
        <div class='hide'>
            <el-date-picker type="date" placeholder="" ref='date_select' style="position: absolute" :style="{'left':clientX+'px', 'top': clientY + 'px'}">
            </el-date-picker>
            <el-date-picker type="datetime" placeholder="" ref='time_select'>
            </el-date-picker>
            <!-- <el-cascader size="large" :options="address_options" v-model="selectedOptions" @change="handleChange"> -->
            <!-- </el-cascader> -->
        </div>
        <el-dialog title="选择性别" :visible.sync="radio" ref="select_gender">
            <!-- <el-form> -->
            <el-radio v-model="gender" label="男" @change="handleGender">男</el-radio>
            <el-radio v-model="gender" label="女" @change="handleGender">女</el-radio>
            <!-- </el-form> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="radio = false">取 消</el-button>
                <el-button type="primary" @click="radio = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import E from 'wangeditor';
// import { provinceAndCityData, CodeToText} from 'element-china-area-data'
export default {
    name: 'editorElem',
    data() {
        return {
            editor: null,
            editorContent: '',
            text: '姓名<span class="com-text">[文本组件]</span> 性别<span class="com-radio">[单选组件]</span> 出生日期<span class="com-date">[日期组件，回调未完成]</span> 写表时间<span class="com-time">[时间组件，未完成]</span> 婚史<span class="com-select">[选择组件，未完成]</span>',
            // address_options: provinceAndCityData,
            selectedOptions: [],
            radio: false,
            gender: '男',
            clientX: 0,
            clientY: 0,
        }
    },
    components: {},
    props: ['bingli'], 
    watch: {
        content() {
            this.editor.txt.html(this.content)
        }
    },
    methods: {
        cd(e) {console.log(e)
            switch (e.target.className) {
                case 'com-text':
                    this.getText(e.target);
                    break;

                case 'com-radio':
                    this.getRadio(e.target);
                    break;

                case 'com-date':
                    this.getDate(e);
                    break;

                case 'com-time':
                    e.innerHTML = this.getTime();
                    break;

                case 'com-select':
                    e.innerHTML = this.getSelect();
                    break;
            }
        },
        handleChange (value) {
        var ctt = CodeToText[value[0]] + CodeToText[value[1]]
        console.log(ctt)
      },
        getText(el) {
            this.$prompt('请输入姓名', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                el.innerHTML = '['+value+']';
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        getRadio(el) {
            this.radio = true;
            this.el = el;
        },
        getDate(e){
            this.clientX = e.clientX;
            this.clientY = e.clientY;
            this.$refs['date_select'].focus()
        },
        getTime(){
            this.$refs['time_select'].focus()
        },
        handleGender(){
            this.el.innerHTML = '['+this.gender+']';
        }

    },
    mounted() {
        this.editor = new E(this.$refs.editorElem)
        this.editor.customConfig.onchange = (html) => {
            this.editorContent = html
            // this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
        }
        this.editor.customConfig.uploadImgServer = '你的上传图片的接口'
        this.editor.customConfig.uploadFileName = '你自定义的文件名'
        this.editor.customConfig.menus = [ // 菜单配置
            'head', // 标题
            'bold', // 粗体
            'fontSize', // 字号
            'fontName', // 字体
            'italic', // 斜体
            'underline', // 下划线
            'strikeThrough', // 删除线
            'foreColor', // 文字颜色
            'backColor', // 背景颜色
            'link', // 插入链接
            'list', // 列表
            'justify', // 对齐方式
            'quote', // 引用
            'emoticon', // 表情
            // 'image', // 插入图片
            'table', // 表格
            'code', // 插入代码
            'undo', // 撤销
            'redo' // 重复
        ]

        this.editor.customConfig.zIndex = 0
        this.editor.create() // 创建富文本实例
        if (!this.content) {
            this.editor.txt.html(this.text)
        }
    }
}
</script>
<style type="text/css">
.hide * {
    display: none;
}

.hide input.el-input__inner {
    background-color: transparent;
    border: none;
}

div.w-e-text-container {
    z-index: 0;
}
</style>