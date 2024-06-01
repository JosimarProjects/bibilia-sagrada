<template>
  <div>
      <BannerComponent :bannerText="'A Biblia Sagrada Edição com quasar e vue'">
        <template v-slot:avatarText>
          <br>
          <div>A Palavra de Deus</div>
        </template>
      </BannerComponent>
    <h1>testando</h1>
  </div>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue'

export default {
  name: 'IndexPage',
  components: {
    BannerComponent
  }
}
</script>
