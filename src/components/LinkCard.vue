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
    <el-card shadow="always">
      <el-image
        :src="`../images/${siteType}.png`"
        fit="fill"
        style="width: 300px; height: 300px"
      />
    </el-card>
  </el-link>
</template>
