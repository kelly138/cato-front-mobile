<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- tabbar -->
    <TabBar v-if="$route.meta.title!=='dashboard'" />
  </div>
</template>
<script>
import TabBar from '@/components/TabBar'

export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>
<style lang="scss"></style>
