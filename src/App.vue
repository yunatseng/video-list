<template>
  <div id="app">
    <div id="nav">
      <router-link class="tab" to="/">影音列表</router-link> |
      <router-link class="tab" to="/collection">我的收藏</router-link>
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
  margin-top: 16px;
}
img {
  padding-top: 10px;
  padding-bottom: 10px;
}

button, .tab {
  display: inline-block;
  border: none;
  padding: 8px 16px;
  margin: 0;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  transition: 0.3s;

  &:focus {
    outline: none;
  }
}
a {
  &:hover{
    font-weight: bold;
  }
}

</style>
