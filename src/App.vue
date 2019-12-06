<template>
  <div id="app">
    <!-- <HelloWorld :msg="msg" /> -->
    <table> 
      <tr>
        <th @click="nameSort">
          School Name
          <span class="caret">
            <span v-if="currentSort == 'A-Z'"> &or; </span>
            <span v-if="currentSort == 'Z-A'"> &and; </span>
          </span>
        </th>
        
        <th @click="sizeSort">
          School Size
          <span class="caret">
            <span v-if="currentSort == '1-10'"> &or; </span>
            <span v-if="currentSort == '10-1'"> &and; </span>
          </span>
        </th>
        <!-- 
        <th> Admission Rate </th>
        <th> ID </th>
        <th> State </th> 
        -->

      </tr>
      <tbody>

      <tr v-for="item in schoolsToShow" :key="item['id']">
        <td> {{item["school.name"]}} </td>
        <td> {{item["latest.student.size"]}}  </td>
        <!-- 
        <td> {{item["latest.admissions.admission_rate.overall"]}}</td>
        <td> {{item["id"]}}</td>
        <td> {{item["school.state"]}}</td>
        -->

      </tr>
      </tbody>


    </table>

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
      msg: "Hello World",
      schools: [],
      currentSort: "A-Z",
      sortOptions: ["A-Z", "Z-A", "1-10", "10-1"]
    }
  },
  computed: {
    schoolsToShow(){
      switch (this.currentSort) {
        case "A-Z": 
          return this.sortedByName
          break;
        case "Z-A":
          return this.sortedByName.reverse()
          break;
        case "1-10": 
          return this.sortedBySize
          break;
        case "10-1":
          return this.sortedBySize.reverse()
          break;
        default: 
          return this.sortedByName; 
      }

    },
    sortedBySize(){
      return this.schools.sort((a,b)=>{
        return a["latest.student.size"] - b["latest.student.size"]
      })
    },
    sortedByName() {
      return this.schools.sort((a,b)=>{
        let nameA =  a["school.name"]
        let nameB = b["school.name"]
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;

      })
    }
  },
  methods: {
    nameSort() {
      if (this.currentSort === "A-Z") {
        this.currentSort = "Z-A"
      } else {
        this.currentSort = "A-Z"
      }
    },
    sizeSort() {
      if (this.currentSort === "1-10") {
        this.currentSort = "10-1"
      } else {
        this.currentSort = "1-10"
      }
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
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 1%;
  text-align: left;
}

.caret {
  font-size: .5em;
}

tr > * {
  padding-left: 1%;
}

th {
  min-width: 90px;
}
</style>
