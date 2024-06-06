<template>
  <div>
    <IndexPage></IndexPage>
    <div>
      <div v-if="loading">
        <q-spinner size="50px"/>
      </div>
      <div v-if="versiculo.book !== ''">
        <h5>Livro: {{ versiculo.book }}</h5>
        <span>Capítulo: {{ versiculo.chapter }}</span> -
        <span>Versículo: {{ versiculo.number }}</span>
      </div>
      <br>
      <p>{{ versiculo.text }}</p>
      <br>
      <img v-if="versiculo.image !== '' && !loadingImage" :src="versiculo.image" alt="Imagem do versículo" width="500"
           height="500">
      <div v-if="loadingImage">
        <q-spinner size="50px"/>
      </div>
    </div>
    <br><br>

    <div>
      <q-btn
          color="primary"
          label="Buscar"
          @click="addRandonVersiculo"
      />
    </div>
    <br>
    <div class="input-container">
      <q-input
          dense
          outlined
          label="Para vê imagens dos versiculos, insira o token do OpenAI:"
          type="string"
          v-model="openAiToken"
          class="input-field"
      >
        <template v-slot:append>
          <q-btn @click="setImageToken" label="Enviar" class="send-button"/>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import IndexPage from "@/components/IndexPage.vue";
import {mapActions, mapMutations, mapState} from "vuex";
import {QSpinner} from 'quasar';

export default {
  name: 'VersiculoAleatorio',
  components: {
    IndexPage,
    QSpinner
  },
  data() {
    return {
      loading: false,
      loadingImage: false,
      openAiToken: '',
    };
  },
  computed: {
    ...mapState({
      versiculo: state => state.versiculo,
      openAiToken: state => state.openAiToken,
    }),
  },
  methods: {
    ...mapActions(['fetchVersiculo', 'fetchImage']),
    ...mapMutations(['setOpenAiToken']),

    setToken() {
      this.setOpenAiToken(this.openAiToken);
    },
    async buscarVersiculo() {
      await this.fetchVersiculo();
    },
    addRandonVersiculo() {
      this.loading = true;
      this.loadingImage = true;
      this.buscarVersiculo();
    },
    async getImage() {
      await this.fetchImage();
    },
    setImageToken() {
      this.setOpenAiToken(this.openAiToken);
    },
  },
  watch: {
    versiculo: {
      handler() {
        console.log('Versículo:', this.versiculo);
        this.loading = false;
      },
      deep: true
    },
    "versiculo.image": {
      handler() {
        console.log('Imagem:', this.versiculo.image);
        this.loadingImage = false;
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.image-container {
  position: relative;
  width: 500px;
  height: 500px;
}

.image-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.input-field {
  width: 60%;
}

.send-button {
  margin-left: 10px;
}


</style>
