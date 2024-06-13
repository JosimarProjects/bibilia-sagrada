<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner rounded :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/">Usar Bíblia</router-link> |
        <router-link to="/versiculo-aleatorio">Versiculo Aleatório</router-link>
      </nav>
      <template v-slot:avatar>
        <div style="display: flex; flex-direction: column; align-items: center;">
          <img
              src="https://cdn.quasar.dev/img/mountains.jpg"
              style="width: 100px; height: 64px"
          >
          <slot name="avatarText"></slot>
        </div>
      </template>

      {{ bannerText }}

      <template v-slot:action>
        <q-btn flat label="Retry" />
      </template>
    </q-banner>
  </div>
</template>

<script>
export default {
  name: 'BannerComponent',
  props: {
    bannerText:{
      type: String,
      required: true
    }
  }
}
</script>
