<template>
  <ft-icon-button
    ref="iconButton"
    title="Share Video"
    theme="secondary"
    icon="share-alt"
    dropdown-position-x="left"
    :force-dropdown="true"
  >
    <div class="shareLinks">
      <div class="header">
        <img
          class="youtubeLogo"
          src="~../../assets/img/yt_logo_mono_dark.png"
          alt="YouTube"
          width="794"
          height="178"
        >
      </div>

      <div class="buttons">
        <ft-button
          class="action"
          @click="copyYoutube()"
        >
          <font-awesome-icon icon="copy" />
          Copy link
        </ft-button>
        <ft-button
          class="action"
          @click="openYoutube()"
        >
          <font-awesome-icon icon="globe" />
          Open link
        </ft-button>
        <ft-button
          class="action"
          background-color="var(--accent-color-active)"
          @click="copyYoutubeEmbed()"
        >
          <font-awesome-icon icon="copy" />
          Copy embed
        </ft-button>
        <ft-button
          class="action"
          background-color="var(--accent-color-active)"
          @click="openYoutubeEmbed()"
        >
          <font-awesome-icon icon="globe" />
          Open embed
        </ft-button>
      </div>

      <div class="divider" />

      <div class="header invidious">
        <span class="invidiousLogo" />Invidious
      </div>

      <div class="buttons">
        <ft-button
          class="action"
          @click="copyInvidious()"
        >
          <font-awesome-icon icon="copy" />
          Copy link
        </ft-button>
        <ft-button
          class="action"
          @click="openInvidious()"
        >
          <font-awesome-icon icon="globe" />
          Open link
        </ft-button>
        <ft-button
          class="action"
          background-color="var(--accent-color-active)"
          @click="copyInvidiousEmbed()"
        >
          <font-awesome-icon icon="copy" />
          Copy embed
        </ft-button>
        <ft-button
          class="action"
          background-color="var(--accent-color-active)"
          @click="openInvidiousEmbed()"
        >
          <font-awesome-icon icon="globe" />
          Open embed
        </ft-button>
      </div>
    </div>
  </ft-icon-button>
</template>

<script src="./ft-share-button.js" />
<style scoped lang="sass" src="./ft-share-button.sass" />
