const patient = [{
    id: 1,
    name: '张三',
    gender: 1,
    age: 32,
    payment: 1,
    mobile: 13812341234,
    address: '北京市西城区1号',
    marriage: 1,
    birthday: '2001-01-01',
    create_time: '2019-08-30'
},{
    id: 2,
    name: '李四',
    gender: 2,
    age: 28,
    payment: 1,
    mobile: 13812341234,
    address: '北京市西城区1号',
    marriage: 1,
    birthday: '2001-01-01',
    create_time: '2019-08-30'
},{
    id: 3,
    name: '王五',
    gender: 1,
    age: 24,
    payment: 1,
    mobile: 13812341234,
    address: '北京市西城区1号',
    marriage: 1,
    birthday: '2001-01-01',
    create_time: '2019-08-30'
},{
    id: 4,
    name: '赵六',
    gender: 2,
    age: 41,
    payment: 1,
    mobile: 13812341234,
    address: '北京市西城区1号',
    marriage: 1,
    birthday: '2001-01-01',
    create_time: '2019-08-30'
},{
    id: 5,
    name: '马先生',
    gender: 1,
    age: 52,
    payment: 1,
    mobile: 13812341234,
    address: '北京市西城区1号',
    marriage: 1,
    birthday: '2001-01-01',
    create_time: '2019-08-30'
}];

const doctor = {
	name: '欧阳医生',
	office: '外科',
	id: 1
}

const payment = [{value: 1, label: '自费'}, {value: 2, label: '公费'}, {value: 3, label: '社保'}, {value: 4, label:'新农合'}];

const getGender = function(i){
	switch(i){
		case 1:
		return '男';
		break;

		case 2:
		return '女';
		break;

		default:
		return '未知'
	}
}

const getPayment = function(i){
	for(let x in payment){
		if(payment[x].value == i){
			return payment[x].label;
		}
	}
}

export {patient, doctor, payment, getGender, getPayment};