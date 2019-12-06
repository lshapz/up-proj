<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
      schools: {}
    }
  },
  beforeMount() {
    axios.get('http://localhost:3000/schools')
      .then((response)=>{
        console.log(this)
        this.schools = response.data
      })
      .catch((err)=>console.error(err))
  },
  watch:{
    schools(newThing, oldThing) {
      debugger
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
