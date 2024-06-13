<template>
  <div>
    <IndexPage></IndexPage>
    <div>
      <q-card>
        <q-card-section>
          <div class="q-gutter-md">
            <q-select
                v-model="selectedBook"
                :options="versiculo"
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
                :options="verses"
                label="Do versículo "
                outlined
                dense
            ></q-select>
            <q-select
                v-model="selectedVerseTo"
                :options="verses"
                label="Até Versículo"
                outlined
                dense
            ></q-select>
          </div>
          <q-card-section>
            <div>
              <h1>rtte</h1>
            </div>
          </q-card-section>
          <br><br>
          <div class="configured-label animate__animated animate__bounceIn">
            <q-btn
                color="primary"
                label="Buscar Versículo Aleatório"
                @click="addRandonVersiculo"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import IndexPage from "@/components/IndexPage.vue";
import { mapActions, mapState } from "vuex";

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
      chapters: [], // Add appropriate data or fetch logic
      verses: [], // Add appropriate data or fetch logic
    };
  },
  computed: {
    ...mapState({
      versiculo: state => state.versiculo,
    }),
  },
  methods: {
    ...mapActions(['fetchBooksAndChapters']),

  },
  created() {
    this.fetchBooksAndChapters();
  },
};
</script>
