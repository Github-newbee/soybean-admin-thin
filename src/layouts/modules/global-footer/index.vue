<script setup lang="ts">
import { TODAY, formatDate } from '@/utils/date';

defineOptions({
  name: 'GlobalFooter'
});
</script>

<template>
  <DarkModeContainer class="h-full flex-center text-12px">
    Copyright © {{ formatDate(TODAY, 'YYYY') }} 后台管理系统
  </DarkModeContainer>
</template>

<style scoped></style>
