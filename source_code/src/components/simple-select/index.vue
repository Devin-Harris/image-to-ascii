<template>
  <div class="simple-select" v-click-outside="clickOutside">
    <div class="simple-select_options">
      <div
        v-for="option in options"
        :key="option"
        class="simple-select_options_option"
        @click="optionClicked(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script src="./simple-select.ts" lang="ts"></script>
<style src="./simple-select.scss" lang="scss" scoped></style>
