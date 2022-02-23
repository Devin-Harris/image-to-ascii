<template>
  <div class="home">
    <div class="heading">
      <h1>Image to ascii</h1>
      <p>Upload an image you want to convert to ascii</p>
      <file-input
        class="heading_input"
        :fileInputLabel="file?.value?.name ?? 'Choose an image'"
        @input-change="inputChange($event)"
      ></file-input>
    </div>

    <div class="display-container">
      <display v-if="file && file.value" :file="file"></display>
    </div>
  </div>
</template>

<style src="./home.scss" lang="scss" scoped></style>
<script src="./home.ts" lang="ts"></script>
