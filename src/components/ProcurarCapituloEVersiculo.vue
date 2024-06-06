<template>
  <div>
    <IndexPage></IndexPage>
    <div>
      <input-select :options="versiculo" label="Livro"></input-select>
      <input-select :options="versiculo" label="Capitulo"></input-select>
      <input-select :options="versiculo" label="Versiculo"></input-select>
    </div>
  </div>

</template>

<script>
import IndexPage from "@/components/IndexPage.vue";
import InputSelect from "@/components/forms/InputSelect.vue";

export default {
  name: 'ProcurarCapituloEVersiculo',
  components: {
    InputSelect,
    IndexPage
  },
  data() {
    return {
      versiculo: [
        {label: 'Gênesis', value: 'genesis'},
        {label: 'Êxodo', value: 'exodo'},
        {label: 'Levítico', value: 'levitico'},
        {label: 'Números', value: 'numeros'},
        {label: 'Deuteronômio', value: 'deuteronomio'},
        {label: 'Josué', value: 'josue'},
        {label: 'Juízes', value: 'juizes'},
        {label: 'Rute', value: 'rute'},
        {label: '1 Samuel', value: '1samuel'},
        {label: '2 Samuel', value: '2samuel'},
        {label: '1 Reis', value: '1reis'},
        {label: '2 Reis', value: '2reis'},
        {label: '1 Crônicas', value: '1cronicas'},
        {label: '2 Crônicas', value: '2cronicas'},
        {label: 'Esdras', value: 'esdras'},
        {label: 'Neemias', value: 'neemias'},
        {label: 'Ester', value: 'ester'},
        {label: 'Jó', value: 'jo'},
        {label: 'Salmos', value: 'salmos'},
        {label: 'Provérbios', value: 'proverbios'},
        {label: 'Eclesiastes', value: 'eclesiastes'},
        {label: 'Cânticos', value: 'canticos'},
        {label: 'Isaías', value: 'isaias'},
        {label: 'Jeremias', value: 'jeremias'},
        {label: 'Lamentações', value: 'lamentacoes'},
        {label: 'Ezequiel', value: 'ezequiel'},
        {label: 'Daniel', value: 'daniel'},
        {label: 'Oséias', value: 'oseias'},
        {label: 'Joel', value: 'joel'},
        {label: 'Amós', value: 'amos'},
        {label: 'Obadias', value: 'obadias'},
        {label: 'Jonas', value: 'jonas'},
        {label: 'Miquéias', value: 'miqueias'},
        {label: 'Naum', value: 'naum'},
        {label: 'Habacuque', value: 'habacuque'},
        {label: 'Sofonias', value: 'sofonias'},
        {label: 'Ageu', value: 'ageu'},
        {label: 'Zacarias', value: 'zacarias'},
        {label: 'Malaquias', value: 'malaquias'},
        {label: 'Mateus', value: 'mateus'},
        {label: 'Marcos', value: 'marcos'},
        {label: 'Lucas', value: 'lucas'},
        {label: 'João', value: 'joao'},
      ]
    }
  }
}
</script>
