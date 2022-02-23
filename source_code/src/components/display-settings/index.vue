<template>
  <div class="display-settings" :class="{ opened: !collapsed }">
    <div class="display-settings_heading">
      <div class="display-settings_heading_lhs">
        <i class="fa fa-cog" @click="open()"></i>
        <p v-if="!collapsed">Settings</p>
      </div>
      <i
        v-if="!collapsed"
        class="display-settings_heading_rhs fa fa-chevron-right"
        @click="collapse()"
      ></i>
    </div>

    <div v-if="!collapsed" class="display-settings_controls">
      <div class="display-settings_controls_lhs">
        <div class="control">
          <p>Threshold</p>
          <input
            type="range"
            name="threshold"
            :min="1"
            :max="originalDensity.length * 2"
            :value="mutatedSettings ? mutatedSettings.threshold : 0"
            @change="thresholdChange($event)"
          />
        </div>
        <div class="control">
          <p>Size</p>
          <size-control
            :width="mutatedSettings ? mutatedSettings.width : 50"
            :height="mutatedSettings ? mutatedSettings.height : 50"
            @width-change="widthChange($event)"
            @height-change="heightChange($event)"
          ></size-control>
        </div>
      </div>

      <div class="display-settings_controls_divider"></div>

      <div class="display-settings_controls_rhs">
        <div class="control">
          <p>Font Size</p>
        </div>
      </div>
    </div>

    <div class="display-settings_footing">
      <div class="icon rounded-icon" @click="triggerImageDownload()">
        <i class="fa fa-download"></i>
        <p v-if="!collapsed">Download</p>
      </div>
      <div class="icon rounded-icon" @click="triggerCopyToClipboard()">
        <i class="fa fa-copy"></i>
        <p v-if="!collapsed">Copy</p>
      </div>
    </div>
  </div>
</template>

<style src="./display-settings.scss" lang="scss" scoped></style>
<script src="./display-settings.ts" lang="ts"></script>
