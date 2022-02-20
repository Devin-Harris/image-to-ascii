<template>
  <div class="home">
    <div class="heading">
      <h1>Image to ascii</h1>
      <p>Upload an image you want to convert to ascii</p>
      <fileInput
        class="heading_input"
        :fileInputLabel="file?.name ?? 'Choose an image'"
        @input-change="inputChange($event)"
      ></fileInput>
    </div>
  </div>
</template>

<style src="./home.scss" lang="scss" scoped></style>
<script src="./home.ts" lang="ts"></script>
