<template>
    <div v-if="patient" class="diagnose">
        <div class="patient_info">
            <ul>
                <li>当前就诊</li>
                <li>姓名：{{ patient.name }}</li>
                <li>年龄：{{ patient.age }}</li>
                <li>性别：{{ getGender(patient.gender) }}</li>
                <li>电话：{{ patient.mobile }}</li>
                <li>交费方式：{{ getPayment(patient.payment) }}</li>
                <li>家庭住址：{{ patient.address }}</li>
            </ul>
        </div>
        <div class="action">
            <ul>
                <li>
                	<el-button type="primary" plain  @click="open('bingli')" size="medium">病历</el-button>
                </li>

                <li>
                	<el-button type="success" plain  @click="open('chufang')" size="medium">处方笺</el-button>
                </li>

                <li>
                	<el-button type="warning" plain @click="open('checklist')" size="medium">检查单</el-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/javascript">
import { getGender, getPayment } from './patients_data';
export default {
    name: 'diagnose',
    props: ['patient', 'handleOpen'],
    methods: {
        getGender: (i) => {
            return getGender(i);
        },
        getPayment: (i) => {
            return getPayment(i)
        },
        open(type){
        	this.handleOpen(type);
        }
    }
}
</script>
<style type="text/css">
.diagnose {
    line-height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #999;
    padding: 0 20px;
    display: flex;
}

.diagnose .patient_info {
    height: 50px;
	flex: 1;
}

.diagnose .action {
    height: 50px;
}

.diagnose li {
    float: left;
    margin-right: 20px;
}
</style>