import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormAlta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [dataAlta, setDataAlta] = useState<string>('');
  const [horaAlta, setHoraAlta] = useState<string>('');
  const [motivoAlta, setMotivoAlta] = useState<string>('');
  const [motivoOutro, setMotivoOutro] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Definindo data e hora da alta ao carregar a tela
  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Formato de data "YYYY-MM-DD"
    const time = now.toTimeString().split(' ')[0]; // Formato de hora "HH:MM:SS"

    setDataAlta(date);
    setHoraAlta(time);
  }, []);

  // Função para tratar a confirmação da alta
  const handleAlta = async () => {
    setMensagem(null); // Resetando a mensagem
    setLoading(true); // Iniciando o estado de loading

    const altaData = {
      cpf,
      dataAlta,
      horaAlta,
      motivoAlta,
      motivoOutro: motivoAlta === 'outros' ? motivoOutro : '', // Só enviar motivoOutro se 'outros' for selecionado
    };

    try {
      // Fazendo a requisição POST para a API
      const response = await axios.post('/api/alta-paciente', altaData);

      // Verificando a resposta
      if (response.status === 200) {
        setMensagem('Alta confirmada com sucesso!');
      } else {
        setMensagem('Ocorreu um erro ao confirmar a alta.');
      }
    } catch (error) {
      console.error('Erro ao confirmar alta:', error);
      setMensagem('Erro ao conectar com a API. Tente novamente mais tarde.');
    } finally {
      setLoading(false); // Finalizando o estado de loading
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Alta Hospitalar</h3>

        <div className="form-group">
          <label>CPF do Paciente</label>
          <input
            type="text"
            placeholder="Digite o CPF do paciente"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data da Alta</label>
          <input
            type="date"
            value={dataAlta}
            onChange={(e) => setDataAlta(e.target.value)}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Hora da Alta</label>
          <input
            type="time"
            value={horaAlta}
            onChange={(e) => setHoraAlta(e.target.value)}
            readOnly
          />
        </div>

        <div className="form-group">
          <label>Motivo da Alta</label>
          <select
            value={motivoAlta}
            onChange={(e) => setMotivoAlta(e.target.value)}
            required
          >
            <option value="">Selecione o motivo</option>
            <option value="cura">Cura – O paciente completou o tratamento e se recuperou.</option>
            <option value="melhora">Melhora – O paciente apresentou melhoras, mas pode precisar de acompanhamento.</option>
            <option value="transferencia">Transferência – O paciente foi transferido para outro hospital ou unidade de saúde para continuidade do tratamento.</option>
            <option value="a-pedido">A pedido – A alta foi solicitada pelo paciente ou familiares, mesmo que não seja recomendada pela equipe médica.</option>
            <option value="obito">Óbito – O paciente faleceu durante a internação.</option>
            <option value="tratamento-concluido">Tratamento concluído – O paciente finalizou o protocolo de tratamento definido pela equipe médica.</option>
            <option value="outros">Outros – Usado para motivos específicos não cobertos pelas opções anteriores.</option>
          </select>
        </div>

        {motivoAlta === 'outros' && (
          <div className="form-group">
            <label>Especifique o Motivo</label>
            <input
              type="text"
              placeholder="Digite o motivo específico"
              value={motivoOutro}
              onChange={(e) => setMotivoOutro(e.target.value)}
            />
          </div>
        )}

        {/* Exibindo a mensagem de erro ou sucesso */}
        {mensagem && <p className="mensagem">{mensagem}</p>}

        {/* Botão para confirmar alta */}
        <button onClick={handleAlta} disabled={loading}>
          {loading ? 'Confirmando...' : 'Confirmar Alta'}
        </button>
      </div>
    </div>
  );
};

export default FormAlta;
