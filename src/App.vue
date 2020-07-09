<template>
  <div id="app">
    <HelloVue msg="Welcome to Hello Vue"/>

    <select v-model='selected' v-on:click='initProcess()'>
      <option disabled value="">Please select one</option>
      <option v-for='sub in subRoutes' v-bind:key='sub'>
        {{sub}}
      </option>
    </select>

    <p v-show='!selected'>
      <b>
        {{ackMessage}}
      </b>
    </p>

    <div>
      <div v-for='item in list' v-bind:key='item.id' class='block-cls'>
        <BlockItem v-bind:block='item'></BlockItem>
      </div>
    </div>

  </div>
</template>

<script>
import HelloVue from './components/HelloVue.vue'
import BlockItem from './components/BlockItem.vue'
import axios from 'axios'
import lodash from 'lodash'

export default {
  name: 'App',
  data: function(){
    return {
      ackMessage: '',
      selected: '',
      subRoutes: ['users', 'albums', 'photos', 'todos', 'posts', 'comments'],
      list: []
    }
  },
  watch: {
    selected: function(){
      this.ackMessage = 'Result fetching in progress ...'
      this.initProcess()  
    }
  },
  created: function(){
    this.initProcess = lodash.debounce(this.getApiData, 500)
  },
  methods: {
    getApiData: function(){

      if(!this.selected){
        this.ackMessage = 'Looks you did not selected value in dropdown.'
        return
      }

      axios.get('https://jsonplaceholder.typicode.com/' + this.selected)
        .then(res => {
          this.list = res.data
        })
        .catch(error => {
          alert(error)
        }).finally(() => {
          this.ackMessage = 'Result feched & rendering in progress ...'
        })
    }
  },
  components: {
    HelloVue,
    BlockItem
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .block-cls {
    display: inline flow-root;
    padding: 5px;
    margin: 5px;
    border: 1px solid #4CAF50;
    text-align: left;
  }
</style>
