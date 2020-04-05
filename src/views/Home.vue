<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created() {
    this.$http.post('usuarios.json', {
      nome: 'Gabriel Guzowski',
      email: 'gabriel.guzowski@al.infnet.edu.br'
    }).then(res => console.log(res))
  }
}
</script>
