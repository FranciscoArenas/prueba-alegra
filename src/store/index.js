import { createStore } from 'vuex';

const store = createStore({
  state: {
    vendedores: [
      { id: 1, nombre: 'Vendedor 1', puntos: 0 },
      { id: 2, nombre: 'Vendedor 2', puntos: 0 },
    ],
  },
  mutations: {
    actualizarPuntos(state, { vendedorId, puntos }) {
      const vendedor = state.vendedores.find(v => v.id === vendedorId);
      if (vendedor) vendedor.puntos += puntos;
    },
  },
});

export default store;
