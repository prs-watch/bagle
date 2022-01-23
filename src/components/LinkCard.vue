<script setup lang="ts">
defineProps<{
    siteType: string;
    href: string;
}>();
</script>

<template>
  <el-link
    v-if="href"
    :href="href"
    target="_blank"
  >
    <el-card
      shadow="always"
    >
      <el-image
        :src="`/images/${siteType}.png`"
        fit="contain"
        style="width: 100%;"
      />
    </el-card>
  </el-link>
</template>

<style>
.el-link, .el-link--inner {
  width: 100%;
}

.el-card {
  width: 100%;
  height: 0;
  padding-bottom: 100%;
}

.el-card__body {
 position: absolute;
 width: 100%;
 top: 50%;
 left: 50%;
 transform: translate(-50%,-50%);
}
</style>
