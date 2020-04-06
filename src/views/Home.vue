<template>
  <b-container>
      <Header />
  </b-container>
</template>

<script>
import Header from '../components/Header';

export default {
    name: 'home',
    components: { Header }
}
</script>

<style>
body {
    margin: 16px;
}
</style>