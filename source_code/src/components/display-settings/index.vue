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

    <div v-if="!collapsed && mutatedSettings" class="display-settings_controls">
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
        <div class="control">
          <p>Original/Ascii</p>
          <slider-toggle
            :value="mutatedSettings ? mutatedSettings.showingAscii : true"
            @toggle="handleOriginalAsciiToggle($event)"
          ></slider-toggle>
        </div>
        <div class="control">
          <p>Invert</p>
          <slider-toggle
            :value="mutatedSettings ? mutatedSettings.invert : true"
            @toggle="handleInvertToggle($event)"
          ></slider-toggle>
        </div>
      </div>

      <div class="display-settings_controls_divider"></div>

      <div class="display-settings_controls_rhs">
        <div class="control">
          <p>Font Size</p>
          <input
            class="control-input"
            type="number"
            min="1"
            :value="mutatedSettings ? mutatedSettings.fontSize : 10"
            @change="fontSizeChange($event)"
          />
        </div>
        <div class="control">
          <p>Leading</p>
          <input
            class="control-input"
            type="number"
            min="1"
            :value="mutatedSettings ? mutatedSettings.leading : 7"
            @change="leadingChange($event)"
          />
        </div>
        <div class="control">
          <p>Background</p>
          <input
            class="control-input"
            type="text"
            :value="mutatedSettings ? mutatedSettings.background : '#000000'"
            @change="backgroundChange($event)"
          />
        </div>
        <div class="control">
          <p>Color</p>
          <input
            class="control-input"
            type="text"
            :value="mutatedSettings ? mutatedSettings.color : '#FFFFFF'"
            @change="colorChange($event)"
          />
          <div class="checkboxs">
            <div class="checkbox">
              <input
                type="checkbox"
                name="luminance"
                v-model="mutatedSettings.luminance"
                @change="luminanceChange($event)"
              />
              <label
                for="luminance"
                @click="luminanceChange($event, !mutatedSettings.luminance)"
                >Luminance</label
              >
            </div>
            <div class="checkbox">
              <input
                type="checkbox"
                name="saturate"
                v-model="mutatedSettings.saturate"
                @change="saturateChange($event)"
              />
              <label
                for="saturate"
                @click="saturateChange($event, !mutatedSettings.saturate)"
                >Saturate</label
              >
            </div>
          </div>
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
