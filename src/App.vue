<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">影音列表</router-link> |
      <router-link to="/collection">我的收藏</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
img {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
