// Mock data for SecApp - River levels, stations, alerts
export interface RiverStation {
  id: string;
  estacao_id: string;
  rio_nome: string;
  municipio: string;
  latitude: number;
  longitude: number;
  nivel_m: number;
  calado_min: number;
  status: 'normal' | 'alerta' | 'critico';
  tendencia: 'subindo' | 'descendo' | 'estavel';
  ultima_atualizacao: string;
}

export interface Alerta {
  id: string;
  tipo: 'calado' | 'seca' | 'encalhe' | 'abastecimento';
  severidade: 'info' | 'moderado' | 'alto' | 'critico';
  titulo: string;
  descricao: string;
  acao_recomendada: string;
  trecho: string;
  lido: boolean;
  criado_em: string;
}

export interface KPI {
  label: string;
  valor: string;
  unidade: string;
  tendencia: 'subindo' | 'descendo' | 'estavel';
  variacao: string;
  icon: string;
}

export const RIOS_AMAZONAS: RiverStation[] = [
  {
    id: '1', estacao_id: '14990000', rio_nome: 'Rio Negro',
    municipio: 'Manaus', latitude: -3.1190, longitude: -60.0217,
    nivel_m: 21.5, calado_min: 8.2, status: 'alerta',
    tendencia: 'descendo', ultima_atualizacao: '2026-05-18T18:00:00Z'
  },
  {
    id: '2', estacao_id: '15030000', rio_nome: 'Rio Solimões',
    municipio: 'Manacapuru', latitude: -3.3070, longitude: -60.6200,
    nivel_m: 24.3, calado_min: 10.1, status: 'normal',
    tendencia: 'estavel', ultima_atualizacao: '2026-05-18T18:00:00Z'
  },
  {
    id: '3', estacao_id: '15250000', rio_nome: 'Rio Solimões',
    municipio: 'Tefé', latitude: -3.3540, longitude: -64.7100,
    nivel_m: 14.2, calado_min: 4.5, status: 'critico',
    tendencia: 'descendo', ultima_atualizacao: '2026-05-18T12:00:00Z'
  },
  {
    id: '4', estacao_id: '15400000', rio_nome: 'Rio Madeira',
    municipio: 'Borba', latitude: -4.3880, longitude: -59.5940,
    nivel_m: 18.7, calado_min: 7.3, status: 'normal',
    tendencia: 'subindo', ultima_atualizacao: '2026-05-18T18:00:00Z'
  },
  {
    id: '5', estacao_id: '13600000', rio_nome: 'Rio Purus',
    municipio: 'Lábrea', latitude: -7.2580, longitude: -64.7980,
    nivel_m: 12.8, calado_min: 3.8, status: 'critico',
    tendencia: 'descendo', ultima_atualizacao: '2026-05-18T06:00:00Z'
  },
  {
    id: '6', estacao_id: '12500000', rio_nome: 'Rio Juruá',
    municipio: 'Eirunepé', latitude: -6.6600, longitude: -69.8730,
    nivel_m: 16.1, calado_min: 5.9, status: 'alerta',
    tendencia: 'descendo', ultima_atualizacao: '2026-05-18T18:00:00Z'
  },
  {
    id: '7', estacao_id: '15100000', rio_nome: 'Rio Solimões',
    municipio: 'Codajás', latitude: -3.8370, longitude: -62.0570,
    nivel_m: 15.8, calado_min: 5.2, status: 'alerta',
    tendencia: 'descendo', ultima_atualizacao: '2026-05-18T18:00:00Z'
  },
  {
    id: '8', estacao_id: '14880000', rio_nome: 'Rio Negro',
    municipio: 'Barcelos', latitude: -0.9750, longitude: -62.9240,
    nivel_m: 19.4, calado_min: 6.8, status: 'normal',
    tendencia: 'estavel', ultima_atualizacao: '2026-05-18T18:00:00Z'
  },
];

export const ALERTAS_MOCK: Alerta[] = [
  {
    id: 'a1', tipo: 'calado', severidade: 'critico',
    titulo: 'Calado crítico no trecho Codajás–Tefé',
    descricao: 'Nível do Rio Solimões em Tefé atingiu 14.2m. Embarcações com calado >4.5m não devem navegar neste trecho.',
    acao_recomendada: 'Suspender navegação de barcaças pesadas. Utilizar rota alternativa via Rio Madeira.',
    trecho: 'Codajás → Tefé', lido: false, criado_em: '2026-05-18T08:00:00Z'
  },
  {
    id: 'a2', tipo: 'seca', severidade: 'alto',
    titulo: 'Previsão de seca severa: Rio Purus em 15 dias',
    descricao: 'Modelo sazonal indica queda de 3.2m no Rio Purus nos próximos 15 dias. Nível previsto: 9.6m.',
    acao_recomendada: 'Antecipar pedidos de suprimentos para municípios ao longo do Purus. Contatar fornecedores agora.',
    trecho: 'Lábrea → Boca do Acre', lido: false, criado_em: '2026-05-17T06:00:00Z'
  },
  {
    id: 'a3', tipo: 'abastecimento', severidade: 'moderado',
    titulo: 'Janela de estoque: antecipe pedidos para agosto',
    descricao: 'Histórico indica restrição logística a partir de agosto em Tefé. Custo de frete pode aumentar até 30%.',
    acao_recomendada: 'Realizar pedidos de gêneros alimentícios e insumos até 30 de junho.',
    trecho: 'Manaus → Tefé', lido: true, criado_em: '2026-05-15T06:00:00Z'
  },
  {
    id: 'a4', tipo: 'encalhe', severidade: 'alto',
    titulo: 'Risco de encalhe: banco de areia em Codajás',
    descricao: 'Ponto histórico de encalhe ativo. Calado disponível: 5.2m. Redução prevista de 1.8m nas próximas 48h.',
    acao_recomendada: 'Reduzir carga em 20% ou aguardar período de maré favorável. Custo estimado de encalhe: R$ 60.000.',
    trecho: 'Manaus → Codajás', lido: false, criado_em: '2026-05-18T14:00:00Z'
  },
  {
    id: 'a5', tipo: 'calado', severidade: 'info',
    titulo: 'Rio Negro estável acima do limiar seguro',
    descricao: 'Nível do Rio Negro em Manaus: 21.5m. Todas as operações podem seguir normalmente.',
    acao_recomendada: 'Nenhuma ação necessária. Monitoramento contínuo.',
    trecho: 'Porto de Manaus', lido: true, criado_em: '2026-05-18T18:00:00Z'
  },
];

export const KPIS_DASHBOARD: KPI[] = [
  { label: 'Rio Negro (Manaus)', valor: '21.5', unidade: 'm', tendencia: 'descendo', variacao: '-0.8m/sem', icon: 'waves' },
  { label: 'Municípios em Alerta', valor: '4', unidade: '', tendencia: 'subindo', variacao: '+2 esta semana', icon: 'alert-triangle' },
  { label: 'Rotas com Restrição', valor: '3', unidade: 'de 12', tendencia: 'subindo', variacao: '+1 nova rota', icon: 'map-pin' },
  { label: 'Variação Custo Logístico', valor: '+18', unidade: '%', tendencia: 'subindo', variacao: 'vs. mesmo período 2025', icon: 'trending-up' },
];

// Historical data for seasonal chart (monthly averages - Rio Negro at Manaus)
export const DADOS_HISTORICOS = {
  meses: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  rios: {
    'Rio Negro': {
      media_10_anos: [23.5, 25.1, 27.2, 28.8, 29.1, 28.4, 26.2, 22.8, 19.5, 17.2, 18.1, 20.8],
      ano_atual: [22.8, 24.3, 26.1, 27.9, 28.2, null, null, null, null, null, null, null],
      limiar_critico: 17.0,
    },
    'Rio Solimões': {
      media_10_anos: [20.1, 22.3, 24.8, 26.1, 26.5, 25.8, 23.1, 19.2, 16.1, 14.5, 15.2, 17.8],
      ano_atual: [19.2, 21.1, 23.5, 25.2, 25.8, null, null, null, null, null, null, null],
      limiar_critico: 14.0,
    },
    'Rio Madeira': {
      media_10_anos: [18.2, 20.5, 22.1, 23.8, 23.2, 21.5, 19.1, 16.2, 14.1, 12.8, 13.5, 15.9],
      ano_atual: [17.5, 19.8, 21.2, 22.9, 22.5, null, null, null, null, null, null, null],
      limiar_critico: 12.0,
    },
    'Rio Purus': {
      media_10_anos: [15.8, 17.2, 19.1, 20.5, 19.8, 17.5, 14.8, 11.5, 9.2, 8.1, 9.5, 12.8],
      ano_atual: [14.9, 16.1, 18.2, 19.8, 19.1, null, null, null, null, null, null, null],
      limiar_critico: 9.0,
    },
    'Rio Juruá': {
      media_10_anos: [14.2, 16.1, 18.5, 19.8, 19.2, 17.1, 14.5, 11.2, 9.5, 8.8, 9.8, 11.9],
      ano_atual: [13.5, 15.2, 17.8, 19.1, 18.5, null, null, null, null, null, null, null],
      limiar_critico: 9.0,
    },
  }
};

export function classificarRisco(nivel: number, limiar: number): string {
  const diff = nivel - limiar;
  if (diff < 0) return 'critico';
  if (diff < 4) return 'alto';
  if (diff < 8) return 'alerta';
  return 'normal';
}

export function getTendenciaIcon(t: string) {
  if (t === 'subindo') return '↑';
  if (t === 'descendo') return '↓';
  return '→';
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}
