<template>
    <div id="app">
        <Header @handlePatient="handlePatient" />
        <Diagnose :patient='patient_data' :handleOpen='handleOpen' />
        <!-- <Editor :patient='patient_data' :type='type' /> -->
        <!-- <x-editor :text='text' @getEditorContent="handleText" /> -->
        <div v-if="bingli">
            <editor-elem :bingli='bingli' />
        </div>
        
    </div>
</template>
<script>
import Header from './components/Header.vue';
import Diagnose from './components/Diagnose';
import editorElem from './components/bingli.vue';

export default {
    name: 'app',
    data(){
        return {
            patient_data: undefined,
            text: '<p>123<br></p>',
            bingli: false
        }
    },
    components: {
        Header,
        Diagnose,
        editorElem
    },
    methods: {
        handlePatient(d){
            this.patient_data = d;
        },
        handleOpen(type){
            this.type = type;
            this.bingli = true;
        },
        handleText(text){
            console.log(text);
        }
    }
}
</script>
<style>
html, body{
    height: 100%;
    margin: 0;
    background-color: #eee;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 14px;
    color: #333;
}
ul,li{margin:0; padding: 0; list-style: none;}
</style>