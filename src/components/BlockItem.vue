<template>
  <div>
    <ul v-html="detail()"></ul>
  </div>
</template>

<script>
export default {
  name: 'BlockItem',
  props: {
    block: Object
  },
  methods: {
    detail: function(){
      var htmlStr = ''
      Object.keys(this.block).forEach((k) => { htmlStr += ('<li>' + k + ':' + this.block[k] + '</li>') })

      return htmlStr
    }
  }
}
</script>