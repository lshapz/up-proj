<template>
  <div id="app">
    <!-- <HelloWorld :msg="msg" /> -->
    <table> 
      <tr>
        <th @click="nameSort">
          School Name
          <span class="caret">
            <span v-if="currentSort == 'sortedByName'"> &or; </span>
            <span v-if="currentSort == 'sortedByNameRev'"> &and; </span>
          </span>
        </th>
        
        <th @click="sizeSort">
          School Size
          <span class="caret">
            <span v-if="currentSort == 'sortedBySize'"> &or; </span>
            <span v-if="currentSort == 'sortedBySizeRev'"> &and; </span>
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
      currentSort: "sortedByName",
      sortOptions: ["sortedByName", "sortedByNameRev", "sortedBySize", "sortedBySizeRev"]
    }
  },
  computed: {
    schoolsToShow(){
      return this[this.currentSort];
    },
    sortedByName() {
      return this.schools.sort((a,b)=>{
        let nameA =  a["school.name"];
        let nameB = b["school.name"];
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;

      })
    },
    sortedByNameRev() {
      return this.sortedByName.reverse();
    },
    sortedBySize(){
      return this.schools.sort((a,b)=>{
        return a["latest.student.size"] - b["latest.student.size"];
      })
    },
    sortedBySizeRev() {
      return this.sortedBySize.reverse();
    }
  },
  methods: {
    nameSort() {
      if (this.currentSort === "sortedByNameRev") {
        this.currentSort = "sortedByName";
      } else {
        this.currentSort = "sortedByNameRev";
      }
    },
    sizeSort() {
      if (this.currentSort === "sortedBySizeRev") {
        this.currentSort = "sortedBySize";
      } else {
        this.currentSort = "sortedBySizeRev";
      }
    }
  },
  beforeMount() {
    axios.get('http://localhost:3000/schools')
      .then((response)=>{
        this.schools = response.data;
      })
      .catch((err)=>console.error(err))
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
