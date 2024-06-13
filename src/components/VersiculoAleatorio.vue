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
      <img v-if="versiculo.image !== '' && !loadingImage && this.openAiToken !== ''" :src="versiculo.image" alt="Imagem do versículo" width="500"
           height="500">
      <div v-if="loadingImage && this.openAiToken !== ''">
        <q-spinner size="50px"/>
      </div>
    </div>
    <br><br>
    <div  class="configured-label animate__animated animate__bounceIn">
      <q-btn
          color="primary"
          label="Buscar Versículo Aleatório"
          @click="addRandonVersiculo"
      />
    </div>
    <br>
    <div v-if="showInput" ref="inputContainer" class="input-container " :class="animationClass">
      <q-input
          dense
          outlined
          label="Para vê imagens dos versiculos, insira o token do OpenAI:"
          type="string"
          v-model="openAiTokenInput"
          class="input-field configured-label"
      >
        <template v-slot:append>
          <q-btn @click="setImageToken(openAiTokenInput) " color="primary" label="Enviar"/>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import IndexPage from "@/components/IndexPage.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { QSpinner } from 'quasar';

export default {
  name: 'VersiculoAleatorio',
  components: {
    IndexPage,
    QSpinner
  },
  data() {
    return {
      openAiTokenInput: '',
      animationClass: 'animate__bounceIn', // Classe de animação inicial
    };
  },
  computed: {
    ...mapState({
      versiculo: state => state.versiculo,
      openAiToken: state => state.openAiToken,
      loadingImage: state => state.loadingImage,
      showInput: state => state.showInput,
      loading: state => state.loading,
    }),
  },
  methods: {
    ...mapActions(['fetchVersiculo', 'fetchImage', 'setImgToken']),
    ...mapMutations(['setOpenAiToken', 'setImgLoading', 'setShowInput', 'setLoading']),


    async buscarVersiculo() {
      await this.fetchVersiculo();
    },
    addRandonVersiculo() {
      this.setLoading(true);
      this.buscarVersiculo();
      if (this.openAiToken !== '') {
        this.getImage();
      }
    },
    async getImage() {
      await this.fetchImage();
    },
    setImageToken(value) {
      this.setImgToken(value);

      if (this.openAiToken !== '') {
        this.animateOut();
      }
    },
    animateOut() {
      this.animationClass = 'animate__bounceOut'; // Classe de saída
      this.$refs.inputContainer.addEventListener('animationend', () => {
        this.setShowInput(false);
      }, {once: true});
    },

  },
  watch: {
    versiculo: {
      handler() {
        this.setLoading(false);
      },
      deep: true
    },
    "versiculo.image": {
      handler() {
        this.setImgLoading(false);
      },
      deep: true
    }
  }
}
</script>

<style scoped>

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.input-field {
  width: 60%;
}


</style>
