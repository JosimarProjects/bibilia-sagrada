import Vuex from 'vuex';
import {notifyError, notifySuccess} from "@/shared/helper/notify";

export default new Vuex.Store({
    state: {
        openAiToken: '',
        loadingImage: false,
        showInput: true,
        loading: false,
        booksAndChapters: [],
        history: {},

        versiculo: {
            book: '',
            chapter: '',
            number: '',
            text: '',
            image: '',
        }
    },
    getters: {
        booksAndChapters: state => state.booksAndChapters,
        chaptersByBook: (state) => (bookName) => {
            const book = state.booksAndChapters.find(book => book.name === bookName);
            const totalChapters = book ? book.chapters : [];
            return Array.from({length: totalChapters}, (v, k) => k + 1);
        },
        versesByChapter: (state) => {
            if (state.history.chapter) {
                const verses = state.history.chapter.verses;
                return Array.from({length: verses}, (v, k) => k + 1);
            }
        },
        chapterByVerse: (state) => (verse, verseTo) => {
            //console.log('state.history', state.history.verses);
            const verses = state.history.verses;
            const versesFiltered = verses.filter(vers => vers.number >= verse && vers.number <= verseTo);
            return ('versesFiltered', versesFiltered);

        }
    },
    mutations: {
        setVersiculoText(state, payload) {
            state.versiculo.text = payload;
        },
        setVersiculoBook(state, payload) {
            state.versiculo.book = payload;
        },
        setVersiculoChapter(state, payload) {
            state.versiculo.chapter = payload;
        },
        setVersiculoNumber(state, payload) {
            state.versiculo.number = payload;
        },
        setImage(state, payload) {
            state.versiculo.image = payload;
        },
        setOpenAiToken(state, payload) {
            state.openAiToken = payload;
        },
        setImgLoading(state, payload) {
            state.loadingImage = payload;
        },
        setShowInput(state, payload) {
            state.showInput = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setBooksAndChapters(state, payload) {
            state.booksAndChapters = payload;
        },
        setHistory(state, payload) {
            state.history = payload;
            console.log('history', state.history);
        }

    },
    actions: {
        fetchVersiculo(context) {
            fetch('https://www.abibliadigital.com.br/api/verses/nvi/random', {
                method: 'GET', // Método HTTP utilizado na requisição
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJUaHUgTWF5IDMwIDIwMjQgMTM6NTc6MzcgR01UKzAwMDAuNjY1ODgzODBmZjA0MWUwMDI4OGEyMTIzIiwiaWF0IjoxNzE3MDc3NDU3fQ.dlAtkD62fcaN6-mgtIGF9_DqoLXliYgLlsd-tIbuTYc`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(dados => {
                    context.commit('setVersiculoText', dados.text);
                    context.commit('setVersiculoBook', dados.book.name);
                    context.commit('setVersiculoChapter', dados.chapter);
                    context.commit('setVersiculoNumber', dados.number);
                  //  context.dispatch('fetchImage');

                })
                .catch(error => {
                    console.error('Erro na requisição:', error); // Tratamento de erro da requisição
                });
        },

        fetchImage(context) {
            context.commit('setImgLoading', true);

            const { text, book, chapter, number } = context.state.versiculo;
            const prompt = `Crie uma imagem visualmente detalhada que represente o versículo da Bíblia ${text} do livro de ${book}, capítulo ${chapter}, versículo ${number}. A imagem deve ser exatamente o momento como se estivesse ali como se fosse uma foto do ocorrido.`;

            fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                body: JSON.stringify({
                    "model": "dall-e-3",
                    "prompt": prompt,
                    "n": 1,
                    "size": "1024x1024"
                }),
                headers: {
                    'Authorization': 'Bearer ' + context.state.openAiToken,
                    'Content-Type': 'application/json'
                }
            })
                .then(async response => {
                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(`Error status:  ${response.status}`);
                    }


                    const dados = await response.json();
                    context.commit('setImage', dados.data[0].url);
                })
                .catch(error => {
                    context.commit('setImgLoading', false);

                    if (error.message == 'Error status:  401'){
                        notifyError('Token inválido, por favor verifique o token informado!')
                        context.commit('setShowInput', true);
                        context.commit('setOpenAiToken', '');
                    }else {
                        notifyError('Erro ao buscar imagem, tente novamente!')
                    }
                });
        },
        setImgToken(context, payload) {

            context.commit('setOpenAiToken', payload);
            //verificar se o token foi setado
            if (context.state.openAiToken !== '') {
                notifySuccess('Token adicionado com sucesso!')
                context.commit('setShowInput', false);
            } else if (context.state.openAiToken == '') {
                notifyError('Token precisa ser preenchido!')

            } else {
                notifyError('Erro ao adicionar token!')
            }
        },
        fetchBooksAndChapters(context) {
            fetch('https://www.abibliadigital.com.br/api/books/', {
                method: 'GET', // Método HTTP utilizado na requisição
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJUaHUgTWF5IDMwIDIwMjQgMTM6NTc6MzcgR01UKzAwMDAuNjY1ODgzODBmZjA0MWUwMDI4OGEyMTIzIiwiaWF0IjoxNzE3MDc3NDU3fQ.dlAtkD62fcaN6-mgtIGF9_DqoLXliYgLlsd-tIbuTYc`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(dados => {
                    //getBooksAndChapters
                    //getters
                    //somente os livros
                    const booksAndChapters = dados.map(book =>{
                        return{
                            name: book.name,
                            chapters: book.chapters,
                            abbrev: book.abbrev
                        }
                    })
                   context.commit('setBooksAndChapters', booksAndChapters);


                    //context.dispatch('getBooksAndChapters', dados);

                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                });
        },
        fetchBookChapter(context, {abbrev, chapter}) {
            fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${abbrev}/${chapter}`, {
                method: 'GET', // Método HTTP utilizado na requisição
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJUaHUgTWF5IDMwIDIwMjQgMTM6NTc6MzcgR01UKzAwMDAuNjY1ODgzODBmZjA0MWUwMDI4OGEyMTIzIiwiaWF0IjoxNzE3MDc3NDU3fQ.dlAtkD62fcaN6-mgtIGF9_DqoLXliYgLlsd-tIbuTYc`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(dados => {
                    context.commit('setHistory', dados);

                    /* context.commit('setVersiculoText', dados[0].text);
                     context.commit('setVersiculoBook', dados[0].book.name);
                     context.commit('setVersiculoChapter', dados[0].chapter);
                     context.commit('setVersiculoNumber', dados[0].number);*/
                    //  context.dispatch('fetchImage');

                })
                .catch(error => {
                    console.error('Erro na requisição:', error); // Tratamento de erro da requisição
                });
        }

    }
});
