<template>
  <div>
    <IndexPage></IndexPage>
    <div class="container">
      <q-card>
        <q-card-section>
          <div class="q-gutter-md">
            <q-select
                v-model="selectedBook"
                :options="booksAndChapters.map(book => book.name)"
                label="Livro"
                outlined
                dense
            ></q-select>
            <q-select
                v-model="selectedChapter"
                :options="chapters"
                label="Capítulo"
                outlined
                dense
            ></q-select>
            <q-select
                v-model="selectedVerse"
                :options="getVerses"
                label="Do versículo "
                outlined
                dense
            ></q-select>
            <q-select
                v-model="selectedVerseTo"
                :options="getVerses"
                label="Até Versículo"
                outlined
                dense
            ></q-select>
          </div>

          <br><br>
          <!--   <div class="configured-label animate__animated animate__bounceIn">
               <q-btn
                   color="primary"
                   label="Buscar Versículo Aleatório"
                   @click="addRandonVersiculo"
               />
             </div>-->
        </q-card-section>
      </q-card>
      <q-card class="card scroll-container old-book-style">
        <q-card-section>
          <q-infinite-scroll
              @load="loadMore"
              :offset="100"
              ref="infiniteScroll"
          >
            <div v-for="history in historySelected" :key="history.number" class="verse-container">
              <p> Versículo: {{ history.number }} - {{ history.text }} </p>
            </div>
          </q-infinite-scroll>
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script>
import IndexPage from "@/components/IndexPage.vue";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'ProcurarCapituloEVersiculo',
  components: {
    IndexPage,
  },
  data() {
    return {
      selectedBook: null,
      selectedChapter: null,
      selectedVerse: null,
      selectedVerseTo: null,
      //chapters: [], // Adicione os dados apropriados ou a lógica de busca
      verses: [],
      historySelected: '',
    };
  },
  computed: {
    ...mapState({
      booksAndChapters: state => state.booksAndChapters,
      history: state => state.history,
    }),
    ...mapGetters({
      getChapters: "chaptersByBook",
      getVerses: "versesByChapter",
      getHistory: "chapterByVerse",
    }),
    chapters() {
      return this.getChapters(this.selectedBook);
    },

  },
  methods: {
    ...mapActions(['fetchBooksAndChapters', 'fetchBookChapter']),

    setBooks() {
      this.fetchBooksAndChapters();
    },
    setHistorySelected(history) {
      this.historySelected = history;
    },
  },
  watch: {
    async selectedChapter() {
      let abbrev = this.booksAndChapters.find(book => book.name === this.selectedBook).abbrev.pt;
      let chapter = this.selectedChapter;
      await this.fetchBookChapter({abbrev, chapter});

    },
    async selectedVerseTo() {
      this.setHistorySelected(this.getHistory(this.selectedVerse, this.selectedVerseTo));
    },
    /*history() {
       this.getVerses;
    },*/
  },
  created() {
    this.setBooks();
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}

.scroll-container {
  height: 400px;
  overflow-y: auto;
}

.old-book-style {
  background-color: #f4ecd8; /* Cor de papel envelhecido */
  border: 2px solid #c4a484; /* Bordas que lembram couro antigo */
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3); /* Sombra para dar profundidade */
  font-family: 'Garamond', serif; /* Fonte serifada */
  color: #5b4636; /* Cor de texto que lembra tinta antiga */
  padding: 20px; /* Espaçamento interno */
  background-image: url('@/assets/old-paper-texture.webp'); /* Textura de papel envelhecido */
  background-size: cover;
}

.verse-container {
  margin-bottom: 10px;
}

.verse-container p {
  font-style: italic; /* Estilo de texto antigo */
  font-size: 23px;
  text-indent: 20px; /* Recuo para estilo de parágrafo */
  line-height: 1.6; /* Altura da linha para melhor legibilidade */
  background-color: rgba(255, 255, 255, 0.7); /* Fundo semitransparente para destacar o texto */
  padding: 5px; /* Espaçamento interno para o texto */
  border-radius: 5px; /* Bordas arredondadas para o fundo */
  color: #2f2f2f; /* Cor de texto mais escura para contraste */
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8); /* Sombra branca para destacar o texto */
}



</style>
