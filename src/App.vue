<template>
  <div id="app">
    <HelloVue msg="Welcome to Hello Vue"/>

    <select v-model='selected' v-on:click='initProcess()' class="btn btn-green">
      <option disabled value="">Please select one</option>
      <option v-for='sub in subRoutes' v-bind:key='sub'>
        {{sub}}
      </option>
    </select>

    <button @click='reset()' class='btn btn-green'>
      Reset
    </button>

    <button @click='openPrompt()' class='btn btn-blue'>
      Input URL
    </button>

    <p>
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
      },
      reset: function(){
        this.selected = ''
        this.list = []
      },
      openPrompt: function(){
        var url = prompt('Enter valid URL which response json result.')
        if(url){
          axios.get(url)
            .then(res => {
              this.list = res.data
            })
            .catch(err => {
              alert(err)
            })
        }
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
    display: inline-block;
    padding: 5px;
    margin: 5px;
    border: 1px solid #4CAF50;
    text-align: left;
  }

  .btn {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 16px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
  }

  .btn-green {
    background-color: white; 
    color: black; 
    border: 1px solid #4CAF50;
  }

  .btn-green:hover {
    background-color: #4CAF50;
    color: white;
  }

  .btn-blue {
    background-color: white; 
    color: black; 
    border: 1px solid #6495ED;
  }

  .btn-blue:hover {
    background-color: #6495ED;
    color: white;
  }

  .custom-select {
    border: 1px solid #4CAF50;
  }

</style>
