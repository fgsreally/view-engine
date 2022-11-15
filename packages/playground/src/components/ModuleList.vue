<template>
  <section>
    <div v-for="(item, i) in context" :key='i'>
      {{ i }}
      <div v-if="typeof item === 'object'">
        <div v-for="(value, k) in item" :key="k">
          <p v-if="typeof value === 'function'">{{ k }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { context } from "../js/service";
</script>
