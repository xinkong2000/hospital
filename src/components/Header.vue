<template>
    <header>
        <div class="header">
            <div class="com">
                <div class="patient">
                    等待就医：{{ this.data.wait.length }}/{{ this.patient.length }}
                </div>
                <div class="patient">
                    化验/检查中：{{ this.data.scan.length }}
                </div>
                <div class="patient-list">
                    下一位：
                    <el-select v-model="value" placeholder="无" class="patients">
                        <el-option-group v-for="group in patients" :key="group.label" :label="group.label">
                            <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>
                <div>
                    <p>
                        <el-button type="primary" size="medium" @click="next" round>下一位</el-button>
                    </p>
                </div>
            </div>
            <div>
            	<div class="office" style="margin-right: 20px;">科室：{{ doctor.office }} </div>
                <div class="doctor">医师：{{ doctor.name }} <i class="icon el-icon-arrow-down"></i></div>
                <div class="set" title="设置"><i class="icon el-icon-s-tools"></i></div>
            </div>
        </div>
        <el-dialog title="下一位" :visible.sync="dialogFormVisible">
            <el-form :model="data.current" label-width="80px">
                <el-form-item label="门诊编号" class="dan">
                    <el-input v-model="data.current.id" @change="changePatient"></el-input>
                </el-form-item>
                <div style="display:flex">
                    <el-form-item label="姓名">
                        <el-input v-model="data.current.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <el-input v-model="data.current.age"></el-input>
                    </el-form-item>
                </div>
                <div style="display:flex">
                    <el-form-item label="性别">
                        <el-input v-model="data.current.gender"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input v-model="data.current.birthday"></el-input>
                    </el-form-item>
                </div>
                <div style="display:flex">
                    <el-form-item label="婚史">
                        <el-radio v-model="data.current.marriage" label="1">已婚</el-radio>
                        <el-radio v-model="data.current.marriage" label="2">未婚</el-radio>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="data.current.mobile"></el-input>
                    </el-form-item>
                </div>
                <el-form-item label="现住址" class='dan'>
                    <el-input v-model="data.current.address"></el-input>
                </el-form-item>
                <el-form-item label="交费方式">
                    <el-select v-model="data.current.payment" placeholder="请选择">
                        <el-option v-for="item in payment" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="diagnose">确 定</el-button>
            </div>
        </el-dialog>
    </header>
</template>
<script type="text/javascript">
import { patient, doctor, payment } from './patients_data.js';
export default {
    name: 'headers',
    data() {
        return {
            doctor: doctor,
            patient: patient,
            payment: payment,
            data: {
                scan: [],
                finished: [],
                wait: patient,
                current: {},
            },
            patients: [{
                label: '等待就医',
                options: [{
                    value: '4',
                    label: '张三 男 32'
                }, {
                    value: '5',
                    label: '李四 女 28'
                }]
            }, {
                label: '等待检查',
                options: [{
                    value: '3',
                    label: '王五 男 24'
                }]
            }, {
                label: '已完成',
                options: [{
                    value: '1',
                    label: '赵六 女 41'
                }, {
                    value: '2',
                    label: '马先生 男 52'
                }]
            }],
            value: '',
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '80px'
        }
    },
    methods: {
        handlePatient() {

            this.patients = [{
                label: '等待就医',
                options: []
            }, {
                label: '等待检查',
                options: []
            }, {
                label: '已完成',
                options: []
            }];

            for (let i in this.data) {
                for (let x in this.data[i]) {
                    const d = {
                        value: this.data[i][x].id,
                        label: this.data[i][x].name + ' ' + this.data[i][x].age + ' ' + this.handleGender(this.data[i][x].gender)
                    }

                    switch (i) {
                        case 'finished':
                            this.patients[2].options.push(d);
                            break;

                        case 'wait':
                            this.patients[0].options.push(d);
                            break;

                        case 'scan':
                            this.patients[1].options.push(d);
                            break;
                    }
                }
            }

            if (this.patients[0].options.length > 0)
                this.value = this.patients[0].options[0].value;
        },

        handleGender(gender_index) {
            switch (gender_index) {
                case 1:
                    return '男';
                    break;

                case 2:
                    return '女';
                    break;

                default:
                    return '';
            }
        },

        next() {
            this.data.current = this.data.wait[0];
            this.dialogFormVisible = true;
        },

        changePatient(e) {
            if (e != "") {
                let d = {};
                for (let i in this.patient) {
                    if (this.patient[i].id == e) {
                        d = this.patient[i];

                        // break;
                    }
                }
                // this.$set(this.data, "current", this.patient[i]);
                // // 如果还不行，加一行代码强制渲染(因数据层次太多，无法渲染)
                // this.$forceUpdate();
                for(let i in d){
                	this.$set(this.data.current, i, d[i]);
                	this.$forceUpdate();
                }
                console.log(this.data.current)
                
            }
        },

        diagnose(){
        	this.dialogFormVisible = false;
        	this.$emit('handlePatient', this.data.current);
        }
    },
    mounted() {
        this.handlePatient();
    },
    /*computed: {
    	newCurrent(){
    		return this.data.current;
    	}
    },
    watch: {
    	newCurrent(v){
    		console.log(v)
    		this.$forceUpdate();
    	}
    }*/
}
</script>
<style type="text/css">
.header {
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #999;
    padding: 0 20px;
    display: flex;
}

.header .com {
    flex: 1;
    display: flex;
}

.header .com div {
    margin-right: 20px;
}

.header div {
    display: flex;
}

.header .icon::before {
    line-height: 50px;
    margin-left: 10px;
}

.header .icon {
    margin-left: 10px;
}

.header .patients input {
    height: 34px;
    /*border:none;*/
}

.header .el-button {
    line-height: 9px;
    margin-top: -4px;
    display: block;
}

header .el-dialog__body {
    margin-right: 20px;
}

header .el-form-item {
    flex: 1;
}
</style>